import { NextResponse } from 'next/server';

export const runtime = 'edge';

const LASTFM_API_KEY = process.env.LASTFM_API_KEY;
const LASTFM_USERNAME = process.env.LASTFM_USERNAME;

interface LastFmImage {
    size: string;
    '#text': string;
}


export async function GET() {
    if (!LASTFM_API_KEY || !LASTFM_USERNAME) {
        console.error("Missing Env Vars. Check .env.local file.");
        return NextResponse.json({ isPlaying: false, error: "Configuration Error" }, { status: 500 });
    }

    const url = `https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${LASTFM_USERNAME}&api_key=${LASTFM_API_KEY}&format=json&limit=1`;

    try {
        const response = await fetch(url, {
            next: { revalidate: 30 }
        });

        if (!response.ok) {
            console.error(`Last.fm API responded with status: ${response.status}`);
            return NextResponse.json({ isPlaying: false }, { status: response.status });
        }

        const data = await response.json();

        if (data.error) {
            console.error("Last.fm API Error:", data.message);
            return NextResponse.json({ isPlaying: false });
        }

        const recentTracks = data.recenttracks?.track;
        if (!recentTracks) {
            console.warn("Unexpected response structure:", JSON.stringify(data));
            return NextResponse.json({ isPlaying: false });
        }

        const track = Array.isArray(recentTracks) ? recentTracks[0] : recentTracks;

        if (!track) {
            return NextResponse.json({ isPlaying: false });
        }

        const isPlaying = track['@attr']?.nowplaying === 'true';

        if (!isPlaying) {
            return NextResponse.json({ isPlaying: false });
        }

        const imageArray: LastFmImage[] = Array.isArray(track.image) ? track.image : [];

        const largeImage = imageArray.find((img) => img.size === 'extralarge' && img['#text'])?.['#text']
            || imageArray.find((img) => img.size === 'large' && img['#text'])?.['#text']
            || imageArray.find((img) => img['#text'])?.['#text']
            || null;

        if (!largeImage) {
            console.warn(`Track "${track.name}" is playing but has no artwork.`);
        }
        return NextResponse.json({
            isPlaying: true,
            title: track.name,
            artist: track.artist['#text'],
            album: track.album['#text'],
            albumImageUrl: largeImage,
            songUrl: track.url,
        }, {
            headers: {
                'Cache-Control': 'public, s-maxage=30, stale-while-revalidate=15',
            }
        });

    } catch (error) {
        console.error("Server Error in /api/music:", error);
        return NextResponse.json({ isPlaying: false }, { status: 500 });
    }
}
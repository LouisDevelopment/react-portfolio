import { NextResponse } from 'next/server';

const GITHUB_USERNAME = process.env.GITHUB_USERNAME;
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

interface GitHubCommit {
    sha: string;
    message: string;
}

interface GitHubEvent {
    type: string;
    created_at: string;
    repo: {
        name: string;
    };
    payload: {
        commits?: GitHubCommit[];
    };
}

export const runtime = 'edge';

export async function GET() {
    if (!GITHUB_USERNAME) {
        console.error("GITHUB_USERNAME is missing from .env.local");
        return NextResponse.json({ hasCommit: false, error: "Configuration Error" }, { status: 500 });
    }

    const url = `https://api.github.com/users/${GITHUB_USERNAME}/events/public?per_page=10`; // Increased limit to find push events

    const headers: HeadersInit = {
        'Accept': 'application/vnd.github.v3+json',
        'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=30',
    };

    if (GITHUB_TOKEN) {
        headers['Authorization'] = `token ${GITHUB_TOKEN}`;
    }

    try {
        const response = await fetch(url, { headers, next: { revalidate: 60 } });

        if (!response.ok) {
            console.error(`GitHub API Error: ${response.status} ${response.statusText}`);
            // Check for rate limit headers
            const limit = response.headers.get('X-RateLimit-Remaining');
            console.error(`Rate Limit Remaining: ${limit}`);
            return NextResponse.json({ hasCommit: false }, { status: response.status });
        }

        const events = (await response.json()) as GitHubEvent[];

        // 2. Safety Check: Ensure events is an array
        if (!Array.isArray(events)) {
            console.error("GitHub response was not an array");
            return NextResponse.json({ hasCommit: false });
        }

        const pushEvent = events.find((e) => e.type === 'PushEvent');

        if (!pushEvent) {
            console.warn(`No PushEvent found in the last 10 public events for user ${GITHUB_USERNAME}.`);
            return NextResponse.json({ hasCommit: false });
        }

        const latestCommit = pushEvent.payload.commits?.[(pushEvent.payload.commits.length || 0) - 1];

        if (!latestCommit) {
            console.warn("PushEvent found but payload contained no commits.");
            return NextResponse.json({ hasCommit: false });
        }

        return NextResponse.json({
            hasCommit: true,
            repo: pushEvent.repo.name.split('/')[1] || pushEvent.repo.name,
            message: latestCommit.message,
            sha: latestCommit.sha,
            date: pushEvent.created_at,
            url: `https://github.com/${pushEvent.repo.name}/commit/${latestCommit.sha}`
        });

    } catch (error) {
        console.error("Server Error in /api/github:", error);
        return NextResponse.json({ hasCommit: false }, { status: 500 });
    }
}
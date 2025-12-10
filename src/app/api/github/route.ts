import { NextResponse } from 'next/server';

export const runtime = 'edge';

const GITHUB_USERNAME = process.env.GITHUB_USERNAME;
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

interface GitHubEvent {
    id: string;
    type: string;
    created_at: string;
    repo: {
        name: string;
        url: string;
    };
    payload: {
        ref?: string;
        head?: string;
    };
}

export async function GET() {
    if (!GITHUB_USERNAME) {
        return NextResponse.json({ hasCommit: false, error: "Configuration Error" }, { status: 500 });
    }

    const url = `https://api.github.com/users/${GITHUB_USERNAME}/events/public?per_page=10`;

    const headers: HeadersInit = {
        'Accept': 'application/vnd.github.v3+json',
        'Cache-Control': 'public, max-age=0, s-maxage=60, stale-while-revalidate=30',
    };

    if (GITHUB_TOKEN) {
        headers['Authorization'] = `token ${GITHUB_TOKEN}`;
    }

    try {
        const response = await fetch(url, { headers, next: { revalidate: 0 } });

        if (!response.ok) {
            console.error(`GitHub API Error: ${response.status}`);
            return NextResponse.json({ hasCommit: false }, { status: response.status });
        }

        const events = (await response.json()) as GitHubEvent[];
        if (!Array.isArray(events)) {
            return NextResponse.json({ hasCommit: false });
        }

        const pushEvent = events.find((e) => e.type === 'PushEvent');

        if (!pushEvent) {
            return NextResponse.json({ hasCommit: false });
        }

        const repoName = pushEvent.repo.name;
        const shortRepoName = repoName.split('/')[1] || repoName;

        const branch = pushEvent.payload.ref?.replace('refs/heads/', '') || 'main';

        const sha = pushEvent.payload.head;
        const browserUrl = sha
            ? `https://github.com/${repoName}/commit/${sha}`
            : `https://github.com/${repoName}`;

        const message = `Pushed updates to ${branch}`;

        return NextResponse.json({
            hasCommit: true,
            repo: shortRepoName,
            message: message,
            sha: sha?.substring(0, 7) || 'latest',
            date: pushEvent.created_at,
            url: browserUrl
        });

    } catch (error) {
        console.error("Server Error in /api/github:", error);
        return NextResponse.json({ hasCommit: false }, { status: 500 });
    }
}
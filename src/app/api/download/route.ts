// app/api/download/route.js
import youtubedl from 'youtube-dl-exec';
import { NextResponse } from 'next/server';

export async function POST(request) {
    try {
        const { url } = await request.json();
        if (!url) {
            return NextResponse.json({ error: 'No URL provided' }, { status: 400 });
        }

        // Get video info first to get proper filename
        const info = await youtubedl(url, {
            dumpSingleJson: true,
            noCheckCertificates: true,
            noWarnings: true,
            preferFreeFormats: true,
        });

        if (!info) {
            return NextResponse.json({ error: 'Invalid URL or video unavailable' }, { status: 400 });
        }

        // Create a readable stream from youtube-dl
        const ytdlStream = youtubedl.exec(url, {
            output: '-', // Output to stdout
            format: 'best',
            noCheckCertificates: true,
            noWarnings: true,
        }).stdout;

        // Create response stream
        const responseStream = new ReadableStream({
            start(controller) {
                ytdlStream?.on('data', (chunk) => controller.enqueue(chunk));
                ytdlStream?.on('end', () => controller.close());
                ytdlStream?.on('error', (error) => controller.error(error));
            },
        });

        // Get safe filename
        const filename = `video_${Date.now()}_grabtube.mp4`;

        return new Response(responseStream, {
            headers: {
                'Content-Type': 'video/mp4',
                'Content-Disposition': `attachment; filename="${filename}"`,
                'Access-Control-Allow-Origin': '*',
            },
        });

    } catch (error) {
        console.error('Download error:', error);
        return NextResponse.json(
            { error: error || 'Failed to download video' },
            { status: 500 }
        );
    }
}
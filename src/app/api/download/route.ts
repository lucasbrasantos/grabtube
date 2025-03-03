import { NextResponse } from 'next/server';
import { VideoService } from './service';
import { rateLimiter, validateRequest } from '@/lib/utils/stream';


export const POST = async (req: Request) => {
	try {
		// Rate limiting
		const identifier = req.headers.get('x-real-ip') || 'anonymous';
		const { success } = await rateLimiter.limit(identifier);


		if (!success) {
			return new NextResponse('Too many requests', { status: 429 });
		}

		// Validation
		const { url, quality } = await validateRequest(req);

		// Get video stream
		const { stream, info } = await VideoService.getVideoStream(url, quality);

		// Create response stream
		return new Response(stream as any, {
			headers: {
				'Content-Type': 'video/mp4',
				'Content-Disposition': `attachment; filename="${VideoService.sanitizeFilename(info.title)}.mp4"`,
				'Cache-Control': 'no-store, max-age=0',
			},
		});
	} catch (error) {
		return NextResponse.json(
			{ error: error instanceof Error ? error.message : 'Download failed' },
			{ status: error instanceof Error ? 400 : 500 }
		);
	}
};
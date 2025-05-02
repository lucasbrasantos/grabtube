// app/api/video/service.ts
import { PassThrough } from 'stream';
// import { redis } from '@/lib/utils/stream';
import ytdl from "@distube/ytdl-core"
import { VideoInfo, VideoResponse } from '@/lib/types/video';

export class VideoService {
	static async getVideoStream(url: string, quality = 'highest'): Promise<VideoResponse> {

		if (!ytdl.validateURL(url)) throw new Error('Invalid YouTube URL');

		// Get cached metadata if exists
		// const cached = await redis.get<string>(`video:${url}`);
		// let cachedInfo: VideoInfo | null = null;

		// if (cached) {
		// 	cachedInfo = typeof cached === 'string' ? JSON.parse(cached) as VideoInfo : cached;
		// }

		// Always get full video info for downloading
		const fullInfo = await ytdl.getInfo(url);

		// Create fresh stream using full info
		const stream = ytdl.downloadFromInfo(fullInfo, {
			quality,
			dlChunkSize: 0, // Disable chunking for better streaming
		}).pipe(new PassThrough());

		// Cache metadata if not already cached
		// if (!cached) {
		// 	await this.cacheVideoInfo(url, fullInfo);
		// }

		return {
			stream,
			info: /* cachedInfo  ||*/ {
				title: fullInfo.videoDetails.title,
				duration: fullInfo.videoDetails.lengthSeconds,
				thumbnail: fullInfo.videoDetails.thumbnails[0]?.url || ''
			}
		};
	}

	// private static async cacheVideoInfo(url: string, info: ytdl.videoInfo) {
	// 	await redis.setex(`video:${url}`, 600, JSON.stringify({
	// 		title: info.videoDetails.title,
	// 		duration: info.videoDetails.lengthSeconds,
	// 		thumbnail: info.videoDetails.thumbnails[0]?.url || ''
	// 	}));
	// }

	static sanitizeFilename(title: string) {
		return title.replace(/[^a-z0-9]/gi, '_').slice(0, 100);
	}
}
// app/api/video/service.ts
import { PassThrough } from 'stream';
// import { redis } from '@/lib/utils/stream';
import ytdl, { Cookie } from "@distube/ytdl-core"
import { VideoInfo, VideoResponse } from '@/lib/types/video';

export class VideoService {
	static async getVideoStream(url: string, quality = 'highest'): Promise<VideoResponse> {

		if (!ytdl.validateURL(url)) throw new Error('Invalid YouTube URL');


		const fullInfo = await ytdl.getInfo(url);

		// Create fresh stream using full info
		const stream = ytdl.downloadFromInfo(fullInfo, {
			quality,
			dlChunkSize: 0,
		}).pipe(new PassThrough());

		return {
			stream: stream,
			info: /* cachedInfo  ||*/ {
				title: fullInfo.videoDetails.title,
				duration: fullInfo.videoDetails.lengthSeconds,
				thumbnail: fullInfo.videoDetails.thumbnails[0]?.url || ''
			}
		};
	}

	public static getRandomUserAgent() {
		const userAgents = [
			'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
			'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.1.1 Safari/605.1.15',
			'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:89.0) Gecko/20100101 Firefox/89.0'
		];
		return userAgents[Math.floor(Math.random() * userAgents.length)];
	}

	static sanitizeFilename(title: string) {
		return title.replace(/[^a-z0-9]/gi, '_').slice(0, 100);
	}
}
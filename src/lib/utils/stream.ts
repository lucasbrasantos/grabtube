
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';
import dotenv from 'dotenv';
dotenv.config();

export const redis = new Redis({
	url: process.env.UPSTASH_REDIS_REST_URL!,
	token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

export const rateLimiter = new Ratelimit({
	redis,
	limiter: Ratelimit.slidingWindow(5, '60 s'),
});


import { z } from 'zod';

const schema = z.object({
	url: z.string().url(),
	quality: z.enum(['lowest', 'highest', '144p', '360p', '720p']).optional()
});

export async function validateRequest(req: Request) {
	const body = await req.json();
	return schema.parse(body);
}

import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';
import dotenv from 'dotenv';
dotenv.config();

export const NEXT_PUBLIC_API_BASE_URL = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api`;

if (!NEXT_PUBLIC_API_BASE_URL) {
	throw new Error('API_BASE_URL is not defined in the environment variables.');
}

import { z } from 'zod';

const schema = z.object({
	url: z.string().url(),
	quality: z.enum(['lowest', 'highest', '144p', '360p', '720p']).optional()
});

export async function validateRequest(req: Request) {
	const body = await req.json();
	return schema.parse(body);
}
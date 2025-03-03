import { PassThrough } from "stream";

export interface VideoInfo {
	title: string;
	duration: string;
	thumbnail: string;
}

export interface VideoResponse {
	stream: PassThrough;
	info: VideoInfo;
}
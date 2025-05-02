"use client";
import BoltIcon from '@mui/icons-material/Bolt';
import GitHubIcon from '@mui/icons-material/GitHub';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import HighQualityIcon from '@mui/icons-material/HighQuality';
import LightModeIcon from '@mui/icons-material/LightMode';
import ShieldIcon from '@mui/icons-material/Shield';
import LinearProgress from '@mui/material/LinearProgress';
import Image from "next/image";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import YouTube from "react-youtube";
import Link from 'next/link';

export default function Home() {
	const [darkMode, setDarkMode] = useState(false);
	const [isMounted, setIsMounted] = useState(false);
	const [videoUrl, setVideoUrl] = useState<string>('');
	const [isLoading, setIsLoading] = useState(false);
	const [downloadProgress, setDownloadProgress] = useState(0);
	const [videoId, setVideoId] = useState<string | null>(null);
	const [validationError, setValidationError] = useState<string | null>(null);

	useEffect(() => {
		setIsMounted(true);
		const savedTheme = localStorage.getItem("theme");
		const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

		if (savedTheme === "dark" || (!savedTheme && systemDark)) {
			setDarkMode(true);
			document.documentElement.classList.add("dark");
		}
	}, []);

	useEffect(() => {
		const extractVideoId = (url: string) => {
			const regExp = /^.*(?:(?:youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=))([^#\&\?]{11}).*/;
			const match = url.match(regExp);
			return match ? match[1] : null;
		};

		if (videoUrl) {
			try {
				new URL(videoUrl); // Basic URL validation
				const id = extractVideoId(videoUrl);

				if (!id) {
					throw new Error('Invalid YouTube URL format');
				}

				setVideoId(id);
				setValidationError(null);

			} catch (error) {
				setVideoId(null);
				setValidationError('Please enter a valid YouTube URL');
			}
		} else {
			setVideoId(null);
			setValidationError(null);
		}
	}, [videoUrl]);

	const previewOptions = {
		height: '200',
		width: '100%',
		playerVars: {
			autoplay: 0,
			controls: 1,
			modestbranding: 1,
			rel: 0
		}
	};

	const toggleDarkMode = () => {
		document.documentElement.classList.add("transition-colors", "duration-300");
		const newDarkMode = !darkMode;
		setDarkMode(newDarkMode);
		localStorage.theme = newDarkMode ? "dark" : "light";
		document.documentElement.classList.toggle("dark", newDarkMode);
	};

	const handleDownload = async () => {
		try {
			if (!videoUrl) {
				toast.error('Please enter a YouTube URL', {
					icon: <ErrorOutlineIcon className="text-red-500" />,
					style: {
						background: darkMode ? '#1f2937' : '#fff',
						color: darkMode ? '#fff' : '#374151',
					}
				});
				return;
			}
			if (!videoId) {
				toast.error('Invalid YouTube URL', {
					icon: <ErrorOutlineIcon className="text-red-500" />,
					style: {
						background: darkMode ? '#1f2937' : '#fff',
						color: darkMode ? '#fff' : '#374151',
					}
				});
				return;
			}

			setIsLoading(true);
			setDownloadProgress(0);

			toast.success('Download started!', {
				icon: <CheckCircleOutlineIcon className="text-green-500" />,
				style: {
					background: darkMode ? '#1f2937' : '#fff',
					color: darkMode ? '#fff' : '#374151',
				}
			});

			const response = await fetch('/api/download', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					url: videoUrl,
					// quality: selectedQuality
				}),
			});

			if (!response.ok) throw new Error(await response.text());


			const reader = response.body?.getReader();
			const contentLength = +(response.headers.get('Content-Length') || 0);
			let receivedLength = 0;
			const chunks: Uint8Array[] = [];

			while (true) {
				const { done, value } = await reader!.read();
				if (done) break;

				chunks.push(value);
				receivedLength += value.length;
				setDownloadProgress(contentLength ? Math.round((receivedLength / contentLength) * 100) : 0);
			}

			const blob = new Blob(chunks);
			const downloadUrl = window.URL.createObjectURL(blob);
			const link = document.createElement('a');
			link.href = downloadUrl;
			link.setAttribute('download', `GrabTube_${Date.now()}.mp4`);
			document.body.appendChild(link);
			link.click();
			link.remove();
			window.URL.revokeObjectURL(downloadUrl);

			toast.success('Download completed!', {
				icon: <CheckCircleOutlineIcon className="text-green-500" />,
				style: {
					background: darkMode ? '#1f2937' : '#fff',
					color: darkMode ? '#fff' : '#374151',
				}
			});

		} catch (error) {
			const errorMessage = error instanceof Error ? error.message : 'Download failed';
			toast.error(errorMessage, {
				icon: <ErrorOutlineIcon className="text-red-500" />,
				style: {
					background: darkMode ? '#1f2937' : '#fff',
					color: darkMode ? '#fff' : '#374151',
				}
			});
		} finally {
			setIsLoading(false);
			setVideoUrl('');
			setDownloadProgress(0);
		}
	};

	if (!isMounted) return null;

	return (
		<main className="min-h-screen transition-colors duration-300 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-blue-900/20">
			<Toaster
				position="top-center"
				toastOptions={{
					duration: 5500,
					className: '!rounded-xl !shadow-lg',
				}}
			/>

			<Navbar
				darkMode={darkMode}
				toggleDarkMode={toggleDarkMode}
			/>


			{/* Main Content */}
			<div className="px-4 py-16 mx-auto max-w-7xl sm:px-6 lg:px-8">
				<div className="max-w-3xl mx-auto text-center">
					<h1 className="mb-6 text-4xl font-bold text-gray-900 sm:text-5xl dark:text-white">
						Download <span className="text-transparent bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text">YouTube Videos</span> Instantly
					</h1>
					<p className="mb-6 text-lg text-gray-600 dark:text-gray-300">
						Fast, secure, and free YouTube video downloader
					</p>

					{/* Progress Bar */}
					{isLoading && (
						<div className="w-full px-4 mx-auto max-w-7xl sm:px-6 lg:px-8 mb-6">
							<LinearProgress
								variant={downloadProgress > 0 ? "determinate" : "indeterminate"}
								value={downloadProgress}
								sx={{
									height: 8,
									borderRadius: 4,
									'& .MuiLinearProgress-bar': {
										background: 'linear-gradient(90deg, #4f46e5 0%, #9333ea 100%)',
										borderRadius: 4
									}
								}}
							/>
							<div className="mt-2 text-sm text-right text-gray-600 dark:text-gray-400">
								{downloadProgress > 0 ? `${downloadProgress}%` : 'Starting download...'}
							</div>
							{validationError && (
								<p className="mt-2 text-sm text-red-500 dark:text-red-400 text-left">
									{validationError}
								</p>
							)}
						</div>
					)}

					{/* {availableQualities.length > 0 && (
						<div className="mt-4 w-full max-w-md mx-auto">
							<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
								Select Video Quality
							</label>
							<div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
								{availableQualities.map((quality) => (
									<button
										key={quality}
										onClick={() => setSelectedQuality(quality)}
										className={`px-4 py-2 text-sm rounded-lg transition-all ${selectedQuality === quality
											? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
											: 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
											}`}
									>
										{quality === 'highest' ? 'Best Quality' : quality}
									</button>
								))}
							</div>
						</div>
					)} */}

					<div className="relative group">
						<div className="absolute transition duration-1000 -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl opacity-20 blur group-hover:opacity-50"></div>
						<div className="relative p-1 bg-gray-100 shadow-xl dark:bg-gray-800 rounded-2xl duration-300 transition-all group-focus-within:bg-gray-400 dark:group-focus-within:bg-gray-600">
							<div className="flex flex-col items-center gap-2 p-2 sm:flex-row bg-gray-50 dark:bg-gray-900/80 rounded-xl">
								<input
									type="text"
									placeholder="Paste YouTube URL here"
									required
									value={videoUrl}
									disabled={isLoading}
									onKeyDown={(e) => {
										if (e.key === 'Enter') {
											handleDownload();
										}
									}}
									onChange={(e) => setVideoUrl(e.target.value)}
									className={`outline-none w-full px-6 py-4 text-gray-900 placeholder-gray-400 bg-transparent border-0 focus:ring-0 dark:text-white ${isLoading && 'opacity-50 cursor-not-allowed'}`}
								/>
								<button
									onClick={handleDownload}
									disabled={isLoading}
									className={`w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-lg transition-all transform hover:scale-[1.02] active:scale-95 ${isLoading && 'opacity-50 cursor-not-allowed'}`}
								>
									{isLoading ? 'Downloading...' : 'Download Now'}
								</button>
							</div>
						</div>
					</div>

					{/* Add video preview here */}
					{videoId && (
						<div className="mt-8 rounded-xl overflow-hidden shadow-lg">
							<YouTube
								videoId={videoId}
								opts={previewOptions}
								className="youtube-preview"
								iframeClassName="w-full"
							/>
							<div className="p-4 bg-white dark:bg-gray-800">
								<p className="text-gray-600 dark:text-gray-300 text-sm">
									{/* Available in {availableQualities.length} quality options */}
									Preview of the video to download
								</p>
							</div>
						</div>
					)}


					{/* Cards */}
					<div className="grid grid-cols-1 gap-8 mt-12 text-left sm:grid-cols-3">
						<div className="p-6 hover:scale-[1.02] transition-all bg-white shadow-sm dark:bg-gray-800 rounded-xl hover:shadow-md">
							<h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">
								High Quality
								<HighQualityIcon className="w-6 h-6 ml-2 text-gray-400" />
							</h3>
							<p className="text-gray-600 dark:text-gray-400">Download videos in up to 4K resolution</p>
						</div>
						<div className="p-6 bg-white hover:scale-[1.02] transition-all shadow-sm dark:bg-gray-800 rounded-xl hover:shadow-md">
							<h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">
								Fast Processing
								<BoltIcon className="w-6 h-6 ml-2 text-gray-400" />
							</h3>
							<p className="text-gray-600 dark:text-gray-400">Instant conversion with no delays</p>
						</div>
						<div className="p-6 hover:scale-[1.02] transition-all bg-white shadow-sm dark:bg-gray-800 rounded-xl hover:shadow-md">
							<h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">
								Secure
								<ShieldIcon className="w-6 h-6 ml-2 text-gray-400" />
							</h3>
							<p className="text-gray-600 dark:text-gray-400">No data storage or tracking</p>
						</div>
					</div>
				</div>
			</div>


			<Footer

			/>

		</main>
	);
}



interface NavbarProps {
	darkMode: boolean;
	toggleDarkMode: () => void;
}


export function Navbar({ darkMode,
	toggleDarkMode }: NavbarProps) {
	return (
		<>
			{/* Navbar */}
			<nav className="sticky top-0 z-50 border-b border-gray-200 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md dark:border-gray-800">
				<div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
					<div className="flex items-center h-16 justify-evenly">
						<div className="absolute hidden left-4 sm:block">
							{darkMode ? (
								<Link href="/">
									<Image
										src="/logo-dark.png"
										alt="GrabTube Logo"
										width={350}
										height={196}
										className="h-12 w-auto"
									/>
								</Link>

							) : (
								<Link href="/">
									<Image
										src="/logo-light.png"
										alt="GrabTube Logo"
										width={350}
										height={196}
										className="h-12 w-auto"
									/>
								</Link>
							)

							}
						</div>
						<div className="flex items-center justify-center flex-shrink-0 space-x-2">
							<Link href="/">
								<Image
									src="/logo-symbol.png"
									alt="GrabTube Logo"
									width={140}
									height={124}
									className="h-6 w-auto mr-4 sm:hidden"

								/>
							</Link>
							<span className="text-2xl font-bold text-transparent bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text">
								GrabTube
							</span>
							<span className="hidden text-sm font-medium text-gray-500 sm:block dark:text-gray-400">
								YouTube Video Downloader
							</span>
						</div>


						<button
							onClick={toggleDarkMode}
							className="p-2 transition-colors rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
						>
							{darkMode ? (
								<LightModeIcon className="w-6 h-6 text-gray-400" />
							) : (
								<DarkModeIcon className="w-6 h-6 text-gray-400" />
							)}
						</button>
					</div>
				</div>
			</nav>
		</>
	);
}



export function Footer() {
	return (
		<>
			{/* Footer */}
			<footer className="mt-24 border-t border-gray-200 dark:border-gray-800">
				<div className="px-4 py-8 mx-auto max-w-7xl sm:px-6 lg:px-8">
					<div className="md:flex md:items-center md:justify-between">
						<div className="flex justify-center space-x-6 md:order-2">
							<a
								href="https://github.com/lucasbrasantos/grabtube"
								target="_blank"
								rel="noopener noreferrer"
								className="flex items-center text-gray-600 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
							>
								<GitHubIcon className="w-6 h-6 mr-2" />
								<span className="font-medium">GitHub Repository</span>
							</a>
						</div>
						<div className="mt-8 md:mt-0 md:order-1">
							<div className="text-center text-gray-600 dark:text-gray-400">
								<p className="text-base">
									&copy; {new Date().getFullYear()} GrabTube. All rights reserved.
								</p>
								<div className="flex justify-center mt-2 space-x-4">
									<a href="/privacy-policy" className="transition-colors hover:text-gray-900 dark:hover:text-white">Privacy Policy</a>
									<a href="/terms-of-service" className="transition-colors hover:text-gray-900 dark:hover:text-white">Terms of Service</a>
									<a href="/contact" className="transition-colors hover:text-gray-900 dark:hover:text-white">Contact</a>
								</div>
								<p className="mt-4 text-sm">
									Made by{" "}
									<a
										href="https://github.com/lucasbrasantos"
										target="_blank"
										rel="noopener noreferrer"
										className="font-medium transition-colors hover:text-gray-900 dark:hover:text-white"
									>
										Lucas Braga Santos
									</a>
								</p>
							</div>
						</div>
					</div>
				</div>
			</footer>
		</>
	);
}

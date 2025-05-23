"use client";
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import { NEXT_PUBLIC_API_BASE_URL } from '@/lib/utils/stream';
import BoltIcon from '@mui/icons-material/Bolt';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import HighQualityIcon from '@mui/icons-material/HighQuality';
import ShieldIcon from '@mui/icons-material/Shield';
import LinearProgress from '@mui/material/LinearProgress';
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import YouTube from "react-youtube";

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
					},
				});
				return;
			}
			if (!videoId) {
				toast.error('Invalid YouTube URL', {
					icon: <ErrorOutlineIcon className="text-red-500" />,
					style: {
						background: darkMode ? '#1f2937' : '#fff',
						color: darkMode ? '#fff' : '#374151',
					},
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
				},
			});

			const response = await fetch(`${NEXT_PUBLIC_API_BASE_URL}/videos/download?url=${videoUrl}`, {
				method: 'GET',
			});

			if (!response.ok) throw new Error('Failed to start download');

			const reader = response.body?.getReader();
			if (!reader) throw new Error('Failed to initialize download stream');

			const contentLength = +(response.headers.get('Content-Length') || 0);
			let receivedLength = 0;
			const chunks: Uint8Array[] = [];

			while (true) {
				const { done, value } = await reader.read();
				if (done) break;

				chunks.push(value);
				receivedLength += value.length;
				setDownloadProgress(contentLength ? Math.round((receivedLength / contentLength) * 100) : 0);
			}

			const blob = new Blob(chunks.filter(Boolean) as BlobPart[], { type: 'video/mp4' });
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
				},
			});
		} catch (error) {
			const errorMessage = error instanceof Error ? error.message : 'Download failed';
			toast.error(errorMessage, {
				icon: <ErrorOutlineIcon className="text-red-500" />,
				style: {
					background: darkMode ? '#1f2937' : '#fff',
					color: darkMode ? '#fff' : '#374151',
				},
			});
		} finally {
			setIsLoading(false);
			setVideoUrl('');
			setDownloadProgress(0);
		}



	};

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


			<Footer />
		</main>
	);
}

"use client";
import { useEffect, useState } from "react";
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import HighQualityIcon from '@mui/icons-material/HighQuality';
import BoltIcon from '@mui/icons-material/Bolt';
import ShieldIcon from '@mui/icons-material/Shield';
import Image from "next/image";

export default function Home() {
    const [darkMode, setDarkMode] = useState(false);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
        if (
            localStorage.theme === "dark" ||
            (!("theme" in localStorage) &&
                window.matchMedia("(prefers-color-scheme: dark)").matches)
        ) {
            setDarkMode(true);
            document.documentElement.classList.add("dark");
        } else {
            setDarkMode(false);
            document.documentElement.classList.remove("dark");
        }
    }, []);

    const toggleDarkMode = () => {
        document.documentElement.classList.add("transition-colors");
        document.documentElement.classList.add("duration-300");
        if (darkMode) {
            document.documentElement.classList.remove("dark");
            localStorage.theme = "light";
        } else {
            document.documentElement.classList.add("dark");
            localStorage.theme = "dark";
        }
        setDarkMode(!darkMode);
    };

    if (!isMounted) return null;

    return (
        <main className="min-h-screen transition-colors duration-300 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-blue-900/20">
            {/* Navbar */}
            <nav className="sticky top-0 z-50 border-b border-gray-200 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md dark:border-gray-800">
                <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="flex items-center h-16 justify-evenly">
                        <div className="absolute hidden left-4 sm:block">
                            {darkMode ? (
                                <Image
                                    src="/logo-dark.png"
                                    alt="GrabTube Logo"
                                    width={350}
                                    height={196}
                                    className="h-12 w-auto"
                                />
                            ) : (
                                <Image
                                    src="/logo-light.png"
                                    alt="GrabTube Logo"
                                    width={350}
                                    height={196}
                                    className="h-12 w-auto"
                                />
                            )

                            }
                        </div>
                        <div className="flex items-center justify-center flex-shrink-0 space-x-2">
                            <Image
                                src="/logo-symbol.png"
                                alt="GrabTube Logo"
                                width={140}
                                height={124}
                                className="h-6 w-auto mr-4 sm:hidden"
                            />
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

            {/* Main Content */}
            <div className="px-4 py-16 mx-auto max-w-7xl sm:px-6 lg:px-8">
                <div className="max-w-3xl mx-auto text-center">
                    <h1 className="mb-6 text-4xl font-bold text-gray-900 sm:text-5xl dark:text-white">
                        Download <span className="text-transparent bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text">YouTube Videos</span> Instantly
                    </h1>
                    <p className="mb-12 text-lg text-gray-600 dark:text-gray-300">
                        Fast, secure, and free YouTube video downloader
                    </p>


                    <div className="relative group">
                        <div className="absolute transition duration-1000 -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl opacity-20 blur group-hover:opacity-50"></div>
                        <div className="relative p-1 bg-gray-100 shadow-xl dark:bg-gray-800 rounded-2xl duration-300 transition-all group-focus-within:bg-gray-400 dark:group-focus-within:bg-gray-600">
                            <div className="flex flex-col items-center gap-2 p-2 sm:flex-row bg-gray-50 dark:bg-gray-900/80 rounded-xl">
                                <input
                                    type="text"
                                    placeholder="Paste YouTube URL here"
                                    required
                                    className="outline-none w-full px-6 py-4 text-gray-900 placeholder-gray-400 bg-transparent border-0 focus:ring-0 dark:text-white"
                                />
                                <button className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-lg transition-all transform hover:scale-[1.02] active:scale-95">
                                    Download Now
                                </button>
                            </div>
                        </div>
                    </div>


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

            {/* Footer */}
            <footer className="mt-24 border-t border-gray-200 dark:border-gray-800">
                <div className="px-4 py-8 mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="text-center text-gray-600 dark:text-gray-400">
                        <p>&copy; {new Date().getFullYear()} GrabTube. All rights reserved.</p>
                        <div className="flex justify-center mt-2 space-x-4">
                            <a href="#" className="transition-colors hover:text-gray-900 dark:hover:text-white">Privacy Policy</a>
                            <a href="#" className="transition-colors hover:text-gray-900 dark:hover:text-white">Terms of Service</a>
                            <a href="#" className="transition-colors hover:text-gray-900 dark:hover:text-white">Contact</a>
                        </div>
                    </div>
                </div>
            </footer>
        </main>
    );
}
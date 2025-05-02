"use client";
import Link from 'next/link';
import Image from "next/image";
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';

interface NavbarProps {
    darkMode: boolean;
    toggleDarkMode: () => void;
}

export default function Navbar({ darkMode, toggleDarkMode }: NavbarProps) {
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
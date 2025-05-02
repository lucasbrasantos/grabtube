"use client";
import Link from 'next/link';
import GitHubIcon from '@mui/icons-material/GitHub';

export default function Footer() {
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
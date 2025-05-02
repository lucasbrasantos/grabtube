"use client";
import EmailIcon from '@mui/icons-material/Email';
import GitHubIcon from '@mui/icons-material/GitHub';
import IssueIcon from '@mui/icons-material/BugReport';
import Link from 'next/link';
import { useEffect, useState } from "react";
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';

export default function ContactPage() {
    const [darkMode, setDarkMode] = useState(false);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
        const savedTheme = localStorage.getItem("theme");
        const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

        if (savedTheme === "dark" || (!savedTheme && systemDark)) {
            setDarkMode(true);
            document.documentElement.classList.add("dark");
        }
    }, []);

    const toggleDarkMode = () => {
        document.documentElement.classList.add("transition-colors", "duration-300");
        const newDarkMode = !darkMode;
        setDarkMode(newDarkMode);
        localStorage.theme = newDarkMode ? "dark" : "light";
        document.documentElement.classList.toggle("dark", newDarkMode);
    };

    if (!isMounted) return null;

    return (
        <main className="min-h-screen transition-colors duration-300 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-blue-900/20">

            <Navbar
                darkMode={darkMode}
                toggleDarkMode={toggleDarkMode}
            />

            {/* Contact Content */}
            <div className="px-4 py-16 mx-auto max-w-7xl sm:px-6 lg:px-8">
                <div className="max-w-3xl mx-auto text-center">
                    <h1 className="mb-6 text-4xl font-bold text-gray-900 sm:text-5xl dark:text-white">
                        Get in <span className="text-transparent bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text">Touch</span>
                    </h1>

                    <div className="grid gap-8 mt-12 text-left md:grid-cols-2">
                        <div className="p-8 bg-white shadow-sm dark:bg-gray-800 rounded-2xl">
                            <EmailIcon className="w-12 h-12 mx-auto text-blue-600 dark:text-purple-500" />
                            <h2 className="mt-4 text-2xl font-semibold dark:text-white">Contact Information</h2>
                            <p className="mt-4 text-gray-600 dark:text-gray-300">
                                Have questions or suggestions? Reach out to us!
                            </p>
                            <div className="mt-6 space-y-4">
                                <p className="text-gray-600 dark:text-gray-400">
                                    <span className="font-medium">Email:</span> support@grabtube.com
                                </p>
                                <div className="flex flex-col items-center space-y-4">
                                    <Link
                                        href="https://github.com/lucasbrasantos/grabtube/issues"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center w-full px-6 py-3 transition-all border rounded-lg hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-700 text-gray-900 dark:text-white"
                                    >
                                        <IssueIcon className="w-6 h-6 mr-2 text-blue-600 dark:text-purple-500" />
                                        Report an Issue on GitHub
                                    </Link>
                                    <Link
                                        href="https://github.com/lucasbrasantos/grabtube"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center w-full px-6 py-3 text-white transition-all bg-gray-800 rounded-lg hover:bg-gray-700 dark:bg-gray-700 dark:hover:bg-gray-600"
                                    >
                                        <GitHubIcon className="w-6 h-6 mr-2" />
                                        GitHub Repository
                                    </Link>
                                </div>
                            </div>
                        </div>

                        <div className="p-8 bg-white shadow-sm dark:bg-gray-800 rounded-2xl">
                            <h2 className="text-2xl font-semibold dark:text-white">Send us a Message</h2>
                            <form className="mt-6 space-y-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Your Name</label>
                                    <input
                                        type="text"
                                        className="w-full px-4 py-3 mt-2 text-gray-900 bg-gray-100 rounded-lg dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Your Email</label>
                                    <input
                                        type="email"
                                        className="w-full px-4 py-3 mt-2 text-gray-900 bg-gray-100 rounded-lg dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Message</label>
                                    <textarea
                                        rows={4}
                                        className="w-full px-4 py-3 mt-2 text-gray-900 bg-gray-100 rounded-lg dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500"
                                    ></textarea>
                                </div>
                                <button
                                    type="submit"
                                    className="w-full px-6 py-4 font-semibold text-white transition-all bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg hover:from-blue-700 hover:to-purple-700"
                                >
                                    Send Message
                                </button>

                                <p className="text-sm text-center text-gray-500 dark:text-gray-400">
                                    Note: This contact form is for demonstration purposes.
                                    For actual support, please use the email or GitHub issues.
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />

        </main>
    );
}
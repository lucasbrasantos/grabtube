"use client";
import { useState, useEffect } from "react";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import Link from 'next/link';
import Image from "next/image";
import { Footer, Navbar } from "../page";

export default function TermsOfService() {
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

            <div className="px-4 py-16 mx-auto max-w-7xl sm:px-6 lg:px-8">
                <div className="max-w-3xl mx-auto">
                    <h1 className="text-4xl font-bold text-center text-gray-900 sm:text-5xl dark:text-white">
                        Terms of <span className="text-transparent bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text">Service</span>
                    </h1>

                    <div className="p-8 mt-12 bg-white shadow-sm dark:bg-gray-800 rounded-2xl">
                        <div className="flex items-center mb-8">
                            <CheckCircleOutlineIcon className="w-12 h-12 mr-4 text-blue-600 dark:text-purple-500" />
                            <h2 className="text-2xl font-semibold dark:text-white">Usage Terms</h2>
                        </div>

                        <div className="space-y-8 text-gray-600 dark:text-gray-300">
                            <section>
                                <h3 className="mb-4 text-xl font-semibold dark:text-white">1. Acceptance of Terms</h3>
                                <p>By using GrabTube, you agree to comply with YouTube's Terms of Service and all applicable laws.</p>
                            </section>

                            <section>
                                <h3 className="mb-4 text-xl font-semibold dark:text-white">2. Copyright</h3>
                                <p>You must have the right to download any content. We are not responsible for copyright violations.</p>
                            </section>

                            <section>
                                <h3 className="mb-4 text-xl font-semibold dark:text-white">3. Service Availability</h3>
                                <p>We reserve the right to modify or discontinue service at any time without notice.</p>
                            </section>

                            <section>
                                <h3 className="mb-4 text-xl font-semibold dark:text-white">4. User Responsibility</h3>
                                <p>Users are solely responsible for downloaded content and its usage.</p>
                            </section>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </main>
    );
}
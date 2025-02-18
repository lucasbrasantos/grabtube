
# GrabTube - YouTube Video Downloader

[![Next.js](https://img.shields.io/badge/Next.js-15.1.7-blue.svg)](https://nextjs.org/) [![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.1-blue.svg)](https://tailwindcss.com/) [![React](https://img.shields.io/badge/React-19.0.0-blue.svg)](https://reactjs.org/) [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE) [![Deploy on Vercel](https://vercel.com/button)](https://vercel.com/new?utm_source=grabtube&utm_campaign=oss)

GrabTube is a modern, fast, and secure YouTube video downloader built with [Next.js](https://nextjs.org), [React](https://reactjs.org), and [Tailwind CSS](https://tailwindcss.com). It lets users preview videos before download, provides a progress bar during download, and supports high-quality video downloads—all with a sleek and responsive UI.

![GrabTube Screenshot](/public/grabtube.png)

## ✨ Features

- 🎬 **Instant Video Preview** – See a mini-preview of the video as soon as you paste its URL.
- 🚀 **High-Speed Downloads** – Download videos in up to 4K quality.
- 🔒 **Secure Processing** – No data storage or tracking.
- 🌓 **Dark/Light Mode** – Seamless theme toggle.
- 📊 **Real-time Progress** – Visual feedback via a progress bar.
- 📱 **Responsive Design** – Fully optimized for all devices.

## 🛠️ Tech Stack

- **Frontend:** Next.js 15.1.7, React 19.0.0, Tailwind CSS 3.4.1
- **Backend:** Next.js API Routes
- **Utilities:** youtube-dl-exec, react-youtube, react-hot-toast
- **UI Components:** Material UI Icons

## 🚀 Getting Started

## 🚨 Important Requirement
**Python 3.7+ must be installed on your system** for the youtube-dl-exec package to work properly. The library will throw an error if Python is not available as `python3` in your PATH.

```bash
# Verify Python installation
python3 --version
```

### Prerequisites

- Node.js 18+  
- Python 3.7+ (system-wide installation)
- npm 9+ or yarn 1.22+  

### Installation

```bash
# 1. Clone repository
git clone https://github.com/lucasbrasantos/grabtube.git
cd grabtube

# 2. Install dependencies (requires Python 3.7+)
npm install

# 3. Start development server
npm run dev
```

**Important:** If you encounter installation errors:
1. Verify Python 3.7+ is installed
2. Ensure Python is in your system PATH
3. For deployment, see [Troubleshooting](#-troubleshooting)


## Usage

1. **Paste a URL:**  
   Enter a YouTube video URL into the input field.
2. **Preview the Video:**  
   A mini-preview player (integrated below the input) loads to let you confirm the video.
3. **Download:**  
   Click the **Download Now** button to start the download process.
4. **Progress Feedback:**  
   A progress bar displays the current download status in real time.

## Video Preview Feature

GrabTube features a built-in mini-player that loads the video preview as soon as you paste the URL. This ensures you’re downloading the correct content before proceeding. The preview is displayed between the input field and the feature cards.

*Tip:* Future improvements may include additional metadata or thumbnail overlays in the mini-player.

## Learn More

- [Next.js Documentation](https://nextjs.org/docs) – Explore Next.js features and API routes.
- [Tailwind CSS Documentation](https://tailwindcss.com/docs) – Learn about Tailwind’s utility-first approach.
- [youtube-dl-exec on NPM](https://www.npmjs.com/package/youtube-dl-exec) – Documentation for video downloading utilities.

Visit the [GrabTube GitHub Repository](https://github.com/yourusername/grabtube) for more details, issues, and contributions.

## 🌍 Deploy

GrabTube is optimized for deployment on [Vercel](https://vercel.com/new?utm_source=grabtube&utm_campaign=oss). Deploy your instance effortlessly and enjoy automatic scaling and performance optimizations.

## 🚑 Troubleshooting

### Common Errors
**Error: "Python executable not found"**
```bash
# Linux/macOS
sudo apt-get install python3

# Windows (via Microsoft Store)
Install Python 3.11+ from python.org
```

**Error during deployment**  
Add these build commands in Vercel:
```bash
Install Python 3.x
pip install yt-dlp
```

## 📜 License

Distributed under the MIT License. See [LICENSE](LICENSE) for more information.

---

Made by [Lucas Braga Santos](https://github.com/lucasbrasantos)

# **Louis Braidwood | Portfolio**

A strictly typed portfolio built with Next.js 15+ (App Router). Designed to demonstrate full-stack capabilities, serverless architecture, and modern component design patterns.

## **Key Features**

### **1\. Serverless API Integrations (Edge-Ready)**

Instead of relying on heavy client-side fetching or exposed API keys, this project uses **Next.js API Routes** to act as secure serverless proxies.

* **Last.fm Integration:** Fetches real-time "Now Playing" data via a robust server-side handler that sanitizes the response and handles image fallbacks for non-standard tracks.  
* **GitHub Activity:** Polling system that retrieves the latest PushEvent from the public GitHub API to display live commit history.  
* **Smart Caching:** Both endpoints implement Cache-Control headers and Next.js revalidate strategies to minimize API quota usage while keeping data fresh.

### **2\. Performance & Polish**

* **Glassmorphism:** implemented via a hybrid of Tailwind utilities and inline styles for cross-browser backdrop-filter support (fixing Safari/Webkit issues).  
* **Optimized Particles:** Uses tsparticles with fixed positioning to prevent layout trashing during scroll events.  
* **Strict TypeScript:** No any. All API responses and component props are strictly typed with interfaces (e.g., GitHubEvent, LastFmImage).

## **Tech Stack**

* **Framework:** Next.js 15 (App Router)  
* **Language:** TypeScript  
* **Styling:** Tailwind CSS + Framer Motion
* **Data Fetching:** SWR (Stale-While-Revalidate)  
* **Deployment:** Cloudflare Pages (Static export + Edge Functions)

## **Local Development**

1. **Clone the repository**  
   git clone [https://github.com/LouisDevelopment/react-portfolio.git\](https://github.com/LouisDevelopment/react-portfolio.git)

2. **Install dependencies**  
   npm install

3. Environment Setup  
   Create a .env.local file in the root directory:  
   \# Last.fm Integration  
   LASTFM_API_KEY=your_api_key  
   LASTFM_USERNAME=your_username

   \# GitHub Integration  
   GITHUB_USERNAME=your_username  
   GITHUB_TOKEN=your_personal_access_token # Optional, prevents rate limiting

4. **Start the dev server**  
   npm run dev

## **License**

This project is open source and available under the MIT License.  
*Built by Louis Braidwood. Deployed on Cloudflare Pages.*
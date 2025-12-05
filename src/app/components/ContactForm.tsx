'use client';

import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';

const Icons = {
    GitHub: () => (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" /></svg>
    ),
    LinkedIn: () => (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" /></svg>
    ),
    Mail: () => (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
    ),
    Send: () => (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>
    ),
    Check: () => (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
    )
};

export default function ContactForm() {
    const form = useRef<HTMLFormElement>(null);
    const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

    const sendEmail = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (status === 'sending') return;
        if (!form.current) return;

        try {
            setStatus('sending');
            await emailjs.sendForm(
                process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
                process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
                form.current,
                { publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY! }
            );
            setStatus('success');
            form.current.reset();
            setTimeout(() => setStatus('idle'), 5000);
        } catch (error) {
            console.error('Email failed:', error);
            setStatus('error');
        }
    };

    return (
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">

            <div className="lg:w-1/3 flex flex-col justify-between">
                <div>
                    <h3 className="text-2xl font-bold text-white mb-4">Let's Connect</h3>
                    <p className="text-slate-400 leading-relaxed mb-8">
                        I'm always open to connecting with like-minded people in the field!
                        Whether you have a question or just want to say hi, I'll try my best to get back to you!
                    </p>

                    <div className="flex flex-col gap-4">
                        <a href="mailto:louis@teamvertex.co.uk" className="flex items-center gap-3 text-slate-300 hover:text-indigo-400 transition-colors group">
                            <div className="p-2 bg-slate-800 rounded-lg group-hover:bg-slate-700 transition-colors border border-slate-700">
                                <Icons.Mail />
                            </div>
                            <span className="text-sm font-medium">louis@teamvertex.co.uk</span>
                        </a>
                        <a href="https://github.com/LouisDevelopment" target="_blank" rel="noreferrer" className="flex items-center gap-3 text-slate-300 hover:text-indigo-400 transition-colors group">
                            <div className="p-2 bg-slate-800 rounded-lg group-hover:bg-slate-700 transition-colors border border-slate-700">
                                <Icons.GitHub />
                            </div>
                            <span className="text-sm font-medium">Follow on GitHub</span>
                        </a>
                        <a href="https://www.linkedin.com/in/louis-braidwood-3ba680195/" target="_blank" rel="noreferrer" className="flex items-center gap-3 text-slate-300 hover:text-indigo-400 transition-colors group">
                            <div className="p-2 bg-slate-800 rounded-lg group-hover:bg-slate-700 transition-colors border border-slate-700">
                                <Icons.LinkedIn />
                            </div>
                            <span className="text-sm font-medium">Connect on LinkedIn</span>
                        </a>
                    </div>
                </div>
            </div>

            {/* --- RIGHT SIDE: The Form --- */}
            <div className="lg:w-2/3">
                <form ref={form} onSubmit={sendEmail} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Name */}
                        <div className="relative group">
                            <input
                                type="text"
                                name="user_name"
                                required
                                disabled={status === 'sending'}
                                placeholder="Name"
                                className="w-full bg-slate-900/50 rounded-xl border border-slate-700 py-4 px-6 text-slate-200 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all placeholder:text-slate-500 disabled:opacity-50"
                            />
                        </div>

                        {/* Email */}
                        <div className="relative group">
                            <input
                                type="email"
                                name="user_email"
                                required
                                disabled={status === 'sending'}
                                placeholder="Email"
                                className="w-full bg-slate-900/50 rounded-xl border border-slate-700 py-4 px-6 text-slate-200 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all placeholder:text-slate-500 disabled:opacity-50"
                            />
                        </div>
                    </div>

                    {/* Message */}
                    <div className="relative group">
                        <textarea
                            name="message"
                            required
                            disabled={status === 'sending'}
                            placeholder="Message"
                            className="w-full h-40 bg-slate-900/50 rounded-xl border border-slate-700 py-4 px-6 text-slate-200 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all placeholder:text-slate-500 resize-none disabled:opacity-50"
                        />
                    </div>

                    {/* Submit Button */}
                    <div className="flex items-center justify-between">
                        {/* Status Message (Left aligned) */}
                        <div className="flex-1">
                            {status === 'error' && (
                                <p className="text-red-400 text-sm flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-red-400"></span>
                                    Something went wrong.
                                </p>
                            )}
                            {status === 'success' && (
                                <p className="text-green-400 text-sm flex items-center gap-2 animate-pulse">
                                    <Icons.Check />
                                    Message received!
                                </p>
                            )}
                        </div>

                        {/* Button (Right aligned) */}
                        <button
                            type="submit"
                            disabled={status === 'sending' || status === 'success'}
                            className={`
                                flex items-center gap-2 py-3 px-8 rounded-full font-semibold text-white transition-all transform hover:-translate-y-0.5
                                ${status === 'success'
                                ? 'bg-green-600 hover:bg-green-600 cursor-default'
                                : 'bg-indigo-600 hover:bg-indigo-500 hover:shadow-lg hover:shadow-indigo-500/25 active:scale-95'
                            }
                                ${status === 'sending' ? 'opacity-70 cursor-wait' : ''}
                            `}
                        >
                            {status === 'idle' && (
                                <>
                                    Send Message <Icons.Send />
                                </>
                            )}
                            {status === 'sending' && 'Sending...'}
                            {status === 'success' && 'Sent'}
                            {status === 'error' && 'Retry'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
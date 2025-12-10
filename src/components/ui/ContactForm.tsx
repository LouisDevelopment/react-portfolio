'use client';

import React, { useRef, useState } from 'react';
import {FaCheck, FaGithub, FaLinkedinIn, FaEnvelope} from "react-icons/fa";
import {MdSend} from "react-icons/md"
import emailjs from '@emailjs/browser';

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
                    <h3 className="text-2xl font-bold text-white mb-4">Let&#39;s Connect</h3>
                    <p className="text-slate-400 leading-relaxed mb-8">
                        I&#39;m always open to connecting with like-minded people in the field!
                        Whether you have a question or just want to say hi, I&#39;ll try my best to get back to you!
                    </p>

                    <div className="flex flex-row md:flex-col gap-4">
                        <a href="mailto:louis@teamvertex.co.uk" className="flex items-center gap-3 text-slate-300 hover:text-indigo-400 transition-colors group">
                            <div className="p-2 bg-slate-800 rounded-lg group-hover:bg-slate-700 transition-colors border border-slate-700">
                                <FaEnvelope/>
                            </div>
                            <span className="hidden md:flex text-sm font-medium">louis@teamvertex.co.uk</span>
                        </a>
                        <a href="https://github.com/LouisDevelopment" target="_blank" rel="noreferrer" className="flex items-center gap-3 text-slate-300 hover:text-indigo-400 transition-colors group">
                            <div className="p-2 bg-slate-800 rounded-lg group-hover:bg-slate-700 transition-colors border border-slate-700">
                                <FaGithub />
                            </div>
                            <span className="hidden md:flex text-sm font-medium">Follow on GitHub</span>
                        </a>
                        <a href="https://www.linkedin.com/in/louis-braidwood-3ba680195/" target="_blank" rel="noreferrer" className="flex items-center gap-3 text-slate-300 hover:text-indigo-400 transition-colors group">
                            <div className="p-2 bg-slate-800 rounded-lg group-hover:bg-slate-700 transition-colors border border-slate-700">
                                <FaLinkedinIn />
                            </div>
                            <span className="hidden md:flex text-sm font-medium">Connect on LinkedIn</span>
                        </a>
                    </div>
                </div>
            </div>

            <div className="lg:w-2/3">
                <form ref={form} onSubmit={sendEmail} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

                    <div className="relative group">
                        <textarea
                            name="message"
                            required
                            disabled={status === 'sending'}
                            placeholder="Message"
                            className="w-full h-40 bg-slate-900/50 rounded-xl border border-slate-700 py-4 px-6 text-slate-200 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all placeholder:text-slate-500 resize-none disabled:opacity-50"
                        />
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="flex-1">
                            {status === 'error' && (
                                <p className="text-red-400 text-sm flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-red-400"></span>
                                    Something went wrong.
                                </p>
                            )}
                            {status === 'success' && (
                                <p className="text-green-400 text-sm flex items-center gap-2 animate-pulse">
                                    <FaCheck />
                                    Message received!
                                </p>
                            )}
                        </div>

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
                                    Send Message <MdSend />
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
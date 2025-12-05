'use client';

import React, { useRef, useState } from 'react';
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
        <div className="mx-auto md:max-w-[650em]">
            <form ref={form} onSubmit={sendEmail}>
                <div className="-mx-3 flex flex-wrap">
                    <div className="w-full px-3 sm:w-1/2">
                        <div className="mb-5">
                            <input
                                type="text"
                                name="user_name"
                                required
                                disabled={status === 'sending'}
                                placeholder="Name"
                                className="w-full bg-slate-600 rounded-md border-2 border-indigo-300 py-3 px-6 text-base font-medium text-slate-300 outline-none focus:border-indigo-500 focus:shadow-md disabled:opacity-50"
                            />
                        </div>
                    </div>

                    <div className="w-full px-3 sm:w-1/2">
                        <div className="mb-5">
                            <input
                                type="email"
                                name="user_email"
                                required
                                disabled={status === 'sending'}
                                placeholder="Email"
                                className="w-full bg-slate-600 rounded-md border-2 border-indigo-300 py-3 px-6 text-base font-medium text-slate-300 outline-none focus:border-indigo-500 focus:shadow-md disabled:opacity-50"
                            />
                        </div>
                    </div>

                    <div className="w-full px-3">
            <textarea
                name="message"
                required
                disabled={status === 'sending'}
                placeholder="Message"
                className="w-full h-32 bg-slate-600 rounded-md border-2 border-indigo-300 py-3 px-6 text-base font-medium text-slate-300 outline-none focus:border-indigo-500 focus:shadow-md resize-none disabled:opacity-50"
            />
                    </div>
                </div>

                <div className="mt-4 flex items-center gap-4">
                    <button
                        type="submit"
                        disabled={status === 'sending' || status === 'success'}
                        className={`hover:shadow-form rounded-full py-3 px-8 text-center text-base font-semibold text-white outline-none transition-all
              ${status === 'success' ? 'bg-green-500' : 'bg-indigo-500 hover:bg-indigo-400'}
              ${status === 'sending' ? 'opacity-70 cursor-wait' : ''}
            `}
                    >
                        {status === 'idle' && 'Submit'}
                        {status === 'sending' && 'Sending...'}
                        {status === 'success' && 'Sent!'}
                        {status === 'error' && 'Retry'}
                    </button>

                    {status === 'error' && (
                        <p className="text-red-400 text-sm">
                            Something went wrong. Please try again.
                        </p>
                    )}
                    {status === 'success' && (
                        <p className="text-green-400 text-sm animate-pulse">
                            Message received. Thanks!
                        </p>
                    )}
                </div>
            </form>
        </div>
    );
}
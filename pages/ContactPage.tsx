
import React, { useState } from 'react';
import { Button } from '../components/Button';
import { MailIcon, LocationMarkerIcon } from '../components/Icons';

export const ContactPage: React.FC = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const { name, email, subject, message } = formData;
        
        const mailtoBody = `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`;
        const mailtoLink = `mailto:brandon@4twenty.dev?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(mailtoBody)}`;
        
        window.location.href = mailtoLink;

        alert("We're opening your email client so you can send this masterpiece. Try not to mess it up.");

        // Reset form
        setFormData({ name: '', email: '', subject: '', message: '' });
    };

    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="text-center mb-12">
                <h1 className="text-5xl font-anton text-white">GET IN TOUCH</h1>
                <p className="mt-4 text-lg text-gray-400 max-w-2xl mx-auto">
                    Got a complaint, a half-baked idea, or just want to tell us off? We're all ears. Probably.
                </p>
            </div>

            <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
                {/* Contact Info */}
                <div className="bg-gray-800 p-8 rounded-lg border border-gray-700">
                    <h2 className="text-3xl font-anton text-white mb-6">Our Info</h2>
                    <p className="text-gray-400 mb-8">
                        Find us at our highly legitimate business headquarters. Or, you know, just email us. It's easier for everyone.
                    </p>
                    <div className="space-y-6">
                        <div className="flex items-start">
                            <MailIcon className="w-6 h-6 text-indigo-400 mt-1 mr-4 flex-shrink-0" />
                            <div>
                                <h3 className="font-semibold text-white">Email</h3>
                                <p className="text-gray-400">complaints@shopmarlows.com</p>
                                <a href="mailto:complaints@shopmarlows.com" className="text-indigo-400 hover:text-indigo-300 transition-colors text-sm">Send an email</a>
                            </div>
                        </div>
                        <div className="flex items-start">
                            <LocationMarkerIcon className="w-6 h-6 text-indigo-400 mt-1 mr-4 flex-shrink-0" />
                            <div>
                                <h3 className="font-semibold text-white">Address</h3>
                                <p className="text-gray-400">The Abyss, 666 Circle of Hell</p>
                                <p className="text-gray-500 text-sm">Visits by appointment only (we will not make an appointment).</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Contact Form */}
                <div className="bg-gray-800 p-8 rounded-lg border border-gray-700">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-300">Full Name</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                required
                                className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 text-white placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                placeholder="John Doe"
                            />
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-300">Email Address</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                required
                                className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 text-white placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                placeholder="you@example.com"
                            />
                        </div>
                        <div>
                            <label htmlFor="subject" className="block text-sm font-medium text-gray-300">Subject</label>
                            <input
                                type="text"
                                id="subject"
                                name="subject"
                                value={formData.subject}
                                onChange={handleInputChange}
                                required
                                className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 text-white placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                placeholder="My Brilliant Complaint"
                            />
                        </div>
                        <div>
                            <label htmlFor="message" className="block text-sm font-medium text-gray-300">Message</label>
                            <textarea
                                id="message"
                                name="message"
                                rows={4}
                                value={formData.message}
                                onChange={handleInputChange}
                                required
                                className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 text-white placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                placeholder="I am writing to express my profound disappointment..."
                            />
                        </div>
                        <div>
                            <Button type="submit" className="w-full">Fire Away</Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

'use client';
import React, { useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

const FAQ = () => {
    const [openIndex, setOpenIndex] = useState(null);

    const faqs = [
        {
            question: 'What is this app for?',
            answer: 'This app helps users track their portfolios, including holdings, watchlists, and available funds.'
        },
        {
            question: 'How do I add a stock to my watchlist?',
            answer: 'You can search for a stock on the watchlist page and add it directly to your list.'
        },
        {
            question: 'How can I contact customer support?',
            answer: 'You can reach out to our support team via the "Customer Support" option in the user dropdown.'
        }
    ];

    const toggleFAQ = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div className="bg-base-100 p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4 text-gray-200">Frequently Asked Questions</h2>
            {faqs.map((faq, index) => (
                <div key={index} className="border-b border-gray-600 py-4">
                    <div
                        className="flex justify-between items-center cursor-pointer"
                        onClick={() => toggleFAQ(index)}
                    >
                        <h3 className="text-lg font-semibold text-gray-200">{faq.question}</h3>
                        <span className={`transform transition-transform ${openIndex === index ? 'rotate-180' : ''}`}>
                            ▼
                        </span>
                    </div>
                    {openIndex === index && (
                        <p className="mt-2 text-gray-300">{faq.answer}</p>
                    )}
                </div>
            ))}
        </div>
    );
};

export default FAQ;

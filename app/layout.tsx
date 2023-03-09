'use client';
import '@/styles/globals.css';
import React from 'react';
import { useState } from 'react';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('質問を入力してください');
  const [isLoading, setIsLoading] = useState(false);

  const getApi = async (q: string) => {
    const res = await fetch(`http://localhost:3000/api/hello?q=${q}`, {
      cache: 'no-store',
    });
    if (!res.ok) {
      throw new Error('Failed to fetch data');
    }
    const data = await res.json();
    return data;
  };
  const onClickSubmit = async () => {
    setQuestion('');
    setIsLoading(true);
    const res = await getApi(question);
    setIsLoading(false);
    setAnswer(res.answer);
  };
  return (
    <html>
      <head>
        <title>Next.js Turbopack App Directory Playground</title>
      </head>
      <body className="flex justify-center overflow-y-scroll bg-zinc-900">
        <div className="w-4/5 text-white">
          <div>{isLoading ? 'Loading...' : answer}</div>
        </div>
        <div className="fixed bottom-24 flex w-full justify-center">
          <div className="relative w-4/5 text-gray-600">
            <input
              type="search"
              name="search"
              placeholder="Search"
              className="h-14 w-full rounded-md bg-white px-5 pr-10 text-sm focus:outline-none"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
            />
            <button
              onClick={onClickSubmit}
              type="submit"
              className="absolute right-0 top-0 mt-3 mr-4"
            >
              <span role="img" aria-label="search">
                🔍
              </span>
            </button>
          </div>
        </div>
      </body>
    </html>
  );
}

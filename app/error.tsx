// error.tsx (Client Component)

'use client'; // Menyatakan bahwa ini adalah Client Component

import { useRouter } from 'next/navigation';

export default function ErrorPage({ error, reset }: { error: Error, reset: () => void }) {
    const router = useRouter();

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-800">
            <div className="max-w-lg w-full p-8 bg-white shadow-lg rounded-lg">
                <h1 className="text-4xl font-semibold text-red-600 mb-4">Something went wrong!</h1>
                <p className="text-lg text-gray-600 mb-6">{error.message}</p>
                <div className="flex gap-4">
                    <button
                        onClick={() => router.push('/')}
                        className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none"
                    >
                        Go to Home
                    </button>
                    <button
                        onClick={() => reset()}
                        className="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 focus:outline-none"
                    >
                        Try Again
                    </button>
                </div>
            </div>
        </div>
    );
}

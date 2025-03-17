import Link from 'next/link';

export default function Home() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <div className="flex space-x-4">
                <Link href="/get-server-side">
                    <button
                        className="px-6 py-3 border border-gray-200 text-gray-200 rounded-lg shadow-lg hover:text-black hover:bg-gray-200 transition-all duration-200 cursor-pointer">
                        Get Server Side
                    </button>
                </Link>
                <Link href="/get-static">
                    <button
                        className="px-6 py-3 border border-gray-200 text-gray-200 rounded-lg shadow-lg hover:text-black hover:bg-gray-200 transition-all duration-200 cursor-pointer">
                        Get Static
                    </button>
                </Link>
            </div>
        </div>
    );
}
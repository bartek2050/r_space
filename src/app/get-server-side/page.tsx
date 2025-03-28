"use client";
import {useEffect, useState} from "react";
import Link from "next/link";
import {API_URL} from "@/constant/api";

export default function GetServerSidePage() {
    const [creators, setCreators] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const fetchCreators = async () => {
            try {
                setLoading(true);
                const response = await fetch(`${API_URL}/creator/names`);
                if (!response.ok) {
                    setError(new Error(`Could not fetch creators: ${response.statusText}`));
                    return;
                }
                const data = await response.json();
                setCreators(data);
            } catch (error) {
                setError(error as Error);
            } finally {
                setLoading(false);
            }
        }
        fetchCreators();
    }, []);

    return (
        <div>
            <p className="text-gray-200 text-center font-bold uppercase p-4">Get Server Side</p>
            {loading && <p>Loading...</p>}
            {error && <p>Error: {error.message}</p>}
            <div className="grid grid-cols-3 gap-4">
                {creators.map((creator: string) => (
                    <Link href={`/get-server-side/${creator}`} key={creator}
                          className="hover:underline">{creator}</Link>
                ))}
            </div>
        </div>
    );
}
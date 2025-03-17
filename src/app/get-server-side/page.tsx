"use client";
import {useEffect, useState} from "react";

export default function GetServerSide() {
    const [creators, setCreators] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const fetchCreators = async () => {
            try {
                setLoading(true);
                const response = await fetch("https://api.refspace.com/fan/creator/names");
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
            <p className="text-gray-200">Get Server Side</p>
            {loading && <p>Loading...</p>}
            {error && <p>Error: {error.message}</p>}
            <div className="grid grid-cols-3 gap-4">
                {creators.map((creator: string) => (
                    <p key={creator}>{creator}</p>
                ))}
            </div>
        </div>
    );
}
"use client";

import {use, useEffect, useState} from "react";
import type {CreatorDetailsWithVideosDTO} from "@/api-models/creatorDetailsWithVideosDTO";
import type {CreatorDetailsDTO} from "@/api-models/creatorDetailsDTO";
import Image from "next/image";
import Subtitle from "@/app/components/Subtitle";
import VideoItem from "@/app/components/VideoItem";
import ProductItem from "@/app/components/ProductItem";
import CreatorImage from "@/app/components/CreatorImage";

export default function GetServerSideUser({params}: { params: Promise<{ userName: string }> }) {
    const resolvedParams = use(params);
    const [user, setUser] = useState<CreatorDetailsWithVideosDTO>({
        videos: [],
        products: [],
        creator: {} as CreatorDetailsDTO
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const fetchCreators = async () => {
            try {
                setLoading(true);
                const response = await fetch(`https://api.refspace.com/fan/creatorByName/${resolvedParams.userName}/details`);
                if (!response.ok) {
                    setError(new Error(`Could not fetch creators: ${response.statusText}`));
                    return;
                }
                const data = await response.json();
                setUser(data);
            } catch (error) {
                setError(error as Error);
            } finally {
                setLoading(false);
            }
        };

        fetchCreators();
    }, [resolvedParams.userName]);

    return (
        <>
            {loading && <p>Loading...</p>}
            {error && <p>Error: {error.message}</p>}
            <div className="flex flex-col items-center mt-8 gap-12">
                <section>
                    <Subtitle text="About creator"/>
                    <div className="flex flex-col items-center">
                        <CreatorImage name={user.creator.name} photoUrl={user.creator.profilePhotos?.[0]?.photoUrl}/>
                        {user.creator.name && <p className="font-bold text-xl">{user.creator.name}</p>}
                    </div>
                </section>

                <section>
                    <Subtitle text="Products"/>
                    <div>
                        {user.products.slice(0, 3).map((product) => (
                            <ProductItem key={product.productId} product={product}/>
                        ))}
                    </div>
                </section>

                <section>
                    <Subtitle text="Videos"/>
                    <div>
                        {user.videos.slice(0, 3).map((video) => (
                            <VideoItem key={video.id} video={video}/>
                        ))}
                    </div>
                </section>
            </div>
        </>
    );
}


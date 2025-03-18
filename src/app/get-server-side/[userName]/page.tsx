"use client";

import {use, useEffect, useState} from "react";
import type {CreatorDetailsWithVideosDTO} from "@/api-models/creatorDetailsWithVideosDTO";
import type {CreatorDetailsDTO} from "@/api-models/creatorDetailsDTO";
import Image from "next/image";
import Subtitle from "@/app/components/Subtitle";

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
        }

        fetchCreators();
    }, []);

    return (
        <>
            {loading && <p>Loading...</p>}
            {error && <p>Error: {error.message}</p>}
            <div className="flex flex-col items-center mt-8 gap-12">
                <div>
                    <Subtitle text="About creator"/>
                    <div className="flex flex-col items-center">
                        {user.creator.profilePhotos?.[0]?.photoUrl ? (
                            <Image src={user.creator.profilePhotos?.[0]?.photoUrl}
                                   alt={user.creator.name || "Creator Image"}
                                   width={100} height={100}
                                   priority className="rounded-full"/>
                        ) : (
                            <p>Brak zdjęcia</p>
                        )}
                        {user.creator.name && <p className="font-bold text-xl">{user.creator.name}</p>}
                    </div>
                </div>
                <div>
                    <Subtitle text="Products"/>
                    <div>
                        {user.products.slice(0, 3).map((product) => (
                            <div key={product.productId} className="grid grid-cols-3  place-items-center py-4">
                                {product.productName}
                                {product.thumbnails?.[0]?.photoUrl && (
                                    <Image src={product.thumbnails?.[0]?.photoUrl}
                                           alt={product.productName || "Product Image"}
                                           width={100} height={100}
                                           priority className="rounded-full"/>
                                )}
                                <div>{product.price.map((price) => (
                                    <div key={price.currency}>
                                        {price.price} {price.currency}
                                    </div>
                                ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div>
                    <Subtitle text="Videos"/>
                    <div>
                        {user.videos.slice(0, 3).map((video) => (
                            <div key={video.id} className="grid grid-cols-2  place-items-center py-4">
                                {video.videoTitle}
                                {video.thumbnails?.[0]?.photoUrl && (
                                    <Image src={video.thumbnails?.[0]?.photoUrl}
                                           alt={video.videoTitle || "Video Image"}
                                           width={100} height={100}
                                           priority className="rounded-full"/>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}
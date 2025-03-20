"use client";

import {use, useEffect, useState} from "react";
import type {CreatorDetailsWithVideosDTO} from "@/api-models/creatorDetailsWithVideosDTO";
import type {CreatorDetailsDTO} from "@/api-models/creatorDetailsDTO";
import Subtitle from "@/app/components/Subtitle";
import VideoItem from "@/app/components/VideoItem";
import ProductItem from "@/app/components/ProductItem";
import CreatorImage from "@/app/components/CreatorImage";
import Form from "@/app/components/server-side/Form";
import {API_URL} from "@/constant/api";

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
                const response = await fetch(`${API_URL}/creatorByName/${resolvedParams.userName}/details`);
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
    }, []);

    return (
        <>
            {loading && <p>Loading...</p>}
            {error && <p>Error: {error.message}</p>}
            <div className="flex flex-col items-center my-8 gap-16">
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
                        {user.products?.length === 0 && <p>Brak produktów</p>}
                        {user.products?.slice(0, 3).map((product) => (
                            <ProductItem key={product.productId} product={product}/>
                        ))}
                    </div>
                </section>

                <section>
                    <Subtitle text="Videos"/>
                    <div>
                        {user.videos?.length === 0 && <p>Brak video</p>}
                        {user.videos?.slice(0, 3).map((video) => (
                            <VideoItem key={video.id} video={video}/>
                        ))}
                    </div>
                </section>

                <section>
                    <Subtitle text="Form"/>
                    <Form/>
                </section>
            </div>
        </>
    );
}


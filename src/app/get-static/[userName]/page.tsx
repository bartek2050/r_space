import {notFound} from 'next/navigation';
import type {CreatorDetailsWithVideosDTO} from "@/api-models/creatorDetailsWithVideosDTO";
import Subtitle from "@/app/components/Subtitle";
import VideoItem from "@/app/components/VideoItem";
import ProductItem from "@/app/components/ProductItem";
import CreatorImage from "@/app/components/CreatorImage";
import Form from "@/app/components/static/Form";
import {API_URL} from "@/constant/api";

async function getCreatorData(userName: string): Promise<CreatorDetailsWithVideosDTO> {
    const response = await fetch(`${API_URL}/creatorByName/${userName}/details`, {
        next: {revalidate: 3600}
    });

    if (!response.ok) {
        throw new Error(`Could not fetch creator details: ${response.statusText}`);
    }

    return response.json();
}

export async function generateStaticParams() {
    try {
        const response = await fetch(`${API_URL}/creators`);

        if (!response.ok) {
            console.error(`Failed with status: ${response.status} ${response.statusText}`);
            return [];
        }

        const creators = await response.json();

        return creators.map((creator: { name: string }) => ({
            userName: creator.name,
        }));
    } catch (error) {
        console.error('Error generating static params:', error);
        return [];
    }
}

export default async function GetStaticUser({params}: { params: { userName: string } }) {
    try {
        const resolvedParams = await params;
        const user = await getCreatorData(resolvedParams.userName);

        return (
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
                        {user.products?.length === 0 && <p>Brak produktów</p>}
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
        );
    } catch {
        return notFound();
    }
}
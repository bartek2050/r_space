import Image from "next/image";
import type {VideoRecommendationDTO} from "@/api-models/videoRecommendationDTO";

export default function VideoItem({video}: { video: VideoRecommendationDTO }) {
    return (
        <div className="grid grid-cols-2 place-items-center py-4">
            {video.videoTitle}
            {video.thumbnails?.[0]?.photoUrl && (
                <Image
                    src={video.thumbnails?.[0]?.photoUrl}
                    alt={video.videoTitle || "Video Image"}
                    width={100} height={100}
                    priority className="rounded-full"
                />
            )}
        </div>
    );
}
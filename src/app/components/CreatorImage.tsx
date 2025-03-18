import Image from "next/image";

export default function CreatorImage({name, photoUrl}: { name?: string; photoUrl?: string }) {
    return (
        photoUrl ? (
            <Image
                src={photoUrl}
                alt={name || "Creator Image"}
                width={100} height={100}
                priority className="rounded-full"
            />
        ) : (
            <p>Brak zdjęcia</p>
        )
    );
}
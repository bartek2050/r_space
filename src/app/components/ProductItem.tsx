import Image from "next/image";
import type {CreatorProductRecomendationDTO} from "@/api-models/creatorProductRecomendationDTO";
import type {PriceDTO} from "@/api-models/priceDTO";

export default function ProductItem({product}: { product: CreatorProductRecomendationDTO }) {
    return (
        <div className="grid grid-cols-3 place-items-center mb-1 p-4 bg-green-200/10 rounded-sm">
            {product.productName}
            {product.thumbnails?.[0]?.photoUrl && (
                <Image
                    src={product.thumbnails?.[0]?.photoUrl}
                    alt={product.productName || "Product Image"}
                    width={100}
                    height={200}
                    priority className="rounded-full w-auto h-auto"
                />
            )}
            <div>
                {product.price.map((price: PriceDTO) => (
                    <div key={price.currency}>
                        {price.price} {price.currency}
                    </div>
                ))}
            </div>
        </div>
    );
}
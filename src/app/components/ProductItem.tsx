import Image from "next/image";
import type {CreatorProductRecomendationDTO} from "@/api-models/creatorProductRecomendationDTO";
import type {PriceDTO} from "@/api-models/priceDTO";

export default function ProductItem({product}: { product: CreatorProductRecomendationDTO }) {
    return (
        <div className="grid grid-cols-3 place-items-center py-4">
            {product.productName}
            {product.thumbnails?.[0]?.photoUrl && (
                <Image
                    src={product.thumbnails?.[0]?.photoUrl}
                    alt={product.productName || "Product Image"}
                    width={100} height={100}
                    priority className="rounded-full"
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
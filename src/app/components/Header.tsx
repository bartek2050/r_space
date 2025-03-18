import Image from "next/image";
import Link from "next/link";
import logo from "../../../public/logo-seo.webp";

export function Header() {
    return (
        <div className="flex flex-col items-center">
            <Link href="/">
                <Image src={logo} alt={"logo"} width={200} placeholder="blur"/>
            </Link>
        </div>
    );
}
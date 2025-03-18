import Image from "next/image";
import Link from "next/link";
import logo from "../../../public/logo-seo.webp";

export function Header() {
    return (
        <div className="flex flex-col items-left p-4 absolute top-0 left-0">
            <Link href="/">
                <Image src={logo} alt={"logo"} width={200} placeholder="blur"/>
            </Link>
        </div>
    );
}
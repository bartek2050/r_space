import type {Metadata} from "next";
import {Geist_Mono} from "next/font/google";
import "./globals.css";
import {ReactNode} from "react";

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
    weight: "300"
});

export const metadata: Metadata = {
    title: "RefSpace",
    description: "Recruitment task",
};

export default function RootLayout({children}: { children: ReactNode }) {
    return (
        <html lang="pl">
        <body className={`${geistMono.variable} antialiased min-h-screen bg-main text-gray-200 px-8`}>
        {children}
        </body>
        </html>
    );
}

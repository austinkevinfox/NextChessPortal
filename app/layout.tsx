import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import "@radix-ui/themes/styles.css";
import { Flex, Theme } from "@radix-ui/themes";
import NavBar from "./NavBar";

const geistSans = localFont({
    src: "./fonts/GeistVF.woff",
    variable: "--font-geist-sans",
    weight: "100 900",
});
const geistMono = localFont({
    src: "./fonts/GeistMonoVF.woff",
    variable: "--font-geist-mono",
    weight: "100 900",
});

export const metadata: Metadata = {
    title: "CryptoChess",
    description:
        "A chess app integrated with cryptocurrencies.  Built with Next.js.   Work in progress...",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased h-dvh`}
            >
                <Theme className="h-full">
                    <NavBar />
                    {children}
                </Theme>
            </body>
        </html>
    );
}

import "./globals.css";
import { ReactNode } from "react";
import { Footer } from "@/widgets/footer";
import { Navbar } from "@/widgets/navbar";
import { BackToTop } from "@/features/back-to-top";
import { inter } from "@/shared";
import { Providers } from "./providers";

export default function RootLayout({
    children,
}: Readonly<{
    children: ReactNode;
}>) {
    return (
        <html lang="ru">
            <body className={inter.className}>
                <Providers>
                    <BackToTop />
                    <Navbar />
                    {children}
                    <Footer />
                </Providers>
            </body>
        </html>
    );
}

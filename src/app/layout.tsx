import "./globals.css";
import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import { FixedPlugin, Layout } from "@/components";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Providers } from "@/components/providers";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Organisation Nations pour Jésus",
  description:
    "..Faites de Toutes Les Nations des Disciples! Tel est L'Ultime Mot d'Ordre DU SEIGNEUR JÉSUS à SES Envoyés. Notre But est de L'Accomplir!",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.1/css/all.min.css"
          integrity="sha512-MV7K8+y+gLIBoVD59lQIYicR65iaqukzvf/nwasF0nqhPay5w/9lJmVM2hMDcnK1OnMGCdVK+iQrJ7lzPJQd1w=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
        <link rel="shortcut icon" href="/logos/logo.jpg" type="image/jpg" />
      </head>
      <body className={roboto.className}>
        <Providers>
          <Navbar />
          <main className="min-h-screen">
            <Layout>
              <FixedPlugin />
              {children}
            </Layout>
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}

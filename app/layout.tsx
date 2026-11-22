import "./globals.css";

import Footer from "./components/Footer";
import { cookies } from "next/headers";
import Navbar from "./components/Navbar";
import { UserProvider } from "./context/UserContext";
import { OnboardingProvider } from "./context/OnboardingContext";
import { ToastProvider } from "./context/ToastContext";
import LayoutContentClient from "./components/LayoutContentClient";
import { StructuredData } from "./components/StructuredData";
import type { Metadata, Viewport } from "next";
import { Barlow_Condensed } from "next/font/google";

// ISR Global
export const revalidate = 1800;

// Cambiar cuando tengas el dominio
const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ||
  "https://imwec.com";

const SITE_NAME = "MILLY STORE";

const barlowCondensed = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal"],
  variable: "--font-barlow-condensed",
});

// Aplica el theme ANTES del primer render (evita flash). Si no hay
// preferencia guardada, arranca en dark (identidad de la marca).
const themeInitScript = `
(function () {
  try {
    var stored = localStorage.getItem('theme');
    var isDark = stored ? stored === 'dark' : true;
    var root = document.documentElement;
    root.classList.toggle('dark', isDark);
    root.setAttribute('data-theme', isDark ? 'dark' : 'light');
    root.style.colorScheme = isDark ? 'dark' : 'light';
    var meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', isDark ? '#0B0D12' : '#FFFFFF');
  } catch (e) {}
})();
`;

export const metadata: Metadata = {
  title: {
    default: "MILLY STORE | Moda europea para mujeres, hombres y niños",
    template: "%s | MILLY STORE",
  },

  description:
    "Tienda online de ropa y moda europea para mujeres, hombres y niños. Envíos inmediatos a todo Ecuador. Encuentra las últimas tendencias de moda en Cariamanga, Loja. Ropa de calidad con entrega rápida.",

  keywords: [
    "Tienda de ropa online",
    "Moda europea",
    "Ropa para mujer",
    "Ropa para hombre",
    "Ropa para niños",
    "Tienda de ropa Ecuador",
    "Envíos a todo Ecuador",
    "Moda online",
    "Ropa de marca",
    "Comprar ropa online",
    "Fashion Ecuador",
    "Ropa trendy",
    "Envíos inmediatos",
    "Cariamanga Loja",
    "Milly Store",
  ],

  creator: SITE_NAME,

  publisher: SITE_NAME,

  metadataBase: new URL(SITE_URL),

  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },

  manifest: "/site.webmanifest",

  openGraph: {
    type: "website",
    locale: "es_EC",
    url: SITE_URL,
    siteName: SITE_NAME,

    title: "MILLY STORE | Moda europea para mujeres, hombres y niños",

    description:
      "Tienda online de ropa y moda europea para mujeres, hombres y niños. Envíos inmediatos a todo Ecuador. Encuentra las últimas tendencias de moda en Cariamanga, Loja.",

    images: [
      {
        url: `${SITE_URL}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: "MILLY STORE - Moda europea online",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",

    title: "MILLY STORE | Moda europea para mujeres, hombres y niños",

    description:
      "Tienda online de ropa y moda europea para mujeres, hombres y niños. Envíos inmediatos a todo Ecuador.",

    images: [`${SITE_URL}/twitter-image.jpg`],
  },

  alternates: {
    canonical: SITE_URL,
  },

  robots: {
    index: true,
    follow: true,

    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },

  verification: {
    google: "", // colocar Search Console cuando el dominio exista
  },

  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: SITE_NAME,
  },

  category: "Tienda de ropa",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  colorScheme: "light dark",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FFFFFF" },
    { media: "(prefers-color-scheme: dark)", color: "#0B0D12" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${barlowCondensed.variable} dark`}
      data-theme="dark"
      suppressHydrationWarning
    >
      <head>
        {/* Theme init: debe ir primero para evitar flash */}
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />

        {/* Google Analytics */}
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-P9GC2H2ZXP"
        />

        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-P9GC2H2ZXP');
            `,
          }}
        />

        <link
          href="https://fonts.googleapis.com/icon?family=Material+Icons+Round"
          rel="stylesheet"
        />

        <StructuredData />
      </head>

      <body className="relative min-h-screen bg-[var(--bg)] text-[var(--text)] antialiased">
        <ToastProvider>
          <OnboardingProvider>
            <LayoutContentClient>
              {children}
            </LayoutContentClient>
          </OnboardingProvider>
        </ToastProvider>
      </body>
    </html>
  );
}
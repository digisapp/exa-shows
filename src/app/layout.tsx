import type { Metadata, Viewport } from "next";
import { Poppins } from "next/font/google";
import { AuthProvider } from "@/context/AuthContext";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "EXA Shows - Fashion Shows, Swimwear & Resortwear Events Worldwide",
    template: "%s | EXA Shows",
  },
  description:
    "Experience the world's most exclusive fashion shows, swimwear events, and resortwear presentations. Watch live streams, buy tickets, and join the runway revolution.",
  keywords: [
    "fashion shows",
    "swimwear shows",
    "resortwear events",
    "runway shows",
    "fashion week",
    "Miami Swim Week",
    "fashion tickets",
    "live fashion",
    "model casting",
    "designer shows",
  ],
  authors: [{ name: "EXA Shows" }],
  creator: "EXA Shows",
  publisher: "EXA Shows",
  metadataBase: new URL("https://exashows.com"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://exashows.com",
    siteName: "EXA Shows",
    title: "EXA Shows - Fashion Shows, Swimwear & Resortwear Events Worldwide",
    description:
      "Experience the world's most exclusive fashion shows, swimwear events, and resortwear presentations. Watch live streams, buy tickets, and join the runway revolution.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "EXA Shows",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "EXA Shows - Fashion Shows, Swimwear & Resortwear Events Worldwide",
    description:
      "Experience the world's most exclusive fashion shows. Watch live streams, buy tickets, and join the runway revolution.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/manifest.json",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#1a0033" },
    { media: "(prefers-color-scheme: light)", color: "#1a0033" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${poppins.variable} font-sans antialiased`}>
        {/* Floating Orbs Background */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
          <div className="orb orb-pink w-[500px] h-[500px] -top-48 -left-48 animate-float" />
          <div
            className="orb orb-cyan w-[400px] h-[400px] top-1/3 -right-32 animate-float"
            style={{ animationDelay: "2s" }}
          />
          <div
            className="orb orb-purple w-[350px] h-[350px] bottom-0 left-1/4 animate-float"
            style={{ animationDelay: "4s" }}
          />
        </div>

        {/* Main Content */}
        <AuthProvider>
          <div className="relative z-10">{children}</div>
        </AuthProvider>
      </body>
    </html>
  );
}

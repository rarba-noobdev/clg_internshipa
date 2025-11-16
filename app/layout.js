import { Outfit } from "next/font/google";
import "./globals.css";
import { AppContextProvider } from "@/context/AppContext";
import { Toaster } from "react-hot-toast";
import { ClerkProvider } from "@clerk/nextjs";

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
});

// ---------- METADATA ----------
export const metadata = {
  title: {
    default: "Level",
    template: "%s | Level",
  },
  description: "Level.store - Modern E-Commerce built with React + Next.js",
  icons: {
    icon: "https://cdn-icons-png.flaticon.com/512/891/891462.png",
    shortcut: "https://cdn-icons-png.flaticon.com/512/891/891462.png",
    apple: "https://cdn-icons-png.flaticon.com/512/891/891462.png",
  },
  openGraph: {
    title: "Level",
    description: "Shop smart. Shop Level.",
    url: "https://level.store",
    siteName: "Level",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Level",
    description: "Level - Premium Online Shopping",
  },
};

// ---------- LAYOUT ----------
export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${outfit.className} antialiased text-gray-700`}>
          <Toaster position="top-right" />
          <AppContextProvider>{children}</AppContextProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}

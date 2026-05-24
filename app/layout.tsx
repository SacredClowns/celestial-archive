import type { Metadata } from "next";
import { Cinzel, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import { AppChrome } from "@/components/layout/app-chrome";
import { AuthProvider } from "@/lib/auth/auth-context";
import { TraditionSettingsProvider } from "@/lib/settings/tradition-settings-context";
import { BookmarkProvider } from "@/lib/bookmarks/bookmark-context";
import { DiscoveryProvider } from "@/lib/discovery/discovery-context";
import { JournalProvider } from "@/lib/journal/journal-context";
import { ProgressProvider } from "@/lib/progress/progress-context";

const cinzel = Cinzel({
  subsets: ["latin"],
  variable: "--font-cinzel",
  display: "swap"
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-cormorant",
  display: "swap",
  weight: ["400", "500", "600"]
});

export const metadata: Metadata = {
  title: "ENOCHIAN: THE CELESTIAL ARCHIVE",
  description: "A structured exploration of Enochian language, cosmology, and interpretation.",
  icons: { icon: "/favicon.svg" },
  openGraph: {
    title: "Enochian: The Celestial Archive",
    description: "History, language, cosmology, and interpretation of the Enochian system.",
    type: "website"
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${cinzel.variable} ${cormorant.variable}`}>
      <body className="font-body">
        <AuthProvider>
          <TraditionSettingsProvider>
            <ProgressProvider>
              <BookmarkProvider>
                <DiscoveryProvider>
                  <JournalProvider>
                    <AppChrome>{children}</AppChrome>
                  </JournalProvider>
                </DiscoveryProvider>
              </BookmarkProvider>
            </ProgressProvider>
          </TraditionSettingsProvider>
        </AuthProvider>
      </body>
    </html>
  );
}


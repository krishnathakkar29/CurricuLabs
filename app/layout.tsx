import { Toaster } from "@/components/ui/sonner";
import QueryProviderWrapper from "@/components/wrappers/query-provider";
import type { Metadata } from "next";
import { Inter, Lexend_Deca } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/wrappers/theme-provider";

const inter = Inter({
  subsets: ["latin"],
});
export const metadata: Metadata = {
  title: "CurricuLabs",
  description: "CurricuLabs is a platform for creating and sharing learning paths.",
  icons: {
    icon: "/icon.svg",
  },
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
return (
    <html lang="en" suppressHydrationWarning>
    <body className={`${inter.className} min-h-screen  antialiased`}>
      <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            <QueryProviderWrapper>
              {children}
              <Toaster richColors position="bottom-right" />
            </QueryProviderWrapper>
          </ThemeProvider>
    </body>
  </html>
  );
}

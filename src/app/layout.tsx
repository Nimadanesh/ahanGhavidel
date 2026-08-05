import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "آهن فروشی قویدل — بناب",
  description: "نمونه وب‌اپ حرفه‌ای آهن‌فروشی قویدل",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fa"
      dir="rtl"
      className="dark h-full antialiased"
      suppressHydrationWarning
    >
      <body
        className="flex min-h-full flex-col bg-background text-foreground"
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}

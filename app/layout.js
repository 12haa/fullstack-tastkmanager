import { Inter } from "next/font/google";
import "./globals.css";
import { NextThemeProvider } from "@/lib/NextThemeProvider";

const inter = Inter({ subsets: ["latin"] });
export const metadata = {
  title: "Project Task Organizer",
  description: "Generated by create next app",
};
export default function RootLayout({ children }) {
  return (
    <html lang="en" className="">
      <body className={inter.className}>
        <NextThemeProvider>{children}</NextThemeProvider>
      </body>
    </html>
  );
}

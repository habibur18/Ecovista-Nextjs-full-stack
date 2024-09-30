import { dbConnect } from "@/services/mongo";
import localFont from "next/font/local";
import Navbar from "./components/Navbar";
import "./globals.css";
import { AuthProvider } from "./providers/AuthProvider";

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

export const metadata = {
  title: "Eventry - Home",
  description:
    "A single Entry to connected to all the online events from the globe.",
};

export default function RootLayout({ children }) {
  dbConnect();
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>
          <main>
            <Navbar />
          </main>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}

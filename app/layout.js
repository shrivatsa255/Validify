import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import dynamic from "next/dynamic";
const DynamicNavbar = dynamic(() => import('./components/Navbar'), { ssr: false });
const DynamicFooter = dynamic(() => import('./components/Footer'), { ssr: false });
import { Toaster} from 'sonner';
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Validify",
  description: "A Blockchain Solutions for Transparent Product Verification",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
      <ThemeProvider attribute="class">
      <main className="dark:bg-nft-dark bg-white min-h-screen sm:tracking-normal overflow-hidden">
      <Toaster richColors position="bottom-right"/>
      <DynamicNavbar/>
      <div className="pt-65">{children}</div>
      <DynamicFooter/>
      </main>
      </ThemeProvider>
      </body>
    </html>
  );
}

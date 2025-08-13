import { Toaster } from '@/components/ui/sonner';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { MarginalsProvider } from '@/components/Common/MarginalsProvider';
import { ReactQueryProvider } from '@/components/Common/ReactQueryProvider';
import { getUserSession } from '@/lib/session';
import { AuthProvider } from '@/components/Common/Client-Auth-Provider';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata = {
  title: 'Ambassadors Club',
  description:
    "The Ambassadors' Club is pivotal in fostering international understanding and collaboration. We are a non-partisan, not-for-profit organisation, working towards strengthening global diplomacy, promoting global peace, and driving sustainable development through collaboration, dialogue, and strategic partnerships.  ",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getUserSession();
  console.log(session);
  return (
    <html lang="en">
      <body className={` antialiased`}>
        <ReactQueryProvider>
          <AuthProvider session={session ? true : false}>
            {children}
          </AuthProvider>
          <Toaster />
        </ReactQueryProvider>
      </body>
    </html>
  );
}

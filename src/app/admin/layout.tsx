import type { Metadata } from 'next';
import AdminAuthWrapper from '@/components/admin/common/AdminAuthWrapper';
import { getSession } from '@/lib/session';
import AuthComponent from './login/login';
import { AuthProvider } from '@/components/Common/Auth-Provider';
import { ReactQueryProvider } from '@/components/Common/ReactQueryProvider';
import { ThemeProvider } from '@/components/admin/common/themeprovider';
import Sidebar from '@/components/admin/common/sidebar';
import "./global.css"
// import AuthComponent from '../oldadmin/(auth)/login/login';

export const metadata: Metadata = {
  title: 'Ambassadors Club Nepal',
  description: 'Ambassadors Club Nepal ',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  let session: any = await getSession();
  return (
    <ReactQueryProvider>
      <ThemeProvider defaultTheme="light">
        <AuthProvider session={session}>
          {session ? 
          <div className="flex">
            <Sidebar />
            <div className="flex-grow">{children}</div>
          </div>
           : <AuthComponent />}
        </AuthProvider>
      </ThemeProvider>
    </ReactQueryProvider>
  );
}

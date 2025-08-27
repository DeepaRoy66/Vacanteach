import Footer from './components/Footer';
import './globals.css';
import ClientLayout from './(pages)/organization/ClientLayout';
import Navbar from './components/Navbar';

export const metadata = {
  title: 'Upwork Clone',
  description: 'Freelance services marketplace',
};

export default function RootLayout({ children, session }) { // Ensure session is passed
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen">
        <ClientLayout session={session}>
          <Navbar />
          <main className="flex-grow">{children}</main>
          <Footer />
        </ClientLayout>
      </body>
    </html>
  );
}
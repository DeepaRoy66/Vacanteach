import Footer from './components/Footer';
import './globals.css';

import Navbar from './components/Navbar';
import ClientLayout from './components/ClientLayout';

export const metadata = {
  title: 'SikshakRojgar Clone',
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
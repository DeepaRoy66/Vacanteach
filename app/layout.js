import Footer from './components/Footer';
import Navbar from './components/Navbar';
import './globals.css';
import SessionProvider from './components/SessionProvider'; // Import your client component

export const metadata = {
  title: 'Upwork Clone',
  description: 'Freelance services marketplace',
};

export default function RootLayout({ children, session }) { // Ensure session is passed
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen">
        <SessionProvider session={session}> {/* Use your client-side SessionProvider */}
          <Navbar />
          <main className="flex-grow">{children}</main>
          <Footer />
        </SessionProvider>
      </body>
    </html>
  );
}
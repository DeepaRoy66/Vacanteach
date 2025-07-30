import ClientLayout from "../../components/ClientLayout";
import Navbar from "./Navbar";



export const metadata = {
  title: 'Your App Title',
  description: 'Your App Description',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen">
        <ClientLayout>
          <Navbar />
          <main className="flex-grow">{children}</main>
         
        </ClientLayout>
      </body>
    </html>
  );
}

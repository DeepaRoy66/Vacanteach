import ClientLayout from "../../components/ClientLayout";
import Navbar from "./Navbar";





export const metadata = {
  title: 'VacanTeach',
  description: 'Your App Description',
};

export default function RootLayout({ children }) {
  return (
    
        <ClientLayout>
          <Navbar/>
          {children}
         
        </ClientLayout>
     
  );
}


import AppSidebar from "./Sidebar";

import  SessionProvider  from "../../components/SessionProvider";
export default function ClientLayout({ children, session }) {
  return (
    <SessionProvider session={session}>
    
        {children}
       
    </SessionProvider>
  );
}

import  SessionProvider  from "./SessionProvider";
export default function ClientLayout({ children, session }) {
  return (
    <SessionProvider session={session}>
    
        {children}
       
    </SessionProvider>
  );
}
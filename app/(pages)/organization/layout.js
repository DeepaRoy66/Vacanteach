import ClientLayout from "./ClientLayout"
import Navbar from "./Navbar"
import SidebarLayout from "./Sidebar"

export const metadata = {
  title: "VacanTeach",
  description: "Your App Description",
}

export default function RootLayout({ children }) {
  return (
    <ClientLayout>
      <div className="flex h-screen overflow-hidden">
         <SidebarLayout/>

        {/* Main content area */}
        <div className="flex-1 flex flex-col ">
          <Navbar />

          {/* Page content with proper scroll */}
          <main className="flex-1 overflow-y-auto bg-gray-50">
            <div className="p-6">{children}</div>
          </main>
        </div>
      </div>
    </ClientLayout>
  )
}

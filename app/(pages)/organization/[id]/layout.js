import ClientLayout from "../ClientLayout"

export const metadata = {
  title: "SikshakRojgar",
  description: "Your App Description",
}

export default function RootLayout({ children }) {
  return <ClientLayout>{children}</ClientLayout>
}

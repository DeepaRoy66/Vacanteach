import ClientLayout from "../../components/ClientLayout";
export const metadata = {
  title: 'Your App Title',
  description: 'Your App Description',
};
export default function RootLayout({ children }) {
  return (
    <ClientLayout>
      {children}
    </ClientLayout>
  );
}

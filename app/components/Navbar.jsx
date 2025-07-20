import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-white shadow-md p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-2xl font-bold">VacanTeach</div>
        <div className="space-x-4">
          <Link href="/find-work">Find Work</Link>
          <Link href="/why-upwork">Why Vacanteach?</Link>
          <Link href="/enterprise">Enterprise</Link>
          <Link href="/auth">Login</Link>
          <button className="bg-green-500 text-white px-4 py-2 rounded">Sign Up</button>
        </div>
      </div>
    </nav>
  );
}
export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white p-6">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h3>For Clients</h3>
          <ul>
            <li>Find Talent</li>
            <li>Project Catalog</li>
            <li>Why Upwork</li>
            <li>Enterprise</li>
          </ul>
        </div>
        <div>
          <h3>For Talent</h3>
          <ul>
            <li>Find Freelance Jobs</li>
            <li>Why Upwork</li>
            <li>Careers with Upwork</li>
          </ul>
        </div>
        <div>
          <h3>Resources</h3>
          <ul>
            <li>Help & Support</li>
            <li>Upwork Reviews</li>
            <li>Affiliate Program</li>
            <li>Free Business Tools</li>
          </ul>
        </div>
      </div>
      <div className="mt-4 text-center text-gray-400">
        © 2025 Upwork. Terms of Service | Privacy Policy | CA Notice of Collection | Cookie Settings | Accessibility
      </div>
    </footer>
  );
}
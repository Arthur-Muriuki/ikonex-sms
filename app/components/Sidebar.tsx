import Link from "next/link";

export default function Sidebar() {
  const links = [
    { name: "Dashboard", href: "/" },
    { name: "Class Streams", href: "/streams" },
    { name: "Students", href: "/students" },
    { name: "Subjects", href: "/subjects" },
    { name: "Assessments", href: "/assessments" },
    { name: "Reports", href: "/reports" },
  ];

  return (
    <div className="w-64 bg-gray-900 text-white min-h-screen p-4 flex flex-col">
      <h1 className="text-2xl font-bold mb-8 text-blue-400">Ikonex SMS</h1>
      <nav className="flex flex-col gap-4">
        {links.map((link) => (
          <Link
            key={link.name}
            href={link.href}
            className="hover:text-blue-400 hover:bg-gray-800 p-2 rounded transition-colors"
          >
            {link.name}
          </Link>
        ))}
      </nav>
    </div>
  );
}
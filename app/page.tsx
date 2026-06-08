import { db } from "@/lib/db";
import Link from "next/link";

export default async function DashboardPage() {
  // Fetch all our database counts in parallel so the page loads instantly
  const [studentCount, streamCount, subjectCount, scoreCount] = await Promise.all([
    db.student.count(),
    db.classStream.count(),
    db.subject.count(),
    db.score.count(),
  ]);

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">School Overview</h1>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        
        {/* Students Stat Card */}
        <div className="bg-white p-6 rounded-lg shadow border border-gray-200 flex flex-col items-center justify-center text-center">
          <h3 className="text-gray-500 font-medium mb-2">Total Students</h3>
          <span className="text-4xl font-bold text-blue-600">{studentCount}</span>
          <Link href="/students" className="mt-4 text-sm text-blue-500 hover:underline">
            Manage Students &rarr;
          </Link>
        </div>

        {/* Streams Stat Card */}
        <div className="bg-white p-6 rounded-lg shadow border border-gray-200 flex flex-col items-center justify-center text-center">
          <h3 className="text-gray-500 font-medium mb-2">Active Streams</h3>
          <span className="text-4xl font-bold text-green-600">{streamCount}</span>
          <Link href="/streams" className="mt-4 text-sm text-green-500 hover:underline">
            Manage Streams &rarr;
          </Link>
        </div>

        {/* Subjects Stat Card */}
        <div className="bg-white p-6 rounded-lg shadow border border-gray-200 flex flex-col items-center justify-center text-center">
          <h3 className="text-gray-500 font-medium mb-2">Curriculum Subjects</h3>
          <span className="text-4xl font-bold text-purple-600">{subjectCount}</span>
          <Link href="/subjects" className="mt-4 text-sm text-purple-500 hover:underline">
            Manage Subjects &rarr;
          </Link>
        </div>

        {/* Scores Stat Card */}
        <div className="bg-white p-6 rounded-lg shadow border border-gray-200 flex flex-col items-center justify-center text-center">
          <h3 className="text-gray-500 font-medium mb-2">Grades Recorded</h3>
          <span className="text-4xl font-bold text-orange-600">{scoreCount}</span>
          <Link href="/scores" className="mt-4 text-sm text-orange-500 hover:underline">
            View Ledger &rarr;
          </Link>
        </div>

      </div>
    </div>
  );
}
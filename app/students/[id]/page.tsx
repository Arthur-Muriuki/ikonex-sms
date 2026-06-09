import { getStudentById } from "@/actions/studentActions";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function StudentProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const studentId = resolvedParams.id;

  const student = await getStudentById(studentId);

  if (!student) {
    notFound(); 
  }

  const totalMarks = student.scores.reduce((acc, score) => acc + score.total, 0);
  const average = student.scores.length > 0 
    ? (totalMarks / student.scores.length).toFixed(1) 
    : "N/A";

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-800">Student Profile</h1>
        <Link href="/students" className="text-blue-600 hover:underline font-medium">
          &larr; Back to Roster
        </Link>
      </div>

      <div className="bg-white p-6 rounded-lg shadow border border-gray-200 mb-8 flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">{student.name}</h2>
          <p className="text-gray-500 font-mono mt-1">ADM: {student.admissionNumber}</p>
        </div>
        <div className="mt-4 md:mt-0 text-right">
          <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-bold border border-green-200">
            {student.classStream?.name || "Unassigned Stream"}
          </span>
          <p className="text-sm text-gray-500 mt-2">Overall Average: <strong className="text-blue-600 text-lg">{average}%</strong></p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-200 bg-gray-50">
          <h3 className="text-xl font-semibold text-gray-700">Academic Record</h3>
        </div>
        
        {student.scores.length === 0 ? (
          <p className="p-6 text-gray-500 italic">No grades have been recorded for this student yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-200 text-gray-600 text-sm bg-white">
                  <th className="py-3 px-6 font-semibold">Term</th>
                  <th className="py-3 px-6 font-semibold">Subject</th>
                  <th className="py-3 px-6 font-semibold text-right">CA (30)</th>
                  <th className="py-3 px-6 font-semibold text-right">Exam (70)</th>
                  <th className="py-3 px-6 font-semibold text-right text-blue-600">Total (100)</th>
                </tr>
              </thead>
              <tbody>
                {student.scores.map((score) => (
                  <tr key={score.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-6 text-sm font-medium text-gray-600">{score.term}</td>
                    <td className="py-3 px-6 font-medium text-gray-800">{score.subject?.name}</td>
                    <td className="py-3 px-6 text-right text-gray-600">{score.caScore}</td>
                    <td className="py-3 px-6 text-right text-gray-600">{score.examScore}</td>
                    <td className="py-3 px-6 text-right font-bold text-blue-600">{score.total}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
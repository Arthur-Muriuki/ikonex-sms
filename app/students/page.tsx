import { createStudent, getStudents } from "@/actions/studentActions";
import { getStreams } from "@/actions/streamActions";
import Link from "next/link";
import DeleteStudentButton from "@/components/DeleteStudentButton";

export default async function StudentsPage() {
  const [students, streams] = await Promise.all([getStudents(), getStreams()]);

  return (
    <div className="max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Student Management</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Registration Form Card */}
        <div className="bg-white p-6 rounded-lg shadow border border-gray-200 h-fit">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">Register Student</h2>
          
          <form action={createStudent} className="flex flex-col gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Full Name</label>
              <input type="text" name="name" required placeholder="e.g., Jane Doe" className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Assign Class Stream</label>
              <select name="streamId" required className="w-full px-3 py-2 border border-gray-300 rounded bg-white focus:outline-none focus:border-blue-500">
                <option value="">-- Select a Stream --</option>
                {streams.map((stream) => (
                  <option key={stream.id} value={stream.id}>{stream.name}</option>
                ))}
              </select>
            </div>

            <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded font-semibold hover:bg-blue-700 transition-colors mt-2">
              Register Student
            </button>
          </form>
        </div>

        {/* Registered Students Roster */}
        <div className="md:col-span-2 bg-white p-6 rounded-lg shadow border border-gray-200">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">Student Roster</h2>
          
          {students.length === 0 ? (
            <p className="text-gray-500 italic">No students registered yet.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-gray-200 text-gray-600 text-sm bg-gray-50">
                    <th className="py-3 px-4 font-semibold">Student Name</th>
                    <th className="py-3 px-4 font-semibold">Assigned Stream</th>
                    <th className="py-3 px-4 font-semibold text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {students.map((student) => (
                    <tr key={student.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4 font-medium text-gray-800">
                        <Link href={`/students/${student.id}`} className="text-blue-600 hover:text-blue-800 hover:underline">
                          {student.name}
                        </Link>
                      </td>
                      <td className="py-3 px-4">
                        <span className="px-2 py-1 bg-green-50 text-green-700 rounded text-xs font-semibold border border-green-200">
                          {student.classStream?.name || "Unassigned"}
                        </span>
                      </td>
                      
                      <td className="py-3 px-4 text-right text-sm font-medium flex justify-end gap-4 items-center">
                        <Link href={`/students/${student.id}/edit`} className="text-gray-500 hover:text-blue-600 hover:underline">
                          Edit
                        </Link>
                        <DeleteStudentButton id={student.id} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
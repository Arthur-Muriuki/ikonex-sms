import { getStudentById, updateStudent } from "@/actions/studentActions";
import { getStreams } from "@/actions/streamActions";
import { notFound, redirect } from "next/navigation";
import Link from "next/link";

export default async function EditStudentPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const studentId = resolvedParams.id;

  const [student, streams] = await Promise.all([
    getStudentById(studentId),
    getStreams()
  ]);

  if (!student) notFound();

  async function handleUpdate(formData: FormData) {
    "use server";
    await updateStudent(studentId, formData);
    redirect("/students");
  }

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow border border-gray-200">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Edit Student Info</h1>
        <Link href="/students" className="text-sm text-gray-500 hover:underline">Cancel</Link>
      </div>

      <form action={handleUpdate} className="flex flex-col gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">Full Name</label>
          <input type="text" name="name" required defaultValue={student.name} className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">Class Stream</label>
          {/* We updated student.streamId to student.classStreamId here! */}
          <select name="streamId" required defaultValue={student.classStreamId || ""} className="w-full px-3 py-2 border border-gray-300 rounded bg-white focus:outline-none focus:border-blue-500">
            <option value="">-- Select a Stream --</option>
            {streams.map((stream) => (
              <option key={stream.id} value={stream.id}>{stream.name}</option>
            ))}
          </select>
        </div>

        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded font-semibold hover:bg-blue-700 transition-colors mt-2">
          Save Changes
        </button>
      </form>
    </div>
  );
}
import { createSubject, getSubjects } from "@/actions/subjectActions";

export default async function SubjectsPage() {
  const subjects = await getSubjects();

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Subject Management</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Subject Creation Form */}
        <div className="bg-white p-6 rounded-lg shadow border border-gray-200 h-fit">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">Add New Subject</h2>
          
          <form action={createSubject} className="flex flex-col gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Subject Name
              </label>
              <input
                type="text"
                name="name"
                required
                placeholder="e.g., Mathematics"
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Subject Code (Optional)
              </label>
              <input
                type="text"
                name="code"
                placeholder="e.g., MATH101"
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded font-semibold hover:bg-blue-700 transition-colors mt-2"
            >
              Add Subject
            </button>
          </form>
        </div>

        {/* Existing Subjects List */}
        <div className="md:col-span-2 bg-white p-6 rounded-lg shadow border border-gray-200">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">Curriculum Subjects</h2>
          
          {subjects.length === 0 ? (
            <p className="text-gray-500 italic">No subjects added to the system yet.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-gray-200 text-gray-600 text-sm bg-gray-50">
                    <th className="py-3 px-4 font-semibold">Code</th>
                    <th className="py-3 px-4 font-semibold">Subject Name</th>
                  </tr>
                </thead>
                <tbody>
                  {subjects.map((subject) => (
                    <tr key={subject.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4 font-mono text-sm text-blue-600 font-semibold">
                        {subject.code}
                      </td>
                      <td className="py-3 px-4 font-medium text-gray-800">
                        {subject.name}
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
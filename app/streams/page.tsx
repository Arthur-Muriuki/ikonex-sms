import { createStream, getStreams } from "@/actions/streamActions";

export default async function StreamsPage() {
  const streams = await getStreams();

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Class Stream Management</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Creation Form Card */}
        <div className="bg-white p-6 rounded-lg shadow border border-gray-200 h-fit">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">Create New Stream</h2>
          
          <form action={createStream} className="flex flex-col gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Stream Name
              </label>
              <input
                type="text"
                name="name"
                required
                placeholder="e.g., Form 1A"
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded font-semibold hover:bg-blue-700 transition-colors"
            >
              Add Stream
            </button>
          </form>
        </div>

        {/* Existing Streams Table/List */}
        <div className="md:col-span-2 bg-white p-6 rounded-lg shadow border border-gray-200">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">Active Streams</h2>
          
          {streams.length === 0 ? (
            <p className="text-gray-500 italic">No class streams created yet.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-gray-200 text-gray-600 text-sm bg-gray-50">
                    <th className="py-3 px-4 font-semibold">Stream Name</th>
                    <th className="py-3 px-4 font-semibold text-right">Registered Students</th>
                  </tr>
                </thead>
                <tbody>
                  {streams.map((stream) => (
                    <tr key={stream.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4 font-medium text-gray-800">{stream.name}</td>
                      <td className="py-3 px-4 text-right text-gray-600">
                        {stream._count.students} Students
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
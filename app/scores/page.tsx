import { getStudents } from "@/actions/studentActions";
import { getSubjects } from "@/actions/subjectActions";
import { createScore, getScores } from "@/actions/scoreActions";

export default async function ScoresPage() {
  const [students, subjects, scores] = await Promise.all([
    getStudents(),
    getSubjects(),
    getScores(),
  ]);

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Grades & Assessments</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Score Entry Card */}
        <div className="bg-white p-6 rounded-lg shadow border border-gray-200 h-fit">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">Enter Exam Marks</h2>
          
          <form action={createScore} className="flex flex-col gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Select Student
              </label>
              <select name="studentId" required className="w-full px-3 py-2 border border-gray-300 rounded bg-white focus:outline-none focus:border-blue-500">
                <option value="">-- Choose Student --</option>
                {students.map((student) => (
                  <option key={student.id} value={student.id}>
                    {student.name} ({student.admissionNumber})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Select Subject
              </label>
              <select name="subjectId" required className="w-full px-3 py-2 border border-gray-300 rounded bg-white focus:outline-none focus:border-blue-500">
                <option value="">-- Choose Subject --</option>
                {subjects.map((subject) => (
                  <option key={subject.id} value={subject.id}>
                    {subject.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Added Term Selector Dropdown */}
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Academic Term
              </label>
              <select name="term" required className="w-full px-3 py-2 border border-gray-300 rounded bg-white focus:outline-none focus:border-blue-500">
                <option value="">-- Choose Term --</option>
                <option value="Term 1">Term 1</option>
                <option value="Term 2">Term 2</option>
                <option value="Term 3">Term 3</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  CA Score
                </label>
                <input type="number" name="caScore" required min="0" placeholder="e.g. 15" className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Exam Score
                </label>
                <input type="number" name="examScore" required min="0" placeholder="e.g. 70" className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500" />
              </div>
            </div>

            <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded font-semibold hover:bg-blue-700 transition-colors mt-2">
              Submit Grade
            </button>
          </form>
        </div>

        {/* Grades Ledger Table */}
        <div className="md:col-span-2 bg-white p-6 rounded-lg shadow border border-gray-200">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">Examination Ledger</h2>
          
          {scores.length === 0 ? (
            <p className="text-gray-500 italic">No exam grades recorded yet.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-gray-200 text-gray-600 text-sm bg-gray-50">
                    <th className="py-3 px-4 font-semibold">Student</th>
                    <th className="py-3 px-4 font-semibold">Subject</th>
                    <th className="py-3 px-4 font-semibold">Term</th>
                    <th className="py-3 px-4 font-semibold text-right">CA</th>
                    <th className="py-3 px-4 font-semibold text-right">Exam</th>
                    <th className="py-3 px-4 font-semibold text-right text-blue-600">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {scores.map((score) => (
                    <tr key={score.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4">
                        <div className="font-medium text-gray-800">{score.student?.name}</div>
                        <div className="text-xs text-gray-400 font-mono">{score.student?.admissionNumber}</div>
                      </td>
                      <td className="py-3 px-4 font-medium text-gray-600">
                        {score.subject?.name}
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-500 font-medium">
                        {score.term}
                      </td>
                      <td className="py-3 px-4 text-right text-gray-600">
                        {score.caScore}
                      </td>
                      <td className="py-3 px-4 text-right text-gray-600">
                        {score.examScore}
                      </td>
                      <td className="py-3 px-4 text-right font-bold text-blue-600">
                        {score.total}
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
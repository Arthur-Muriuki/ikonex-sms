"use client"; // This tells Next.js this specific piece runs in the browser

import { deleteStudent } from "@/actions/studentActions";

export default function DeleteStudentButton({ id }: { id: string }) {
  return (
    <form 
      action={deleteStudent} 
      onSubmit={(e) => { 
        // Now this browser-native confirm dialog will work perfectly
        if (!confirm("Are you sure you want to remove this student?")) {
          e.preventDefault(); 
        }
      }}
    >
      <input type="hidden" name="id" value={id} />
      <button type="submit" className="text-red-500 hover:text-red-700 hover:underline font-medium">
        Delete
      </button>
    </form>
  );
}
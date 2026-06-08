"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

// Action to register a new student
export async function createStudent(formData: FormData) {
  const name = formData.get("name") as string;
  const streamId = formData.get("streamId") as string;

  if (!name || name.trim() === "" || !streamId) {
    return { error: "All fields are required." };
  }

  // Auto-generate a unique admission number to satisfy your database schema
  const admissionNumber = `IKX-${Date.now().toString().slice(-6)}`;

  try {
    await db.student.create({
      data: {
        name: name.trim(),
        classStreamId: streamId, // <--- Fixed the red line here!
        admissionNumber: admissionNumber,
      },
    });

    // Refresh both pages so the tables and counters update immediately
    revalidatePath("/students");
    revalidatePath("/streams");
    return { success: true };
  } catch (error) {
    console.error(error);
    return { error: "Could not register the student. Check your database connection." };
  }
}

// Action to fetch all students with their class stream details
export async function getStudents() {
  return await db.student.findMany({
    include: {
      classStream: true,
    },
    orderBy: { name: "asc" },
  });
}
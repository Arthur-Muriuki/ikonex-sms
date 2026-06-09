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
// Action to fetch a single student's complete profile and grades
export async function getStudentById(id: string) {
  return await db.student.findUnique({
    where: {
      id: id,
    },
    include: {
      classStream: true,
      scores: {
        include: {
          subject: true,
        },
        orderBy: {
          term: "desc", // Groups newest terms first
        },
      },
    },
  });
}
// Action to update student details
export async function updateStudent(id: string, formData: FormData) {
  const name = formData.get("name") as string;
  const streamId = formData.get("streamId") as string;

  if (!name || !streamId) {
    return { error: "Name and Class Stream are required fields." };
  }

  try {
    await db.student.update({
      where: { id },
      data: {
        name,
        classStreamId: streamId, // <-- Changed this to match Prisma schema!
      },
    });

    revalidatePath("/students");
    return { success: true };
  } catch (error) {
    console.error(error);
    return { error: "Failed to update student profile." };
  }
}

// Action to delete a student account
export async function deleteStudent(formData: FormData) {
  const id = formData.get("id") as string;

  if (!id) return { error: "Missing student identification." };

  try {
    await db.student.delete({
      where: { id },
    });

    revalidatePath("/students");
    return { success: true };
  } catch (error) {
    console.error(error);
    return { error: "Failed to delete student. Ensure their recorded scores are removed first." };
  }
}
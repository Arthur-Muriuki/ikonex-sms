"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

// Action to create a new academic subject
export async function createSubject(formData: FormData) {
  const name = formData.get("name") as string;
  const code = formData.get("code") as string;

  if (!name || name.trim() === "") {
    return { error: "Subject name is required." };
  }

  // Generate a fallback code if left blank (e.g., MAT-492)
  const subjectCode = code && code.trim() !== "" 
    ? code.trim().toUpperCase() 
    : `${name.trim().slice(0, 3).toUpperCase()}-${Math.floor(100 + Math.random() * 900)}`;

  try {
    await db.subject.create({
      data: {
        name: name.trim(),
        code: subjectCode,
      },
    });

    revalidatePath("/subjects");
    return { success: true };
  } catch (error) {
    console.error(error);
    return { error: "A subject with this name or code already exists." };
  }
}

// Action to fetch all subjects
export async function getSubjects() {
  return await db.subject.findMany({
    orderBy: { name: "asc" },
  });
}
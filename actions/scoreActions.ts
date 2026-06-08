"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

// Action to record a student's exam and CA scores along with the term
export async function createScore(formData: FormData) {
  const studentId = formData.get("studentId") as string;
  const subjectId = formData.get("subjectId") as string;
  const examScoreStr = formData.get("examScore") as string;
  const caScoreStr = formData.get("caScore") as string;
  const term = formData.get("term") as string; // Captured the missing term field!

  if (!studentId || !subjectId || !examScoreStr || !caScoreStr || !term) {
    return { error: "All fields are required." };
  }

  const examScore = parseFloat(examScoreStr);
  const caScore = parseFloat(caScoreStr);

  if (isNaN(examScore) || examScore < 0 || examScore > 100) {
    return { error: "Exam score must be a valid number between 0 and 100." };
  }
  if (isNaN(caScore) || caScore < 0 || caScore > 100) {
    return { error: "CA score must be a valid number." };
  }

  // Calculate total score
  const total = examScore + caScore;

  try {
    await db.score.create({
      data: {
        studentId,
        subjectId,
        examScore,
        caScore,
        total,
        term, // Passed it right here to satisfy your schema
      },
    });

    revalidatePath("/scores");
    return { success: true };
  } catch (error) {
    console.error(error);
    return { error: "Failed to record score. This student might already have a grade for this subject/term." };
  }
}

// Action to fetch all recorded grades
export async function getScores() {
  return await db.score.findMany({
    include: {
      student: true,
      subject: true,
    },
    orderBy: {
      id: "desc",
    },
  });
}
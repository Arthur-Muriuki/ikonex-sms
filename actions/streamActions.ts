"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

// Action to create a new class stream
export async function createStream(formData: FormData) {
  const name = formData.get("name") as string;
  if (!name || name.trim() === "") return { error: "Stream name cannot be empty." };

  try {
    await db.classStream.create({
      data: { name: name.trim() },
    });
    
    // Refresh the streams page so the new data shows up instantly
    revalidatePath("/streams");
    return { success: true };
  } catch (error) {
    return { error: "A stream with this name already exists." };
  }
}

// Action to fetch all class streams with student counts
export async function getStreams() {
  return await db.classStream.findMany({
    include: {
      _count: {
        select: { students: true },
      },
    },
    orderBy: { name: "asc" },
  });
}
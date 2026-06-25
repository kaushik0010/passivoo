"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function finalizeCheckout() {
  // 1. Purge the Next.js cache for the drops page
  revalidatePath("/drops");
  
  // 2. Redirect the user to the freshly rendered page
  redirect("/collections");
}
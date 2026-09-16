"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/dal";
import { removeEnquiry, setEnquiryStatus } from "@/lib/enquiries";

function refresh() {
  revalidatePath("/admin/enquiries");
  revalidatePath("/admin");
}

async function mark(formData: FormData, status: "new" | "handled") {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  if (!id) return;
  try {
    await setEnquiryStatus(id, status);
  } catch (error) {
    console.error(`Could not mark enquiry ${status}`, error);
  }
  refresh();
}

export async function markHandled(formData: FormData) {
  await mark(formData, "handled");
}

export async function reopenEnquiry(formData: FormData) {
  await mark(formData, "new");
}

export async function deleteEnquiry(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  if (!id) return;
  try {
    await removeEnquiry(id);
  } catch (error) {
    console.error("Could not delete enquiry", error);
  }
  refresh();
}

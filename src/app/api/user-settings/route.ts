import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export async function GET(reques: Resquest) {
  const user = await currentUser();
}

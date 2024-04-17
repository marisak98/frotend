import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Welcome() {
  return (
    <main className="bg-[#26313c] h-screen text-white flex items-center justify-center flex-col">
      <div className="text-center">
        <h1 className="my-4 text-4xl font-bold">SOPOD</h1>
        <h3>Testing Version 0.013</h3>

        <Button className="my-4">
          <Link href="/auth/login">Login</Link>
        </Button>
      </div>
    </main>
  );
}

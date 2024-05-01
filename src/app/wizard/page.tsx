import Layout from "./layout";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import Logo from "@/components/logo";
import Link from "next/link";
import { OPComboBox } from "@/components/op-comboBox";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

async function WizardPage() {
  const user = await currentUser();
  if (!user) {
    redirect("/sign-in");
  }
  return (
    <div
      className="container flex max-w-2xl flex-col
       items-center justify-between gap-4"
    >
      <div>
        <h1 className="text-center text-3xl">
          Welcome, <span className="ml-2 font-bold">{user.firstName}!</span>
        </h1>
        <h2 className="mt-4 text-center text-base text-muted-foreground">
          Iniciando la configuracion para SOPOS v2.0
        </h2>

        <h3 className="mt-2 text-center text-sm text-muted-foreground">
          Puede cambiar estas configuracion despues.
        </h3>
      </div>
      <Separator className="mb-5 bg-gray-200 dark:bg-gray-800" />
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Numero de Op&apos;s</CardTitle>
          <CardDescription>Ingrea el numero de Op a Seguir.</CardDescription>
        </CardHeader>
        <CardContent>
          <OPComboBox />
        </CardContent>
      </Card>
      <Separator />

      <Button className="w-full">
        <Link href={"/dashboard"}>Terminar configuracion.</Link>
      </Button>
      <div className="mt-8">
        <Logo />
      </div>
    </div>
  );
}

export default WizardPage;

import { useState, FormEvent } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import DocumentUpload from "@/components/document-upload";

export default function AddDocumentModal({
  newVersion,
  children,
  isDataroom,
  dataRoomId,
}: {
  newVersion?: boolean;
  children: React.ReactNode;
  isDataroom?: boolean;
  dataRoomId?: string;
}) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [currentFile, setCurrentFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState<boolean>(false);
  const [notionLink, setNotionLink] = useState<string | null>(null);

  const handleFileUpload = async (
    event: FormEvent<HTMLFormElement>,
  ): Promise<void> => {
    event.preventDefault();
    if (!currentFile) {
      toast.error("Por favor, selecione um arquivo para enviar.");
      return;
    }
  };

  const clearModelStates = () => {
    currentFile !== null && setCurrentFile(null);
  };
  return (
    <Dialog open={isOpen} onOpenChange={clearModelStates}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="text-foreground bg-transparent  border-none shadow-none">
        <Tabs defaultValue="document">
          {!newVersion ? (
            <TabsList className="grid w-full grid-cols-1">
              <TabsTrigger value="document">Document</TabsTrigger>
              <TabsTrigger value="notion">Notion PAge</TabsTrigger>
            </TabsList>
          ) : (
            <TabsList className="grid w-full grid-cols-1">
              <TabsTrigger value="document">Document</TabsTrigger>
            </TabsList>
          )}
          <TabsContent value="document">
            <Card>
              <CardHeader className="space-y-3">
                <CardTitle>
                  {!newVersion ? `Subir nueva version` : `Compartir documento`}
                </CardTitle>
                <CardDescription>
                  {!newVersion
                    ? `Después de cargar una nueva versión, los enlaces existentes permanecerán sin cambios, pero`
                    : `Después de cargar el documento, se mostrará un enlace para compartir.
                generado y copiado a su portapapeles.`}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-x-2">
                <form
                  encType="multipart/form-data"
                  onSubmit={handleFileUpload}
                  className="flex flex-col"
                >
                  <div className="space-y-1">
                    <div className="pb-6">
                      <div className="grid grid-cols-1 gap-x-6 sm:grid-cols-6">
                        <DocumentUpload
                          currentFile={currentFile}
                          setCurrentFile={setCurrentFile}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-center">
                    <Button
                      type="submit"
                      className="w-full lg:w-1/2"
                      disabled={uploading || !currentFile}
                      loading={uploading}
                    >
                      {uploading ? "Uploading..." : "Upload Document"}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}

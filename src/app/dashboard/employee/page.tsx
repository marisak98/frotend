import AddDocumentModal from "@/components/documents/add-document-modal";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";

export default function Employees() {
  return (
    <div>
      <h2>Employees</h2>
      <div>
        <AddDocumentModal>
          {" "}
          <Button
            size="icon"
            className="fixed bottom-6 right-5 z-30 lg:hidden sm:bottom-0 sm:right-0 sm:relative w-10 sm:w-44 h-10 sm:h-10"
          >
            <span className="hidden sm:block">Add New Document</span>
            <span className="block sm:hidden">
              <PlusIcon className="w-6 h-6" />
            </span>
          </Button>
        </AddDocumentModal>
      </div>
    </div>
  );
}

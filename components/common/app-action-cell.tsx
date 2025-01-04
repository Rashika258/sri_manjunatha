import Invoice from "@/app/daily-bills/(utils)/invoice";
import {
  Button,
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/index";
import { ActionItem } from "@/types";
import { DownloadIcon } from "lucide-react";
import * as React from "react";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

const AppActionCell = ({
  id,
  actions,
}: {
  id: string;
  actions: ActionItem[];
}) => {
  const downloadRef = React.useRef<HTMLDivElement | null>(null);

  const downloadPDF = async () => {
    const invoiceElement = document.getElementById("invoice")!;
    const canvas = await html2canvas(invoiceElement);

    const pdf = new jsPDF();
    const imgData = canvas.toDataURL("image/png");
    pdf.addImage(imgData, "PNG", 10, 10);
    pdf.save("invoice.pdf");
  };

  return (
    <div className="grid gap-2 grid-flow-col">
      {actions.map((action, index) => (
        <div key={index} className="flex justify-between  items-center gap-4">
          {action?.label === "Download" ? (
            <Dialog >
              <DialogTrigger asChild>
                <Button
                  variant={
                    action.buttonVariant ? action.buttonVariant : "ghost"
                  }
                  size={"icon"}
                  // onClick={() =>downloadPDF()}
                >
                  <DownloadIcon />
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-fit max-h-[500px] overflow-auto">
                <Invoice ref={downloadRef} />

                <DialogFooter>
                  <Button
                    variant={"ghost"}
                    size={"icon"}
                    onClick={() => downloadPDF()}
                  >
                    <DownloadIcon />
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          ) : (
            <Button
              variant={action.buttonVariant ? action.buttonVariant : "ghost"}
              size={"icon"}
              onClick={() => action.handler(id)}
            >
              {action.icon}
            </Button>
          )}
        </div>
      ))}
    </div>
  );
};

export default AppActionCell;

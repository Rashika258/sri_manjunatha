import Invoice from "@/app/daily-bills/(utils)/invoice";
import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/index";
import { ActionItem } from "@/types";
import { DownloadIcon } from "lucide-react";
import * as React from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const AppActionCell = ({
  id,
  actions,
}: {
  id: string;
  actions: ActionItem[];
}) => {
  return (
    <div className="grid gap-2 grid-flow-col">
      {actions.map((action, index) => (
        <div key={index} className="flex justify-between  items-center gap-4">
          {action?.label === "Download" ? (
            <DownloadPopup action={action} />
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

const DownloadPopup = ({ action }: { action: ActionItem }) => {
  const downloadRef = React.useRef<HTMLDivElement | null>(null);

  const generatePDF = async (element: HTMLDivElement) => {
    try {
      const canvas = await html2canvas(element, { scale: 2 });
      const imgData = canvas.toDataURL("image/png");
  
      const pdf = new jsPDF("portrait", "pt", "a4");
      const pageHeight = 841.89;
      const contentHeight = canvas.height; // Adjust scale if required
      
  
      let y = 0;
  
      while (y < contentHeight) {
        pdf.addImage(
          imgData,
          "PNG",
          0,
          -y, // Shift content to fit the page
          canvas.width / 4, // Adjust scale if required
          pageHeight
        );
        if (y + pageHeight < contentHeight) {
          pdf.addPage();
        }
        y += pageHeight;
      }
  
      pdf.save("multi-page-invoice.pdf");
    } catch (error) {
      console.error("Error generating PDF:", error);
    }
  };
  

  const downloadPDF = async () => {
    console.log("downloadPDF", downloadRef.current);

    if (downloadRef.current) {
      await generatePDF(downloadRef.current);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant={action.buttonVariant ? action.buttonVariant : "ghost"}
          size={"icon"}
        >
          <DownloadIcon />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-fit max-h-[500px]">
        <DialogHeader>
          <DialogTitle>Download</DialogTitle>
          <DialogDescription>
            Check your contents and download your pdf
          </DialogDescription>
        </DialogHeader>
        <div className="h-[300px] overflow-auto">
          <Invoice ref={downloadRef} />
        </div>

        <DialogFooter>
          <Button onClick={() => downloadPDF()}>
            <DownloadIcon /> Download
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AppActionCell;

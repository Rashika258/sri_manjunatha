import { 
  Button, 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle 
} from '../ui/index';
import { Mail, Send } from 'lucide-react'; 
import { BillingFormData } from '@/types';
import * as React from "react";
import { generateInvoicePDF } from '@/app/daily-bills/(utils)';

const AppSharePopup = ({
  isOpen,
  setIsOpen,
  shareMessage = "Check out this awesome content!",
  emailSubject = "Interesting Content to Share",
  rowId,
  data
} :{
  isOpen: boolean,
  setIsOpen: (value: boolean) => void,
  shareMessage?: string,
  emailSubject?: string,
  rowId: string,
  data: BillingFormData
}) => {

  const invoicePdf = React.useMemo(()=>{
    const response = generateInvoicePDF(data);
    const pdfBlob = response.output("blob");
    return pdfBlob;

  },[data, shareMessage])

  const handleCloseDialog = (open: boolean) => {
    if (!open) setIsOpen(false);
  };

  const handleWhatsAppShare = React.useCallback(() => {
    const pdfUrl = URL.createObjectURL(invoicePdf); 
    
    const whatsappMessage = `${shareMessage}\nDownload the invoice here: ${pdfUrl}`;
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(whatsappMessage)}`;

    window.open(whatsappUrl, "_blank");
  },[invoicePdf, shareMessage])

  const handleEmailShare = () => {
    const emailURL = `mailto:?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(shareMessage)}`;
    window.open(emailURL, '_blank');
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleCloseDialog}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Share This Content</DialogTitle>
          <DialogDescription>
            You can share this content via WhatsApp or Email.
          </DialogDescription>
        </DialogHeader>

        <div className="flex gap-2 items-center justify-center">
          <Button 
            className="w-12 h-12 rounded-full"
            onClick={handleWhatsAppShare}
            variant={"secondary"}
          >
            <Send  />
          </Button>
          <Button 
            className="w-12 h-12 rounded-full "
            onClick={handleEmailShare}
            variant={"secondary"}
          >
            <Mail  />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default AppSharePopup;

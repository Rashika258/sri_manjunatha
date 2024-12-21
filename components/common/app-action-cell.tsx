/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
  Button
} from "@/components/ui/index";
import {
  Download,
  Pencil,
  Settings,
  Share2,
  Trash,
} from "lucide-react";

const actions = [
  {
    label: "Edit",
    icon: <Pencil />,
    handler: () => console.log("Edit clicked"),
  },
  {
    label: "Delete",
    icon: <Trash />,
    handler: () => console.log("Delete clicked"),
  },
  {
    label: "Download",
    icon: <Download />,
    handler: () => console.log("Download clicked"),
  },
  {
    label: "Share",
    icon: <Share2 />,
    handler: () => console.log("Share clicked"),
  },
];

const AppActionCell = ({ id }: { id: number }) =>{
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button size={"icon"} variant="secondary">
          <Settings />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[180px] ">
        <div className="grid gap-2">
          {actions.map((action, index) => (
            <div key={index} className="flex justify-between items-center gap-4">
                
              <Button className="w-full items-center justify-between" variant="ghost" onClick={action.handler}>
              <p> {action.label}</p>
                {action.icon}
              </Button>
            </div>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}

export default AppActionCell 

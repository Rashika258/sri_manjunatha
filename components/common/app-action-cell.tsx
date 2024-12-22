/* eslint-disable @typescript-eslint/no-unused-vars */
import { Button } from "@/components/ui/index";
import { ActionItem } from "@/types";





const AppActionCell = ({ id, actions }: { id: string , actions: ActionItem[]}) => {
  return (
    <div className="grid gap-2 grid-flow-col">
      {actions.map((action, index) => (
        <div key={index} className="flex justify-between  items-center gap-4">
          <Button
            variant={action.buttonVariant ? action.buttonVariant : "ghost"}
            size={"icon"}
            onClick={() =>action.handler(id)}
          >
            {action.icon}
          </Button>
        </div>
      ))}
    </div>
  );
};

export default AppActionCell;

import React from 'react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/index";
import { AlertCircle } from 'lucide-react';

const AppTableError = ({errorText}:{errorText?:string}) => {
  return (

    <div className='flex items-center justify-center w-full'>
    
    <Alert className='w-fit h-fit' variant="destructive">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>Error</AlertTitle>
      <AlertDescription>
        {errorText || 'Something went wrong!'}
      </AlertDescription>
    </Alert>

    </div>

  );
}

export default AppTableError;

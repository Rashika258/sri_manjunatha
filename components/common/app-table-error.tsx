import React from 'react';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';
import { AlertCircle, Terminal } from 'lucide-react';

const AppTableError = ({errorText}:{errorText?:string}) => {
  return (
    <Alert variant="destructive">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>Error</AlertTitle>
      <AlertDescription>
        {errorText || 'Something went wrong!'}
      </AlertDescription>
    </Alert>

  );
}

export default AppTableError;

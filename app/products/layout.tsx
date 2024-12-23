import React from 'react';

const ProductLayout =  ({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) => {
  
    return (
<>{children}</>
        
    );
}

export default ProductLayout;

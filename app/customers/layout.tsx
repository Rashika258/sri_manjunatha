import React from 'react';

const CustomersLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <>
      {children}
    </>
  );
}

export default CustomersLayout;

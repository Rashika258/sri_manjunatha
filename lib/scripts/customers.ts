// eslint-disable-next-line @typescript-eslint/no-require-imports
const { PrismaClient } = require('@prisma/client');


const prisma = new PrismaClient();

async function insertCustomers() {
  // Define an array of customers to be inserted
  const customers = [
    {
      name: "John Doe",
      email: "johndoe@example.com",
      phone: "9876543210",
      address: "123 Main Street, Cityville, Country",
      gstin: "22AAAAA0000A1Z5",
    },
    {
      name: "Jane Smith",
      email: "janesmith@example.com",
      phone: "8765432109",
      address: "456 Elm Street, Townsville, Country",
      gstin: "33BBBBB1111B2Z6",
    },
    {
      name: "Michael Brown",
      email: "michaelbrown@example.com",
      phone: "7654321098",
      address: "789 Oak Avenue, Metropolis, Country",
      gstin: "44CCCCC2222C3Z7",
    },
    {
      name: "Emily Davis",
      email: "emilydavis@example.com",
      phone: "6543210987",
      address: "101 Pine Lane, Smallville, Country",
      gstin: "55DDDDD3333D4Z8",
    },
    {
      name: "David Wilson",
      email: "davidwilson@example.com",
      phone: "5432109876",
      address: "202 Cedar Drive, Capital City, Country",
      gstin: "66EEEEE4444E5Z9",
    }
  ];

  // Insert each customer into the database
  for (const customer of customers) {
    try {
      await prisma.customers.create({
        data: {
          name: customer.name,
          email: customer.email,
          phone: customer.phone,
          address: customer.address,
          gstin: customer.gstin,
          created_at: new Date(), // Automatically set the current timestamp
        },
      });
      console.log(`Inserted customer: ${customer.name}`);
    } catch (error) {
      console.error(`Error inserting customer: ${customer.name}`, error);
    }
  }
}

insertCustomers()
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

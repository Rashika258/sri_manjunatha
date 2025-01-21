// eslint-disable-next-line @typescript-eslint/no-require-imports
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  // List of categories to insert
  const categories = [
    { name: "Plain Hinges", description: "Basic plain hinges for doors and windows." },
    { name: "Pin Design", description: "Hinges with pin designs for added style." },
    { name: "Ball Designs", description: "Hinges with ball designs for smooth operation." },
    { name: "Nipple Designs", description: "Hinges with nipple designs for unique applications." },
    { name: "Sharp Designs", description: "Hinges with sharp designs for precision fitting." },
    { name: "Rods", description: "Standard rods for various applications." },
    { name: "Knurling Handles", description: "Knurled handles for improved grip." },
    { name: "All Drop Bushes", description: "Bushes used in all drop sets." },
    { name: "Nylon Bearing and Bushes", description: "Durable nylon bearings and bushes." },
    { name: "Nylon Bolt Type", description: "Bolt-type components made of nylon." },
    { name: "Bearings", description: "Standard bearings for smooth movement." },
    { name: "All Drop Set", description: "Complete set of drop components." },
    { name: "Ready Tower Bolt", description: "Pre-assembled tower bolts for quick installation." },
    { name: "Clamp Runner Wheels", description: "Runner wheels with clamp designs." },
    { name: "Runner Wheels", description: "Standard runner wheels for sliding mechanisms." },
    { name: "Plating Runner Wheels", description: "Plated runner wheels for corrosion resistance." },
    { name: "Rotating Runner Wheel", description: "Rotating runner wheels for 360-degree movement." },
    { name: "Bottom Rods", description: "Specialized rods for bottom placements." },
    { name: "Bindhige", description: "Decorative items commonly used in traditional designs." },
    { name: "Design Items", description: "Custom-designed items for decorative purposes." }
  ];

  // Insert categories
  for (const category of categories) {
    await prisma.product_categories.create({
      data: category
    });
  }

  console.log("Categories inserted successfully!");
}

main()
  .catch((e) => {
    console.error("Error inserting categories:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

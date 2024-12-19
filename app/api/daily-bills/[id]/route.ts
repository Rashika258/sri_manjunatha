import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  const { method } = req;
  const { id } = req.query;

  // Validate `id`
  if (!id || Array.isArray(id) || isNaN(parseInt(id))) {
    res.status(400).json({ error: 'Invalid or missing ID' });
    return;
  }

  const invoiceId = parseInt(id);

  switch (method) {
    case 'GET': // Get a specific daily bill
      try {
        const bill = await prisma.invoices.findUnique({
          where: { invoice_id: invoiceId },
        });

        if (!bill) {
          res.status(404).json({ error: 'Bill not found' });
          return;
        }

        res.status(200).json(bill);
      } catch (error) {
        console.error('Error fetching bill:', error);
        res.status(500).json({ error: 'Failed to fetch bill' });
      }
      break;

    case 'PUT': // Update a daily bill
      try {
        const { customer_id, invoice_date, total_amount, grand_total } = req.body;

        // Validate required fields
        if (
          !customer_id ||
          !invoice_date ||
          total_amount === undefined ||
          grand_total === undefined
        ) {
          res.status(400).json({ error: 'Missing required fields' });
          return;
        }

        const updatedBill = await prisma.invoices.update({
          where: { invoice_id: invoiceId },
          data: {
            customer_id,
            invoice_date: new Date(invoice_date),
            total_amount,
            grand_total,
          },
        });

        res.status(200).json(updatedBill);
      } catch (error: any) {
        console.error('Error updating bill:', error);

        if (error.code === 'P2025') {
          res.status(404).json({ error: 'Bill not found' });
          return;
        }

        res.status(500).json({ error: 'Failed to update bill' });
      }
      break;

    case 'DELETE': // Delete a daily bill
      try {
        await prisma.invoices.delete({
          where: { invoice_id: invoiceId },
        });

        res.status(204).end(); // No content
      } catch (error: any) {
        console.error('Error deleting bill:', error);

        if (error.code === 'P2025') {
          res.status(404).json({ error: 'Bill not found' });
          return;
        }

        res.status(500).json({ error: 'Failed to delete bill' });
      }
      break;

    default:
      res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}

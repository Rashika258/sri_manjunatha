import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient, invoices } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  const { method } = req;

  switch (method) {
    case 'GET': // Get all daily bills
      try {
        const dailyBills: invoices[] = await prisma.invoices.findMany({
          where: { is_gst_bill: false },
        });
        res.status(200).json(dailyBills);
      } catch (error) {
        console.error('Error fetching daily bills:', error);
        res.status(500).json({ error: 'Failed to fetch daily bills' });
      }
      break;

    case 'POST': // Create a daily bill
      try {
        const {
          customer_id,
          invoice_date,
          total_amount,
          grand_total,
        }: {
          customer_id: number;
          invoice_date: string;
          total_amount: number;
          grand_total: number;
        } = req.body;

        if (!customer_id || !invoice_date || !total_amount || !grand_total) {
          res.status(400).json({ error: 'Missing required fields' });
          return;
        }

        const newBill: invoices = await prisma.invoices.create({
          data: {
            customer_id,
            invoice_date: new Date(invoice_date),
            total_amount,
            tax_amount: 0, // No GST for daily bills
            grand_total,
            is_gst_bill: false,
          },
        });
        res.status(201).json(newBill);
      } catch (error) {
        console.error('Error creating daily bill:', error);
        res.status(500).json({ error: 'Failed to create daily bill' });
      }
      break;

    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}

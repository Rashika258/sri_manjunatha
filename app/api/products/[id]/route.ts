import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const productId = parseInt(params.id);

    if (isNaN(productId) || productId <= 0) {
      return NextResponse.json(
        { error: "Invalid product ID" },
        { status: 400 }
      );
    }

    const deletedProduct = await prisma.products.delete({
      where: { product_id: productId },
    });

    return NextResponse.json({
      message: "Product deleted successfully",
      data: deletedProduct,
    });
  } catch (error) {
    console.error("Error deleting product:", error);
    return NextResponse.json(
      { error: "Error deleting product" },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const productId = parseInt(params.id);

    if (isNaN(productId) || productId <= 0) {
      return NextResponse.json(
        { error: "Invalid product ID" },
        { status: 400 }
      );
    }

    const data = await req.json();

    const updatedProduct = await prisma.products.update({
      where: { product_id: productId },
      data: data,
    });

    return NextResponse.json(updatedProduct);
  } catch (error) {
    console.error("Error updating product:", error);
    return NextResponse.json(
      { error: "Error updating product" },
      { status: 500 }
    );
  }
}

export async function GET(
  req: NextRequest,
  { params }: { params: { id?: string } }
) {
  try {
    if (params.id) {
      const productId = parseInt(params.id);

      if (isNaN(productId) || productId <= 0) {
        return NextResponse.json(
          { error: "Invalid product ID" },
          { status: 400 }
        );
      }

      const product = await prisma.products.findUnique({
        where: { product_id: productId },
      });

      const updatedProduct = {
        name: product?.name,
        hsn_code: product?.hsn_code,
        price: product?.price,
        gst_rate: product?.gst_rate,
        stock_quantity:     product?.stock_quantity,
        adinath_price: product?.adinath_price || 0,
        monthly_bill_price:product?.monthly_bill_price || 0,
        created_at: product?.created_at ? new Date(product?.created_at) : undefined,
        product_category_id : product?.product_category_id ? parseInt(product?.product_category_id?.toString(), 10) : undefined,
      }
      
      if (!product) {
        return NextResponse.json(
          { error: "Product not found" },
          { status: 404 }
        );
      }

      return NextResponse.json(updatedProduct);
    }

    const products = await prisma.products.findMany();
    return NextResponse.json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json(
      { error: "Error fetching products" },
      { status: 500 }
    );
  }
}


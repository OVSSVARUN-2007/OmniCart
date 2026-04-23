import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

import { auth } from "@/auth";
import { createLocalOrder, getOrdersByEmail } from "@/lib/local-store";

const createOrderSchema = z.object({
  productId: z.string().min(1),
  productName: z.string().min(1),
  totalAmount: z.coerce.number().positive(),
  paymentMethod: z.string().min(2),
  cardNumber: z.string().min(12),
  cardholderName: z.string().min(2)
});

export async function GET() {
  const session = await auth();

  if (!session?.user?.email) {
    return NextResponse.json(
      {
        message: "Unauthorized."
      },
      { status: 401 }
    );
  }

  const orders = await getOrdersByEmail(session.user.email);

  return NextResponse.json({
    orders
  });
}

export async function POST(request: NextRequest) {
  const session = await auth();

  if (!session?.user?.email) {
    return NextResponse.json(
      {
        message: "Please sign in before placing an order."
      },
      { status: 401 }
    );
  }

  try {
    const body = createOrderSchema.parse(await request.json());
    const digits = body.cardNumber.replace(/\D/g, "");
    const last4 = digits.slice(-4);

    if (last4.length !== 4) {
      return NextResponse.json(
        {
          message: "Enter a valid card number."
        },
        { status: 400 }
      );
    }

    const order = await createLocalOrder({
      userEmail: session.user.email,
      userName: session.user.name ?? body.cardholderName,
      totalAmount: body.totalAmount,
      paymentMethod: body.paymentMethod,
      paymentLast4: last4,
      productId: body.productId,
      productName: body.productName
    });

    return NextResponse.json(
      {
        message: "Payment successful and order created.",
        order
      },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          message: error.issues[0]?.message ?? "Invalid order payload."
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        message: "Unable to process payment right now."
      },
      { status: 500 }
    );
  }
}

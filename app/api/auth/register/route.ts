import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

import { createLocalUser } from "@/lib/local-store";

const registerSchema = z
  .object({
    name: z.string().trim().min(2, "Name must be at least 2 characters."),
    email: z.string().trim().email("Enter a valid email address."),
    password: z.string().min(6, "Password must be at least 6 characters."),
    confirmPassword: z.string().min(6, "Confirm your password.")
  })
  .refine((value) => value.password === value.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"]
  });

export async function POST(request: NextRequest) {
  try {
    const body = registerSchema.parse(await request.json());
    const user = await createLocalUser({
      name: body.name,
      email: body.email,
      password: body.password
    });

    return NextResponse.json(
      {
        message: "Account created successfully.",
        user: {
          id: user.id,
          name: user.name,
          email: user.email
        }
      },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          message: error.issues[0]?.message ?? "Invalid signup details."
        },
        { status: 400 }
      );
    }

    if (error instanceof Error && error.message === "EMAIL_EXISTS") {
      return NextResponse.json(
        {
          message: "An account with this email already exists."
        },
        { status: 409 }
      );
    }

    return NextResponse.json(
      {
        message: "Unable to create account right now."
      },
      { status: 500 }
    );
  }
}

import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const task = await prisma.task.findUnique({
    where: { id: Number(id) },
  });
  return NextResponse.json({ data: task }, { status: 200 });
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const { title, description, status, dueDate } = await request.json();

  const updatedTask = await prisma.task.update({
    where: { id: Number(id) },
    data: {
      title,
      description,
      status,
      dueDate: dueDate ? new Date(dueDate).toISOString() : undefined,
      updatedAt: new Date().toISOString(),
    },
  });

  return NextResponse.json({ data: updatedTask }, { status: 201 });
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const task = await prisma.task.delete({
    where: { id: Number(id) },
  });

  return NextResponse.json({ data: "Deleted" }, { status: 200 });
}

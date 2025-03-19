import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const search = searchParams.get("search") || undefined;
  const status = searchParams.get("status") || undefined;
  const dueDate = searchParams.get("dueDate") || undefined;

  let targetDate = new Date();
  let startOfDay = new Date();
  let endOfDay = new Date();

  const page = Number(searchParams.get("page")) || 1;
  const limit = Number(searchParams.get("limit")) || 10;
  const skip = (page - 1) * limit;

  if (dueDate) {
    targetDate = new Date(dueDate);
    startOfDay = new Date(targetDate);
    startOfDay.setUTCHours(0, 0, 0, 0);
    endOfDay = new Date(targetDate);
    endOfDay.setUTCHours(23, 59, 59, 999);
  }

  const [tasks, total] = await Promise.all([
    prisma.task.findMany({
      where: {
        AND: [
          {
            OR: [
              { title: { contains: search } },
              { description: { contains: search } },
            ],
          },
          { status },
          dueDate
            ? {
                dueDate: {
                  gte: startOfDay,
                  lte: endOfDay,
                },
              }
            : {},
        ],
      },
      skip, // Number of records to skip
      take: limit, // Number of records to return
      orderBy: {
        createdAt: "desc", // Add sensible default sorting
      },
    }),
    prisma.task.count({
      where: {
        AND: [
          {
            OR: [
              { title: { contains: search } },
              { description: { contains: search } },
            ],
          },
          { status },
          dueDate
            ? {
                dueDate: {
                  gte: startOfDay,
                  lte: endOfDay,
                },
              }
            : {},
        ],
      },
    }),
  ]);

  return NextResponse.json(
    {
      data: tasks,
      meta: {
        total,
        page,
        limit,
        hasNextPage: total > page * limit,
        totalPages: Math.ceil(total / limit),
      },
    },
    { status: 200 }
  );
}

export async function POST(request: Request) {
  const { title, description, status, dueDate } = await request.json();

  const newTask = await prisma.task.create({
    data: {
      title,
      description,
      status,
      dueDate: new Date(dueDate).toISOString(),
    },
  });

  return NextResponse.json({ data: newTask }, { status: 201 });
}

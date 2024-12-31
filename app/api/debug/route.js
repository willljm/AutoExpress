import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const data = {
      cars: await db.car.findMany(),
      orders: await db.order.findMany(),
      users: await db.user.findMany(),
      favorites: await db.favorite.findMany(),
    };
    
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

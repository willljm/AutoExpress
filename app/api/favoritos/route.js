import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(req) {
  try {
    const { userId, carId } = await req.json();
    const { data, error } = await supabase
      .from('favorites')
      .insert([{ user_id: userId, car_id: carId }])
      .select();

    if (error) throw error;
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get('userId');

    const { data, error } = await supabase
      .from('favorites')
      .select('*, cars(*)')
      .eq('user_id', userId);

    if (error) throw error;
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(req) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get('userId');
    const carId = searchParams.get('carId');

    const { error } = await supabase
      .from('favorites')
      .delete()
      .match({ user_id: userId, car_id: carId });

    if (error) throw error;
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(req) {
  try {
    const data = await req.json();
    console.log('Datos recibidos:', data);

    const { data: order, error } = await supabase
      .from('orders')
      .insert({
        car_id: data.carId,
        car_name: data.CarName,
        user_id: data.userId,
        status: data.status,
        ciudad_recogida: data.ciudadRecogida,
        ciudad_devolucion: data.ciudadDevolucion,
        lugar_recogida: data.lugarRecogida,
        lugar_devolucion: data.lugarDevolucion,
        fecha_inicio: data.fechaInicio,
        fecha_fin: data.fechaFin,
        total: data.total
      })
      .select()
      .single();

    if (error) {
      console.error('Error Supabase:', error);
      throw error;
    }

    console.log('Orden creada:', order);
    return NextResponse.json(order);
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET() {
  try {
    const { data: orders, error } = await supabase
      .from('orders')
      .select(`
        *,
        cars (*)
      `)
      .order('created_at', { ascending: false });

    if (error) throw error;
    console.log('Órdenes recuperadas:', orders);
    return NextResponse.json(orders);
  } catch (error) {
    console.error('Error al obtener órdenes:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(req) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    
    const { data: order, error } = await supabase
      .from('orders')
      .delete()
      .eq('id', id)
      .single();
    
    if (error) throw error;
    return NextResponse.json(order);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

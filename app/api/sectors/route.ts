import { createClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';

export async function GET() {
  const supabase = await createClient();

  try {
    const { data, error } = await supabase
      .from('sectors')
      .select('*')
      .order('name');

    if (error) throw error;

    return NextResponse.json({ data: data || [] });
  } catch (error) {
    console.error('Error fetching sectors:', error);
    return NextResponse.json({ data: [] }, { status: 500 });
  }
}

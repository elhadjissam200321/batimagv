import { createClient } from '@/lib/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const supabase = await createClient();
  const searchParams = request.nextUrl.searchParams;
  const search = searchParams.get('search') || '';
  const type = searchParams.get('type') || '';
  const country = searchParams.get('country') || '';
  const page = parseInt(searchParams.get('page') || '1');
  const limit = parseInt(searchParams.get('limit') || '9');

  try {
    let query = supabase.from('properties').select('*', { count: 'exact' });

    if (search) {
      query = query.or(`title.ilike.%${search}%,description.ilike.%${search}%,location.ilike.%${search}%`);
    }

    if (type) {
      query = query.eq('type', type);
    }

    if (country) {
      query = query.eq('country', country);
    }

    query = query.order('is_featured', { ascending: false })
      .order('published_at', { ascending: false });

    const { data, error, count } = await query
      .range((page - 1) * limit, page * limit - 1);

    if (error) throw error;

    return NextResponse.json({
      data: data || [],
      total: count || 0,
      page,
      limit,
      totalPages: Math.ceil((count || 0) / limit),
    });
  } catch (error) {
    console.error('Error fetching properties:', error);
    return NextResponse.json({ data: [], total: 0, page, limit, totalPages: 0 }, { status: 500 });
  }
}

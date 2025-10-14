import { NextRequest, NextResponse } from 'next/server';
import { q } from '@/lib/db';
import { requireAdmin } from '@/lib/auth';
export async function GET(req: NextRequest){ if(!requireAdmin()) return NextResponse.json({}, {status:403}); const days=Number(new URL(req.url).searchParams.get('days')||14); const {rows}=await q(`select ts.*, e.full_name, c.name as customer_name, f.name as function_name from time_segments ts join employees e on e.id = ts.employee_id join customers c on c.id = ts.customer_id join functions f on f.id = ts.function_id where ts.started_at >= now() - ($1||' days')::interval order by ts.started_at desc`,[days]); return NextResponse.json({segments:rows}); }

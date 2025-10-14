import { NextRequest, NextResponse } from 'next/server';
import { q } from '@/lib/db';
import { requireAdmin } from '@/lib/auth';
export async function PUT(req: NextRequest){ if(!requireAdmin()) return NextResponse.json({}, {status:403}); const {id,started_at,ended_at,is_break,customer_id,function_id,note}=await req.json(); await q('update time_segments set started_at=$2, ended_at=$3, is_break=$4, customer_id=$5, function_id=$6, note=$7 where id=$1',[id,started_at,ended_at,is_break,customer_id,function_id,note]); return NextResponse.json({ok:true}); }

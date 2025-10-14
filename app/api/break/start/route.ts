import { NextResponse } from 'next/server';
import { q } from '@/lib/db';
import { requireUser } from '@/lib/auth';
export async function POST(){ const u=requireUser(); if(!u) return NextResponse.json({}, {status:401}); await q('update time_segments set ended_at = now() where employee_id = $1 and ended_at is null',[u.sub]); await q('insert into time_segments (employee_id, customer_id, function_id, started_at, is_break) select $1, customer_id, function_id, now(), true from time_segments where employee_id = $1 order by started_at desc limit 1',[u.sub]); return NextResponse.json({ok:true}); }

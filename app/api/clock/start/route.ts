import { NextRequest, NextResponse } from 'next/server';
import { q } from '@/lib/db';
import { requireUser } from '@/lib/auth';
export async function POST(req: NextRequest){ const u=requireUser(); if(!u) return NextResponse.json({}, {status:401}); const {customer_id,function_id}=await req.json(); await q('update time_segments set ended_at = now() where employee_id = $1 and ended_at is null',[u.sub]); await q('insert into time_segments (employee_id, customer_id, function_id, started_at) values ($1,$2,$3, now())',[u.sub,customer_id,function_id]); return NextResponse.json({ok:true}); }

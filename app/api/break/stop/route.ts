import { NextResponse } from 'next/server';
import { q } from '@/lib/db';
import { requireUser } from '@/lib/auth';
export async function POST(){ const u=requireUser(); if(!u) return NextResponse.json({}, {status:401}); await q('update time_segments set ended_at = now() where employee_id = $1 and ended_at is null and is_break = true',[u.sub]); return NextResponse.json({ok:true}); }

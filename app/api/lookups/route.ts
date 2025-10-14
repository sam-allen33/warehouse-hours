import { NextResponse } from 'next/server';
import { q } from '@/lib/db';
import { requireUser } from '@/lib/auth';
export async function GET(){ if(!requireUser()) return NextResponse.json({}, {status:401}); const [c,f]=await Promise.all([q('select id, name from customers where active = true order by name'), q('select id, name from functions where active = true order by name')]); return NextResponse.json({customers:c.rows, functions:f.rows}); }

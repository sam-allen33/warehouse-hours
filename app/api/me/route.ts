import { NextResponse } from 'next/server';
import { requireUser } from '@/lib/auth';
export async function GET(){ const u=requireUser(); if(!u) return NextResponse.json({user:null},{status:401}); return NextResponse.json({user:u}); }

import { NextRequest, NextResponse } from 'next/server';
import { loginWithPin } from '@/lib/auth';
export async function POST(req: NextRequest){ const {pin}=await req.json(); const user=await loginWithPin(String(pin||'')); if(!user) return NextResponse.json({error:'Invalid PIN'},{status:401}); return NextResponse.json({user}); }

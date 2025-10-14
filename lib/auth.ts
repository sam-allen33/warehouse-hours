import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';
import { q } from './db';
const COOKIE='tc_session';
const SECRET=process.env.JWT_SECRET!;
export async function loginWithPin(pin:string){const {rows}=await q('select id, full_name, pin_hash, role from employees where active = true');for(const r of rows){if(await bcrypt.compare(pin,r.pin_hash)){const token=jwt.sign({sub:r.id,name:r.full_name,role:r.role},SECRET,{expiresIn:'7d'});cookies().set(COOKIE,token,{httpOnly:true,sameSite:'lax',secure:true,maxAge:60*60*24*7,path:'/'});return {id:r.id,full_name:r.full_name,role:r.role};}}return null;}
export function requireUser(){const c=cookies().get(COOKIE)?.value;if(!c)return null;try{return jwt.verify(c,SECRET) as { sub:string,name:string,role:'employee'|'admin'};}catch{return null;}}
export function requireAdmin(){const u=requireUser();return u&&u.role==='admin'?u:null;}

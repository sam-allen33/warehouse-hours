'use client';
import { useEffect, useState } from 'react';
type Opt = { id: string, name: string };
export default function App() {
  const [user, setUser] = useState<any>(null);
  const [pin, setPin] = useState('');
  const [customers, setCustomers] = useState<Opt[]>([]);
  const [functions, setFunctions] = useState<Opt[]>([]);
  const [customerId, setCustomerId] = useState<string>('');
  const [functionId, setFunctionId] = useState<string>('');
  async function fetchMe(){ const r=await fetch('/api/me'); if(r.ok) setUser((await r.json()).user); else setUser(null); }
  useEffect(()=>{ fetchMe(); }, []);
  async function login(){ const r=await fetch('/api/login',{method:'POST',body:JSON.stringify({pin}),headers:{'Content-Type':'application/json'}}); if(r.ok){ await fetchMe(); await loadLookups(); } else alert('Invalid PIN'); }
  async function loadLookups(){ const r=await fetch('/api/lookups'); if(r.ok){ const j=await r.json(); setCustomers(j.customers); setFunctions(j.functions); setCustomerId(j.customers[0]?.id||''); setFunctionId(j.functions[0]?.id||''); } }
  useEffect(()=>{ if(user) loadLookups(); }, [user]);
  async function act(path:string, body?:any){ const r=await fetch(path,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(body||{})}); if(!r.ok) alert('Action failed'); }
  if(!user){ return (<main className="max-w-md mx-auto p-6"><h1 className="text-2xl font-semibold mb-4">Warehouse Hours</h1><label className="block text-sm mb-2">Enter PIN</label><input value={pin} onChange={e=>setPin(e.target.value)} inputMode="numeric" className="w-full border rounded p-3" placeholder="1234"/><button onClick={login} className="mt-4 w-full bg-black text-white rounded p-3">Sign In</button></main>); }
  return (<main className="max-w-md mx-auto p-6 space-y-4"><h2 className="text-xl font-semibold">Hi {user.name}</h2><div className="grid grid-cols-1 gap-3"><div><label className="text-sm">Customer</label><select className="w-full border rounded p-3" value={customerId} onChange={e=>setCustomerId(e.target.value)}>{customers.map(c=> <option key={c.id} value={c.id}>{c.name}</option>)}</select></div><div><label className="text-sm">Function</label><select className="w-full border rounded p-3" value={functionId} onChange={e=>setFunctionId(e.target.value)}>{functions.map(f=> <option key={f.id} value={f.id}>{f.name}</option>)}</select></div></div><div className="grid grid-cols-2 gap-3"><button onClick={()=>act('/api/clock/start',{customer_id:customerId,function_id:functionId})} className="bg-green-600 text-white rounded p-3">Start</button><button onClick={()=>act('/api/clock/stop')} className="bg-red-600 text-white rounded p-3">Stop</button><button onClick={()=>act('/api/clock/switch',{customer_id:customerId,function_id:functionId})} className="col-span-2 bg-blue-600 text-white rounded p-3">Switch</button><button onClick={()=>act('/api/break/start')} className="bg-yellow-500 text-white rounded p-3">Start Break</button><button onClick={()=>act('/api/break/stop')} className="bg-yellow-700 text-white rounded p-3">End Break</button></div><a href={`/api/export/week?start=${new Date().toISOString().slice(0,10)}`} className="inline-block underline text-sm">Download this week (CSV)</a>{user.role==='admin' && <a href="/admin" className="block underline text-sm">Admin</a>}</main>); }

const API = (import.meta.env.VITE_API_URL || 'http://localhost:5000').replace(/\/$/, '');
export function token(){return localStorage.getItem('ss_token')||''}
export function currentUser(){try{return JSON.parse(localStorage.getItem('ss_user')||'null')}catch{return null}}
export async function api(path:string, options:RequestInit={}){
 const headers=new Headers(options.headers||{}); if(token())headers.set('Authorization',`Bearer ${token()}`); if(options.body && !(options.body instanceof FormData))headers.set('Content-Type','application/json');
 const response=await fetch(`${API}${path}`,{...options,headers}); if(!response.ok){let message=`Request failed (${response.status})`;try{const data=await response.json();message=data.message||data.title||message}catch{} throw new Error(message)}
 if(response.status===204)return null;return response.json();
}
export const imageUrl=(url:string)=>!url?'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=900&q=80':url.startsWith('http')?url:`${API}${url}`;

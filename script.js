// Foto profil: otomatis coba jpg, jpeg, png, webp. Kalau tidak ada, tampil inisial "RF".
const av=document.querySelector('.avatar');
const fallback=()=>{av.onerror=null;av.src="data:image/svg+xml;utf8,"+encodeURIComponent("<svg xmlns='http://www.w3.org/2000/svg' width='400' height='500'><rect width='100%' height='100%' fill='#ea580c'/><text x='50%' y='52%' fill='#fff' font-family='Arial Black,sans-serif' font-size='150' font-weight='900' text-anchor='middle' dominant-baseline='middle'>RF</text></svg>")};
const EXT=['jpg','jpeg','png','webp','JPG','JPEG','PNG','WEBP'];
const raw=av.getAttribute('src'),base=raw.replace(/\.\w+$/,''),cur=(raw.match(/\.(\w+)$/)||[])[1];
const list=EXT.filter(e=>e!==cur);let n=0;
const next=()=>n<list.length?av.src=base+'.'+list[n++]:fallback();
av.onerror=next;if(av.complete&&!av.naturalWidth)next();
// Ban berjalan: gandakan isi supaya putarannya mulus
const belt=document.getElementById('belt');belt.innerHTML+=belt.innerHTML;
// Kolase hero: gandakan foto supaya geseran kiri ke kanan berulang mulus
// dibagi jadi 3 baris persegi panjang, tiap baris digandakan agar loop mulus
const hc=document.querySelector('.hero-collage'),ct=document.getElementById('collageTrack');
if(hc&&ct){const imgs=[...ct.querySelectorAll('img')],R=3;hc.textContent='';
for(let r=0;r<R;r++){const row=document.createElement('div');row.className='collage-track';
const mine=imgs.filter((_,i)=>i%R===r);mine.forEach(im=>row.appendChild(im));
mine.forEach(im=>{const c=im.cloneNode();c.setAttribute('aria-hidden','true');row.appendChild(c)});
hc.appendChild(row)}}
// Kolase dokumentasi: gandakan (salinan disembunyikan dari pembaca layar)
const cs=document.getElementById('collageSlide');
if(cs){const c=cs.cloneNode(true);c.removeAttribute('id');[...c.children].forEach(f=>{f.setAttribute('aria-hidden','true');f.querySelector('img')?.setAttribute('alt','')});[...c.children].forEach(f=>cs.appendChild(f))}
// Tema gelap/terang
const root=document.documentElement,tb=document.getElementById('theme');
const isDark=()=>root.dataset.theme?root.dataset.theme==='dark':matchMedia('(prefers-color-scheme:dark)').matches;
const paint=()=>tb.textContent=isDark()?'☀':'☾';paint();
tb.onclick=()=>{const t=isDark()?'light':'dark';root.dataset.theme=t;try{localStorage.setItem('theme',t)}catch(e){}paint()};
// Animasi muncul saat scroll + menu aktif
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('show');io.unobserve(e.target)}}),{threshold:.08});
document.querySelectorAll('.reveal').forEach(s=>io.observe(s));
const links=[...document.querySelectorAll('#menu a')];
const so=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)links.forEach(a=>a.classList.toggle('active',a.getAttribute('href')==='#'+e.target.id))}),{rootMargin:'-45% 0px -50% 0px'});
document.querySelectorAll('main section').forEach(s=>so.observe(s));
document.getElementById('year').textContent=new Date().getFullYear();
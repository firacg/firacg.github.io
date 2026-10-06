(()=>{'use strict';const data=window.PORTFOLIO;const esc=s=>String(s||'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));const video=(v,cls='film')=>`<video class="${cls}" controls playsinline preload="none" poster="${esc(v.poster)}" src="${esc(v.src)}"></video>`;const figures=images=>`<div class="image-grid ${images.length===1?'single':''} ${images.length===6?'six':''}">${images.map(i=>`<figure style="--image-ratio:${esc(i.ratio||'auto')}"><img loading="lazy" src="${esc(i.src)}" alt="${esc(i.caption)}" tabindex="0" role="button" aria-label="Enlarge: ${esc(i.caption)}"><figcaption>${esc(i.caption)}</figcaption></figure>`).join('')}</div>`;const blocks=items=>`<div class="blocks">${items.map(([h,p])=>`<article><h3>${esc(h)}</h3><p>${esc(p)}</p></article>`).join('')}</div>`;

if(document.getElementById('project-grid')){
const main=data.projects;
const find=id=>main.find(p=>p.id===id);
const diorita=find('diorita');const artifacts=diorita.slides.find(s=>s.videos&&s.label==='Recurring formats').videos;
function card(v,title,ratio,href,cls='project-card'){
return `<article class="${cls} format-card inline-video-card" style="--ratio:${ratio}" aria-label="${esc(title)}"><div class="card-player"><video controls playsinline preload="auto" poster="${esc(v.poster)}" src="${esc(v.src)}" aria-label="Play ${esc(title)}"></video><div class="hover-caption"><h3>${esc(title)}</h3></div></div>${cls==='experiment'?'':`<a class="process-link case-button" href="${href}"><span>View case &amp; process</span><span aria-hidden="true">→</span></a>`}</article>`}
const b=find('blooming-hollow'),a=find('white-haired-warrior');
document.getElementById('project-grid').innerHTML=
card(b.video,b.title,'9 / 16','case.html?project=blooming-hollow')+
card(diorita.video,diorita.title,'9 / 16','case.html?project=diorita')+
card(artifacts[0],'Field Journal','9 / 16','case.html?project=diorita#journal')+
card(artifacts[1],'Secret Letter','9 / 16','case.html?project=diorita#letter')+
card(data.extras[1],data.extras[1].title,'480 / 854','case.html?project=study-1')+
card(data.extras[0],data.extras[0].title,'16 / 9','case.html?project=study-0')+
card(a.video,a.title,'16 / 9','case.html?project=white-haired-warrior');
document.getElementById('project-grid').insertAdjacentHTML('afterend','<div class="spotify-feature">'+card({src:'assets/spotify-final.mp4',poster:'assets/spotify-final.jpg'},'Spotify — Pause','16 / 9','case.html?project=spotify-pause')+'</div>');
const ratios=['16 / 9','480 / 854','16 / 9','16 / 9','3 / 4','1 / 1'];
document.getElementById('experiment-grid').innerHTML=data.extras.map((x,i)=>i<2?'':card(x,x.title,ratios[i],'case.html?project=study-'+i,'experiment')).join('');
document.querySelectorAll('video').forEach(v=>v.addEventListener('play',()=>document.querySelectorAll('video').forEach(other=>{if(other!==v)other.pause()})));
return}
const id=new URLSearchParams(location.search).get('project'),p=data.projects.find(x=>x.id===id);
if(!p){document.querySelector('main').innerHTML='<h1>Choose a project.</h1><p><a href="index.html">All projects →</a></p>';return}
document.title=p.title+' — Fira CG';document.getElementById('case-title').textContent=p.title;document.getElementById('case-category').textContent=p.category;
document.getElementById('case-role').textContent=p.role;document.getElementById('case-tools').textContent=p.tools.join(' · ');if(!p.tools.length)document.getElementById('case-tools').parentElement.hidden=true;
document.getElementById('case-links').innerHTML='<a href="index.html#projects">Selected work ↗</a>';
const slug=(s,i)=>s.label==='Recurring formats'?'recurring-formats':s.video&&!s.prompt?'film':'section-'+(i+1);
const ordered=p.slides.map((s,i)=>({...s,anchor:slug(s,i)}));
// Show the finished work immediately, with the concept and process below it.
const film=ordered.findIndex(s=>s.video&&!s.prompt);if(film>0){const s=ordered.splice(film,1)[0];ordered.unshift(s)}
document.getElementById('chapter-nav').innerHTML=ordered.map(s=>{const preview=s.images?.[0]?.src||s.video?.poster||s.videos?.[0]?.poster||p.poster;return `<a class="chapter-tile" href="#${s.anchor}"><img src="${esc(preview)}" alt="" loading="eager"><span>${esc(s.label)}</span></a>`}).join('');
document.getElementById('slides').innerHTML=ordered.map((s,i)=>{
const copy=`<div class="slide-copy"><p class="eyebrow">${esc(s.label)}</p><h2>${esc(s.title)}</h2>${s.text?`<p>${esc(s.text)}</p>`:''}${s.blocks?blocks(s.blocks):''}</div>`;
let media=s.images?figures(s.images):s.video?video(s.video)+(s.video.duration?`<p class="film-meta">${s.video.duration}s · ${s.prompt?'Original generation':'Finished video'}</p>`:''):s.videos?`<div class="multi-video">${s.videos.map((v,n)=>`<article id="${s.label==='Recurring formats'?(n===0?'journal':'letter'):s.anchor+'-clip-'+n}"><h3>${esc(v.title)}</h3>${video(v)}<p class="film-meta">${v.duration}s</p></article>`).join('')}</div>`:'';
const prompt=s.prompt?`<details class="saved-prompt"><summary>Read generation prompt</summary><div>${esc(s.prompt).replace(/\n/g,'<br>')}</div></details>`:'';
const wide=s.images&&s.images.length>2||s.videos||!media||p.id==='spotify-pause'&&!s.video;
return `<section id="${s.anchor}" class="slide flowing-section ${i===0&&s.video?'lead-film':''} ${p.id==='spotify-pause'?'spotify-case-section':''} ${esc(s.gallery||'')}" aria-label="${esc(s.label)}"><div class="${wide?'wide-content':'slide-layout'}">${copy}<div class="slide-media">${media}${prompt}</div></div></section>`}).join('');
const projectOrder=['study-1','study-0','blooming-hollow','white-haired-warrior','diorita','spotify-pause','study-2','study-3','study-4'];const current=projectOrder.indexOf(p.id);const next=data.projects.find(x=>x.id===projectOrder[(current+1)%projectOrder.length]);const previous=data.projects.find(x=>x.id===projectOrder[(current-1+projectOrder.length)%projectOrder.length]);document.querySelector('.project-credits').insertAdjacentHTML('afterend',`<nav class="project-pagination" aria-label="Browse projects"><a href="case.html?project=${previous.id}"><span>Previous project</span><strong>${esc(previous.title)}</strong></a><a class="next-project" href="case.html?project=${next.id}"><span>Next project &rarr;</span><strong>${esc(next.title)}</strong></a></nav>`);
document.getElementById('watch-film').onclick=()=>document.getElementById('film')?.scrollIntoView({behavior:'smooth'});
const dialog=document.getElementById('image-dialog');document.querySelectorAll('figure img').forEach(img=>{function open(){dialog.querySelector('img').src=img.src;dialog.querySelector('img').alt=img.alt;dialog.showModal()}img.onclick=open;img.onkeydown=e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();open()}}});dialog.querySelector('button').onclick=()=>dialog.close();dialog.onclick=e=>{if(e.target===dialog)dialog.close()};
document.querySelectorAll('video').forEach(v=>v.addEventListener('play',()=>document.querySelectorAll('video').forEach(other=>{if(other!==v)other.pause()})));
if(location.hash.startsWith('#chapter-'))history.replaceState(null,'','#'+(ordered.find(s=>s.anchor==='recurring-formats'&&location.hash==='#chapter-4')?'recurring-formats':ordered[0].anchor));
if(location.hash)requestAnimationFrame(()=>document.getElementById(location.hash.slice(1))?.scrollIntoView());
})();

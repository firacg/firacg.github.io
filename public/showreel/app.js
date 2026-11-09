const projects = [
  {id:'paul',presentation:'https://claude.ai/artifact/Y33pLUgqx45XeYeSkAHc3t',title:'Apostle Paul',category:'Historical drama / cinematic study',description:'Character performance, physical action and a world with weight.',role:'Character development, AI visuals & editing',portrait:false},
  {id:'healer',presentation:'/ai-video/assets/foxelli/healer-portfolio.pdf',title:'The King’s Forbidden Healer',category:'Vertical drama',description:'A royal court, a forbidden gift and a character caught in the middle.',role:'Character development, AI visuals & editing',portrait:true,full:'/ai-video/assets/foxelli/healer.mp4'},
  {id:'vampire',presentation:'/ai-video/assets/foxelli/vampire-portfolio.pdf',title:'Vampire',category:'Vertical drama',description:'Tension, intimacy and visual continuity across a dramatic sequence.',role:'Character development, AI visuals & editing',portrait:true,full:'/ai-video/assets/foxelli/vampire.mp4'},
  {id:'diorita',presentation:'/ai-video/case.html?project=diorita',title:'Diorita — Anime',category:'Original fantasy / anime',description:'An original heroine and a fantasy world, brought to life through anime.',role:'Original idea & script, character development, AI visuals & editing',portrait:true},
  {id:'diorita-live',presentation:'/ai-video/case.html?project=diorita',title:'Diorita — Live Action',category:'Original fantasy / video diary & visual studies',description:'All seven videos from the Diorita presentation, assembled in sequence.',role:'Original idea & script, character development, AI visuals & editing',portrait:true},
  {id:'blooming',presentation:'/ai-video/case.html?project=blooming-hollow',title:'Blooming Hollow',category:'Original casual game advertising concept',description:'A neglected farmhouse becomes a place to grow.',role:'Concept, art direction, character development, AI visuals & editing',portrait:true,full:'/ai-video/assets/blooming-film.mp4'},
  {id:'spotify',presentation:'/ai-video/case.html?project=spotify-pause',title:'Spotify — Pause',category:'Independent advertising concept',description:'A small interruption becomes a moment to pause.',role:'Character development, AI visuals & editing',portrait:false,full:'/ai-video/assets/spotify-final.mp4'},
  {id:'lip-gloss',presentation:'/ai-video/case.html?project=study-0',title:'Cucumber Ice',category:'Beauty product concept / independent fan art',description:'Ice, texture, colour. A playful beauty film built around a lip balm-gloss.',role:'Concept, character development, AI visuals & editing',portrait:false,full:'/ai-video/assets/green-lip-gloss.mp4'},
];
const playIcon='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 4 21 12 7 20Z"/></svg>';
const pauseIcon='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 4h4v16H6zM14 4h4v16h-4z"/></svg>';
const fullIcon='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 9V4h5m6 0h5v5M4 15v5h5m6 0h5v-5"/></svg>';
const number=i=>String(i+1).padStart(2,'0');
const fmt=n=>`${Math.floor((n||0)/60)}:${String(Math.floor((n||0)%60)).padStart(2,'0')}`;
const main=document.querySelector('#films'),index=document.querySelector('#index-list');
projects.forEach((p,i)=>{
  const item=document.createElement('button');item.className='index-item';item.dataset.target=p.id;item.setAttribute('aria-label',`${number(i)}. ${p.title}`);item.setAttribute('aria-controls',p.id);
  item.innerHTML=`<span class="index-number">${number(i)}</span><span><span class="thumb-wrap"><img src="assets/${p.id}.jpg" alt="" width="110" height="62"><span class="thumb-progress"></span></span><span class="thumb-name">${p.title}</span></span>`;index.append(item);
  const section=document.createElement('section');section.className='project';section.id=p.id;section.dataset.number=`${number(i)} / ${number(projects.length-1)}`;section.setAttribute('aria-labelledby',`title-${p.id}`);
  section.innerHTML=`<div class="film-column"><div class="stage ${p.portrait?'portrait':'landscape'}"><video src="assets/${p.id}.mp4?v=film-sound-v2" poster="assets/${p.id}.jpg" preload="${i===0?'auto':'none'}" muted playsinline loop aria-label="Selected excerpts from ${p.title}"></video><p class="video-error" hidden>Could not load this excerpt. <button class="retry">Try again</button>${p.full?`<br><a href="${p.full}" target="_blank" rel="noopener">Open the original film ↗</a>`:''}</p></div><div class="controls"><button class="play" aria-label="Play ${p.title}">${playIcon}</button><button class="film-sound" aria-pressed="false" aria-label="Enable original sound for ${p.title}">Sound off</button><input class="seek" type="range" min="0" max="1000" value="0" aria-label="Seek in ${p.title}"><span class="time">0:00 / —</span><button class="fullscreen" aria-label="Fullscreen ${p.title}">${fullIcon}</button></div></div><div class="info"><p class="eyebrow">${p.category}</p><h1 id="title-${p.id}">${p.title}</h1><p class="description">${p.description}</p><dl class="role"><dt>My contribution</dt><dd>${p.role}</dd></dl><div class="project-links"><a class="presentation-link" href="${p.presentation}" target="_blank" rel="noopener" aria-label="View presentation for ${p.title}">View presentation ↗</a>${p.full?`<a class="full-link" href="${p.full}" target="_blank" rel="noopener">${p.fullLabel||'Watch full film'} ↗</a>`:''}</div><p class="excerpt-note">Selected excerpts · Original proportions<br>AI-generated visuals, refined and edited by Fira.</p><button class="next" data-next="${(i+1)%projects.length}">${i===projects.length-1?'Back to the first film':'Next film'} <span aria-hidden="true">↓</span></button></div>`;
  main.append(section);
});
const sections=[...document.querySelectorAll('.project')],videos=sections.map(s=>s.querySelector('video')),items=[...index.children];
let active=-1,manualPause=false,scrollQueued=false,soundOn=false;
function setOriginalSound(on){
 soundOn=on;
 videos.forEach((v,i)=>{v.muted=!on;const b=sections[i].querySelector('.film-sound');b.textContent=on?'Sound on':'Sound off';b.setAttribute('aria-pressed',String(on));b.setAttribute('aria-label',`${on?'Mute':'Enable'} original sound for ${projects[i].title}`)});
}
const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
function activate(i){
 if(i===active)return;
 videos.forEach((v,j)=>{if(j!==i)v.pause()});active=i;manualPause=false;
 items.forEach((item,j)=>{item.setAttribute('aria-current',String(j===i))});
 if(innerWidth<=800){const el=items[i];const rail=document.querySelector('.film-index');rail.scrollTo({left:el.offsetLeft-16,behavior:reduced?'instant':'smooth'})}
 history.replaceState(null,'',`#${projects[i].id}`);
 if(!reduced&&!document.hidden)videos[i].play().catch(()=>{});
}
function closest(){
 scrollQueued=false;const top=innerWidth<=800?169:78;let best=0,dist=Infinity;
 sections.forEach((s,i)=>{const r=s.getBoundingClientRect();const d=Math.abs(r.top-top);if(d<dist){dist=d;best=i}});activate(best);
}
function go(i){sections[i].scrollIntoView({behavior:reduced?'instant':'smooth',block:'start'})}
items.forEach((item,i)=>item.addEventListener('click',()=>go(i)));
sections.forEach((s,i)=>{
 const v=videos[i],btn=s.querySelector('.play'),seek=s.querySelector('.seek'),time=s.querySelector('.time');
 function toggle(){if(v.paused){manualPause=false;v.play().catch(()=>{})}else{manualPause=true;v.pause()}}
 btn.addEventListener('click',toggle);v.addEventListener('click',toggle);
 s.querySelector('.film-sound').addEventListener('click',()=>{setOriginalSound(!soundOn);if(v.paused){manualPause=false;v.play().catch(()=>{})}});
 v.addEventListener('play',()=>{videos.forEach(other=>{if(other!==v)other.pause()});btn.innerHTML=pauseIcon;btn.setAttribute('aria-label',`Pause ${projects[i].title}`)});
 v.addEventListener('pause',()=>{btn.innerHTML=playIcon;btn.setAttribute('aria-label',`Play ${projects[i].title}`)});
 const update=()=>{time.textContent=`${fmt(v.currentTime)} / ${Number.isFinite(v.duration)?fmt(v.duration):'—'}`;seek.value=v.duration?Math.round(v.currentTime/v.duration*1000):0;items[i].style.setProperty('--progress',`${v.duration?v.currentTime/v.duration*100:0}%`)};
 v.addEventListener('timeupdate',update);v.addEventListener('loadedmetadata',update);
 seek.addEventListener('input',()=>{if(Number.isFinite(v.duration))v.currentTime=Number(seek.value)/1000*v.duration});
 s.querySelector('.fullscreen').addEventListener('click',async()=>{try{if(document.fullscreenElement)await document.exitFullscreen();else if(s.querySelector('.stage').requestFullscreen)await s.querySelector('.stage').requestFullscreen();else if(v.webkitEnterFullscreen)v.webkitEnterFullscreen()}catch{v.setAttribute('controls','')}});
 s.querySelector('.next').addEventListener('click',()=>go((i+1)%projects.length));
 v.addEventListener('error',()=>{s.querySelector('.video-error').hidden=false});
 s.querySelector('.retry').addEventListener('click',()=>{s.querySelector('.video-error').hidden=true;v.load();v.play().catch(()=>{})});
});
addEventListener('scroll',()=>{if(!scrollQueued){scrollQueued=true;requestAnimationFrame(closest)}},{passive:true});
addEventListener('resize',closest);
addEventListener('keydown',e=>{if(e.target.matches('input,button,a')||document.querySelector('dialog[open]'))return;if(e.code==='Space'){e.preventDefault();sections[active]?.querySelector('.play').click()}else if(e.key==='ArrowDown'||e.key==='PageDown'){e.preventDefault();go(Math.min(projects.length-1,active+1))}else if(e.key==='ArrowUp'||e.key==='PageUp'){e.preventDefault();go(Math.max(0,active-1))}});
document.addEventListener('visibilitychange',()=>{if(document.hidden)videos.forEach(v=>v.pause());else if(!manualPause&&!reduced)videos[active]?.play().catch(()=>{})});
const initial=projects.findIndex(p=>`#${p.id}`===location.hash);if(initial>=0){sections[initial].scrollIntoView({behavior:'instant'});activate(initial)}else activate(0);

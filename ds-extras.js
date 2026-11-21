/* DOLLAR STORE — extras overlay. Configure below. */
(function(){
'use strict';
var CFG=Object.assign({
  discord:'https://discord.gg/QJcfHWwZkc',
  whatsapp:'https://wa.me/201031652348',
  youtubeId:'',          // e.g. 'dQw4w9WgXcQ' — YouTube video explaining the site
  videoSrc:'',           // or a direct .mp4 URL for the looping preview
  creatorEndpoint:'',    // optional POST URL (e.g. Supabase REST/Edge Function) for Creator ideas
  kycEndpoint:''         // optional POST URL to upload vendor verification photos
},window.DS_CONFIG||{});
var NAMES=['الله','الرَّحْمَنُ','الرَّحِيمُ','الْمَلِكُ','الْقُدُّوسُ','السَّلَامُ','الْمُؤْمِنُ','الْمُهَيْمِنُ','الْعَزِيزُ','الْجَبَّارُ','الْمُتَكَبِّرُ','الْخَالِقُ','الْبَارِئُ','الْمُصَوِّرُ','الْغَفَّارُ','الْقَهَّارُ','الْوَهَّابُ','الرَّزَّاقُ','الْفَتَّاحُ','الْعَلِيمُ','الْقَابِضُ','الْبَاسِطُ','الْخَافِضُ','الرَّافِعُ','الْمُعِزُّ','الْمُذِلُّ','السَّمِيعُ','الْبَصِيرُ','الْحَكَمُ','الْعَدْلُ','اللَّطِيفُ','الْخَبِيرُ','الْحَلِيمُ','الْعَظِيمُ','الْغَفُورُ','الشَّكُورُ','الْعَلِيُّ','الْكَبِيرُ','الْحَفِيظُ','الْمُقِيتُ','الْحَسِيبُ','الْجَلِيلُ','الْكَرِيمُ','الرَّقِيبُ','الْمُجِيبُ','الْوَاسِعُ','الْحَكِيمُ','الْوَدُودُ','الْمَجِيدُ','الْبَاعِثُ','الشَّهِيدُ','الْحَقُّ','الْوَكِيلُ','الْقَوِيُّ','الْمَتِينُ','الْوَلِيُّ','الْحَمِيدُ','الْمُحْصِي','الْمُبْدِئُ','الْمُعِيدُ','الْمُحْيِي','الْمُمِيتُ','الْحَيُّ','الْقَيُّومُ','الْوَاجِدُ','الْمَاجِدُ','الْوَاحِدُ','الأَحَدُ','الصَّمَدُ','الْقَادِرُ','الْمُقْتَدِرُ','الْمُقَدِّمُ','الْمُؤَخِّرُ','الأَوَّلُ','الآخِرُ','الظَّاهِرُ','الْبَاطِنُ','الْوَالِي','الْمُتَعَالِي','الْبَرُّ','التَّوَّابُ','الْمُنْتَقِمُ','الْعَفُوُّ','الرَّؤُوفُ','مَالِكُ الْمُلْكِ','ذُو الْجَلَالِ وَالإِكْرَامِ','الْمُقْسِطُ','الْجَامِعُ','الْغَنِيُّ','الْمُغْنِي','الْمَانِعُ','الضَّارُّ','النَّافِعُ','النُّورُ','الْهَادِي','الْبَدِيعُ','الْبَاقِي','الْوَارِثُ','الرَّشِيدُ','الصَّبُورُ'];
var $=function(s,r){return (r||document).querySelector(s)};
function bi(en,ar){return '<span class="dsx-en">'+en+'</span><span class="dsx-ar">'+ar+'</span>'}
function el(h){var d=document.createElement('div');d.innerHTML=h.trim();return d.firstChild}
var isHome=function(){return /^\/Dollar-Store-\/?$/.test(location.pathname)||location.pathname==='/'};
var isSell=function(){return /\/sell\/?$/.test(location.pathname)};

/* 8. Asma Al-Husna ticker */
function ticker(){
  if($('.dsx-ticker'))return;
  var items=NAMES.map(function(n){return '<span>'+n+'</span>'}).join('');
  var t=el('<div class="dsx-ticker" aria-label="أسماء الله الحسنى" role="marquee"><div class="dsx-ticker-track">'+items+items+'</div></div>');
  document.body.insertBefore(t,document.body.firstChild);
}
/* 11. Discord + WhatsApp in top nav (inside the header's right-hand action group) */
function socialHTML(cls){return '<div class="dsx-social '+cls+'">'+
   '<a href="'+CFG.discord+'" target="_blank" rel="noopener noreferrer" aria-label="Discord"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.317 4.37a19.79 19.79 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.74 19.74 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.1 13.1 0 0 1-1.872-.892.077.077 0 0 1-.008-.128c.126-.094.252-.192.372-.291a.074.074 0 0 1 .078-.01c3.928 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .079.009c.12.099.246.198.373.292a.077.077 0 0 1-.006.127 12.3 12.3 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.84 19.84 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.06.06 0 0 0-.031-.03ZM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.095 2.157 2.42 0 1.333-.956 2.418-2.157 2.418Zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.095 2.157 2.42 0 1.333-.946 2.418-2.157 2.418Z"/></svg></a>'+
   '<a href="'+CFG.whatsapp+'" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/></svg></a></div>'}
function social(){
  var h=$('header');if(!h)return;
  if(!$('.dsx-social-head',h)){var grp=$('.container-page > div:last-child',h)||$('.container-page',h)||h;grp.insertBefore(el(socialHTML('dsx-social-head')),grp.firstChild)}
  var bar=$('.market-announcement .container-page');
  if(bar&&!$('.dsx-social-strip',bar))bar.appendChild(el(socialHTML('dsx-social-strip')));
}
/* 5. Hero 3D dollar + payment icons + cashback copy */
function hero(){
  if(!isHome())return;
  var grid=$('.market-hero-grid');if(!grid)return;
  grid.classList.add('dsx-on');
  if($('.dsx-hero-visual',grid))return;
  var layers='';for(var z=-14;z<=14;z+=2){layers+='<span class="dsx-face'+(Math.abs(z)===14?' dsx-cap':'')+'" style="transform:translateZ('+z+'px)">$</span>'}
  var v=el('<div class="dsx-hero-visual">'+
   '<div class="dsx-stage" aria-hidden="true"><div class="dsx-coin">'+layers+'</div></div>'+
   '<div class="dsx-pay" aria-label="Payment methods">'+
    '<span class="dsx-chip"><i style="background:#19c37d">E</i>'+bi('E-Wallets','المحافظ الإلكترونية')+'</span>'+
    '<span class="dsx-chip"><i style="background:#7c3aed;color:#fff">I</i>InstaPay</span>'+
    '<span class="dsx-chip"><i style="background:#f5c542">B</i>Binance</span>'+
    '<span class="dsx-chip soon"><i style="background:transparent;border:1px dashed #f5c542;color:#f5c542">+</i>'+bi('Coming Soon','قريبًا')+'</span></div>'+
   '<div class="dsx-cashback">'+bi('<b>1% Cashback</b> on every purchase — credited automatically to your wallet within seconds of completing each payment.','<b>استرداد نقدي 1٪</b> على كل عملية شراء، يُضاف تلقائيًا إلى محفظتك خلال ثوانٍ من إتمام الدفع.')+'</div></div>');
  grid.appendChild(v);
}
/* 6. Picture-in-picture guide */
function pip(){
  if($('.dsx-pip')||$('.dsx-modal'))return;
  var inner;
  if(CFG.videoSrc)inner='<video src="'+CFG.videoSrc+'" autoplay muted loop playsinline></video>';
  else if(CFG.youtubeId)inner='<iframe src="https://www.youtube-nocookie.com/embed/'+CFG.youtubeId+'?autoplay=1&mute=1&loop=1&playlist='+CFG.youtubeId+'&controls=0" allow="autoplay" title="How it works"></iframe>';
  else inner='<div class="dsx-demo"><div>'+bi('1 · Browse &amp; pick','١ · تصفح واختر')+'</div><div>'+bi('2 · Pay securely','٢ · ادفع بأمان')+'</div><div>'+bi('3 · Get instant delivery','٣ · استلم فورًا')+'</div><div>'+bi('4 · 1% cashback','٤ · كاش باك ١٪')+'</div></div>';
  var p=el('<div class="dsx-pip" role="button" tabindex="0" aria-label="How it works — expand">'+inner+'<button class="dsx-pip-x" aria-label="Close">×</button><span class="dsx-play">'+bi('▶ How it works','▶ كيف يعمل')+'</span></div>');
  p.addEventListener('click',function(e){if(e.target.className==='dsx-pip-x'){p.remove();window.__dsPipClosed=1;return}expand()});
  p.addEventListener('keydown',function(e){if(e.key==='Enter')expand()});
  document.body.appendChild(p);
}
function modal(content){
  var m=el('<div class="dsx-modal"><button class="dsx-close">✕ Close / إغلاق</button><div class="dsx-box">'+content+'</div></div>');
  function close(){m.remove();document.removeEventListener('keydown',esc)}
  function esc(e){if(e.key==='Escape')close()}
  m.querySelector('.dsx-close').onclick=close;m.addEventListener('click',function(e){if(e.target===m)close()});
  document.addEventListener('keydown',esc);document.body.appendChild(m);return m;
}
function expand(){
  var player=CFG.youtubeId?'<iframe src="https://www.youtube-nocookie.com/embed/'+CFG.youtubeId+'?autoplay=1&rel=0" allow="autoplay; fullscreen" allowfullscreen title="How it works"></iframe>':
   CFG.videoSrc?'<video src="'+CFG.videoSrc+'" controls autoplay playsinline></video>':'';
  var m=modal('<h2 style="font-size:22px;font-weight:900;margin-bottom:10px">How DOLLAR STORE works · كيف يعمل الموقع</h2>'+(player?'<div class="dsx-player">'+player+'</div>':'')+
   '<div class="dsx-steps"><div><b>1</b>Browse keys, gift cards, accounts &amp; subscriptions from verified vendors.</div><div><b>2</b>Pay with E-Wallets, InstaPay or Binance.</div><div><b>3</b>Receive your digital item instantly.</div><div><b>4</b>Get 1% cashback in your wallet within seconds.</div></div>');
  var f=m.querySelector('.dsx-player');if(f&&f.requestFullscreen)f.addEventListener('dblclick',function(){f.requestFullscreen()});
}
/* 7. The Creator */
function creator(){
  if($('.dsx-creator-fab'))return;
  var b=el('<button class="dsx-creator-fab">'+bi('💡 The Creator','💡 المبدع')+'</button>');
  b.onclick=openCreator;document.body.appendChild(b);
}
function openCreator(){
  var m=modal('<h2 style="font-size:22px;font-weight:900">💡 The Creator · المبدع</h2><p style="opacity:.8;margin-top:6px;line-height:1.7">Have an idea to improve the site? Send it here. Accepted ideas earn a <b style="color:#f5c542">cash reward</b>. · أرسل فكرتك لتطوير الموقع، والأفكار المقبولة تحصل على مكافأة نقدية.</p>'+
  '<form class="dsx-form"><label>Your name / الاسم</label><input name="name" required minlength="2"><label>Contact (WhatsApp / Discord) / وسيلة تواصل</label><input name="contact" required minlength="4"><label>Idea title / عنوان الفكرة</label><input name="title" required minlength="4" maxlength="120"><label>Category / النوع</label><select name="cat"><option>Feature</option><option>Design</option><option>Payments</option><option>Security</option><option>Other</option></select><label>Describe your idea / وصف الفكرة</label><textarea name="body" rows="5" required minlength="20" maxlength="2000"></textarea><label>Reward payout method / طريقة استلام المكافأة</label><select name="payout"><option>E-Wallet</option><option>InstaPay</option><option>Binance</option></select><button class="dsx-btn" type="submit">Submit idea / إرسال</button><p class="dsx-msg" style="margin-top:.6rem"></p></form>');
  var f=m.querySelector('form'),msg=m.querySelector('.dsx-msg');
  f.addEventListener('submit',function(e){e.preventDefault();
    var d=Object.fromEntries(new FormData(f).entries());d.created_at=new Date().toISOString();d.status='pending';
    try{var a=JSON.parse(localStorage.getItem('ds_creator_ideas_v1')||'[]');a.push(d);localStorage.setItem('ds_creator_ideas_v1',JSON.stringify(a))}catch(_){}
    var done=function(ok){msg.className='dsx-msg '+(ok?'dsx-ok':'dsx-err');msg.textContent=ok?'Thank you! Your idea was received. · شكرًا! تم استلام فكرتك.':'Could not send. Try again. · تعذر الإرسال.'};
    if(CFG.creatorEndpoint)fetch(CFG.creatorEndpoint,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(d)}).then(function(r){done(r.ok)}).catch(function(){done(false)});
    else done(true);
  });
}
/* 1. Camera-only vendor verification: live captures replace the file picker */
var kyc={selfie:null,id:null};
function docInput(form){return form.querySelector('input[type=file]')}
function syncDocs(form){
  var inp=docInput(form);if(!inp||typeof DataTransfer==='undefined')return;
  var dt=new DataTransfer();
  if(kyc.selfie)dt.items.add(kyc.selfie);
  if(kyc.id)dt.items.add(kyc.id);
  inp.files=dt.files;
  inp.dispatchEvent(new Event('change',{bubbles:true}));
}
function kycPanel(){
  if(!isSell())return;
  var form=$('form.space-y-4')||$('main form');if(!form)return;
  var inp=docInput(form);
  if(inp){ // lock the saved-file picker for good: no clicking, no keyboard, no drop
    inp.setAttribute('tabindex','-1');
    var lab=inp.closest('label');if(lab)lab.style.display='none';
  }
  if(!form.__dsx){
    form.__dsx=1;
    form.addEventListener('click',function(e){var t=e.target;if(t&&t.closest&&!t.closest('.dsx-kyc')&&(t.type==='file'||(t.closest('label')&&t.closest('label').querySelector('input[type=file]')))){e.preventDefault();e.stopPropagation()}},true);
    ['dragover','drop'].forEach(function(n){form.addEventListener(n,function(e){e.preventDefault()},true)});
    form.addEventListener('submit',function(e){
      if(kyc.selfie&&kyc.id)return;
      e.preventDefault();e.stopImmediatePropagation();
      var p=$('.dsx-kyc',form);if(!p)return;
      var st=p.querySelector('.dsx-gate');st.textContent='Both live camera photos are required before applying. · يجب التقاط الصورتين بالكاميرا أولًا.';
      p.scrollIntoView({behavior:'smooth',block:'center'});
    },true);
  }
  if($('.dsx-kyc',form))return;
  kyc.selfie=null;kyc.id=null;
  var p=el('<div class="dsx-kyc"><h3>🔒 Live identity verification (required) · التحقق المباشر</h3><p style="font-size:13px;opacity:.85;line-height:1.7">Open your camera and take two live photos: (1) your face holding your ID card, (2) the ID card itself. Uploading saved images is not allowed. · افتح الكاميرا والتقط صورتين مباشرتين: وجهك وأنت تمسك البطاقة، ثم صورة البطاقة. رفع الصور المحفوظة غير مسموح.</p><div class="dsx-slot"></div><div class="dsx-slot"></div><p class="dsx-err dsx-gate" role="alert"></p></div>');
  [['selfie','Photo 1: You + your ID card · صورتك مع البطاقة','user','kyc-selfie.jpg'],['id','Photo 2: ID card (front) · صورة البطاقة','environment','kyc-id.jpg']].forEach(function(c,i){
    var slot=p.querySelectorAll('.dsx-slot')[i];
    slot.innerHTML='<b>'+c[1]+'</b><div class="dsx-view"></div><button type="button" class="dsx-btn">📷 Open camera</button> <span class="dsx-st" role="status"></span>';
    slot.querySelector('button').onclick=function(){capture(form,c[0],c[2],c[3],slot)};
  });
  var anchor=form.lastElementChild;form.insertBefore(p,anchor);
}
function stopStream(slot){if(slot.__stream){slot.__stream.getTracks().forEach(function(t){t.stop()});slot.__stream=null}}
function capture(form,key,facing,fname,slot){
  var view=slot.querySelector('.dsx-view'),st=slot.querySelector('.dsx-st'),btn=slot.querySelector('button');
  st.className='dsx-st';st.textContent='';
  if(!navigator.mediaDevices||!navigator.mediaDevices.getUserMedia){st.className='dsx-st dsx-err';st.textContent='Camera not available (HTTPS and a camera are required).';return}
  stopStream(slot);
  navigator.mediaDevices.getUserMedia({video:{facingMode:facing},audio:false}).then(function(stream){
    slot.__stream=stream;
    var v=document.createElement('video');v.autoplay=true;v.playsInline=true;v.muted=true;v.srcObject=stream;view.innerHTML='';view.appendChild(v);
    btn.textContent='📸 Capture';
    btn.onclick=function(){
      if(!v.videoWidth){st.className='dsx-st dsx-err';st.textContent='Camera is still starting — try again.';return}
      var sc=Math.min(1,1600/Math.max(v.videoWidth,v.videoHeight));var c=document.createElement('canvas');c.width=Math.round(v.videoWidth*sc);c.height=Math.round(v.videoHeight*sc);c.getContext('2d').drawImage(v,0,0,c.width,c.height);
      c.toBlob(function(blob){
        stopStream(slot);
        if(!blob){st.className='dsx-st dsx-err';st.textContent='Capture failed. Try again.';return}
        kyc[key]=new File([blob],fname,{type:'image/jpeg',lastModified:Date.now()});
        view.innerHTML='';var img=new Image();img.alt='Captured photo';img.src=URL.createObjectURL(blob);view.appendChild(img);
        st.className='dsx-st dsx-ok';st.textContent='✓ Captured live';
        btn.textContent='↻ Retake';btn.onclick=function(){kyc[key]=null;syncDocs(form);capture(form,key,facing,fname,slot)};
        var g=$('.dsx-gate',form);if(g&&kyc.selfie&&kyc.id)g.textContent='';
        syncDocs(form);
      },'image/jpeg',.85);
    };
  }).catch(function(){st.className='dsx-st dsx-err';st.textContent='Camera permission denied or no camera found. Allow camera access to continue.'});
}
function tick(){
  ticker();social();creator();
  if(isHome()){hero();if(!window.__dsPipClosed)pip()}else{var p=$('.dsx-pip');if(p)p.remove()}
  kycPanel();
}
new MutationObserver(function(){clearTimeout(tick.t);tick.t=setTimeout(tick,120)}).observe(document.documentElement,{childList:true,subtree:true});
document.addEventListener('DOMContentLoaded',tick);tick();
})();

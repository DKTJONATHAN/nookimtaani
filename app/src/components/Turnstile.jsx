import React,{useEffect,useRef} from 'react';
export default function Turnstile({onToken}) {
  const mount=useRef(null);
  useEffect(()=>{
    const siteKey=import.meta.env.VITE_TURNSTILE_SITE_KEY;
    if(!siteKey)return;
    let widget=null;
    const timer=setInterval(()=>{
      if(!window.turnstile||!mount.current)return;
      clearInterval(timer);
      widget=window.turnstile.render(mount.current,{sitekey:siteKey,callback:onToken,'expired-callback':()=>onToken(''),'error-callback':()=>onToken('')});
    },150);
    return ()=>{clearInterval(timer);if(widget!==null&&window.turnstile)window.turnstile.remove(widget)};
  },[onToken]);
  return import.meta.env.VITE_TURNSTILE_SITE_KEY?<div className="turnstile-widget" ref={mount} aria-label="Security verification"/>:null;
}

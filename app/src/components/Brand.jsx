import React from 'react';
export default function Brand({light=false}){return <a className={`brand ${light?'brand-light':''}`} href="#top" aria-label="Nooki Mtaani home"><span className="brand-mark">n</span><span>nooki<span className="brand-dot">.</span></span></a>}

import React,{useState} from 'react';
import {ArrowUpRight,Menu,X} from 'lucide-react';
import Brand from './Brand.jsx';
export default function SiteHeader(){const[open,setOpen]=useState(false);const close=()=>setOpen(false);return <header className="site-header"><Brand/><button className="mobile-menu" onClick={()=>setOpen(!open)} aria-label={open?'Close menu':'Open menu'} aria-expanded={open}>{open?<X/>:<Menu/>}</button><nav className={open?'site-nav is-open':'site-nav'} aria-label="Main navigation"><a href="#spaces" onClick={close}>Find a space</a><a href="#how-it-works" onClick={close}>How it works</a><a href="#hosts" onClick={close}>For hosts</a><a className="nav-list-link" href="#hosts" onClick={close}>List your space <ArrowUpRight size={15}/></a></nav></header>}

import React,{useState} from 'react';
import SiteHeader from './components/SiteHeader.jsx';
import SearchBar from './components/SearchBar.jsx';
import SpaceDiscovery from './components/SpaceDiscovery.jsx';
import HowItWorks from './components/HowItWorks.jsx';
import HostSection from './components/HostSection.jsx';
import SiteFooter from './components/SiteFooter.jsx';
import {ArrowDownRight,ArrowUpRight} from 'lucide-react';
function Hero({onSearch}){return <section className="hero"><div className="hero-image" aria-hidden="true"><img src="https://images.unsplash.com/photo-1601598851547-4302969d0614?auto=format&fit=crop&w=1800&q=90" alt=""/></div><div className="hero-shade"/><div className="hero-content"><span className="hero-kicker"><i/> STORAGE THAT FITS THE WAY YOU WORK</span><h1>More room.<br/><em>Less holding back.</em></h1><p>Flexible neighbourhood storage for shop owners, online sellers and growing businesses. Find space for your stock without taking on a whole warehouse.</p><SearchBar onSearch={onSearch}/><div className="hero-bottom"><span>BUILT AROUND SMALL BUSINESS IN KENYA</span><a href="#spaces">Explore the idea <ArrowDownRight size={15}/></a></div></div><div className="hero-side-note">ROOM TO GROW / 001</div></section>}
function TrustStrip(){return <div className="trust-strip"><span>SMALL BUSINESS FIRST</span><span>FLEXIBLE TERMS</span><span>VERIFIED SPACES</span><span>NO HIDDEN SURPRISES</span></div>}
export default function App(){const[search,setSearch]=useState(null);return <div className="app-shell" id="top"><SiteHeader/><main><Hero onSearch={setSearch}/><TrustStrip/><SpaceDiscovery search={search}/><HowItWorks/><HostSection/><section className="closing-band"><span className="eyebrow">A LITTLE SPACE CAN CHANGE A LOT.</span><h2>Make room for<br/><em>what’s next.</em></h2><a href="#spaces">Explore Nooki <ArrowUpRight size={16}/></a></section></main><SiteFooter/></div>}

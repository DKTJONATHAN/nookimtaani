import React,{useEffect,useState} from 'react';
import SiteHeader from './components/SiteHeader.jsx';
import SearchBar from './components/SearchBar.jsx';
import SpaceDiscovery from './components/SpaceDiscovery.jsx';
import HowItWorks from './components/HowItWorks.jsx';
import HostSection from './components/HostSection.jsx';
import SiteFooter from './components/SiteFooter.jsx';
import ContactPage from './components/ContactPage.jsx';
import StaticPage from './components/StaticPage.jsx';
import {ArrowDownRight,ArrowUpRight} from 'lucide-react';
import {AuthPage,VerifyEmailPage,AccountPage,HostApplyPage,ListingDetailPage} from './components/PlatformPages.jsx';

const currentPath=()=>window.location.pathname.replace(/\/$/,'')||'/';

function Hero({onSearch}){
  return <section className="hero">
    <div className="hero-content">
      <span className="hero-kicker"><i/> NEIGHBOURHOOD STORAGE FOR BUSINESS</span>
      <h1>Make space<br/>for <em>business.</em></h1>
      <p>Secure, flexible places to keep your stock, supplies and online orders — without committing to a full warehouse.</p>
      <SearchBar onSearch={onSearch}/>
      <div className="hero-bottom">
        <span>MADE FOR THE WAY KENYAN BUSINESSES WORK</span>
        <a href="/how-it-works">See how Nooki works <ArrowDownRight size={14}/></a>
      </div>
    </div>
    <div className="hero-image"><img src="https://images.unsplash.com/photo-1601598851547-4302969d0614?auto=format&fit=crop&w=1800&q=90" alt="Organised commercial storage space with shelves and supplies"/></div>
    <div className="hero-side-note">FLEXIBLE SPACE / LOCAL ACCESS</div>
  </section>;
}

function TrustStrip(){
  return <div className="trust-strip"><span>FOR SMALL MERCHANTS</span><span>DAILY / WEEKLY / MONTHLY</span><span>SPACE DETAILS THAT MATTER</span><span>LOCAL HOSTS, LOCAL AREAS</span></div>;
}

export default function App(){
  const [search,setSearch]=useState(null);
  const [path,setPath]=useState(currentPath);

  // Keep navigation inside the React app so page links do not reload the whole site.
  useEffect(()=>{
    const onPopState=()=>setPath(currentPath());
    const onDocumentClick=(event)=>{
      if(event.defaultPrevented||event.button!==0||event.metaKey||event.ctrlKey||event.shiftKey||event.altKey)return;
      const anchor=event.target.closest('a[href]');
      if(!anchor||anchor.target||anchor.hasAttribute('download'))return;
      const destination=new URL(anchor.href,window.location.href);
      if(destination.origin!==window.location.origin||destination.pathname===window.location.pathname&&destination.search===window.location.search)return;
      if(destination.pathname.startsWith('/api/'))return;
      event.preventDefault();
      window.history.pushState({},'',destination.pathname+destination.search+destination.hash);
      setPath(currentPath());
      setSearch(null);
      window.scrollTo({top:0,behavior:'auto'});
    };
    window.addEventListener('popstate',onPopState);
    document.addEventListener('click',onDocumentClick);
    return ()=>{
      window.removeEventListener('popstate',onPopState);
      document.removeEventListener('click',onDocumentClick);
    };
  },[]);

  let page;
  if(path==='/login')page=<AuthPage mode="login"/>;
  else if(path==='/signup')page=<AuthPage mode="signup"/>;
  else if(path==='/verify-email')page=<VerifyEmailPage/>;
  else if(path==='/account')page=<AccountPage/>;
  else if(path==='/host/apply')page=<HostApplyPage/>;
  else if(path.startsWith('/spaces/'))page=<ListingDetailPage/>;
  else if(path==='/contact')page=<ContactPage/>;
  else if(['/about','/privacy','/terms','/cookies','/how-it-works'].includes(path))page=<StaticPage path={path}/>;
  else if(path==='/host')page=<HostSection/>;
  else if(path==='/spaces')page=<SpaceDiscovery search={search}/>;
  else if(path==='/'||path==='/index.html')page=<><Hero onSearch={setSearch}/><TrustStrip/><SpaceDiscovery search={search}/><HowItWorks/><HostSection/><section className="closing-band"><div><span className="eyebrow">YOUR STOCK NEEDS ROOM TO MOVE.</span><h2>Find your space.<br/><em>Keep moving.</em></h2></div><a href="/spaces">Explore Nooki <ArrowUpRight size={15}/></a></section></>;
  else page=<section className="page-section"><div className="page-inner"><span className="eyebrow">PAGE NOT FOUND</span><h1>We couldn't find that page.</h1><p>The link may be out of date, or the address may have been entered incorrectly.</p><a href="/">Return to Nooki home</a></div></section>;

  return <div className="app-shell" id="top"><SiteHeader/><main key={path}>{page}</main><SiteFooter/></div>;
}

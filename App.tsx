
import React, { useEffect } from 'react';
import { Routes, Route, Link, useLocation, Navigate } from 'react-router-dom';
import { Menu, X, Instagram, Facebook, Youtube, ChevronRight, FileDown, Mail, MapPin, Phone, Lock, User } from 'lucide-react';

// Pages
import Home from './pages/Home';
import About from './pages/About';
import Programs from './pages/Programs';
import YouthActors from './pages/YouthActors';
import ActorProfile from './pages/ActorProfile';
import Films from './pages/Films';
import Apply from './pages/Apply';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import SummerCamp from './pages/SummerCamp';

// Context
import { AuthProvider, useAuth } from './AuthContext';
import { DataProvider } from './DataContext';

// Constants for Preloading
import { ACTORS, FILMS } from './constants';

// Components
import ChatBot from './components/ChatBot';

const ProtectedRoute = ({ children }: { children?: React.ReactNode }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
};

const Logo = ({ size = "normal" }: { size?: "normal" | "small" }) => (
  <Link to="/" className="flex items-center gap-3 group">
    <img referrerPolicy="no-referrer" 
      src="https://i.ibb.co/c4Rn9W9/ALT-LOGO-2400x1800.png" 
      alt="ALT Logo"
      className={`${size === 'small' ? 'h-10 md:h-12' : 'h-12 md:h-16'} w-auto object-contain group-hover:scale-105 transition-transform`}
      fetchPriority="high"
      loading="eager"
    />
    <div className="flex flex-col leading-none">
      <span className={`${size === 'small' ? 'text-xl md:text-2xl' : 'text-2xl md:text-3xl'} font-cinematic font-black brand-gradient-text tracking-tight`}>ALT</span>
      <span className={`${size === 'small' ? 'text-[10px] md:text-xs' : 'text-xs md:text-sm'} text-white/80 font-bold tracking-[0.2em] uppercase`}>Hollywood Dream Star</span>
    </div>
  </Link>
);

const Header = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const { pathname } = useLocation();
  const { isAuthenticated, logout } = useAuth();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Programs', path: '/programs' },
    { name: 'Actors', path: '/actors' },
    { name: 'Films', path: '/films' },
    { name: 'Apply', path: '/apply' },
    { name: 'Summer Camp', path: '/summer-camp' },
  ];

  const isActive = (path: string) => pathname === path;

  return (
    <nav className="fixed w-full z-50 bg-brandBlack/95 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 md:h-20 items-center">
          <Logo />

          {/* Desktop Nav */}
          <div className="hidden xl:flex items-center space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-xs md:text-sm uppercase tracking-widest font-bold transition-all hover:brand-gradient-text ${
                  isActive(link.path) ? 'brand-gradient-text' : 'text-white/70'
                }`}
              >
                {link.name}
              </Link>
            ))}
            {isAuthenticated ? (
              <div className="flex items-center gap-4 pl-4 border-l border-white/10">
                <Link to="/dashboard" className="text-xs md:text-sm uppercase tracking-widest font-black brand-gradient-text flex items-center gap-1">
                   <User size={14} /> Dashboard
                </Link>
                <button onClick={logout} className="text-xs md:text-sm uppercase tracking-widest font-bold text-red-500 hover:text-red-400">Logout</button>
              </div>
            ) : (
              <Link to="/login" className="p-2 border border-brandCyan/20 rounded-full hover:border-brandCyan text-brandCyan transition-all ml-2">
                <Lock size={14} />
              </Link>
            )}
          </div>

          <div className="xl:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-white p-2">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="xl:hidden bg-brandBlack border-b border-white/10 px-6 py-6 space-y-4 shadow-2xl">
          {navLinks.map((link) => (
            <Link key={link.path} to={link.path} onClick={() => setIsOpen(false)} className={`block text-sm font-bold uppercase tracking-[0.2em] py-3 border-b border-white/5 ${isActive(link.path) ? 'brand-gradient-text' : 'text-white'}`}>
              {link.name}
            </Link>
          ))}
          {isAuthenticated && <Link to="/dashboard" onClick={() => setIsOpen(false)} className="block text-sm font-bold uppercase tracking-[0.2em] brand-gradient-text py-3">Dashboard</Link>}
        </div>
      )}
    </nav>
  );
};

const Partners = () => {
  const PARTNER_LOGOS = [
    "https://i.ibb.co/VchGJNF0/20251229153109-206-10.png",
    "https://i.ibb.co/mrMqxmgs/1.png",
    "https://i.ibb.co/pvjT9QV9/1346.png",
    "https://i.ibb.co/zV023dCb/20250905152435-265-151.jpg",
    "https://i.ibb.co/4RNsSNYg/AI-8707697f3ab3980df8ccc03824c49fc3-3804x2800.png",
    "https://i.ibb.co/Ldwg7vRN/4a2ec28a2689027a04641d8a150fda3f.png",
    "https://i.ibb.co/cSVbb7ZM/list-2.png",
    "https://i.ibb.co/RGZvtdWN/Alvantor-new-logo-2020-1.png"
  ];

  return (
    <div className="bg-brandBlack border-t border-white/10 py-10 overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6 text-center">
        <h3 className="brand-gradient-text text-xs font-black tracking-[0.4em] uppercase">Our Partners</h3>
      </div>
      
      {/* Gradient Masks for fade effect */}
      <div className="absolute top-0 left-0 w-12 md:w-40 h-full bg-gradient-to-r from-brandBlack to-transparent z-10 pointer-events-none"></div>
      <div className="absolute top-0 right-0 w-12 md:w-40 h-full bg-gradient-to-l from-brandBlack to-transparent z-10 pointer-events-none"></div>

      <div className="flex w-max animate-scroll">
        {/* Tripled list for seamless loop */}
        {[...PARTNER_LOGOS, ...PARTNER_LOGOS, ...PARTNER_LOGOS].map((logo, index) => (
          <div key={index} className="mx-4 md:mx-8 w-32 md:w-48 h-16 md:h-28 flex items-center justify-center bg-white rounded-xl md:rounded-2xl p-4 border border-white/10 hover:border-brandCyan/50 transition-all duration-300 shadow-lg">
            <img referrerPolicy="no-referrer" 
              src={logo} 
              alt={`Partner ${index}`} 
              className="max-w-full max-h-full object-contain transition-all duration-300"
              loading="lazy"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

const Footer = () => (
  <footer className="bg-brandBlack border-t border-white/10 pt-12 pb-8 font-sans">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
        <div className="col-span-1 md:col-span-1">
          <Logo size="small" />
          <p className="text-gray-400 text-xs md:text-sm mt-4 leading-relaxed font-medium">
            Professional Youth Film Platform based in Los Angeles, bridging training and real production using Hollywood industry standards.
          </p>
        </div>
        
        <div>
          <h4 className="text-white font-bold mb-4 uppercase tracking-widest text-xs">Quick Links</h4>
          <ul className="space-y-2 text-xs md:text-sm text-gray-400 font-medium">
            <li><Link to="/programs" className="hover:text-brandCyan transition-colors">Programs & History</Link></li>
            <li><Link to="/films" className="hover:text-brandCyan transition-colors">Films</Link></li>
            <li><Link to="/apply" className="hover:text-brandCyan transition-colors">Apply & Contact</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-bold mb-4 uppercase tracking-widest text-xs">Industry Access</h4>
          <ul className="space-y-2 text-xs md:text-sm text-gray-400 font-medium">
            <li><Link to="/login" className="flex items-center gap-2 hover:text-brandCyan"><Lock size={14} /> Internal Portal</Link></li>
            <li className="flex items-center gap-2 cursor-pointer hover:text-brandCyan"><FileDown size={16} /> Application Forms</li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-bold mb-4 uppercase tracking-widest text-xs">Follow Us</h4>
          <div className="flex space-x-3 mb-4">
            <a href="https://www.instagram.com/altdreamstar" target="_blank" rel="noopener noreferrer" className="p-2 border border-white/10 rounded-full hover:border-brandCyan hover:text-brandCyan transition-all text-gray-400"><Instagram size={18} /></a>
            <a href="#" className="p-2 border border-white/10 rounded-full hover:border-brandCyan hover:text-brandCyan transition-all text-gray-400"><Facebook size={18} /></a>
            <a href="#" className="p-2 border border-white/10 rounded-full hover:border-brandCyan hover:text-brandCyan transition-all text-gray-400"><Youtube size={18} /></a>
          </div>
          <div className="text-gray-400 text-xs md:text-sm space-y-3 font-medium">
            <div className="flex items-start gap-3">
              <MapPin size={16} className="mt-0.5 shrink-0 text-brandCyan" />
              <div>
                <p className="font-bold text-white text-xs mb-0.5">HEADQUARTERS</p>
                <p>633 W 5th St, Los Angeles, CA 90071</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <MapPin size={16} className="mt-0.5 shrink-0 text-brandCyan" />
              <div>
                <p className="font-bold text-white text-xs mb-0.5">BRANCH OFFICE</p>
                <p>17800 Castleton St, Suite 173, City of Industry, CA 91748</p>
              </div>
            </div>
            <p className="flex items-center gap-3"><Mail size={16} className="text-brandCyan" /> altdreamstar@gmail.com</p>
            <p className="flex items-center gap-3"><Phone size={16} className="text-brandCyan" /> +1 (323) 918-6688</p>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500 font-bold uppercase tracking-widest">
        <p>© 2019 ALT HOLLYWOOD DREAM STAR. All Rights Reserved.</p>
        <div className="flex space-x-6 mt-4 md:mt-0">
          <a href="#" className="hover:text-brandCyan transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-brandCyan transition-colors">Terms of Use</a>
        </div>
      </div>
    </div>
  </footer>
);

export default function App() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  // BACKGROUND IMAGE PRELOADER
  // This ensures that when a user navigates to Actors or Films pages, 
  // the images are already cached, making them "present immediately".
  useEffect(() => {
    const preloadImages = async () => {
      // Delay preloading slightly to prioritize LCP (Largest Contentful Paint) of the current page
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const imagesToPreload = [
        ...ACTORS.map(a => a.imageUrl),
        ...FILMS.map(f => f.posterUrl)
      ];

      imagesToPreload.forEach(src => {
        if (!src) return;
        const img = new Image();
        img.src = src;
      });
    };

    preloadImages();
  }, []);

  return (
    <AuthProvider>
      <DataProvider>
        <div className="min-h-screen bg-brandBlack text-white selection:bg-brandCyan selection:text-black">
          <Header />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/programs" element={<Programs />} />
              <Route path="/actors" element={<YouthActors />} />
              <Route path="/actors/:id" element={<ActorProfile />} />
              <Route path="/films" element={<Films />} />
              <Route path="/apply" element={<Apply />} />
              <Route path="/summer-camp" element={<SummerCamp />} />
              <Route path="/login" element={<Login />} />
              <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            </Routes>
          </main>
          <Partners />
          <Footer />
          <ChatBot />
        </div>
      </DataProvider>
    </AuthProvider>
  );
}

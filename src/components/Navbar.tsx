import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

export const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isTechTheme = location.pathname === '/decoding';
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleStartExperience = () => {
    if (isTechTheme) {
      window.dispatchEvent(new CustomEvent('decoding-upload-trigger'));
      return;
    }
    navigate('/decoding');
    setIsMobileMenuOpen(false);
  };

  const links = [
    { path: '/', label: '首页' },
    { path: '/evolution', label: '演化' },
    { path: '/decoding', label: '解码', isTech: true },
    { path: '/assistant', label: '释读' },
    { path: '/graph', label: '图谱' },
  ];

  return (
    <>
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 border-b px-6 md:px-8 py-4 md:py-5 flex items-center justify-between shadow-sm transition-colors duration-700 ${
          isTechTheme 
            ? 'bg-[#111a2b]/92 backdrop-blur-md border-cyan-300/20 text-zinc-100' 
            : 'bg-bone-paper/90 backdrop-blur-md border-bone-ink/10 text-bone-ink'
        }`}
      >
        <div className="flex items-center gap-3">
          <div className={`w-8 h-8 md:w-10 md:h-10 border rounded-full flex items-center justify-center font-serif text-lg md:text-xl transition-colors duration-700 ${
            isTechTheme ? 'border-cyan-300 text-cyan-300' : 'border-bone-ink text-bone-ink'
          }`}>
            甲
          </div>
          <span className="text-lg md:text-xl font-serif tracking-widest uppercase">甲骨今译</span>
        </div>
        
        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-10 text-base font-medium tracking-widest">
          {links.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) => `
                relative py-2 transition-colors flex items-center gap-1
                ${isActive 
                  ? (isTechTheme ? 'text-cyan-300 font-bold' : 'text-bone-brown font-bold') 
                  : (isTechTheme ? 'text-zinc-400 hover:text-cyan-300' : 'text-bone-ink/60 hover:text-bone-brown')
                }
                ${link.isTech && !isTechTheme && !isActive ? 'hover:text-cyan-300' : ''}
              `}
            >
              {({ isActive }) => (
                <>
                  {link.isTech && !isTechTheme && (
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500/50 inline-block mr-1" />
                  )}
                  {link.isTech && isTechTheme && (
                    <span className="text-cyan-300 mr-1 font-mono">&gt;</span>
                  )}
                  <span className={link.isTech && !isTechTheme ? 'font-mono text-sm tracking-widest' : ''}>
                    {link.label}
                  </span>
                  {isActive && (
                    <motion.div
                      layoutId="nav-indicator"
                      className={`absolute bottom-0 left-0 right-0 h-0.5 ${isTechTheme ? 'bg-cyan-300' : 'bg-bone-brown'}`}
                    />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </div>

        <div className="hidden md:block">
          <button
            onClick={handleStartExperience}
            className={`border rounded-none px-6 py-2 text-base tracking-widest uppercase transition-colors duration-700 ${
            isTechTheme 
              ? 'border-cyan-300 text-cyan-200 hover:bg-cyan-300 hover:text-[#111a2b] font-mono' 
              : 'border-bone-ink text-bone-ink hover:bg-bone-ink hover:text-bone-paper'
          }`}
          >
            {isTechTheme ? '[ START 上传 ]' : '开始体验'}
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          className="md:hidden p-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={`fixed inset-0 z-40 pt-24 px-6 ${
              isTechTheme ? 'bg-zinc-950 text-zinc-100' : 'bg-bone-paper text-bone-ink'
            }`}
          >
            <div className="flex flex-col gap-8 text-2xl font-serif tracking-widest">
              {links.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={({ isActive }) => `
                    border-b pb-4
                    ${isActive 
                      ? (isTechTheme ? 'text-cyan-300 border-cyan-300/30' : 'text-bone-brown border-bone-brown/30') 
                      : (isTechTheme ? 'text-zinc-400 border-white/10' : 'text-bone-ink/60 border-bone-ink/10')
                    }
                  `}
                >
                  {link.label}
                </NavLink>
              ))}
              <button
                onClick={handleStartExperience}
                className={`mt-8 border rounded-none px-6 py-4 text-base tracking-widest uppercase transition-colors ${
                isTechTheme 
                  ? 'border-cyan-300 text-cyan-200 font-mono' 
                  : 'border-bone-ink text-bone-ink'
              }`}
              >
                {isTechTheme ? '[ START 上传 ]' : '开始体验'}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

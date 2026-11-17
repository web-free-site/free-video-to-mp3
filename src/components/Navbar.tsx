import { NavLink } from 'react-router-dom';
import { SITE_NAME } from '../site';

const linkClass = 'px-3 py-1.5 rounded-full text-sm font-medium transition-colors';
const idleClass = 'text-slate-300 hover:text-white hover:bg-white/10';

const links = [
  { to: '/', label: 'Converter', end: true },
  { to: '/mp4-to-mp3', label: 'MP4→MP3' },
  { to: '/mov-to-mp3', label: 'MOV→MP3' },
  { to: '/webm-to-mp3', label: 'WebM→MP3' },
  { to: '/about', label: 'About' },
];

const Navbar = () => (
  <nav className="sticky top-0 z-20 border-b border-white/10 bg-[#070a13]/70 backdrop-blur-xl">
    <div className="max-w-6xl mx-auto flex items-center justify-between px-4 py-3 gap-2">
      <NavLink to="/" className="flex items-center gap-2 font-bold tracking-tight text-white shrink-0">
        <span className="grid place-items-center h-8 w-8 rounded-lg bg-gradient-to-br from-violet-500 via-indigo-500 to-cyan-400 shadow-lg shadow-violet-500/30">
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
            <path d="M4 10v4M8 7v10M12 4v16M16 8v8M20 11v2" />
          </svg>
        </span>
        <span className="hidden sm:inline text-sm">{SITE_NAME}</span>
      </NavLink>
      <div className="flex items-center gap-0.5 flex-wrap justify-end">
        {links.map(l => (
          <NavLink
            key={l.to}
            to={l.to}
            end={l.end}
            className={({ isActive }) => `${linkClass} ${isActive ? 'bg-white/10 text-white' : idleClass}`}
          >
            {l.label}
          </NavLink>
        ))}
      </div>
    </div>
  </nav>
);

export default Navbar;
import Link from 'next/link';
import { Sun, Moon } from 'lucide-react';

interface NavbarProps {
  isNight: boolean;
  toggleTheme: () => void;
}

export default function Navbar({ isNight, toggleTheme }: NavbarProps) {
  const navText = isNight ? 'text-white' : 'text-neutral-900';
  const boxBorder = isNight ? 'border-white/70 text-white' : 'border-black/80 text-black';
  const overlay = isNight ? 'bg-white/8' : 'bg-white/32';
  const linkHover = isNight ? 'hover:text-white/80' : 'hover:text-neutral-700';

  const trackStyles = isNight
    ? 'bg-transparent border border-white/55 shadow-[0_2px_8px_rgba(0,0,0,0.25)]'
    : 'bg-transparent border border-[#8c6b47] shadow-[0_2px_8px_rgba(0,0,0,0.22)]';

  const thumbStyles = isNight
    ? 'bg-white shadow-[0_2px_8px_rgba(0,0,0,0.35)]'
    : 'bg-black shadow-[0_2px_8px_rgba(0,0,0,0.35)]';

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 h-[104px] overflow-hidden">
      <div
        className={`absolute inset-0 backdrop-blur-xl transition-colors duration-500 ${
          isNight ? 'bg-white/5' : 'bg-white/10'
        }`}
      />

      <div className="relative z-10 flex h-full items-center justify-between px-8 md:px-12 lg:px-16">
        <div className="flex items-center gap-4 md:gap-5">
          <div
            className={`flex h-[50px] w-[50px] items-center justify-center border-[2px] text-lg font-semibold transition-colors duration-500 ${boxBorder}`}
          >
            dB
          </div>
          <div className={`text-[11px] font-semibold leading-[1.15rem] tracking-[0.26em] transition-colors duration-500 ${navText}`}>
            DER
            <br />
            BAUUNTERNEHMER
          </div>
        </div>

        <div className="flex items-center gap-7 md:gap-9 lg:gap-11">
          <div className={`flex items-center gap-6 md:gap-7 text-sm font-semibold tracking-wide transition-colors duration-500 ${navText}`}>
            <Link href="#" className={`transition-colors duration-200 ${linkHover}`}>About</Link>
            <Link href="#" className={`transition-colors duration-200 ${linkHover}`}>Projects</Link>
            <Link href="#" className={`transition-colors duration-200 ${linkHover}`}>Contact</Link>
          </div>

          <button
            onClick={toggleTheme}
            className={`relative flex h-[24px] w-[44px] items-center rounded-full px-[2.5px] transition-all duration-500 ${trackStyles}`}
            aria-label="Toggle theme"
          >
            <span className="sr-only">{isNight ? 'Switch to light mode' : 'Switch to dark mode'}</span>

            {/* Icons anchored in the track */}
            <div className="pointer-events-none absolute inset-0 flex items-center justify-between px-[6px] text-[11px]">
              <Moon
                size={11}
                strokeWidth={2.2}
                className={`transition-opacity duration-300 ${isNight ? 'text-[#e8dcc6] opacity-100' : 'text-[#0b0b0b] opacity-35'}`}
              />
              <Sun
                size={11}
                strokeWidth={2.1}
                className={`transition-opacity duration-300 ${isNight ? 'text-[#e8dcc6] opacity-35' : 'text-[#0b0b0b] opacity-100'}`}
              />
            </div>

            {/* Thumb */}
            <div
              className={`flex h-[18px] w-[18px] items-center justify-center rounded-full transition-all duration-400 ${thumbStyles} ${isNight ? 'translate-x-[19px]' : 'translate-x-0'}`}
            />
          </button>
        </div>
      </div>
    </nav>
  );
}

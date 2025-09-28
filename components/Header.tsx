import React from 'react';
import Icon from './Icon';
import { navigate } from '../utils/navigation';

const NavLink: React.FC<{ href: string; children: React.ReactNode }> = ({ href, children }) => (
    <a 
        href={href} 
        onClick={(e) => { e.preventDefault(); navigate(href); }}
        className="text-medium-text hover:text-primary px-3 py-2 rounded-md text-sm font-medium transition-colors"
    >
        {children}
    </a>
);


const Header: React.FC = () => {
  return (
    <header className="bg-dark-card/80 sticky top-0 z-50 border-b border-dark-border">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <a href="/" onClick={(e) => { e.preventDefault(); navigate('/'); }} className="flex-shrink-0 flex items-center gap-2 cursor-pointer">
               <Icon name="logo" className="w-8 h-8 text-primary"/>
              <span className="text-xl font-bold text-light-text">
                <span style={{ color: '#EB4300' }}>M</span>ega<span style={{ color: '#F8BD00' }}>C</span>onverters
              </span>
            </a>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <NavLink href="/blog">Blog</NavLink>
                <NavLink href="/about">About</NavLink>
                <NavLink href="/faq">FAQ</NavLink>
                <NavLink href="/privacy">Privacy</NavLink>
              </div>
            </div>
          </div>
          <div className="hidden md:block">
            <a 
              href="/contact" 
              onClick={(e) => { e.preventDefault(); navigate('/contact'); }}
              className="bg-primary text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-primary-hover transition-colors"
            >
              Contact
            </a>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
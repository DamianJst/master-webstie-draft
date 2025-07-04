import React, { useState } from 'react';
import { useNavigation } from '../../contexts/NavigationContext';
import { navItems } from '../../config/transitions';

function MobileNavigation() {
  const { currentScreen, isTransitioning, navigateToSection } = useNavigation();
  const [isOpen, setIsOpen] = useState(false);

  const handleNavigation = (section) => {
    navigateToSection(section);
    setIsOpen(false);
  };

  return (
    <nav className="fixed top-4 right-4 z-50 md:hidden">
      {/* Mobile menu button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-black/20 backdrop-blur-md text-white p-3 rounded-lg"
        disabled={isTransitioning}
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          {isOpen ? (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          ) : (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          )}
        </svg>
      </button>

      {/* Mobile menu */}
      {isOpen && (
        <div className="absolute top-full right-0 mt-2 bg-black/20 backdrop-blur-md rounded-lg p-4 min-w-[200px]">
          <div className="flex flex-col gap-2">
            {navItems.map((item) => (
              <button
                key={item.key}
                onClick={() => handleNavigation(item.key)}
                disabled={isTransitioning}
                className={`px-4 py-2 rounded-md transition-all duration-200 text-left ${
                  currentScreen === item.key 
                    ? 'bg-blue-500 text-white' 
                    : 'bg-white/10 text-white hover:bg-white/20'
                } ${isTransitioning ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {item.label}
              </button>
            ))}
          </div>
          {isTransitioning && (
            <div className="mt-2 text-white/60 text-sm">
              Transitioning...
            </div>
          )}
        </div>
      )}
    </nav>
  );
}

export default MobileNavigation;
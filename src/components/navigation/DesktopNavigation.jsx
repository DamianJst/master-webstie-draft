import React from 'react';
import { useNavigation } from '../../contexts/NavigationContext';
import { navItems } from '../../config/transitions';

function DesktopNavigation() {
  const { currentScreen, isTransitioning, navigateToSection } = useNavigation();

  return (
    <nav className="fixed top-4 right-[40rem] z-50 bg-black/20 backdrop-blur-md rounded-lg p-4 hidden md:block">
      <div className="flex gap-4">
        {navItems.map((item) => (
          <button
            key={item.key}
            onClick={() => navigateToSection(item.key)}
            disabled={isTransitioning}
            className={`px-4 py-2 rounded-md transition-all duration-200 ${
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
    </nav>
  );
}

export default DesktopNavigation;
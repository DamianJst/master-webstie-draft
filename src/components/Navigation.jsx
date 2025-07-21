// import React from 'react';
// import { useNavigation } from '../contexts/NavigationContext';
// import { navItems } from '../config/transitions';

// function Navigation() {
//   const { currentScreen, isTransitioning, navigateToSection } = useNavigation();

//   return (
//     <nav className="fixed top-4 left-4 z-50 bg-black/20 backdrop-blur-md rounded-lg p-4">
//       <div className="flex gap-4">
//         {navItems.map((item) => (
//           <button
//             key={item.key}
//             onClick={() => navigateToSection(item.key)}
//             disabled={isTransitioning}
//             className={`px-4 py-2 rounded-md transition-all duration-200 ${
//               currentScreen === item.key 
//                 ? 'bg-blue-500 text-white' 
//                 : 'bg-white/10 text-white hover:bg-white/20'
//             } ${isTransitioning ? 'opacity-50 cursor-not-allowed' : ''}`}
//           >
//             {item.label}
//           </button>
//         ))}
//       </div>
//       {isTransitioning && (
//         <div className="mt-2 text-white/60 text-sm">
//           Transitioning...
//         </div>
//       )}
//     </nav>
//   );
// }

// export default Navigation;

// import React from 'react';
// import { useNavigation } from '../contexts/NavigationContext';
// import { navItems, hasTransition, getTransitionInfo } from '../config/transitions';

// function Navigation() {
//   const { 
//     currentScreen, 
//     targetScreen, 
//     isTransitioning, 
//     navigateToSection, 
//     animationStore 
//   } = useNavigation();

//   const getButtonStatus = (itemKey) => {
//     if (currentScreen === itemKey) {
//       return 'current';
//     }
//     if (targetScreen === itemKey && isTransitioning) {
//       return 'target';
//     }
//     if (!hasTransition(currentScreen, itemKey)) {
//       return 'no-transition';
//     }
//     return 'available';
//   };

//   const getButtonClasses = (status) => {
//     const baseClasses = 'px-4 py-2 rounded-md transition-all duration-200 flex items-center gap-2';
    
//     switch (status) {
//       case 'current':
//         return `${baseClasses} bg-blue-500 text-white`;
//       case 'target':
//         return `${baseClasses} bg-yellow-500 text-white animate-pulse`;
//       case 'no-transition':
//         return `${baseClasses} bg-red-500/20 text-red-300 cursor-not-allowed`;
//       case 'available':
//       default:
//         return `${baseClasses} bg-white/10 text-white hover:bg-white/20`;
//     }
//   };

//   const handleNavigation = (section) => {
//     if (isTransitioning) return;
    
//     const transitionInfo = getTransitionInfo(currentScreen, section);
//     if (!transitionInfo) {
//       console.warn(`No transition available from ${currentScreen} to ${section}`);
//       return;
//     }
    
//     console.log(`Navigating: ${currentScreen} → ${section}`, transitionInfo);
//     navigateToSection(section);
//   };

//   return (
//     <nav className="fixed top-4 left-4 z-50 bg-black/20 backdrop-blur-md rounded-lg p-4">
//       <div className="flex gap-4 flex-wrap">
//         {navItems.map((item) => {
//           const status = getButtonStatus(item.key);
//           return (
//             <button
//               key={item.key}
//               onClick={() => handleNavigation(item.key)}
//               disabled={isTransitioning || status === 'no-transition'}
//               className={getButtonClasses(status)}
//               title={
//                 status === 'no-transition' 
//                   ? `No transition available from ${currentScreen} to ${item.key}`
//                   : `Navigate to ${item.label}`
//               }
//             >
//               <span>{item.icon}</span>
//               <span>{item.label}</span>
//             </button>
//           );
//         })}
//       </div>
      
//       {/* Status Bar */}
//       <div className="mt-3 text-xs text-white/70">
//         <div className="flex items-center gap-4">
//           <span>Animation Store: {animationStore.isReady ? '✅' : '❌'}</span>
//           {isTransitioning && (
//             <span className="animate-pulse">
//               Transitioning: {currentScreen} → {targetScreen}
//             </span>
//           )}
//         </div>
//       </div>
//     </nav>
//   );
// }

// export default Navigation;

// src/components/Navigation.jsx
import React from 'react';
import { useNavigation } from '../contexts/NavigationContext';
import { navItems, hasCompleteTransition, getAnimationConfigs } from '../config/transitions';

function Navigation() {
  const { 
    currentScreen, 
    targetScreen, 
    isTransitioning, 
    navigateToSection, 
    animationStore 
  } = useNavigation();

  const getButtonStatus = (itemKey) => {
    if (currentScreen === itemKey) {
      return 'current';
    }
    if (targetScreen === itemKey && isTransitioning) {
      return 'target';
    }
    if (!hasCompleteTransition(currentScreen, itemKey)) {
      return 'no-transition';
    }
    return 'available';
  };

  const getButtonClasses = (status) => {
    const baseClasses = 'px-4 py-2 rounded-md transition-all duration-200 flex items-center gap-2';
    
    switch (status) {
      case 'current':
        return `${baseClasses} bg-blue-500 text-white`;
      case 'target':
        return `${baseClasses} bg-yellow-500 text-white animate-pulse`;
      case 'no-transition':
        return `${baseClasses} bg-red-500/20 text-red-300 cursor-not-allowed`;
      case 'available':
      default:
        return `${baseClasses} bg-white/10 text-white hover:bg-white/20`;
    }
  };

  const handleNavigation = (section) => {
    if (isTransitioning) return;
    
    const animationConfigs = getAnimationConfigs(currentScreen, section);
    if (!animationConfigs) {
      console.warn(`No animation configs available from ${currentScreen} to ${section}`);
      return;
    }
    
    console.log(`Navigating: ${currentScreen} → ${section}`, animationConfigs);
    navigateToSection(section);
  };

  return (
    <nav className="fixed top-4 left-4 z-50 bg-black/20 backdrop-blur-md rounded-lg p-4">
      <div className="flex gap-4 flex-wrap">
        {navItems.map((item) => {
          const status = getButtonStatus(item.key);
          return (
            <button
              key={item.key}
              onClick={() => handleNavigation(item.key)}
              disabled={isTransitioning || status === 'no-transition'}
              className={getButtonClasses(status)}
              title={
                status === 'no-transition' 
                  ? `No transition available from ${currentScreen} to ${item.key}`
                  : `Navigate to ${item.label}`
              }
            >
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>
      
      {/* Enhanced Status Bar */}
      <div className="mt-3 text-xs text-white/70">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-4">
            <span>Camera: {animationStore.camera?.isReady ? '✅' : '❌'}</span>
            <span>Target: {animationStore.cameraTarget?.isReady ? '✅' : '❌'}</span>
            <span>Combined: {animationStore.isReady ? '✅' : '❌'}</span>
          </div>
          {isTransitioning && (
            <span className="animate-pulse text-yellow-300">
              Transitioning: {currentScreen} → {targetScreen}
            </span>
          )}
          {animationStore.camera?.isReady && (
            <span className="text-green-300">
              Camera clips: {animationStore.camera.actions ? Object.keys(animationStore.camera.actions).length : 0}
            </span>
          )}
          {animationStore.cameraTarget?.isReady && (
            <span className="text-blue-300">
              Target clips: {animationStore.cameraTarget.actions ? Object.keys(animationStore.cameraTarget.actions).length : 0}
            </span>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navigation;
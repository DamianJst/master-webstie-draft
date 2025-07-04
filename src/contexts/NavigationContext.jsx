// import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
// import { useLocation, useNavigate } from 'react-router';
// import { transitions } from '../config/transitions';

// const NavigationContext = createContext();

// export function NavigationProvider({ children }) {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const [currentScreen, setCurrentScreen] = useState('home');
//   const [targetScreen, setTargetScreen] = useState('home');
//   const [currentTransition, setCurrentTransition] = useState(null);
//   const [isTransitioning, setIsTransitioning] = useState(false);
//   const isSetup = useRef(false);

//   // Convert path to screen name
//   const pathToScreen = (path) => {
//     switch (path) {
//       case '/': return 'home';
//       case '/about': return 'about';
//       case '/skills': return 'skills';
//       case '/project': return 'project';
//       case '/contact': return 'contact';
//       default: return 'home';
//     }
//   };

//   // Update target screen when location changes
//   useEffect(() => {
//     const newScreen = pathToScreen(location.pathname);
//     if (newScreen !== currentScreen) {
//       setTargetScreen(newScreen);
//     }
//   }, [location.pathname, currentScreen]);

//   // Handle transitions
//   useEffect(() => {
//     if (currentScreen === targetScreen) {
//       return;
//     }

//     if (isSetup.current && currentScreen === 'home' && targetScreen === 'home') {
//       // Prevent double trigger in strict mode
//       return;
//     }
    
//     isSetup.current = true;

//     const transitionKey = `${currentScreen}-${targetScreen}`;
//     const transition = transitions[transitionKey];
    
//     if (!transition) {
//       console.warn(`No transition defined for ${transitionKey}`);
//       setCurrentScreen(targetScreen);
//       return;
//     }

//     setIsTransitioning(true);
//     setCurrentTransition(transition);
//   }, [targetScreen, currentScreen]);

//   const onTransitionComplete = () => {
//     setCurrentTransition(null);
//     setIsTransitioning(false);
//     setCurrentScreen(targetScreen);
//   };

//   const navigateToSection = (section) => {
//     if (isTransitioning) return; // Prevent navigation during transition
    
//     const path = section === 'home' ? '/' : `/${section}`;
//     navigate(path);
//   };

//   return (
//     <NavigationContext.Provider value={{
//       currentScreen,
//       targetScreen,
//       currentTransition,
//       isTransitioning,
//       navigateToSection,
//       onTransitionComplete
//     }}>
//       {children}
//     </NavigationContext.Provider>
//   );
// }

// export function useNavigation() {
//   const context = useContext(NavigationContext);
//   if (!context) {
//     throw new Error('useNavigation must be used within a NavigationProvider');
//   }
//   return context;
// }

// export default NavigationContext;

// import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
// import { useLocation, useNavigate } from 'react-router';
// import * as THREE from 'three';
// import { transitions } from '../config/transitions';

// const NavigationContext = createContext();

// export function NavigationProvider({ children }) {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const [currentScreen, setCurrentScreen] = useState('home');
//   const [targetScreen, setTargetScreen] = useState('home');
//   const [currentTransition, setCurrentTransition] = useState(null);
//   const [isTransitioning, setIsTransitioning] = useState(false);
//   const isSetup = useRef(false);
  
//   // Animation store
//   const [animationStore, setAnimationStore] = useState({
//     actions: null,
//     mixer: null,
//     currentAction: null,
//     isReady: false
//   });

//   // Convert path to screen name
//   const pathToScreen = (path) => {
//     switch (path) {
//       case '/': return 'home';
//       case '/about': return 'about';
//       case '/skills': return 'skills';
//       case '/project': return 'project';
//       case '/contact': return 'contact';
//       default: return 'home';
//     }
//   };

//   // Register animation actions from the camera component
//   const registerAnimations = (actions, mixer) => {
//     setAnimationStore({
//       actions,
//       mixer,
//       currentAction: null,
//       isReady: true
//     });
//   };

//   // Play animation clip
//   const playAnimation = (clipName, reverse = false) => {
//     if (!animationStore.isReady || !animationStore.actions) {
//       console.warn('Animation store not ready');
//       return false;
//     }

//     const action = animationStore.actions[clipName];
//     if (!action) {
//       console.warn(`Animation clip "${clipName}" not found`);
//       console.log('Available clips:', Object.keys(animationStore.actions));
//       return false;
//     }

//     console.log(`Playing animation: ${clipName} (reverse: ${reverse})`);

//     // Stop current action if playing
//     if (animationStore.currentAction) {
//       animationStore.currentAction.stop();
//     }

//     // Reset and configure the action
//     action.reset();
//     action.setLoop(THREE.LoopOnce);
//     action.clampWhenFinished = true;
    
//     if (reverse) {
//       action.timeScale = -2; // Play in reverse at 2x speed
//       action.time = action.getClip().duration; // Start from the end
//     } else {
//       action.timeScale = 1; // Normal speed
//       action.time = 0; // Start from beginning
//     }
    
//     // Play the animation
//     action.play();
    
//     // Update current action
//     setAnimationStore(prev => ({
//       ...prev,
//       currentAction: action
//     }));

//     return true;
//   };

//   // Handle transitions - now only handles URL-based changes
//   useEffect(() => {
//     const newScreen = pathToScreen(location.pathname);
//     if (newScreen !== currentScreen && newScreen !== targetScreen) {
//       // This handles direct URL changes (browser back/forward, direct links)
//       console.log(`URL changed to: ${newScreen}`);
      
//       if (isTransitioning) {
//         // Cancel current transition
//         setIsTransitioning(false);
//         setCurrentTransition(null);
//       }
      
//       setTargetScreen(newScreen);
      
//       // Start transition if we have one
//       const transitionKey = `${currentScreen}-${newScreen}`;
//       const transition = transitions[transitionKey];
      
//       if (transition && animationStore.isReady) {
//         setIsTransitioning(true);
//         setCurrentTransition(transition);
//         playAnimation(transition.clip, transition.reverse);
//       } else {
//         // No transition or store not ready, just update screen
//         setCurrentScreen(newScreen);
//       }
//     }
//   }, [location.pathname, currentScreen, targetScreen, isTransitioning, animationStore.isReady]);

//   // Handle animation completion
//   useEffect(() => {
//     if (!animationStore.mixer || !isTransitioning) return;

//     const onFinished = () => {
//       setCurrentTransition(null);
//       setIsTransitioning(false);
//       setCurrentScreen(targetScreen);
      
//       // Clear current action
//       setAnimationStore(prev => ({
//         ...prev,
//         currentAction: null
//       }));
//     };

//     animationStore.mixer.addEventListener('finished', onFinished);
    
//     return () => {
//       if (animationStore.mixer) {
//         animationStore.mixer.removeEventListener('finished', onFinished);
//       }
//     };
//   }, [animationStore.mixer, isTransitioning, targetScreen]);

//   const onTransitionComplete = () => {
//     setCurrentTransition(null);
//     setIsTransitioning(false);
//     setCurrentScreen(targetScreen);
//   };

//   const navigateToSection = (section) => {
//     if (isTransitioning) return; // Prevent navigation during transition
    
//     console.log(`Navigation requested: ${currentScreen} → ${section}`);
    
//     // Get the transition configuration
//     const transitionKey = `${currentScreen}-${section}`;
//     const transition = transitions[transitionKey];
    
//     if (!transition) {
//       console.warn(`No transition defined for ${transitionKey}`);
//       // Still navigate even without animation
//       const path = section === 'home' ? '/' : `/${section}`;
//       navigate(path);
//       setCurrentScreen(section);
//       return;
//     }

//     // Start the transition immediately
//     setIsTransitioning(true);
//     setTargetScreen(section);
//     setCurrentTransition(transition);
    
//     console.log(`Starting transition:`, transition);
    
//     // Play animation immediately if store is ready
//     if (animationStore.isReady) {
//       const success = playAnimation(transition.clip, transition.reverse);
//       if (success) {
//         console.log(`Animation "${transition.clip}" started (reverse: ${transition.reverse})`);
//       } else {
//         console.warn(`Failed to play animation "${transition.clip}"`);
//         // Complete transition immediately if animation fails
//         setIsTransitioning(false);
//         setCurrentTransition(null);
//         setCurrentScreen(section);
//       }
//     } else {
//       console.warn('Animation store not ready, completing transition immediately');
//       // Complete transition immediately if store not ready
//       setIsTransitioning(false);
//       setCurrentTransition(null);
//       setCurrentScreen(section);
//     }
    
//     // Update the URL
//     const path = section === 'home' ? '/' : `/${section}`;
//     navigate(path);
//   };

//   return (
//     <NavigationContext.Provider value={{
//       currentScreen,
//       targetScreen,
//       currentTransition,
//       isTransitioning,
//       navigateToSection,
//       onTransitionComplete,
//       registerAnimations,
//       playAnimation,
//       animationStore
//     }}>
//       {children}
//     </NavigationContext.Provider>
//   );
// }

// export function useNavigation() {
//   const context = useContext(NavigationContext);
//   if (!context) {
//     throw new Error('useNavigation must be used within a NavigationProvider');
//   }

//   useEffect(() => {
//     // Log available transitions for debugging
//     console.log(context)
//     // console.log('Available transitions:', Object.keys(transitions));
//   }, []);
//   return context;
// }

// export default NavigationContext;

import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router';
import * as THREE from 'three';
import { transitions } from '../config/transitions';

const NavigationContext = createContext();

export function NavigationProvider({ children }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [currentScreen, setCurrentScreen] = useState('home');
  const [targetScreen, setTargetScreen] = useState('home');
  const [currentTransition, setCurrentTransition] = useState(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const isSetup = useRef(false);
  
  // Animation store
  const [animationStore, setAnimationStore] = useState({
    actions: null,
    mixer: null,
    currentAction: null,
    isReady: false
  });

  // Convert path to screen name
  const pathToScreen = (path) => {
    switch (path) {
      case '/': return 'home';
      case '/about': return 'about';
      case '/skills': return 'skills';
      case '/project': return 'project';
      case '/contact': return 'contact';
      default: return 'home';
    }
  };

  // Register animation actions from the camera component
  const registerAnimations = (actions, mixer) => {
    console.log('NavigationContext: Registering animations:', {
      actionsCount: actions ? Object.keys(actions).length : 0,
      actionNames: actions ? Object.keys(actions) : [],
      hasMixer: !!mixer
    });
    
    if (actions && mixer) {
      setAnimationStore({
        actions,
        mixer,
        currentAction: null,
        isReady: true
      });
      console.log('NavigationContext: Animation store updated successfully');
    } else {
      console.warn('NavigationContext: Invalid actions or mixer passed to registerAnimations');
    }
  };

  // Play animation clip
  const playAnimation = (clipName, reverse = false) => {
    console.log('NavigationContext: playAnimation called:', { clipName, reverse });
    console.log('NavigationContext: animationStore state:', animationStore);
    
    if (!animationStore.isReady || !animationStore.actions) {
      console.warn('NavigationContext: Animation store not ready', {
        isReady: animationStore.isReady,
        hasActions: !!animationStore.actions
      });
      return false;
    }

    const action = animationStore.actions[clipName];
    if (!action) {
      console.warn(`NavigationContext: Animation clip "${clipName}" not found`);
      console.log('NavigationContext: Available clips:', Object.keys(animationStore.actions));
      return false;
    }

    console.log(`NavigationContext: Playing animation: ${clipName} (reverse: ${reverse})`);

    // Stop current action if playing
    if (animationStore.currentAction) {
      console.log('NavigationContext: Stopping current action');
      animationStore.currentAction.stop();
    }

    // Reset and configure the action
    action.reset();
    action.setLoop(THREE.LoopOnce);
    action.clampWhenFinished = true;
    
    if (reverse) {
      action.timeScale = -2; // Play in reverse at 2x speed
      action.time = action.getClip().duration; // Start from the end
    } else {
      action.timeScale = 1; // Normal speed
      action.time = 0; // Start from beginning
    }
    
    // Play the animation
    // action.play();

    action.reset().fadeIn(0.5).play();
  return () => action.fadeOut(0.5);
    
    // Update current action
    setAnimationStore(prev => ({
      ...prev,
      currentAction: action
    }));

    console.log('NavigationContext: Animation started successfully');
    return true;
  };

  // Handle transitions - now only handles URL-based changes
  useEffect(() => {
    const newScreen = pathToScreen(location.pathname);
    if (newScreen !== currentScreen && newScreen !== targetScreen) {
      // This handles direct URL changes (browser back/forward, direct links)
      console.log(`NavigationContext: URL changed to: ${newScreen}`);
      
      if (isTransitioning) {
        // Cancel current transition
        setIsTransitioning(false);
        setCurrentTransition(null);
      }
      
      setTargetScreen(newScreen);
      
      // Start transition if we have one
      const transitionKey = `${currentScreen}-${newScreen}`;
      const transition = transitions[transitionKey];
      
      if (transition && animationStore.isReady) {
        setIsTransitioning(true);
        setCurrentTransition(transition);
        playAnimation(transition.clip, transition.reverse);
      } else {
        // No transition or store not ready, just update screen
        console.log('NavigationContext: No transition or store not ready, updating screen directly');
        setCurrentScreen(newScreen);
      }
    }
  }, [location.pathname, currentScreen, targetScreen, isTransitioning, animationStore.isReady]);

  // Handle animation completion
  useEffect(() => {
    if (!animationStore.mixer || !isTransitioning) return;

    const onFinished = () => {
      console.log('NavigationContext: Animation finished');
      setCurrentTransition(null);
      setIsTransitioning(false);
      setCurrentScreen(targetScreen);
      
      // Clear current action
      setAnimationStore(prev => ({
        ...prev,
        currentAction: null
      }));
    };

    animationStore.mixer.addEventListener('finished', onFinished);
    
    return () => {
      if (animationStore.mixer) {
        animationStore.mixer.removeEventListener('finished', onFinished);
      }
    };
  }, [animationStore.mixer, isTransitioning, targetScreen]);

  const onTransitionComplete = () => {
    setCurrentTransition(null);
    setIsTransitioning(false);
    setCurrentScreen(targetScreen);
  };

  const navigateToSection = (section) => {
    if (isTransitioning) {
      console.log('NavigationContext: Navigation blocked - already transitioning');
      return;
    }
    
    console.log(`NavigationContext: Navigation requested: ${currentScreen} → ${section}`);
    
    // Get the transition configuration
    const transitionKey = `${currentScreen}-${section}`;
    const transition = transitions[transitionKey];
    
    if (!transition) {
      console.warn(`NavigationContext: No transition defined for ${transitionKey}`);
      // Still navigate even without animation
      const path = section === 'home' ? '/' : `/${section}`;
      navigate(path);
      setCurrentScreen(section);
      return;
    }

    // Start the transition immediately
    setIsTransitioning(true);
    setTargetScreen(section);
    setCurrentTransition(transition);
    
    console.log(`NavigationContext: Starting transition:`, transition);
    
    // Play animation immediately if store is ready
    if (animationStore.isReady) {
      const success = playAnimation(transition.clip, transition.reverse);
      if (success) {
        console.log(`NavigationContext: Animation "${transition.clip}" started (reverse: ${transition.reverse})`);
      } else {
        console.warn(`NavigationContext: Failed to play animation "${transition.clip}"`);
        // Complete transition immediately if animation fails
        setIsTransitioning(false);
        setCurrentTransition(null);
        setCurrentScreen(section);
      }
    } else {
      console.warn('NavigationContext: Animation store not ready, completing transition immediately');
      // Complete transition immediately if store not ready
      setIsTransitioning(false);
      setCurrentTransition(null);
      setCurrentScreen(section);
    }
    
    // Update the URL
    const path = section === 'home' ? '/' : `/${section}`;
    navigate(path);
  };

  return (
    <NavigationContext.Provider value={{
      currentScreen,
      targetScreen,
      currentTransition,
      isTransitioning,
      navigateToSection,
      onTransitionComplete,
      registerAnimations,
      playAnimation,
      animationStore
    }}>
      {children}
    </NavigationContext.Provider>
  );
}

export function useNavigation() {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error('useNavigation must be used within a NavigationProvider');
  }

  useEffect(() => {
    // Log context state for debugging
    console.log('NavigationContext: useNavigation hook called, context state:', {
      currentScreen: context.currentScreen,
      targetScreen: context.targetScreen,
      isTransitioning: context.isTransitioning,
      animationStore: context.animationStore
    });
  }, [context]);

  return context;
}

export default NavigationContext;
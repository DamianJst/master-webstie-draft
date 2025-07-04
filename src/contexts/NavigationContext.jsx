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
//     console.log('NavigationContext: Registering animations:', {
//       actionsCount: actions ? Object.keys(actions).length : 0,
//       actionNames: actions ? Object.keys(actions) : [],
//       hasMixer: !!mixer
//     });
    
//     if (actions && mixer) {
//       setAnimationStore({
//         actions,
//         mixer,
//         currentAction: null,
//         isReady: true
//       });
//       console.log('NavigationContext: Animation store updated successfully');
//     } else {
//       console.warn('NavigationContext: Invalid actions or mixer passed to registerAnimations');
//     }
//   };

//   // Play animation clip
//   const playAnimation = (clipName, reverse = false) => {
//     console.log('NavigationContext: playAnimation called:', { clipName, reverse });
//     console.log('NavigationContext: animationStore state:', animationStore);
    
//     if (!animationStore.isReady || !animationStore.actions) {
//       console.warn('NavigationContext: Animation store not ready', {
//         isReady: animationStore.isReady,
//         hasActions: !!animationStore.actions
//       });
//       return false;
//     }

//     const action = animationStore.actions[clipName];
//     if (!action) {
//       console.warn(`NavigationContext: Animation clip "${clipName}" not found`);
//       console.log('NavigationContext: Available clips:', Object.keys(animationStore.actions));
//       return false;
//     }

//     console.log(`NavigationContext: Playing animation: ${clipName} (reverse: ${reverse})`);

//     // Stop current action if playing
//     if (animationStore.currentAction) {
//       console.log('NavigationContext: Stopping current action');
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
//     // action.play();

//     action.reset().fadeIn(0.5).play();
// //   return () => action.fadeOut(0.5);
    
//     // Update current action
//     setAnimationStore(prev => ({
//       ...prev,
//       currentAction: action
//     }));

//     console.log('NavigationContext: Animation started successfully');
//     return true;
//   };

//   // Handle transitions - now only handles URL-based changes
//   useEffect(() => {
//     const newScreen = pathToScreen(location.pathname);
//     if (newScreen !== currentScreen && newScreen !== targetScreen) {
//       // This handles direct URL changes (browser back/forward, direct links)
//       console.log(`NavigationContext: URL changed to: ${newScreen}`);
      
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
//         console.log('NavigationContext: No transition or store not ready, updating screen directly');
//         setCurrentScreen(newScreen);
//       }
//     }
//   }, [location.pathname, currentScreen, targetScreen, isTransitioning, animationStore.isReady]);

//   // Handle animation completion
//   useEffect(() => {
//     if (!animationStore.mixer || !isTransitioning) return;

//     const onFinished = () => {
//       console.log('NavigationContext: Animation finished');
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
//     if (isTransitioning) {
//       console.log('NavigationContext: Navigation blocked - already transitioning');
//       return;
//     }
    
//     console.log(`NavigationContext: Navigation requested: ${currentScreen} → ${section}`);
    
//     // Get the transition configuration
//     const transitionKey = `${currentScreen}-${section}`;
//     const transition = transitions[transitionKey];
    
//     if (!transition) {
//       console.warn(`NavigationContext: No transition defined for ${transitionKey}`);
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
    
//     console.log(`NavigationContext: Starting transition:`, transition);
    
//     // Play animation immediately if store is ready
//     if (animationStore.isReady) {
//       const success = playAnimation(transition.clip, transition.reverse);
//       if (success) {
//         console.log(`NavigationContext: Animation "${transition.clip}" started (reverse: ${transition.reverse})`);
//       } else {
//         console.warn(`NavigationContext: Failed to play animation "${transition.clip}"`);
//         // Complete transition immediately if animation fails
//         setIsTransitioning(false);
//         setCurrentTransition(null);
//         setCurrentScreen(section);
//       }
//     } else {
//       console.warn('NavigationContext: Animation store not ready, completing transition immediately');
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
//     // Log context state for debugging
//     console.log('NavigationContext: useNavigation hook called, context state:', {
//       currentScreen: context.currentScreen,
//       targetScreen: context.targetScreen,
//       isTransitioning: context.isTransitioning,
//       animationStore: context.animationStore
//     });
//   }, [context]);

//   return context;
// }

// export default NavigationContext;

import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router';
import * as THREE from 'three';
import { transitions, getAnimationConfigs } from '../config/transitions';

const NavigationContext = createContext();

export function NavigationProvider({ children }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [currentScreen, setCurrentScreen] = useState('home');
  const [targetScreen, setTargetScreen] = useState('home');
  const [currentTransition, setCurrentTransition] = useState(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const isSetup = useRef(false);
  
  // Enhanced animation store for both camera and camera target
  const [animationStore, setAnimationStore] = useState({
    camera: {
      actions: null,
      mixer: null,
      currentAction: null,
      isReady: false
    },
    cameraTarget: {
      actions: null,
      mixer: null,
      currentAction: null,
      isReady: false
    },
    isFullyReady: false
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

  // Register camera animations
  const registerCameraAnimations = (actions, mixer) => {
    console.log('NavigationContext: Registering camera animations:', {
      actionsCount: actions ? Object.keys(actions).length : 0,
      actionNames: actions ? Object.keys(actions) : [],
      hasMixer: !!mixer
    });
    
    if (actions && mixer) {
      setAnimationStore(prev => {
        const newStore = {
          ...prev,
          camera: {
            actions,
            mixer,
            currentAction: null,
            isReady: true
          }
        };
        newStore.isFullyReady = newStore.camera.isReady && newStore.cameraTarget.isReady;
        return newStore;
      });
      console.log('NavigationContext: Camera animation store updated successfully');
    } else {
      console.warn('NavigationContext: Invalid camera actions or mixer');
    }
  };

  // Register camera target animations
  const registerCameraTargetAnimations = (actions, mixer) => {
    console.log('NavigationContext: Registering camera target animations:', {
      actionsCount: actions ? Object.keys(actions).length : 0,
      actionNames: actions ? Object.keys(actions) : [],
      hasMixer: !!mixer
    });
    
    if (actions && mixer) {
      setAnimationStore(prev => {
        const newStore = {
          ...prev,
          cameraTarget: {
            actions,
            mixer,
            currentAction: null,
            isReady: true
          }
        };
        newStore.isFullyReady = newStore.camera.isReady && newStore.cameraTarget.isReady;
        return newStore;
      });
      console.log('NavigationContext: Camera target animation store updated successfully');
    } else {
      console.warn('NavigationContext: Invalid camera target actions or mixer');
    }
  };

  // Legacy register function for backward compatibility
  const registerAnimations = (actions, mixer) => {
    console.warn('NavigationContext: registerAnimations is deprecated, use registerCameraAnimations or registerCameraTargetAnimations');
    registerCameraAnimations(actions, mixer);
  };

  // Play animation for a specific object (camera or cameraTarget)
  const playObjectAnimation = (objectType, clipName, config) => {
    const store = animationStore[objectType];
    
    if (!store || !store.isReady || !store.actions) {
      console.warn(`NavigationContext: ${objectType} animation store not ready`);
      return false;
    }

    const action = store.actions[clipName];
    if (!action) {
      console.warn(`NavigationContext: ${objectType} animation clip "${clipName}" not found`);
      console.log(`NavigationContext: Available ${objectType} clips:`, Object.keys(store.actions));
      return false;
    }

    console.log(`NavigationContext: Playing ${objectType} animation: ${clipName}`, config);

    // Stop current action if playing
    if (store.currentAction) {
      console.log(`NavigationContext: Stopping current ${objectType} action`);
      store.currentAction.stop();
    }

    // Reset and configure the action
    action.reset();
    action.setLoop(THREE.LoopOnce);
    action.clampWhenFinished = true;
    
    // Apply configuration
    if (config.reverse) {
      action.timeScale = config.timeScale || -2.0;
      action.time = action.getClip().duration; // Start from the end
    } else {
      action.timeScale = config.timeScale || 1.0;
      action.time = 0; // Start from beginning
    }
    
    // Play the animation with fade in
    action.reset().fadeIn(0.5).play();
    
    // Update current action in store
    setAnimationStore(prev => ({
      ...prev,
      [objectType]: {
        ...prev[objectType],
        currentAction: action
      }
    }));

    console.log(`NavigationContext: ${objectType} animation started successfully`);
    return true;
  };

  // Play synchronized transition animations
  const playTransitionAnimations = (from, to) => {
    console.log('NavigationContext: playTransitionAnimations called:', { from, to });
    
    if (!animationStore.isFullyReady) {
      console.warn('NavigationContext: Animation stores not fully ready', {
        cameraReady: animationStore.camera.isReady,
        targetReady: animationStore.cameraTarget.isReady
      });
      return false;
    }

    const animationConfigs = getAnimationConfigs(from, to);
    if (!animationConfigs) {
      console.warn(`NavigationContext: No animation configs found for ${from} → ${to}`);
      return false;
    }

    console.log('NavigationContext: Animation configs:', animationConfigs);

    // Play both animations
    const cameraSuccess = playObjectAnimation('camera', animationConfigs.camera.clip, animationConfigs.camera);
    const targetSuccess = playObjectAnimation('cameraTarget', animationConfigs.cameraTarget.clip, animationConfigs.cameraTarget);

    if (cameraSuccess && targetSuccess) {
      console.log('NavigationContext: Both animations started successfully');
      return true;
    } else {
      console.warn('NavigationContext: Failed to start one or both animations', {
        cameraSuccess,
        targetSuccess
      });
      return false;
    }
  };

  // Handle transitions - URL-based changes
  useEffect(() => {
    const newScreen = pathToScreen(location.pathname);
    if (newScreen !== currentScreen && newScreen !== targetScreen) {
      console.log(`NavigationContext: URL changed to: ${newScreen}`);
      
      if (isTransitioning) {
        // Cancel current transition
        setIsTransitioning(false);
        setCurrentTransition(null);
      }
      
      setTargetScreen(newScreen);
      
      // Start transition if we have one
      const animationConfigs = getAnimationConfigs(currentScreen, newScreen);
      
      if (animationConfigs && animationStore.isFullyReady) {
        setIsTransitioning(true);
        setCurrentTransition(animationConfigs);
        playTransitionAnimations(currentScreen, newScreen);
      } else {
        // No transition or store not ready, just update screen
        console.log('NavigationContext: No transition or store not ready, updating screen directly');
        setCurrentScreen(newScreen);
      }
    }
  }, [location.pathname, currentScreen, targetScreen, isTransitioning, animationStore.isFullyReady]);

  // Handle animation completion - listen to both mixers
  useEffect(() => {
    if (!animationStore.isFullyReady || !isTransitioning) return;

    let completedAnimations = 0;
    const totalAnimations = 2; // camera + cameraTarget

    const onFinished = () => {
      completedAnimations++;
      console.log(`NavigationContext: Animation finished (${completedAnimations}/${totalAnimations})`);
      
      if (completedAnimations >= totalAnimations) {
        console.log('NavigationContext: All animations finished');
        setCurrentTransition(null);
        setIsTransitioning(false);
        setCurrentScreen(targetScreen);
        
        // Clear current actions
        setAnimationStore(prev => ({
          ...prev,
          camera: {
            ...prev.camera,
            currentAction: null
          },
          cameraTarget: {
            ...prev.cameraTarget,
            currentAction: null
          }
        }));
      }
    };

    // Listen to both mixers
    const cleanupFunctions = [];
    
    if (animationStore.camera.mixer) {
      animationStore.camera.mixer.addEventListener('finished', onFinished);
      cleanupFunctions.push(() => {
        animationStore.camera.mixer.removeEventListener('finished', onFinished);
      });
    }
    
    if (animationStore.cameraTarget.mixer) {
      animationStore.cameraTarget.mixer.addEventListener('finished', onFinished);
      cleanupFunctions.push(() => {
        animationStore.cameraTarget.mixer.removeEventListener('finished', onFinished);
      });
    }
    
    return () => {
      cleanupFunctions.forEach(cleanup => cleanup());
    };
  }, [animationStore.camera.mixer, animationStore.cameraTarget.mixer, isTransitioning, targetScreen]);

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
    
    // Get the animation configurations
    const animationConfigs = getAnimationConfigs(currentScreen, section);
    
    if (!animationConfigs) {
      console.warn(`NavigationContext: No animation configs defined for ${currentScreen} → ${section}`);
      // Still navigate even without animation
      const path = section === 'home' ? '/' : `/${section}`;
      navigate(path);
      setCurrentScreen(section);
      return;
    }

    // Start the transition immediately
    setIsTransitioning(true);
    setTargetScreen(section);
    setCurrentTransition(animationConfigs);
    
    console.log(`NavigationContext: Starting transition:`, animationConfigs);
    
    // Play animations immediately if store is ready
    if (animationStore.isFullyReady) {
      const success = playTransitionAnimations(currentScreen, section);
      if (success) {
        console.log(`NavigationContext: Transition animations started successfully`);
      } else {
        console.warn(`NavigationContext: Failed to start transition animations`);
        // Complete transition immediately if animation fails
        setIsTransitioning(false);
        setCurrentTransition(null);
        setCurrentScreen(section);
      }
    } else {
      console.warn('NavigationContext: Animation stores not fully ready, completing transition immediately');
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
      registerAnimations, // Legacy
      registerCameraAnimations,
      registerCameraTargetAnimations,
      playTransitionAnimations,
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
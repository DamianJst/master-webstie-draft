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
//     action.play();
    
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
// src/contexts/NavigationContext.jsx
import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router';
import * as THREE from 'three';
import { getAnimationConfigs } from '../config/transitions';

const NavigationContext = createContext();

export function NavigationProvider({ children }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [currentScreen, setCurrentScreen] = useState('home');
  const [targetScreen, setTargetScreen] = useState('home');
  const [currentTransition, setCurrentTransition] = useState(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  
  // Separate animation stores for camera and cameraTarget
  const [cameraStore, setCameraStore] = useState({
    actions: null,
    mixer: null,
    currentAction: null,
    isReady: false
  });
  
  const [cameraTargetStore, setCameraTargetStore] = useState({
    actions: null,
    mixer: null,
    currentAction: null,
    isReady: false
  });

  // Combined ready state
  const animationStore = {
    isReady: cameraStore.isReady && cameraTargetStore.isReady,
    camera: cameraStore,
    cameraTarget: cameraTargetStore
  };

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
      setCameraStore({
        actions,
        mixer,
        currentAction: null,
        isReady: true
      });
      console.log('NavigationContext: Camera store updated successfully');
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
      setCameraTargetStore({
        actions,
        mixer,
        currentAction: null,
        isReady: true
      });
      console.log('NavigationContext: Camera target store updated successfully');
    } else {
      console.warn('NavigationContext: Invalid camera target actions or mixer');
    }
  };

  // Internal generic animation player
  const playAnimationClip = (clipName, reverse, timeScale, store, setStore, type) => {
    console.log(`NavigationContext: Playing ${type} animation:`, { clipName, reverse, timeScale });
    
    if (!store.isReady || !store.actions) {
      console.warn(`NavigationContext: ${type} store not ready`);
      return false;
    }

    const action = store.actions[clipName];
    console.log(action);
    
    if (!action) {
      console.warn(`NavigationContext: ${type} animation clip "${clipName}" not found`);
      console.log(`NavigationContext: Available ${type} clips:`, Object.keys(store.actions));
      return false;
    }

    // Stop current action if playing
    if (store.currentAction) {
      console.log(`NavigationContext: Stopping current ${type} action`);
      store.currentAction.stop();
    }

    // Reset and configure the action
    action.reset();
    action.setLoop(THREE.LoopOnce);
    action.clampWhenFinished = true;
    action.timeScale = timeScale;
    
    if (reverse) {
      action.time = action.getClip().duration; // Start from the end
    } else {
      action.time = 0; // Start from beginning
    }
    
    // Play the animation
    action.play();
    
    // DEBUG: Log more details about the action
    console.log(`NavigationContext: ${type} animation details:`, {
      clipName,
      isRunning: action.isRunning(),
      time: action.time,
      duration: action.getClip().duration,
      timeScale: action.timeScale,
      weight: action.weight,
      enabled: action.enabled,
      paused: action.paused
    });
    
    // Update current action
    setStore(prev => ({
      ...prev,
      currentAction: action
    }));

    console.log(`NavigationContext: ${type} animation started successfully`);
    return true;
  };

  // Play both camera and camera target animations
  const playTransitionAnimations = (from, to) => {
    console.log('NavigationContext: playTransitionAnimations called:', { from, to });
    
    if (!animationStore.isReady) {
      console.warn('NavigationContext: Animation stores not ready', {
        cameraReady: cameraStore.isReady,
        cameraTargetReady: cameraTargetStore.isReady
      });
      return false;
    }

    const animationConfigs = getAnimationConfigs(from, to);
    if (!animationConfigs) {
      console.warn(`NavigationContext: No animation configs found for ${from} → ${to}`);
      return false;
    }

    const { camera: cameraConfig, cameraTarget: cameraTargetConfig } = animationConfigs;
    
    // Play camera animation
    const cameraSuccess = playAnimationClip(
      cameraConfig.clip, 
      cameraConfig.reverse, 
      cameraConfig.timeScale, 
      cameraStore,
      setCameraStore,
      'camera'
    );
    
    // Play camera target animation
    const cameraTargetSuccess = playAnimationClip(
      cameraTargetConfig.clip, 
      cameraTargetConfig.reverse, 
      cameraTargetConfig.timeScale, 
      cameraTargetStore,
      setCameraTargetStore,
      'cameraTarget'
    );

    const success = cameraSuccess && cameraTargetSuccess;
    console.log('NavigationContext: Transition animations result:', {
      cameraSuccess,
      cameraTargetSuccess,
      overallSuccess: success
    });

    return success;
  };

  // Handle animation completion - needs to wait for both animations to finish
  useEffect(() => {
    if (!isTransitioning) return;
    
    // Check if we have the same mixer for both (single GLB file case)
    const sameMixer = cameraStore.mixer === cameraTargetStore.mixer;
    
    if (sameMixer && cameraStore.mixer) {
      // Single mixer handling both animations
      let animationsFinished = 0;
      const totalAnimations = 2; // camera + target
      
      const onFinished = () => {
        animationsFinished++;
        console.log(`NavigationContext: Animation finished (${animationsFinished}/${totalAnimations})`);
        
        if (animationsFinished >= totalAnimations) {
          console.log('NavigationContext: All animations finished');
          setCurrentTransition(null);
          setIsTransitioning(false);
          setCurrentScreen(targetScreen);
          
          // Clear current actions
          setCameraStore(prev => ({ ...prev, currentAction: null }));
          setCameraTargetStore(prev => ({ ...prev, currentAction: null }));
        }
      };

      cameraStore.mixer.addEventListener('finished', onFinished);
      
      return () => {
        if (cameraStore.mixer) {
          cameraStore.mixer.removeEventListener('finished', onFinished);
        }
      };
    } else if (cameraStore.mixer && cameraTargetStore.mixer) {
      // Separate mixers (original case)
      let cameraFinished = false;
      let cameraTargetFinished = false;

      const checkCompletion = () => {
        if (cameraFinished && cameraTargetFinished) {
          console.log('NavigationContext: Both animations finished');
          setCurrentTransition(null);
          setIsTransitioning(false);
          setCurrentScreen(targetScreen);
          
          // Clear current actions
          setCameraStore(prev => ({ ...prev, currentAction: null }));
          setCameraTargetStore(prev => ({ ...prev, currentAction: null }));
        }
      };

      const onCameraFinished = () => {
        console.log('NavigationContext: Camera animation finished');
        cameraFinished = true;
        checkCompletion();
      };

      const onCameraTargetFinished = () => {
        console.log('NavigationContext: Camera target animation finished');
        cameraTargetFinished = true;
        checkCompletion();
      };

      cameraStore.mixer.addEventListener('finished', onCameraFinished);
      cameraTargetStore.mixer.addEventListener('finished', onCameraTargetFinished);
      
      return () => {
        if (cameraStore.mixer) {
          cameraStore.mixer.removeEventListener('finished', onCameraFinished);
        }
        if (cameraTargetStore.mixer) {
          cameraTargetStore.mixer.removeEventListener('finished', onCameraTargetFinished);
        }
      };
    }
  }, [cameraStore.mixer, cameraTargetStore.mixer, isTransitioning, targetScreen]);

  // Handle URL changes
  useEffect(() => {
    const newScreen = pathToScreen(location.pathname);
    if (newScreen !== currentScreen && newScreen !== targetScreen) {
      console.log(`NavigationContext: URL changed to: ${newScreen}`);
      
      if (isTransitioning) {
        setIsTransitioning(false);
        setCurrentTransition(null);
      }
      
      setTargetScreen(newScreen);
      
      // Start transition if both stores are ready
      if (animationStore.isReady) {
        const animationConfigs = getAnimationConfigs(currentScreen, newScreen);
        if (animationConfigs) {
          setIsTransitioning(true);
          setCurrentTransition(animationConfigs);
          playTransitionAnimations(currentScreen, newScreen);
        } else {
          console.log('NavigationContext: No transition config, updating screen directly');
          setCurrentScreen(newScreen);
        }
      } else {
        console.log('NavigationContext: Animation stores not ready, updating screen directly');
        setCurrentScreen(newScreen);
      }
    }
  }, [location.pathname, currentScreen, targetScreen, isTransitioning, animationStore.isReady]);

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
    
    // Play animations immediately if both stores are ready
    if (animationStore.isReady) {
      const success = playTransitionAnimations(currentScreen, section);
      if (!success) {
        console.warn(`NavigationContext: Failed to play transition animations`);
        // Complete transition immediately if animations fail
        setIsTransitioning(false);
        setCurrentTransition(null);
        setCurrentScreen(section);
      }
    } else {
      console.warn('NavigationContext: Animation stores not ready, completing transition immediately');
      // Complete transition immediately if stores not ready
      setIsTransitioning(false);
      setCurrentTransition(null);
      setCurrentScreen(section);
    }
    
    // Update the URL
    const path = section === 'home' ? '/' : `/${section}`;
    navigate(path);
  };

  // Legacy functions for backward compatibility
  const onTransitionComplete = () => {
    setCurrentTransition(null);
    setIsTransitioning(false);
    setCurrentScreen(targetScreen);
  };

  const playAnimation = (clipName, reverse = false) => {
    // This is kept for backward compatibility but should not be used
    console.warn('NavigationContext: playAnimation is deprecated, use playTransitionAnimations instead');
    return false;
  };

  // Legacy registerAnimations function (kept for backward compatibility)
  const registerAnimations = (actions, mixer) => {
    console.warn('NavigationContext: registerAnimations is deprecated, use registerCameraAnimations instead');
    return registerCameraAnimations(actions, mixer);
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
      playAnimation, // Legacy
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
  return context;
}

export default NavigationContext;
// // Define your route transitions with enhanced metadata
// export const transitions = {
//   // From Home
//   'home-about': { 
//     // clip: 'HomeToAbout', 
//     clip: 'CameraAction',
//     reverse: false,
//     duration: 2.0, // seconds - for debugging
//     description: 'Home to About transition'
//   },
//   'home-skills': { 
//     clip: 'HomeToSkills', 
//     reverse: false,
//     duration: 2.0,
//     description: 'Home to Skills transition'
//   },
//   'home-project': { 
//     clip: 'HomeToProject', 
//     reverse: false,
//     duration: 2.0,
//     description: 'Home to Projects transition'
//   },
//   'home-contact': { 
//     clip: 'HomeToContact', 
//     reverse: false,
//     duration: 2.0,
//     description: 'Home to Contact transition'
//   },
  
//   // Back to Home (reverse animations)
//   'about-home': { 
//     clip: 'HomeToAbout', 
//     reverse: true,
//     duration: 1.0, // Faster reverse
//     description: 'About to Home transition (reverse)'
//   },
//   'skills-home': { 
//     clip: 'HomeToSkills', 
//     reverse: true,
//     duration: 1.0,
//     description: 'Skills to Home transition (reverse)'
//   },
//   'project-home': { 
//     clip: 'HomeToProject', 
//     reverse: true,
//     duration: 1.0,
//     description: 'Projects to Home transition (reverse)'
//   },
//   'contact-home': { 
//     clip: 'HomeToContact', 
//     reverse: true,
//     duration: 1.0,
//     description: 'Contact to Home transition (reverse)'
//   },
  
//   // Between sections (direct transitions)
//   'about-skills': { 
//     clip: 'AboutToSkills', 
//     reverse: false,
//     duration: 1.5,
//     description: 'About to Skills direct transition'
//   },
//   'skills-about': { 
//     clip: 'AboutToSkills', 
//     reverse: true,
//     duration: 1.5,
//     description: 'Skills to About direct transition'
//   },
//   'skills-project': { 
//     clip: 'SkillsToProject', 
//     reverse: false,
//     duration: 1.5,
//     description: 'Skills to Projects direct transition'
//   },
//   'project-skills': { 
//     clip: 'SkillsToProject', 
//     reverse: true,
//     duration: 1.5,
//     description: 'Projects to Skills direct transition'
//   },
//   'project-contact': { 
//     clip: 'ProjectToContact', 
//     reverse: false,
//     duration: 1.5,
//     description: 'Projects to Contact direct transition'
//   },
//   'contact-project': { 
//     clip: 'ProjectToContact', 
//     reverse: true,
//     duration: 1.5,
//     description: 'Contact to Projects direct transition'
//   },
  
//   // Additional cross-section transitions if needed
//   'about-project': {
//     clip: 'AboutToProject',
//     reverse: false,
//     duration: 2.0,
//     description: 'About to Projects direct transition'
//   },
//   'project-about': {
//     clip: 'AboutToProject',
//     reverse: true,
//     duration: 2.0,
//     description: 'Projects to About direct transition'
//   },
//   'about-contact': {
//     clip: 'AboutToContact',
//     reverse: false,
//     duration: 2.0,
//     description: 'About to Contact direct transition'
//   },
//   'contact-about': {
//     clip: 'AboutToContact',
//     reverse: true,
//     duration: 2.0,
//     description: 'Contact to About direct transition'
//   },
//   'skills-contact': {
//     clip: 'SkillsToContact',
//     reverse: false,
//     duration: 2.0,
//     description: 'Skills to Contact direct transition'
//   },
//   'contact-skills': {
//     clip: 'SkillsToContact',
//     reverse: true,
//     duration: 2.0,
//     description: 'Contact to Skills direct transition'
//   }
// };

// // Navigation items configuration
// export const navItems = [
//   { key: 'home', label: 'Home', icon: '🏠' },
//   { key: 'about', label: 'About', icon: '👤' },
//   { key: 'skills', label: 'Skills', icon: '⚡' },
//   { key: 'project', label: 'Projects', icon: '🚀' },
//   { key: 'contact', label: 'Contact', icon: '📬' }
// ];

// // Helper function to get all available transition keys
// export const getAvailableTransitions = () => Object.keys(transitions);

// // Helper function to validate if a transition exists
// export const hasTransition = (from, to) => {
//   const key = `${from}-${to}`;
//   return transitions.hasOwnProperty(key);
// };

// // Helper function to get transition info
// export const getTransitionInfo = (from, to) => {
//   const key = `${from}-${to}`;
//   return transitions[key] || null;
// };

// // Debug function to log all transitions
// export const debugTransitions = () => {
//   console.group('Available Transitions:');
//   Object.entries(transitions).forEach(([key, config]) => {
//     console.log(`${key}: ${config.description} (${config.clip}${config.reverse ? ' - reversed' : ''})`);
//   });
//   console.groupEnd();
// };

// gltfjsx public/models/Fish.gltf -o src/components/Fish.jsx -r public


// Enhanced transitions configuration with grouped Camera and CameraTarget animations
export const transitions = {
  // From Home
  'home-about': { 
    camera: {
      clip: 'Camera_HomeToAbout',
      reverse: false,
      timeScale: 1.0
    },
    cameraTarget: {
      clip: 'CameraTarget_HomeToAbout', 
      reverse: false,
      timeScale: 1.0
    },
    duration: 2.0, // seconds - for debugging
    description: 'Home to About transition'
  },
  'home-skills': { 
    camera: {
      clip: 'Camera_HomeToSkills',
      reverse: false,
      timeScale: 1.0
    },
    cameraTarget: {
      clip: 'CameraTarget_HomeToSkills',
      reverse: false,
      timeScale: 1.0
    },
    duration: 2.0,
    description: 'Home to Skills transition'
  },
  'home-project': { 
    camera: {
      clip: 'Camera_HomeToProject',
      reverse: false,
      timeScale: 1.0
    },
    cameraTarget: {
      clip: 'CameraTarget_HomeToProject',
      reverse: false,
      timeScale: 1.0
    },
    duration: 2.0,
    description: 'Home to Projects transition'
  },
  'home-contact': { 
    camera: {
      clip: 'Camera_HomeToContact',
      reverse: false,
      timeScale: 1.0
    },
    cameraTarget: {
      clip: 'CameraTarget_HomeToContact',
      reverse: false,
      timeScale: 1.0
    },
    duration: 2.0,
    description: 'Home to Contact transition'
  },
  
  // Back to Home (reverse animations)
  'about-home': { 
    camera: {
      clip: 'Camera_HomeToAbout',
      reverse: true,
      timeScale: -2.0 // Faster reverse
    },
    cameraTarget: {
      clip: 'CameraTarget_HomeToAbout',
      reverse: true,
      timeScale: -2.0
    },
    duration: 1.0,
    description: 'About to Home transition (reverse)'
  },
  'skills-home': { 
    camera: {
      clip: 'Camera_HomeToSkills',
      reverse: true,
      timeScale: -2.0
    },
    cameraTarget: {
      clip: 'CameraTarget_HomeToSkills',
      reverse: true,
      timeScale: -2.0
    },
    duration: 1.0,
    description: 'Skills to Home transition (reverse)'
  },
  'project-home': { 
    camera: {
      clip: 'Camera_HomeToProject',
      reverse: true,
      timeScale: -2.0
    },
    cameraTarget: {
      clip: 'CameraTarget_HomeToProject',
      reverse: true,
      timeScale: -2.0
    },
    duration: 1.0,
    description: 'Projects to Home transition (reverse)'
  },
  'contact-home': { 
    camera: {
      clip: 'Camera_HomeToContact',
      reverse: true,
      timeScale: -2.0
    },
    cameraTarget: {
      clip: 'CameraTarget_HomeToContact',
      reverse: true,
      timeScale: -2.0
    },
    duration: 1.0,
    description: 'Contact to Home transition (reverse)'
  },
  
  // Between sections (direct transitions)
  'about-skills': { 
    camera: {
      clip: 'Camera_AboutToSkills',
      reverse: false,
      timeScale: 1.0
    },
    cameraTarget: {
      clip: 'CameraTarget_AboutToSkills',
      reverse: false,
      timeScale: 1.0
    },
    duration: 1.5,
    description: 'About to Skills direct transition'
  },
  'skills-about': { 
    camera: {
      clip: 'Camera_AboutToSkills',
      reverse: true,
      timeScale: -1.5
    },
    cameraTarget: {
      clip: 'CameraTarget_AboutToSkills',
      reverse: true,
      timeScale: -1.5
    },
    duration: 1.5,
    description: 'Skills to About direct transition'
  },
  'skills-project': { 
    camera: {
      clip: 'Camera_SkillsToProject',
      reverse: false,
      timeScale: 1.0
    },
    cameraTarget: {
      clip: 'CameraTarget_SkillsToProject',
      reverse: false,
      timeScale: 1.0
    },
    duration: 1.5,
    description: 'Skills to Projects direct transition'
  },
  'project-skills': { 
    camera: {
      clip: 'Camera_SkillsToProject',
      reverse: true,
      timeScale: -1.5
    },
    cameraTarget: {
      clip: 'CameraTarget_SkillsToProject',
      reverse: true,
      timeScale: -1.5
    },
    duration: 1.5,
    description: 'Projects to Skills direct transition'
  },
  'project-contact': { 
    camera: {
      clip: 'Camera_ProjectToContact',
      reverse: false,
      timeScale: 1.0
    },
    cameraTarget: {
      clip: 'CameraTarget_ProjectToContact',
      reverse: false,
      timeScale: 1.0
    },
    duration: 1.5,
    description: 'Projects to Contact direct transition'
  },
  'contact-project': { 
    camera: {
      clip: 'Camera_ProjectToContact',
      reverse: true,
      timeScale: -1.5
    },
    cameraTarget: {
      clip: 'CameraTarget_ProjectToContact',
      reverse: true,
      timeScale: -1.5
    },
    duration: 1.5,
    description: 'Contact to Projects direct transition'
  },
  
  // Additional cross-section transitions
  'about-project': {
    camera: {
      clip: 'Camera_AboutToProject',
      reverse: false,
      timeScale: 1.0
    },
    cameraTarget: {
      clip: 'CameraTarget_AboutToProject',
      reverse: false,
      timeScale: 1.0
    },
    duration: 2.0,
    description: 'About to Projects direct transition'
  },
  'project-about': {
    camera: {
      clip: 'Camera_AboutToProject',
      reverse: true,
      timeScale: -1.0
    },
    cameraTarget: {
      clip: 'CameraTarget_AboutToProject',
      reverse: true,
      timeScale: -1.0
    },
    duration: 2.0,
    description: 'Projects to About direct transition'
  },
  'about-contact': {
    camera: {
      clip: 'Camera_AboutToContact',
      reverse: false,
      timeScale: 1.0
    },
    cameraTarget: {
      clip: 'CameraTarget_AboutToContact',
      reverse: false,
      timeScale: 1.0
    },
    duration: 2.0,
    description: 'About to Contact direct transition'
  },
  'contact-about': {
    camera: {
      clip: 'Camera_AboutToContact',
      reverse: true,
      timeScale: -1.0
    },
    cameraTarget: {
      clip: 'CameraTarget_AboutToContact',
      reverse: true,
      timeScale: -1.0
    },
    duration: 2.0,
    description: 'Contact to About direct transition'
  },
  'skills-contact': {
    camera: {
      clip: 'Camera_SkillsToContact',
      reverse: false,
      timeScale: 1.0
    },
    cameraTarget: {
      clip: 'CameraTarget_SkillsToContact',
      reverse: false,
      timeScale: 1.0
    },
    duration: 2.0,
    description: 'Skills to Contact direct transition'
  },
  'contact-skills': {
    camera: {
      clip: 'Camera_SkillsToContact',
      reverse: true,
      timeScale: -1.0
    },
    cameraTarget: {
      clip: 'CameraTarget_SkillsToContact',
      reverse: true,
      timeScale: -1.0
    },
    duration: 2.0,
    description: 'Contact to Skills direct transition'
  }
};

// Navigation items configuration
export const navItems = [
  { key: 'home', label: 'Home', icon: '🏠' },
  { key: 'about', label: 'About', icon: '👤' },
  { key: 'skills', label: 'Skills', icon: '⚡' },
  { key: 'project', label: 'Projects', icon: '🚀' },
  { key: 'contact', label: 'Contact', icon: '📬' }
];

// Helper function to get all available transition keys
export const getAvailableTransitions = () => Object.keys(transitions);

// Helper function to validate if a transition exists
export const hasTransition = (from, to) => {
  const key = `${from}-${to}`;
  return transitions.hasOwnProperty(key);
};

// Helper function to get transition info
export const getTransitionInfo = (from, to) => {
  const key = `${from}-${to}`;
  return transitions[key] || null;
};

// Helper function to get camera animation config
export const getCameraAnimationConfig = (from, to) => {
  const transition = getTransitionInfo(from, to);
  return transition?.camera || null;
};

// Helper function to get camera target animation config
export const getCameraTargetAnimationConfig = (from, to) => {
  const transition = getTransitionInfo(from, to);
  return transition?.cameraTarget || null;
};

// Helper function to get both animation configs
export const getAnimationConfigs = (from, to) => {
  const transition = getTransitionInfo(from, to);
  if (!transition) return null;
  
  return {
    camera: transition.camera,
    cameraTarget: transition.cameraTarget,
    duration: transition.duration,
    description: transition.description
  };
};

// Helper function to validate transition has both camera and target animations
export const hasCompleteTransition = (from, to) => {
  const transition = getTransitionInfo(from, to);
  return transition && transition.camera && transition.cameraTarget;
};

// Debug function to log all transitions
export const debugTransitions = () => {
  console.group('Available Transitions:');
  Object.entries(transitions).forEach(([key, config]) => {
    console.log(`${key}: ${config.description}`);
    console.log(`  Camera: ${config.camera.clip} (reverse: ${config.camera.reverse}, timeScale: ${config.camera.timeScale})`);
    console.log(`  Target: ${config.cameraTarget.clip} (reverse: ${config.cameraTarget.reverse}, timeScale: ${config.cameraTarget.timeScale})`);
  });
  console.groupEnd();
};

// Helper function to get all unique animation clip names (useful for debugging)
export const getAllAnimationClips = () => {
  const clips = new Set();
  Object.values(transitions).forEach(transition => {
    clips.add(transition.camera.clip);
    clips.add(transition.cameraTarget.clip);
  });
  return Array.from(clips).sort();
};
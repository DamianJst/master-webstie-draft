// Define your route transitions with enhanced metadata
export const transitions = {
  // From Home
  'home-about': { 
    // clip: 'HomeToAbout', 
    clip: 'CameraAction',
    reverse: false,
    duration: 2.0, // seconds - for debugging
    description: 'Home to About transition'
  },
  'home-skills': { 
    clip: 'HomeToSkills', 
    reverse: false,
    duration: 2.0,
    description: 'Home to Skills transition'
  },
  'home-project': { 
    clip: 'HomeToProject', 
    reverse: false,
    duration: 2.0,
    description: 'Home to Projects transition'
  },
  'home-contact': { 
    clip: 'HomeToContact', 
    reverse: false,
    duration: 2.0,
    description: 'Home to Contact transition'
  },
  
  // Back to Home (reverse animations)
  'about-home': { 
    clip: 'HomeToAbout', 
    reverse: true,
    duration: 1.0, // Faster reverse
    description: 'About to Home transition (reverse)'
  },
  'skills-home': { 
    clip: 'HomeToSkills', 
    reverse: true,
    duration: 1.0,
    description: 'Skills to Home transition (reverse)'
  },
  'project-home': { 
    clip: 'HomeToProject', 
    reverse: true,
    duration: 1.0,
    description: 'Projects to Home transition (reverse)'
  },
  'contact-home': { 
    clip: 'HomeToContact', 
    reverse: true,
    duration: 1.0,
    description: 'Contact to Home transition (reverse)'
  },
  
  // Between sections (direct transitions)
  'about-skills': { 
    clip: 'AboutToSkills', 
    reverse: false,
    duration: 1.5,
    description: 'About to Skills direct transition'
  },
  'skills-about': { 
    clip: 'AboutToSkills', 
    reverse: true,
    duration: 1.5,
    description: 'Skills to About direct transition'
  },
  'skills-project': { 
    clip: 'SkillsToProject', 
    reverse: false,
    duration: 1.5,
    description: 'Skills to Projects direct transition'
  },
  'project-skills': { 
    clip: 'SkillsToProject', 
    reverse: true,
    duration: 1.5,
    description: 'Projects to Skills direct transition'
  },
  'project-contact': { 
    clip: 'ProjectToContact', 
    reverse: false,
    duration: 1.5,
    description: 'Projects to Contact direct transition'
  },
  'contact-project': { 
    clip: 'ProjectToContact', 
    reverse: true,
    duration: 1.5,
    description: 'Contact to Projects direct transition'
  },
  
  // Additional cross-section transitions if needed
  'about-project': {
    clip: 'AboutToProject',
    reverse: false,
    duration: 2.0,
    description: 'About to Projects direct transition'
  },
  'project-about': {
    clip: 'AboutToProject',
    reverse: true,
    duration: 2.0,
    description: 'Projects to About direct transition'
  },
  'about-contact': {
    clip: 'AboutToContact',
    reverse: false,
    duration: 2.0,
    description: 'About to Contact direct transition'
  },
  'contact-about': {
    clip: 'AboutToContact',
    reverse: true,
    duration: 2.0,
    description: 'Contact to About direct transition'
  },
  'skills-contact': {
    clip: 'SkillsToContact',
    reverse: false,
    duration: 2.0,
    description: 'Skills to Contact direct transition'
  },
  'contact-skills': {
    clip: 'SkillsToContact',
    reverse: true,
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

// Debug function to log all transitions
export const debugTransitions = () => {
  console.group('Available Transitions:');
  Object.entries(transitions).forEach(([key, config]) => {
    console.log(`${key}: ${config.description} (${config.clip}${config.reverse ? ' - reversed' : ''})`);
  });
  console.groupEnd();
};
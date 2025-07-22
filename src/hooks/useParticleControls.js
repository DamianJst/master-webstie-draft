// src/hooks/useParticleControls.js
import { useState } from 'react';

// Default particle configurations
const DEFAULT_CONFIG = {
  enabled: true,
  
  swarm: {
    enabled: true,
    count: 3000,
    color: "#050505",
    intensity: 0.5
  },
  
  lines: {
    enabled: true,
    count: 8,
    colors: ['#A2CCB6', '#FCEEB5', '#EE786E', '#e0feff', 'lightpink', 'lightblue'],
    radius: 15,
    rotationIntensity: 0.5
  },

  attractors: {
    enabled: true,
    count: 12,
    colors: ["hsl(179, 90%, 61%)", "hsl(255, 0%, 100%)", "hsl(25, 100%, 50%)"],
    attractorScale: 0.45,
    attractorTimeStep: 0.004,
    useLines: false,
    position: [0, 4.8, 0],
    rotation: [0, Math.PI, Math.PI * 2.3],
    scale: [1.4, 1.4, 1.4]
  },
  
  performance: {
    reducedParticles: true
  }
};

export function useParticleControls(initialConfig = {}) {
  const [config, setConfig] = useState({
    ...DEFAULT_CONFIG,
    ...initialConfig
  });

  // Quick toggles
  const toggleParticles = () => {
    setConfig(prev => ({ ...prev, enabled: !prev.enabled }));
  };

  const toggleSwarm = () => {
    setConfig(prev => ({
      ...prev,
      swarm: { ...prev.swarm, enabled: !prev.swarm.enabled }
    }));
  };

  const toggleLines = () => {
    setConfig(prev => ({
      ...prev,
      lines: { ...prev.lines, enabled: !prev.lines.enabled }
    }));
  };

  const toggleAttractors = () => {
    setConfig(prev => ({
      ...prev,
      attractors: { ...prev.attractors, enabled: !prev.attractors.enabled }
    }));
  };

  const toggleAttractorMode = () => {
    setConfig(prev => ({
      ...prev,
      attractors: { ...prev.attractors, useLines: !prev.attractors.useLines }
    }));
  };

  // Update specific settings
  const updateConfig = (updates) => {
    setConfig(prev => ({ ...prev, ...updates }));
  };

  const updateSwarm = (updates) => {
    setConfig(prev => ({
      ...prev,
      swarm: { ...prev.swarm, ...updates }
    }));
  };

  const updateLines = (updates) => {
    setConfig(prev => ({
      ...prev,
      lines: { ...prev.lines, ...updates }
    }));
  };

  const updateAttractors = (updates) => {
    setConfig(prev => ({
      ...prev,
      attractors: { ...prev.attractors, ...updates }
    }));
  };

  // Presets
  const setMinimalMode = () => {
    setConfig(prev => ({
      ...prev,
      swarm: { ...prev.swarm, count: 1000, intensity: 0.3 },
      lines: { ...prev.lines, count: 4, rotationIntensity: 0.3 },
      attractors: { ...prev.attractors, count: 6, attractorScale: 0.3 }
    }));
  };

  const setIntenseMode = () => {
    setConfig(prev => ({
      ...prev,
      swarm: { ...prev.swarm, count: 5000, intensity: 0.8 },
      lines: { ...prev.lines, count: 12, rotationIntensity: 1.0 },
      attractors: { ...prev.attractors, count: 20, attractorScale: 0.6 }
    }));
  };

  const setPerformanceMode = () => {
    setConfig(prev => ({
      ...prev,
      swarm: { ...prev.swarm, count: 1500, intensity: 0.4 },
      lines: { ...prev.lines, count: 5, rotationIntensity: 0.4 },
      attractors: { ...prev.attractors, count: 8, attractorScale: 0.35 },
      performance: { reducedParticles: true }
    }));
  };

  const setChaosMode = () => {
    setConfig(prev => ({
      ...prev,
      swarm: { ...prev.swarm, enabled: false },
      lines: { ...prev.lines, enabled: false },
      attractors: { 
        ...prev.attractors, 
        enabled: true, 
        count: 25, 
        attractorScale: 0.8,
        attractorTimeStep: 0.006
      }
    }));
  };

  return {
    config,
    toggleParticles,
    toggleSwarm,
    toggleLines,
    toggleAttractors,
    toggleAttractorMode,
    updateConfig,
    updateSwarm,
    updateLines,
    updateAttractors,
    setMinimalMode,
    setIntenseMode,
    setPerformanceMode,
    setChaosMode
  };
}
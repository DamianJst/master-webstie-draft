// src/components/ParticleControlPanel.jsx - Optional debug/control panel
import React from 'react';

export default function ParticleControlPanel({ 
  config, 
  controls,
  visible = false,
  position = 'top-right' 
}) {
  if (!visible) return null;

  const positionStyles = {
    'top-right': { top: '10px', right: '10px' },
    'top-left': { top: '10px', left: '10px' },
    'bottom-right': { bottom: '10px', right: '10px' },
    'bottom-left': { bottom: '10px', left: '10px' }
  };

  const panelStyle = {
    position: 'fixed',
    ...positionStyles[position],
    background: 'rgba(0, 0, 0, 0.8)',
    color: 'white',
    padding: '15px',
    borderRadius: '8px',
    fontSize: '13px',
    fontFamily: 'monospace',
    zIndex: 1000,
    minWidth: '200px',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    maxHeight: '80vh',
    overflowY: 'auto'
  };

  const buttonStyle = {
    background: 'rgba(255, 255, 255, 0.1)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    color: 'white',
    padding: '4px 8px',
    margin: '2px',
    borderRadius: '4px',
    fontSize: '11px',
    cursor: 'pointer',
    transition: 'background 0.2s'
  };

  const activeButtonStyle = {
    ...buttonStyle,
    background: 'rgba(0, 255, 0, 0.3)',
    border: '1px solid rgba(0, 255, 0, 0.5)'
  };

  return (
    <div style={panelStyle}>
      <h3 style={{ margin: '0 0 10px 0', fontSize: '14px' }}>Particle Controls</h3>
      
      {/* Main Toggles */}
      <div style={{ marginBottom: '10px' }}>
        <button
          style={config.enabled ? activeButtonStyle : buttonStyle}
          onClick={controls.toggleParticles}
        >
          All Particles: {config.enabled ? 'ON' : 'OFF'}
        </button>
      </div>

      {/* Swarm Controls */}
      <div style={{ marginBottom: '10px' }}>
        <div style={{ fontSize: '12px', marginBottom: '5px' }}>Swarm:</div>
        <button
          style={config.swarm.enabled ? activeButtonStyle : buttonStyle}
          onClick={controls.toggleSwarm}
        >
          {config.swarm.enabled ? 'ON' : 'OFF'} ({config.swarm.count})
        </button>
        
        <div style={{ marginTop: '5px' }}>
          <button
            style={buttonStyle}
            onClick={() => controls.updateSwarm({ count: Math.max(500, config.swarm.count - 500) })}
          >
            -
          </button>
          <span style={{ margin: '0 10px' }}>Count: {config.swarm.count}</span>
          <button
            style={buttonStyle}
            onClick={() => controls.updateSwarm({ count: Math.min(8000, config.swarm.count + 500) })}
          >
            +
          </button>
        </div>
      </div>

      {/* Lines Controls */}
      <div style={{ marginBottom: '10px' }}>
        <div style={{ fontSize: '12px', marginBottom: '5px' }}>Lines:</div>
        <button
          style={config.lines.enabled ? activeButtonStyle : buttonStyle}
          onClick={controls.toggleLines}
        >
          {config.lines.enabled ? 'ON' : 'OFF'} ({config.lines.count})
        </button>
        
        <div style={{ marginTop: '5px' }}>
          <button
            style={buttonStyle}
            onClick={() => controls.updateLines({ count: Math.max(1, config.lines.count - 1) })}
          >
            -
          </button>
          <span style={{ margin: '0 10px' }}>Count: {config.lines.count}</span>
          <button
            style={buttonStyle}
            onClick={() => controls.updateLines({ count: Math.min(20, config.lines.count + 1) })}
          >
            +
          </button>
        </div>
      </div>

      {/* Attractor Controls */}
      <div style={{ marginBottom: '10px' }}>
        <div style={{ fontSize: '12px', marginBottom: '5px' }}>Chaos Attractors:</div>
        <button
          style={config.attractors.enabled ? activeButtonStyle : buttonStyle}
          onClick={controls.toggleAttractors}
        >
          {config.attractors.enabled ? 'ON' : 'OFF'} ({config.attractors.count})
        </button>
        
        <div style={{ marginTop: '5px' }}>
          <button
            style={buttonStyle}
            onClick={() => controls.updateAttractors({ count: Math.max(1, config.attractors.count - 2) })}
          >
            -
          </button>
          <span style={{ margin: '0 10px' }}>Count: {config.attractors.count}</span>
          <button
            style={buttonStyle}
            onClick={() => controls.updateAttractors({ count: Math.min(30, config.attractors.count + 2) })}
          >
            +
          </button>
        </div>

        <div style={{ marginTop: '5px' }}>
          <button
            style={config.attractors.useLines ? activeButtonStyle : buttonStyle}
            onClick={controls.toggleAttractorMode}
          >
            Mode: {config.attractors.useLines ? 'Lines' : 'Points'}
          </button>
        </div>
      </div>

      {/* Presets */}
      <div style={{ marginBottom: '10px' }}>
        <div style={{ fontSize: '12px', marginBottom: '5px' }}>Presets:</div>
        <div>
          <button style={buttonStyle} onClick={controls.setPerformanceMode}>
            Performance
          </button>
          <button style={buttonStyle} onClick={controls.setMinimalMode}>
            Minimal
          </button>
          <button style={buttonStyle} onClick={controls.setIntenseMode}>
            Intense
          </button>
          <button style={buttonStyle} onClick={controls.setChaosMode}>
            Chaos
          </button>
        </div>
      </div>

      {/* Info */}
      <div style={{ fontSize: '10px', opacity: 0.7, borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '5px' }}>
        <div>Keys: P (particles), S (swarm), L (lines), A (attractors)</div>
        <div>Performance: {config.performance.reducedParticles ? 'ON' : 'OFF'}</div>
        <div>Attractors: Lorenz, Dadras, Aizawa, Arneodo...</div>
      </div>
    </div>
  );
}

// Usage example:
/*
import { useParticleControls } from './hooks/useParticleControls';
import ParticleControlPanel from './components/ParticleControlPanel';

function App() {
  const particleControls = useParticleControls();
  
  return (
    <>
      <ParticleSystem {...particleControls.config} />
      <ParticleControlPanel 
        config={particleControls.config}
        controls={particleControls}
        visible={true} // Set to false in production
        position="top-right"
      />
    </>
  );
}
*/
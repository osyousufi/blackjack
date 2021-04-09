import React from 'react';
import Particles from 'react-particles-js';
import particlesConfig from '../config/particlesConfig';

const ParticleBackground = () => {
  return (
    <Particles height="100vh" width="100vw" params={particlesConfig}></Particles>
  )
}

export default ParticleBackground;

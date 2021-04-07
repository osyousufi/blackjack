import React from 'react';
import Game from './components/Game';
import ParticleBackground from './components/ParticleBackground';



const App = () => {
  return (
    <div
      style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%"
      }}
    >

      <ParticleBackground />
      <div
        style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%"
        }}
      >
        <Game />
      </div>

    </div>

  )

}

export default App;

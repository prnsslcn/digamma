// src/components/Card3D.jsx
import { useEffect, useRef } from 'react';

const Card3D = () => {
  const cardRef = useRef(null);
  const topRef = useRef(null);

  useEffect(() => {
    const card = cardRef.current;
    const top = topRef.current;

    const handleMouseMove = (e) => {
      const x = -(window.innerWidth / 2 - e.pageX) / 100;
      const y = (window.innerHeight / 2 - e.pageY) / 100;
      card.style.transform = `rotateY(${x}deg) rotateX(${y}deg)`;
    };

    top.addEventListener('mousemove', handleMouseMove);

    return () => {
      top.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div ref={topRef} id="top">
      <div className="card" ref={cardRef}>
        <div className="thumb" style={{ backgroundImage: 'url(../image/pix1.jpg)' }}></div>
        <h2>Welcome to Iceland</h2>
        <div id="cl" className="clock">
          <div id="divClock"></div>
        </div>
      </div>
    </div>
  );
};

export default Card3D;

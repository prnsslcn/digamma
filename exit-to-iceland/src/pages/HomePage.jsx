// src/pages/HomePage.jsx
import { useEffect } from 'react';
import NavigationMenu from '../components/NavigationMenu';
import Card3D from '../components/Card3D';
import '../assets/styles/home.css';
import { showClock } from '../utils/clock';

const HomePage = () => {
  useEffect(() => {
    showClock();
  }, []);

  return (
    <>
      <NavigationMenu />
      <div id="top">
        <div className="perspective">
          <Card3D />
        </div>
      </div>
    </>
  );
};

export default HomePage;

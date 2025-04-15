// src/components/NavigationMenu.jsx
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

const NavigationMenu = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    document.body.classList.remove('open');
    setTimeout(() => navigate(path), 500);
  };

  useEffect(() => {
    if (open) {
      document.body.classList.add('open');
    } else {
      document.body.classList.remove('open');
    }
  }, [open]);

  return (
    <>
      <button className="menu-toggle" onClick={() => setOpen(!open)}></button>
      <nav>
        <ul className="menu">
          <li onClick={() => handleNavigate('/home')} data-text="Home">Home</li>
          <li onClick={() => handleNavigate('/about')} data-text="About Iceland">About Iceland</li>
          <li onClick={() => handleNavigate('/made')} data-text="Made in Iceland">Made in Iceland</li>
          <li onClick={() => handleNavigate('/travel')} data-text="About Travel">About Travel</li>
        </ul>
      </nav>
    </>
  );
};

export default NavigationMenu;

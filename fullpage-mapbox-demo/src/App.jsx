import { useEffect } from 'react';
import ReactFullpage from '@fullpage/react-fullpage';
import MapSection from './components/MapSection';
import About from './components/About';
import Projects from './components/Projects';
import Contact from './components/Contact';

function App() {
  useEffect(() => {
    // fullpage_api 접근 가능한 시점에서 실행
    const disableScroll = () => {
      if (window.fullpage_api) {
        window.fullpage_api.setAllowScrolling(false);      // 마우스 휠 막기
        window.fullpage_api.setKeyboardScrolling(false);   // 키보드 ↑↓ 막기
      }
    };

    // 약간의 delay 줘서 fullpage_api 로딩 보장
    setTimeout(disableScroll, 500);
  }, []);

  return (
    <ReactFullpage
      scrollingSpeed={700}
      render={() => {
        return (
          <ReactFullpage.Wrapper>
            <div className="section">
              <MapSection />
            </div>
            <div className="section">
              <About />
            </div>
            <div className="section">
              <Projects />
            </div>
            <div className="section">
              <Contact />
            </div>
          </ReactFullpage.Wrapper>
        );
      }}
    />
  );
}

export default App;
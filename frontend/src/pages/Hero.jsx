
import bgnight from '../assets/bgnight.jpg';
import bgday from '../assets/bgday.jpg';
import {useTheme} from '../hooks/common/useTheme.js';
import { Canvas } from '@react-three/fiber';
import Clapperboard from '../components/tests/clapperboard.jsx';

const Hero = () => {
  const { darkMode } = useTheme();

  return (
    <div className='absolute top-0 h-[100vh] w-full bg-amber-200'>
      
      {/* Content */}
      <div className='mt-60 h-[50%]'>
        <Canvas>
          <Clapperboard />
        </Canvas>
      </div>
    </div>
  );
};

export default Hero;
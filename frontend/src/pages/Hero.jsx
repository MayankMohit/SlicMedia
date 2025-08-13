
import bgnight from '../assets/bgnight.jpg';
import bgday from '../assets/bgday.jpg';
import {useTheme} from '../hooks/common/useTheme.js';

const Hero = () => {
  const { darkMode } = useTheme();

  return (
    <div className='relative min-h-[200vh]'>
      {/* Background Image */}
      <div className='fixed inset-0 -z-10'>
        <img 
          src={darkMode ? bgnight : bgday} 
          alt="Background" 
          className='w-full h-full object-cover transition-opacity duration-500'
        />
      </div>
      
      {/* Content */}
      <div className={`relative px-6 md:px-12 lg:px-24 mt-50 py-20 mx-20 ${darkMode ? 'bg-white/10' : 'bg-black/70'}`}>
        <h1 className='text-4xl md:text-6xl font-bold mb-6 text-zinc-200'>
          {darkMode ? 'Night Mode Content' : 'Day Mode Content'}
        </h1>
      </div>
    </div>
  );
};

export default Hero;
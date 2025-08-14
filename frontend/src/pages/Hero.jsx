import bgnight from '../assets/noiseLight2.png';
import { useTheme } from '../hooks/common/useTheme.js';
import { ArrowDown } from 'lucide-react';

const Hero = () => {
  const { darkMode } = useTheme();

  return (
    <div
      className="absolute top-0 left-0 w-full h-screen bg-neutral-300 dark:bg-zinc-900"
      style={{
        backgroundImage: `url(${bgnight})`,
        backgroundRepeat: 'repeat',
        backgroundSize: 'auto',
      }}
    >
      <div className="flex items-center justify-start h-full">
        <div className="ml-10 mt-30">
          <div className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-10 ml-2 select-none">  
            B2B Service Agency
          </div>
          <p className="mt-4 text-[100px] w-[50rem] text-black font-bold font-sans leading-[6.3rem] tracking-[-4.8px] dark:text-gray-400 select-none">
            Designing <span className='cedarville-cursive-regular'>Visuals</span> that Elevate your Brand.
          </p>
          <p className="mt-15 text-2xl w-[30rem] text-gray-800 font-bold dark:text-gray-200 ml-2 select-none leading-[1.6rem]">
            At SLIC Media, we help DTC brands scale their online presence with high-converting video creatives, content strategies, and growth packages tailored for results.
          </p>
          <p className="mt-3 text-xl text-bold text-gray-600 dark:text-gray-400 mb-10 ml-2  select-none">
            Discover More 
            <button className='ml-3 px-2 py-1 bg-[#c60867] text-white rounded-md '>
              <ArrowDown className="inline-block" />
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Hero;

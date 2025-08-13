import Navbar from '../components/common/Navbar';
import Hero from '../pages/Hero'
import ThemeToggle from '../components/common/themeToggle';

const AppRouter = () => {
  return (
      <>
      <Navbar />
      <Hero />
      <ThemeToggle />
      </>
  )
}

export default AppRouter
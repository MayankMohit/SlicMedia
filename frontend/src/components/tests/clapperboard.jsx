import { OrbitControls } from '@react-three/drei';
import { Clapper } from './Clapper';
// import { AmbientLight } from 'three';

const clapperboard = () => {
  return (
      <>
          <ambientLight intensity={5} />
          <OrbitControls />
        <Clapper />
      </>
  )
}

export default clapperboard


import React from 'react'
import { useGLTF } from '@react-three/drei'

export function Clapper(props) {
  const { nodes, materials } = useGLTF('models/Clapper.glb')
  return (
    <group {...props} dispose={null}>
      <mesh geometry={nodes.Mesh_0.geometry} material={materials.Material_0} />
    </group>
  )
}

useGLTF.preload('models/Clapper.glb')

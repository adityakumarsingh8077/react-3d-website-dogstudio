import React from 'react'
import * as THREE from 'three'

import { Canvas, useThree } from '@react-three/fiber'
import { OrbitControls , useGLTF,useTexture} from '@react-three/drei'
import { color } from 'three/tsl';

const Dog=() =>{
  const model =useGLTF("/models/dog.drc.glb");
  useThree(({camera})=>{
    camera.position.z=0.55
  
  })
  

  // const textures =useTexture({
  //   normalMap:"/dog_normals.jpg",
  //   sampleMatCap:"/matcap/mat-2.png"
  // },(texture)=>{
  //   texture.flipY=false
  //   texture.colorSpace = THREE.SRGBColorSpace;
  // })



 
  // model.scene.traverse((child)=>{
  //   if(child.name.includes("DOG")){
  //     child.material = new THREE.MeshMatcapMaterial({

  //       normalMap:textures.normalMap,
        
  //       matcap:textures.sampleMatCap
  //     })
  //   }
  // })
  const [ normalMap, sampleMatCap ] = useTexture([
  "/dog_normals.jpg",
  "/matcap/mat-2.png"
]).map(texture => {
  texture.flipY = false
  texture.colorSpace = THREE.SRGBColorSpace
  return texture
})

model.scene.traverse((child) => {
  if (child.name.includes("DOG")) {
    child.material = new THREE.MeshMatcapMaterial({
      normalMap: normalMap,
      matcap: sampleMatCap
    })
  }
})

return (
  <>
  <primitive object = {model.scene} position ={[0.25,- 0.55, 0]} rotation={[0,Math.PI/3.9,0]}  />
  <directionalLight position= {[0,5,5]} color= {0xFFFFFF} intensity={10}/>
  {/* <ambientLight intensity={0.5} /> */}
  <OrbitControls/>
  </>
  


  )
}

export default Dog ;

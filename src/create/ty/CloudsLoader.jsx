import { useGLTF } from "@react-three/drei"
import { useFrame } from "@react-three/fiber"
import { useRef } from "react"
const meshUrl = "./clouds/scene.gltf"

function CloudsLoader() {
  const { nodes, materials } = useGLTF(meshUrl)
  const cloudRef = useRef()

  useFrame(({ camera }) => {
    // console.log(camera)
  })

  const cloudPos = [
    [4, 2, 0],
    // [0, 0, 0],
  ]

  const cloudObjects = []

  const nodesArr = Object.values(nodes)
  const materialsArr = Object.values(materials)
  //   console.log(materialsArr)
  materialsArr.map((m) => (m.doubleSided = false))
  //   console.log(materialsArr)

  nodesArr.map((n) => {
    if (n.type === "Mesh") cloudObjects.push(n)
    return null
  })

  return (
    <>
      {cloudPos.map((c, i) => (
        <mesh
          key={i}
          position={[cloudPos[i][0], cloudPos[i][2], -cloudPos[i][1]]}
          rotation={[Math.PI / 2, 0, -Math.PI / 2]}
          scale={0.1}
          material={cloudObjects[i % 1].material}
          geometry={cloudObjects[i % 1].geometry}
        />
      ))}
    </>
  )
}

export default CloudsLoader

import { Html } from "@react-three/drei"
import { useFrame, useThree } from "@react-three/fiber"
import { useRef, useState } from "react"
import * as THREE from "three"

import { meshData } from "../data/vertices"

function DistanceGeometry({ index = 0, material, xPos, yPos, dataIndex }) {
  const htmlRef = useRef()
  const groupRef = useRef()
  const ref = useRef()
  const newMaterial = new THREE.MeshStandardMaterial({
    side: THREE.DoubleSide,
    flatShading: true,
    wireframe: false,
    color: "#86439A",
  })

  const { viewport, camera } = useThree()
  const { width, height } = viewport.getCurrentViewport(camera, [0, 0, 0])
  const ratio = width / window.innerWidth

  const [data] = useState(() => ({
    vector: new THREE.Vector3(
      xPos * ratio - width / 2,
      yPos * ratio - height / 2,
      0
    ),
  }))

  const geometry = new THREE.BufferGeometry()
  const vertices = new Float32Array(meshData[index].vertexPositions)
  const normals = new Float32Array(meshData[index].normals)
  const uvs = new Float32Array(meshData[index].uvData)

  geometry.setAttribute("position", new THREE.BufferAttribute(vertices, 3))
  geometry.setAttribute("normal", new THREE.BufferAttribute(vertices, 3))
  geometry.setAttribute("uv", new THREE.BufferAttribute(uvs, 2))

  const morphPositions = meshData[index].morphTarget
  geometry.morphAttributes.position = []
  geometry.morphAttributes.position[0] = new THREE.Float32BufferAttribute(
    morphPositions,
    3
  )
  geometry.morphAttributes.position[1] = new THREE.Float32BufferAttribute(
    morphPositions,
    3
  )
  geometry.setIndex(meshData[index].indexData)

  var mesh = new THREE.Mesh(geometry, newMaterial)
  let value = 0

  useFrame(({ mouse }) => {
    const distance = data.vector.distanceTo(
      new THREE.Vector3((mouse.x * width) / 2, (mouse.y * height) / 2, 0)
    )

    value += (distance - value) * 0.1

    const valueFromX = map_range(value * 2, 0, width, 0, 1)
    const valueFromY = map_range(value * 2, 0, height, 0, 1)

    const scale = map_range(valueFromX, 0, 1, 1.6, 0.3)

    let size = (valueFromX + valueFromY) / 2

    ref.current.morphTargetInfluences[0] = size
    ref.current.material.color.b = size

    ref.current.scale.x = scale
    ref.current.scale.y = scale
    ref.current.scale.z = scale
    // dataIndex === 2 && console.log(groupRef)
    // dataIndex === 2 && console.log(ref.current.material.color.r)
  })

  return (
    <group ref={groupRef}>
      {/* <Html ref={htmlRef} center position={data.vector}>
        <h1 style={{ fontSize: "0.9rem" }}></h1>
      </Html> */}
      <primitive position={data.vector} scale={1.5} ref={ref} object={mesh} />
    </group>
  )
}

function map_range(value, low1, high1, low2, high2) {
  return low2 + ((high2 - low2) * (value - low1)) / (high1 - low1)
}

export default DistanceGeometry

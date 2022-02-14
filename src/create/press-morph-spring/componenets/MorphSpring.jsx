import * as THREE from "three"
import { useEffect, useMemo, useRef, useState, useCallback } from "react"
import { a } from "@react-spring/three"

import { meshData } from "../data/vertices"
import { useFrame } from "@react-three/fiber"

function MorphSpring({ index = 0, x }) {
  const [toggle, set] = useState(0)
  const [hover, setHover] = useState(0)
  const ref = useRef()
  const value = useRef(0)

  const morphPositions = meshData[index].morphTarget

  console.log("render")

  const vertices = useMemo(
    () => new Float32Array(meshData[index].vertexPositions),
    [index]
  )
  const uvs = useMemo(() => new Float32Array(meshData[index].uvData), [index])
  const bufferIndex = useMemo(
    () => new Uint16Array(meshData[index].indexData),
    [index]
  )

  // const mTarg = x.to([0, 1], [1, 2])
  const color = x.to([0, 1], ["#8BBADE", "#BE6F62"])
  const morph = x.to((x) => [x])

  // useFrame(() => {
  //   value.current += (toggle - value.current) * 0.1
  //   // SPRING VALUE ?
  //   ref.current.morphTargetInfluences[0] = map_range(
  //     value.current,
  //     0,
  //     1,
  //     -0.2,
  //     1
  //   )
  // })

  useEffect(() => {
    ref.current.geometry.morphAttributes.position = [
      new THREE.Float32BufferAttribute(meshData[index].morphTarget, 3),
    ]
  }, [index])

  useEffect(
    () => void (document.body.style.cursor = hover ? "pointer" : "auto"),
    [hover]
  )

  const handleClick = () => {
    set(!toggle)
  }

  const onPointerOver = useCallback(() => setHover(true), [])
  const onPointerOut = useCallback(() => setHover(false), [])

  return (
    <group>
      <a.mesh
        morphTargetInfluences={morph}
        // scale={mTarg}
        onClick={handleClick}
        onPointerOver={onPointerOver}
        onPointerOut={onPointerOut}
        ref={ref}
      >
        <bufferGeometry attach="geometry">
          <bufferAttribute
            attachObject={["attributes", "position"]}
            array={vertices}
            count={vertices.length / 3}
            itemSize={3}
          />
          <bufferAttribute
            attachObject={["attributes", "normal"]}
            array={vertices}
            count={vertices.length / 3}
            itemSize={3}
          />
          <bufferAttribute
            attachObject={["attributes", "uv"]}
            array={uvs}
            count={uvs.length / 3}
            itemSize={3}
          />
          <bufferAttribute
            attach="index"
            array={bufferIndex}
            count={bufferIndex.length}
            itemSize={1}
          />
        </bufferGeometry>
        <a.meshStandardMaterial
          color={color}
          wireframe={true}
          side={THREE.DoubleSide}
          flatShading={true}
        />
      </a.mesh>
    </group>
  )
}

export default MorphSpring

function map_range(value, low1, high1, low2, high2) {
  return low2 + ((high2 - low2) * (value - low1)) / (high1 - low1)
}

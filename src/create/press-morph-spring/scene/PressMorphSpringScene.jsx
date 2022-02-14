import styled from "styled-components"
import { Canvas } from "@react-three/fiber"
import { Suspense, useCallback, useEffect, useState } from "react"
import { useSpring, config } from "@react-spring/core"
import { a } from "@react-spring/web"
import { Environment, OrbitControls } from "@react-three/drei"
import MorphSpring from "../componenets/MorphSpring"
import LightRig from "../../../generic/lightrig/LightRig"

function PressMorphSpringScene() {
  const [toggle, set] = useState(0)

  const [{ x }] = useSpring(
    {
      x: toggle,
      config: { mass: 2, tension: 100, friction: 40, precision: 0.001 },
      // config: config.stiff,
    },
    [toggle]
  )

  const onClick = useCallback(() => set((toggle) => Number(!toggle)), [set])

  return (
    <>
      <SpringButton onClick={onClick}>{x.to((x) => x.toFixed(2))}</SpringButton>
      <Canvas
        camera={{
          position: [0, 0, 200],
        }}
        antialias
        dpr={2}
      >
        <LightRig />
        <Suspense fallback={null}>
          {/* <Environment preset={"sunset"} /> */}
        </Suspense>
        <MorphSpring x={x} toggle={toggle} />
        <OrbitControls />
      </Canvas>
    </>
  )
}

const SpringButton = styled(a.div)`
  cursor: pointer;
  z-index: 10000;
  position: absolute;
  left: 50%;
  transform: translate(-50%, 0);
  top: 10%;
  background: hotpink;
  width: 50px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 1em;
`

export default PressMorphSpringScene

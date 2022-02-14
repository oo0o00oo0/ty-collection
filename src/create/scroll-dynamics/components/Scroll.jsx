import styled from "styled-components"
import {
  useEffect,
  useRef,
  useState,
  createRef,
  Suspense,
  useCallback,
  useLayoutEffect,
} from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { Box, Html } from "@react-three/drei"
import { lerp } from "three/src/math/MathUtils"
import { MeshBasicMaterial } from "three"
import { animated, useSpring, config } from "@react-spring/web"
import { useStore } from "../state/store"

function Scroll({
  baseState = {
    sections: 12,
    pages: 12,
    zoom: 15,
    top: createRef(),
  },
}) {
  const scrollArea = useRef()

  const viewportRef = useRef()

  const scrollDiv = useRef()

  const setScroll = useStore((state) => state.setScroll)
  const setTotalHeight = useStore((state) => state.setTotalHeight)

  const onScroll = (e) => {
    baseState.top.current = e.target.scrollTop
    setScroll(e.target.scrollTop)
  }

  useLayoutEffect(() => {
    setTotalHeight(viewportRef.current.getBoundingClientRect()?.height)
  }, [])

  useEffect(() => void onScroll({ target: scrollArea.current }), [])

  return (
    <Holder>
      <Background scrollPos={baseState.top.current} />
      <SceneContainer ref={viewportRef}>
        <Scene scrollArea={scrollArea} baseState={baseState} />
      </SceneContainer>
      <ScrollArea ref={scrollArea} onScroll={onScroll}>
        <div
          ref={scrollDiv}
          style={{
            pointerEvents: "none",
            height: `${4 * 100}vh`,
          }}
        ></div>
      </ScrollArea>
    </Holder>
  )
}

function Background() {
  const scroll = useStore((state) => state.scroll)
  const totalHeight = useStore((state) => state.totalHeight)

  const [state, set] = useState(false)

  useEffect(() => {
    if (scroll > parseInt(totalHeight / 2)) {
      set(true)
    } else {
      set(false)
    }
  }, [scroll])

  const styles = useSpring({
    // backgroundColor: state ? "#D34F2D" : "#1674BE",
    backgroundColor: scroll > parseInt(totalHeight / 2) ? "#D34F2D" : "#1674BE",
    width: scroll > parseInt(totalHeight / 2) ? "380px" : "892px",
    // width: state ? "380px" : "892px",
    // background: state ? "red" : "white",
    config: config.stiff,
  })

  return (
    <>
      <animated.div
        scrollTop={200}
        style={{
          ...styles,
          height: "100%",
          opacity: 0.8,
        }}
      >
        {/* {state ? "true" : "false"} */}
      </animated.div>
    </>
  )
}

function Scene({ scrollArea, baseState }) {
  return (
    <Canvas
      onCreated={(state) => state.events.connect(scrollArea.current)}
      camera={{
        position: [0, 0, 50],
      }}
      gl={{
        antialias: true,
      }}
      dpr={2}
    >
      <ambientLight />
      <Suspense fallback={null}>
        <Block baseState={baseState} />
      </Suspense>
    </Canvas>
  )
}

function Block({ baseState }) {
  const ref = useRef()

  const totalHeight = useStore((state) => state.totalHeight)
  const scroll = useStore((state) => state.scroll)

  const textRef = useRef(false)

  const { viewport } = useThree()

  useFrame(() => {
    const curY = ref.current.scale.y
    const curR = ref.current.rotation.z
    const curTop = baseState.top.current
    textRef.current.innerHTML = baseState.top.current

    ref.current.scale.x = lerp(
      curY,
      curTop / baseState.zoom / 20 + Math.PI / 2,
      0.04
    )
    ref.current.scale.y = lerp(
      curY,
      curTop / baseState.zoom / 20 + Math.PI / 2,
      0.04
    )
    ref.current.scale.z = lerp(
      curY,
      curTop / baseState.zoom / 20 + Math.PI / 2,
      0.04
    )
    ref.current.rotation.z = lerp(curR, (curTop / baseState.zoom) * 0.009, 0.05)
  })
  return (
    <group ref={ref}>
      <Html ref={textRef} transform>
        <h1 style={{ fontSize: "9rem", color: "white" }}>oo0o00o0</h1>
      </Html>
      <Box
        args={[18.8, 4, 1]}
        material={
          new MeshBasicMaterial({
            color: "white",
            wireframe: true,
          })
        }
      />
    </group>
  )
}

export default Scroll

const SceneContainer = styled(animated.div)`
  flex: 1;
  height: 100vh;
  position: absolute;
  left: 50%;
  top: 50%;
  width: 100%;
  transform: translate(-50%, -50%);

  /* filter: blur(2em); */
`

const Holder = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100%;
`

const ScrollArea = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  ::-webkit-scrollbar {
    display: none;
  }
`

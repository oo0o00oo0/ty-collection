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

function ScrollX({
  baseState = {
    sections: 12,
    pages: 12,
    zoom: 15,
    top: createRef(),
  },
}) {
  console.log("renderScrollX")
  const scrollArea = useRef()

  const [blue, setBlue] = useState(0)
  const [test, setTest] = useState(400)

  const viewportRef = useRef()

  const scrollDiv = useRef()

  const setScroll = useStore((state) => state.setScroll)
  const setTotalHeight = useStore((state) => state.setTotalHeight)

  const onScroll = (e) => {
    let scrollPos = e.target.scrollLeft
    console.dir(e.target.scrollLeft)
    baseState.top.current = e.target.scrollTop

    if (scrollPos > 200) {
      setTest(500)
      setBlue(1)
    } else {
      setBlue(0)
      setTest(0)
    }
    setScroll(e.target.scrollTop)
  }

  const styles = useSpring({
    color: blue ? "white" : "white",
    translateX: blue ? "0px" : "200px",

    config: config.stiff,
  })

  const [{ x, testProp }] = useSpring(
    {
      x: blue,
      testProp: test,
      config: { mass: 2, tension: 100, friction: 40, precision: 0.001 },
      // config: config.stiff,
    },
    [blue]
  )
  useEffect(() => void onScroll({ target: scrollArea.current }), [])

  return (
    <Holder>
      <Fixed
        style={{
          backgroundColor: "#c9ffed",
          // backgroundColor: x.to([0, 1], ["#c9ffed", "#ff2558"]),
        }}
      >
        {x.to((x) => x.toFixed(2))}
        {/* {testProp.to((x) => x.toFixed(2))} */}
      </Fixed>

      <div
        style={{
          position: "absolute",
          // bottom: "50%",
          // right: "100%",
          width: "100%",
          height: "100%",
          border: "white solid 1px",
          backgroundColor: "white",
        }}
      >
        <svg viewBox="0 0 1000 1000" xmlns="http://www.w3.org/2000/svg">
          <animated.circle
            stroke="hotpink"
            strokeWeight="1px"
            cx={testProp.to((testProp) => testProp.toFixed(2))}
            cy="500"
            r={x.to((xs) => xs.toFixed(2))}
          />
        </svg>
      </div>

      {/*  <SceneContainer ref={viewportRef}>
        <Scene scrollArea={scrollArea} baseState={baseState} />
      </SceneContainer> */}
      <ScrollArea ref={scrollArea} onScroll={onScroll}>
        <div
          // ref={scrollDiv}
          style={{
            border: "red solid 2px",
            height: "100%",
            pointerEvents: "none",
            width: `${4 * 100}vw`,
          }}
        ></div>
      </ScrollArea>
    </Holder>
  )
}

// const Fixed = styled(animated.div)`
const Fixed = styled(animated.div)`
  position: absolute;
  top: 0;
  left: 0;
  height: 70px;
  width: 70px;
  color: white;
  z-index: 99999999999;
`

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

export default ScrollX

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
  box-sizing: border-box;

  border: orange solid 2px;
  position: absolute;
  width: 100%;
  height: 100%;
  overflow-x: scroll;
  ::-webkit-scrollbar {
    /* display: none; */
  }
`

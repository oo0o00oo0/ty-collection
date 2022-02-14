import styled from "styled-components"
import Div100vh from "react-div-100vh"
import Scene from "./create/touch-distance-morph/scenes/Scene"
import Scroll from "./create/scroll-dynamics/components/Scroll"
import PressMorphSpringScene from "./create/press-morph-spring/scene/PressMorphSpringScene"
import ScrollX from "./create/x-scroll-dynamics/components/Scroll"
import TyScene from "./create/ty/TyScene"
import { useStore } from "./create/ty/store"

function App() {
  const loaded = useStore((state) => state.loaded)
  return (
    <AppContainer>
      <TyScene />
      {/* <Scene /> */}
      {/* <PressMorphSpringScene /> */}
      {/* <Scroll /> */}
      {/* <ScrollX /> */}

      <Switch>
        {loaded && (
          <>
            <TyTitle>Jumbo</TyTitle>
            <TyTitle>Sampson</TyTitle>
          </>
        )}
      </Switch>
    </AppContainer>
  )
}

export default App

const TyTitle = styled.div`
  font-family: "Pacifico", cursive;
  font-size: 2rem;
  margin: 2em;
  color: #f1f1f1;
  user-select: none;
  -webkit-tap-highlight-color: rgba(255, 255, 255, 0);
  -webkit-user-select: none;
`

const Switch = styled.div`
  position: absolute;

  cursor: pointer;

  bottom: 2%;
  width: 100%;

  display: flex;
  justify-content: center;
  align-items: center;
`

const AppContainer = styled(Div100vh)`
  touch-action: none;
  display: flex;
  justify-content: center;
  align-items: center;

  background: rgb(238, 174, 202);
  background: radial-gradient(
    circle,
    rgba(238, 174, 202, 1) 0%,
    rgba(148, 187, 233, 1) 100%
  );
`

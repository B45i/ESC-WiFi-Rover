import solidLogo from "/esc-logo.svg";

import "./App.css";
import { Arrow } from "./componets/Arrow";
import { joystickAction, joystickActions } from "./api/actions";
import { HoldableButton } from "./componets/HoldableButton";

function App() {
  const handleClick = async (action: joystickActions) => {
    joystickAction(action);
  };

  return (
    <div class="h-screen w-screen grid _place-content-center">
      <main class="bg-[#279AD0] h-full w-full relative flex items-center py-4 px-8 justify-between portrait:hidden landscape:flex">
        <div class="text-[#279AD0]  text-xs absolute rounded-full left-1/2 transform -translate-x-1/2 w-64 border  px-2 py-1 max-w-fit  top-4">
          <img src={solidLogo} alt="solid logo" class="h-6" />
        </div>

        <div class=" grid grid-cols-3 grid-rows-3  h-[250px] w-[250px]">
          <HoldableButton
            onHold={() => handleClick(joystickActions.up)}
            className="col-start-2"
          >
            <Arrow direction="up" />
          </HoldableButton>
          <HoldableButton
            onHold={() => handleClick(joystickActions.right)}
            className="col-start-3 row-start-2"
          >
            <Arrow direction="right" />
          </HoldableButton>
          <HoldableButton
            onHold={() => handleClick(joystickActions.down)}
            className="col-start-2 row-start-3"
          >
            <Arrow direction="down" />
          </HoldableButton>
          <HoldableButton
            onHold={() => handleClick(joystickActions.left)}
            className="col-start-1 row-start-2"
          >
            <Arrow direction="left" />
          </HoldableButton>
        </div>

        <div class=" text-2xl font-bold grid grid-cols-2 grid-rows-2 h-[250px] w-[250px]">
          <HoldableButton
            onHold={() => handleClick(joystickActions.x)}
            className="col-start-2 row-start-1"
          >
            X
          </HoldableButton>
          <HoldableButton
            onHold={() => handleClick(joystickActions.y)}
            className="col-start-1 row-start-2"
          >
            Y
          </HoldableButton>
        </div>
      </main>

      <div class="h-screen absolute grid place-content-center  top-0 bottom-0 left-0 right-0 w-screen bg-[#279AD0] z-40 portrait:block landscape:hidden">
        <div class="text-center text-white text-2xl">
          Please rotate your phone, App Only support landscape mode
        </div>
      </div>
    </div>
  );
}

export default App;

import { JSX, createSignal, onCleanup } from "solid-js";

export const HoldableButton = ({
  children,
  className,
  onHold,
}: {
  children: JSX.Element;
  onHold: () => void;
  className?: string;
}) => {
  const [isHolding, setIsHolding] = createSignal(false);
  let timer: number;
  const interval = 300;

  const startHolding = () => {
    if (!isHolding()) {
      setIsHolding(true);
      onHold();
      timer = setInterval(onHold, interval);
    }
  };

  const stopHolding = () => {
    if (isHolding()) {
      setIsHolding(false);
      clearInterval(timer);
    }
  };

  onCleanup(() => {
    clearInterval(timer);
  });

  return (
    <button
      onMouseDown={startHolding}
      onMouseUp={stopHolding}
      onMouseLeave={stopHolding}
      onTouchStart={startHolding}
      onTouchEnd={stopHolding}
      class={className}
    >
      {children}
    </button>
  );
};

export const Arrow = ({
  direction,
}: {
  direction: "up" | "left" | "down" | "right";
}) => {
  return (
    <svg
      class={
        {
          left: "rotate-0",
          right: "rotate-180",
          up: "rotate-90",
          down: "-rotate-90",
        }[direction]
      }
      width="20"
      height="20"
      viewBox="-5 0 25 25"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M11.546.57.698 10.994l-.09.08c-.363.35-.576.813-.608 1.364l.002.185c.03.49.243.954.664 1.354l-.005-.008 10.885 10.462a2.06 2.06 0 0 0 2.845 0 1.964 1.964 0 0 0 0-2.844l-9.403-9.03 9.403-9.144a1.964 1.964 0 0 0 0-2.844 2.06 2.06 0 0 0-2.845 0"
        fill="#0c4f6c"
      />
    </svg>
  );
};

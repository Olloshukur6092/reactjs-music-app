import { FC } from "react";

const Spinner: FC = () => {
  return (
    <div className="text-[5px] relative w-[4em] h-[4em]">
      {new Array(12).fill("").map((_, index) => (
        <div
          className="animate-[fade-out_1.2s_linear_infinite] after:block after:absolute after:top-[0.15em] after:left-[1.85em] after:w-[0.3em] after:h-[0.9em] after:rounded-[20%] after:bg-white"
          style={{
            transform: `rotate(${index * 30}deg)`,
            transformOrigin: "2em 2em",
            animationDelay: `-${(11 - index) / 10}s`,
          }}
          key={index}
        ></div>
      ))}
    </div>
  );
};

export default Spinner;

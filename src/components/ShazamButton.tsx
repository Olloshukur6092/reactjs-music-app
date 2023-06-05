import { FC } from "react";
import { SiShazam } from "react-icons/si";

type props = {
  showShazam: Function;
};

const ShazamButton: FC<props> = ({ showShazam }) => {
  return (
    <div className="fixed bottom-40 right-5 z-10">
      <button className="text-5xl bg-blue-600 rounded-full animate-spin" onClick={() => showShazam()} >
        <SiShazam />
      </button>
    </div>
  );
};

export default ShazamButton;

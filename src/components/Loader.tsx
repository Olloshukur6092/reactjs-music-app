import { FC } from "react";
import SpinStretch from "react-cssfx-loading/src/SpinStretch";

const Loader: FC = () => {
  return (
    <div className="w-full min-h-[calc(100vh-144px)] flex justify-center items-center opacity-0 animate-[fade-in_0.3s_linear_0.5s_forwards]">
      <SpinStretch />
    </div>
  );
};

export default Loader;

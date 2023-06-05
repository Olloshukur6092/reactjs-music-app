import { FC } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { SiShazam } from "react-icons/si";

type props = {
  hideShazam: Function;
};

const ShazamFindMusic: FC<props> = ({ hideShazam }) => {
  return (
    <>
      <section id="shazam" className="bg-blue-500 h-full w-full z-50 fixed">
        <div className="close h-12 flex justify-end p-5">
          <button className="text-3xl">
            <AiOutlineClose onClick={() => hideShazam()} />
          </button>
        </div>

        <div className="h-full flex items-center justify-center">
          <button className="shazam text-5xl animate-ping">
            <SiShazam />
          </button>
        </div>
      </section>
    </>
  );
};

export default ShazamFindMusic;

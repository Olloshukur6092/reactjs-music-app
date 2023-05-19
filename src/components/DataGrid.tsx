import { FC } from "react";
import { FaPlay } from "react-icons/fa";
import { Link } from "react-router-dom";

interface DataGridProps {
  data: {
    id: string;
    image: string;
    title: string;
    description?: string;
  }[];
  type: "link" | "button";
  handler: Function;
}

const DataGrid: FC<DataGridProps> = ({ data, type, handler }) => {
  return (
    <div className="grid grid-cols-[repeat(auto-fill,_minmax(150px,_1fr))] md:grid-cols-[repeat(auto-fill,_minmax(180px,_1fr))] gap-3">
      {data.map((item) => {
        const children = (
          <>
            <div className="w-full h-0 pb-[100%] relative bg-gray-800">
              <img
                className="absolute w-full h-full object-cover rounded-md group-hover:brightness-[80%] transition duration-300"
                src={item.image}
                alt=""
              />
              <div className="h-10 w-10 border rounded-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex justify-center items-center opacity-0 group-hover:opacity-100 transition duration-300">
                <FaPlay className="fill-white w-5 h-5" />
              </div>
            </div>
            <p className="mt-2 font-medium line-clamp-2">{item.title}</p>
            {!!item.description && (
              <p className="text-gray-400 line-clamp-2">{item.description}</p>
            )}
          </>
        );

        if (type === "link")
          return (
            <div key={item.id}>
              <Link
                className="w-full block transition duration-300 bg-dark hover:bg-dark-hovered p-2 rounded-md relative group"
                to={handler(item.id)}
              >
                {children}
              </Link>
            </div>
          );

        return (
          <div key={item.id}>
            <div
              onClick={() => handler(item.id)}
              className="w-full transition duration-300 bg-dark hover:bg-dark-hovered p-2 rounded-md relative group cursor-pointer"
            >
              {children}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default DataGrid;

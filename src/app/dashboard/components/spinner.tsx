import { FC } from "react";

const Spinner: FC = () => {
  return (
    <div className="flex items-center justify-center">
      <div className="relative w-10 h-10">
        <div className="absolute inset-0 border-[3px] border-transparent border-t-[#96baf4] border-r-[#a4c6fd] rounded-full animate-spin"></div>
      </div>
    </div>
  );
};

export default Spinner;

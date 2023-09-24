import styles from "./index.module.css";
import { useState } from "react";

export default function Nftdetail() {
  const [nftdetail, setNftdetail] = useState({
    coverUrl: "",
  });
  return (
    <div className=" main m-0 p-0 w-full flex justify-center items-center flex-col overflow-visible ">
      <div className=" w-full overflow-hidden flex flex-wrap md:flex-nowrap items-center border-b-[1px] border-black h-[60px] fixed top-0 backdrop-blur-2xl z-10">
        <div className=" p-2 sm:w-[312px] h-full border-r-[1px] border-black flex items-center justify-center text-2xl font-black mr-3 select-none">
          AIGCNFTDAO
        </div>

        <a
          className=" py-2 px-8 border-[1px] mr-4 border-black rounded-full ml-auto font-regular hover:bg-black hover:text-white duration-300 cursor-pointer"
          href="/"
        >
          HOME
        </a>
        <div
          className=" hidden sm:block ml-auto m-3 sm:ml-3 sm:mr-8 sm:px-8 font-regular cursor-pointer"
          onClick={() => {}}
        >
          R0-0022
        </div>
        <div></div>
      </div>
      <div className=" mt-28 sticky left-40 top-20 mr-auto text-base font-regular px-4 py-2 rounded-full backdrop-blur-xl flex items-center z-10 bg-whitebg">
        <div
          className={styles.arrow + " w-3 h-3 bg-contain bg-no-repeat mr-2"}
        ></div>
        Back to creation
      </div>
      <div className=" flex justify-center gap-10 flex-wrap w-full md:flex-nowrap mt-[80px]">
        <div className=" w-full md:w-[45%] flex flex-col justify-center items-center gap-4 flex-wrap relative">
          <img
            src={nftdetail.coverUrl}
            alt=""
            className=" aspect-square object-cover w-[80%] bg-black06"
            onError={(event) =>
              (event.currentTarget.src = require("../../assets/pages/home/none.png"))
            }
          ></img>
          <div className=" flex items-center w-fit px-5 py-3 mt-6 mb-10 border rounded-lg font-regular hover:bg-black hover:text-white duration-300">
            <div
              className={
                styles.download + " w-3 h-3 bg-contain bg-no-repeat mr-2"
              }
            ></div>
            Download
          </div>
        </div>
        <div className=" w-full md:w-[45%] flex flex-col gap-4 flex-wrap relative">
          <div className=" text-2xl mb-3">Name</div>
          <div className=" w-full flex items-center gap-3">
            <input
              type="text"
              placeholder="Enter title"
              className="input input-bordered input-md w-[35%] max-w-xs font-regular"
            />
            <input
              type="text"
              placeholder="SHIBA"
              className="input input-bordered input-md w-[35%] max-w-xs font-regular"
              disabled
            />
          </div>
        </div>
      </div>
    </div>
  );
}

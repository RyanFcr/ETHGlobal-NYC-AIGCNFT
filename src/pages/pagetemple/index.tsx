import styles from "./index.module.css";

export default function PageTemple() {
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
    </div>
  );
}

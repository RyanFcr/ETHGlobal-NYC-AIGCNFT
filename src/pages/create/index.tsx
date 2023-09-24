import { useState } from "react";
import styles from "./index.module.css";
const { baycImage } = require("../../assets/pages/home/111.png");
const { azukiImage } = require("../../assets/pages/home/2.png");
const { moonBirdsImage } = require("../../assets/pages/home/3.png");
const { cloneXImage } = require("../../assets/pages/home/4.png");

export default function Creat() {
  const [isHovered, setIsHovered] = useState(false);
  const [createdImg, setCreatedImg] = useState([
    {
      url: "",
    },
    {
      url: "",
    },
    {
      url: "",
    },
    {
      url: "",
    },
  ]);

  const [nftProject, setNftProject] = useState([
    {
      coverUrl: baycImage,
      name: "BAYC",
    },
    {
      coverUrl: azukiImage,
      name: "Azuki",
    },
    {
      coverUrl: moonBirdsImage,
      name: "MoonBirds",
    },
    {
      coverUrl: cloneXImage,
      name: "Clone X",
    },
    {
      coverUrl: "",
      name: "",
    },
  ]);

  const [artStyle, setArtStyle] = useState([
    {
      coverUrl: "",
      name: "Realistic",
    },
    {
      coverUrl: "",
      name: "Unrealistic",
    },
    {
      coverUrl: "",
      name: "Comic",
    },
    {
      coverUrl: "",
      name: "Spectral",
    },
  ]);

  const [prompt, setPrompt] = useState([
    {
      name: "Iron Man",
      selected: true,
    },
    {
      name: "Mickey Mouse",
      selected: false,
    },
    {
      name: "Rocket",
      selected: false,
    },
    {
      name: "more",
      selected: false,
    },
  ]);

  const [drawType, setDrawType] = useState("NFT");

  const [drawTypes, setDrawTypes] = useState([
    {
      type: "NFT",
      selected: true,
    },
    {
      type: "MIX",
      selected: false,
    },
  ]);

  const [influenceValue, setInfluenceValue] = useState([
    {
      name: "BAYC",
      id: "",
      coverUrl: "",
      percent: "50",
    },
    {
      name: "Azuki",
      id: "",
      coverUrl: "",
      percent: "50",
    },
  ]);

  const renderTypeCheck = () => {
    return (
      <div className=" mx-4 md:ml-0 flex border rounded-2xl overflow-hidden shrink-0">
        {drawTypes.map((item, index) => {
          return (
            <div
              key={index}
              className=" px-9 py-4 cursor-pointer hover:bg-black hover:text-white duration-75"
              style={
                item.selected ? { background: "#000000", color: "#ffffff" } : {}
              }
              onClick={() => {
                setDrawType(item.type);
                setDrawTypes(
                  drawTypes.map((draw, i) => {
                    if (i === index) {
                      draw.selected = true;
                    } else {
                      draw.selected = false;
                    }
                    return draw;
                  })
                );
              }}
            >
              {item.type}
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className=" main m-0 p-0 w-full flex justify-center items-center flex-col overflow-visible ">
      <div className=" w-full overflow-hidden flex flex-wrap md:flex-nowrap items-center border-b-[1px] border-black h-[60px] fixed top-0 backdrop-blur-2xl z-10">
        <div className=" p-2 sm:w-[312px] h-full border-r-[1px] border-black flex items-center justify-center text-2xl font-black mr-3">
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

      <div className=" flex justify-center gap-10 flex-wrap w-full md:flex-nowrap mt-[80px]">
        <div className=" w-full md:w-[45%] flex justify-center gap-4 flex-wrap relative">
          {createdImg.map((img, index) => {
            return (
              <img
                key={index}
                src={img.url}
                alt=""
                className=" aspect-square object-cover w-[45%] bg-black06"
                onError={(event) =>
                  (event.currentTarget.src = require("../../assets/pages/home/none.png"))
                }
              ></img>
            );
          })}
          <div className=" w-full aspect-square absolute flex justify-center items-center">
            <div className=" px-12 py-3 bg-black47 backdrop-blur-2xl text-white rounded-full md:text-[26px]">
              Wait to create...
            </div>
          </div>
          <div className=" w-full text-center p-4 text-2xl">NFT Preview</div>
        </div>

        <div className=" w-full md:w-[45%] max-h-[80vh] flex items-start flex-col md:overflow-y-scroll">
          {renderTypeCheck()}
          <div className=" mx-4 w-[calc(100%_-_2rem)] md:w-[calc(100%_-_1rem)] md:ml-0 flex gap-2 flex-wrap items-end mt-8 pb-4 border-b">
            <div className=" text-2xl shrink-0">NFT Project</div>
            <div className=" text-xs font-regular shrink-0">(Choose one)</div>
            <div
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              className={styles.quesIcon + " w-4 h-4 bg-cover shrink-0"}
            ></div>
            <div
              className={`bg-black80 py-2 px-3 rounded-md text-white font-regular ${
                isHovered ? "block" : "hidden"
              }`}
            >
              Select an NFT project and generate a similar style of NFT
            </div>
          </div>

          <div className=" mx-4 w-[calc(100%_-_2rem)] md:w-[calc(100%_-_1rem)] md:ml-0 flex flex-wrap gap-2 mt-4">
            {nftProject.map((pj, index) => {
              return (
                <div
                  key={index}
                  className=" w-[112px] hover:text-blue duration-500"
                >
                  <div className=" w-[112px] aspect-square flex justify-center items-center rounded-lg border-blue hover:border duration-75">
                    <img
                      src={baycImage}
                      alt=""
                      className=" w-[102px] aspect-square bg-white rounded-lg "
                      onError={(event) =>
                        (event.currentTarget.src = require("../../assets/pages/home/none.png"))
                      }
                    />
                  </div>
                  <div className=" text-base text-center font-regular mt-2">
                    {pj.name}
                  </div>
                </div>
              );
            })}
          </div>
          <div
            className=" flex  flex-col"
            style={
              drawType === "MIX" ? { display: "flex" } : { display: "none" }
            }
          >
            <div className=" mx-4 w-[calc(100%_-_2rem)] md:w-[calc(100%_-_1rem)] md:ml-0 flex gap-2 flex-wrap items-end mt-8 pb-4 border-b">
              <div className=" text-2xl shrink-0">Influence</div>
              <div
                className={styles.quesIcon + " w-4 h-4 bg-cover shrink-0"}
              ></div>
            </div>
            <div className=" mx-4 w-[calc(100%_-_2rem)] md:w-[calc(100%_-_1rem)] md:ml-0 flex flex-wrap gap-4 mt-4">
              {influenceValue.map((item, index) => {
                return (
                  <div
                    key={index}
                    className=" flex flex-col justify-center w-[calc(50%_-_1rem)]"
                  >
                    <div className=" flex items-center justify-center">
                      <div className=" text-lg mr-3">{item.name}</div>
                      <div className=" flex items-center border rounded-lg">
                        <div className=" py-2 ml-3">#</div>
                        <input
                          type="text"
                          placeholder="000000"
                          defaultValue={item.id}
                          onInput={(e) => {
                            setInfluenceValue(
                              influenceValue.map((itm, idx) => {
                                if (idx === index) {
                                  itm.id = e.currentTarget.value;
                                }
                                return itm;
                              })
                            );
                          }}
                          className=" w-24 font-regular input max-w-xs bg-whitebg border-none focus:outline-none"
                        />
                      </div>
                    </div>
                    <img
                      className=" my-4 w-full object-cover aspect-square bg-white rounded-xl"
                      src={item.coverUrl}
                      alt=""
                      onError={(event) =>
                        (event.currentTarget.src = require("../../assets/pages/home/none.png"))
                      }
                    />
                    <input
                      type="range"
                      min="0"
                      max="100"
                      onInput={(e) => {
                        setInfluenceValue(
                          influenceValue.map((itm, idx) => {
                            if (idx === index) {
                              itm.percent = e.currentTarget.value;
                            } else {
                              let num = 100 - parseInt(e.currentTarget.value);
                              itm.percent = num.toString();
                            }
                            return itm;
                          })
                        );
                      }}
                      defaultValue={item.percent}
                      className="range range-xs"
                    />
                  </div>
                );
              })}
            </div>
          </div>

          <div className=" mx-4 w-[calc(100%_-_2rem)] md:w-[calc(100%_-_1rem)] md:ml-0">
            <div className=" text-2xl shrink-0 mt-8 pb-4 border-b">
              ART Style
            </div>
            <div className=" flex gap-4 flex-wrap relative mt-4 pb-4 mr-12">
              {artStyle.map((item, index) => {
                return (
                  <div
                    key={index}
                    className=" w-[112px] hover:text-blue duration-500"
                  >
                    <div className=" w-[112px] aspect-square flex justify-center items-center rounded-lg border-blue hover:border duration-75">
                      <img
                        src={item.coverUrl}
                        alt=""
                        className=" w-[102px] aspect-square bg-white rounded-lg "
                        onError={(event) =>
                          (event.currentTarget.src = require("../../assets/pages/home/none.png"))
                        }
                      />
                    </div>

                    <div className=" text-base text-center font-regular mt-2">
                      {item.name}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className=" mx-4 w-[calc(100%_-_2rem)] md:w-[calc(100%_-_1rem)] md:ml-0 flex gap-2 flex-wrap items-end mt-8 pb-4 border-b mb-4">
            <div className=" text-2xl shrink-0">Prompt</div>
            <div className=" text-xs font-regular shrink-0">Optional</div>
          </div>
          <div className=" mx-4 w-[calc(100%_-_2rem)] md:w-[calc(100%_-_1rem)] md:ml-0 flex gap-3 flex-wrap pb-1">
            {prompt.map((item, index) => {
              return (
                <div
                  key={index}
                  className=" py-3 px-8 font-regular rounded-lg border hover:bg-black hover:text-white duration-75"
                  style={
                    item.selected
                      ? { background: "#000000", color: "#ffffff" }
                      : {}
                  }
                >
                  {item.name}
                </div>
              );
            })}
          </div>
          <div className=" mx-4 w-[calc(100%_-_2rem)] flex justify-center mt-16">
            <div className=" py-4 px-24 rounded-full bg-black text-white">
              Create
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

import { useEffect, useState } from "react";
import styles from "./index.module.css";
import { Link, Element, animateScroll } from "react-scroll";
import Dialog from "./../../components/dialog/index";
import { useMetaMask } from "metamask-react";
import { getDonateNum, postDonateNum } from "./../../utils/request";
import { isMobile } from "react-device-detect";

export default function Home() {
  const { status, connect, account, chainId, ethereum } = useMetaMask();
  const toAddress = "0x1fD00885DF1c24aec7Ebe239b9b22b3dB039dCCb";
  const [web3, setWeb3]: any = useState();

  useEffect(() => {
    if (showPageLoadingTimer) {
      clearTimeout(showPageLoadingTimer);
    } else {
      let timer = setTimeout(() => {
        setShowPageLoading(false);
      }, 2000);
      setShowPageLoadingTimer(timer);
    }

    getDonateNum()
      .then((res: any) => {
        setDonateProgress(res.data);
      })
      .catch((err) => {});
  }, []);

  useEffect(() => {
    if (isMobile && ethereum) {
      connect();
    }

    if (!isMobile) {
      let text = document.getElementById("headerText");
      let steps = 7;
      let threedee = (e: any) => {
        let x = Math.round(
          (steps / (window.innerWidth / 2)) *
            (window.innerWidth / 2 - e.clientX)
        );
        let y = Math.round(
          (steps / (window.innerHeight / 2)) *
            (window.innerHeight / 2 - e.clientY)
        );
        if (text) {
          text.style.transform =
            "translateZ(0) rotateX(" +
            y * 3 +
            "deg) rotateY(" +
            -x * 3 +
            "deg)";
        }
      };
      document.addEventListener("mousemove", threedee, false);
    }
  }, [isMobile]);

  useEffect(() => {
    if (isMobile && ethereum) {
      connect();
    }
  }, [ethereum]);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://cdn.jsdelivr.net/npm/web3@1.5.2/dist/web3.min.js";
    script.async = true;
    document.body.appendChild(script);
    script.onload = () => {
      // @ts-ignore
      setWeb3(new Web3(ethereum));
    };
  }, [status]);

  const [links, setLinks] = useState([
    {
      name: "STORY",
      url: "STORY",
    },
    {
      name: "DONATE",
      url: "DONATE",
    },
    {
      name: "ROADMAP",
      url: "ROADMAP",
    },
    {
      name: "FAQ",
      url: "FAQ",
    },
  ]);
  const [avatars, setAvatars] = useState({
    group_1: [
      {
        url: require("../../assets/pages/home/1.png"),
      },
      {
        url: require("../../assets/pages/home/2.png"),
      },
      {
        url: require("../../assets/pages/home/3.png"),
      },
      {
        url: require("../../assets/pages/home/4.png"),
      },
      {
        url: require("../../assets/pages/home/5.png"),
      },
    ],
    group_2: [
      {
        url: require("../../assets/pages/home/6.png"),
      },
      {
        url: require("../../assets/pages/home/7.png"),
      },
      {
        url: require("../../assets/pages/home/8.png"),
      },
      {
        url: require("../../assets/pages/home/9.png"),
      },
    ],
  });
  const [coins, setCoins] = useState([
    {
      num: 0.5,
      url: require("../../assets/pages/home/coin_1.png"),
    },
    {
      num: 1,
      url: require("../../assets/pages/home/coin_2.png"),
    },
    {
      num: 1.5,
      url: require("../../assets/pages/home/coin_3.png"),
    },
    {
      num: 2,
      url: require("../../assets/pages/home/coin_4.png"),
    },
  ]);
  const [donateCoin, setDonateCoin] = useState("");
  const [hoverCoin, setHoverCoin]: any = useState(null);
  const [donateSuccess, setDonateSuccess] = useState(false);
  const [faqs, setFaqs] = useState([
    {
      issue:
        "What are the features of AIGCNFTDAO in terms of product functionality?",
      answer:
        'The product has undergone "generic model + private model" training, and AI robots can quickly and batch produce derivative works consistent with specific blue-chip NFT styles; 2. In addition to "private model training" to cultivate AI learning ability of blue-chip NFT, we have also creatively achieved "style mashup" of blue-chip works, that is, users can produce new derivative works by arbitrarily combining two blue-chip NFT styles and determining the main style by adjusting the proportion; 3. Users can select two separate blue-chip NFT works, set the style ratio, and automatically create new derivative works through AI.',
      close: false,
    },
    {
      issue: "What are the advantages of AIGCNFT products?",
      answer: `What are the advantages of AIGCNFT products?
      Web3-friendly: The unique "private model of blue-chip projects" in the entire market makes the generated works of players more in line with the taste of the NFT market.
      Low threshold: Players do not need to learn any AIGC platform creation syntax, and can directly create works by checking options and adjusting numerical values.
      Secure: The 721w protocol provides blue-chip NFT holders with a whitelist security casting solution without permission, making minting NFTs more secure.
      Professional: Well-known research teams and artists in the AIGC field participate in the project, and the product has unlimited potential.`,
      close: true,
    },
    {
      issue: "What benefits will early stage donors receive?",
      answer: `What benefits will early stage donors receive?
      The funds we raise during the MVP stage of our product will be used for long-term research and development of the project, as well as community building. During this stage, subscribers will become core community contributors and will have the right to receive a proportional share of 15% of the project's future token pool through an airdrop.
      For example:
      If Tom donates 2 ETH to the project during the MVP stage, and the total amount raised during this stage is 100 ETH, then Tom's contribution would be 2% of the total amount.
      Assuming that the project eventually issues 100 million tokens, Tom would be entitled to receive a total of:
      2% * 15% * 100,000,000 = 300,000 tokens as part of the airdrop, provided he does not participate in any other co-building activities of the project.`,
      close: true,
    },
  ]);
  const [showDialog, setShowDialog] = useState(false);
  const [donateProgress, setDonateProgress] = useState(10);
  const [showComingSoon, setShowComingSoon] = useState(false);
  const [showPageLoading, setShowPageLoading] = useState(true);
  const [showPageLoadingTimer, setShowPageLoadingTimer]: any = useState(null);
  const [showComingSoonTimer, setShowComingSoonTimer]: any = useState(null);
  const [showNetError, setShowNetError] = useState(false);
  const [showNetErrorTimer, setShowNetErrorTimer]: any = useState(null);

  const donate = async () => {
    try {
      if (status !== "connected") {
        connect();
      } else if (ethereum) {
        // 构建交易对象
        const txObject = {
          from: account,
          to: toAddress,
          value: web3.utils.toWei(donateCoin, "ether"),
        };

        // 发送交易
        web3.eth
          .sendTransaction(txObject)
          .on("transactionHash", (hash: any) => {
            console.log("交易哈希：", hash);
          })
          .on("receipt", (receipt: any) => {
            console.log("交易收据：", receipt);
            setDonateSuccess(true);
            let data = {
              address: account,
              number: donateCoin,
              time: new Date().valueOf().toString(),
            };
            postDonateNum(data)
              .then((res) => {
                setDonateProgress(donateProgress + parseInt(donateCoin));
              })
              .catch((err) => console.log(err));
          })
          .on("error", (error: any) => {
            console.error("交易失败：", error);
          });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const comingSoon = async () => {
    setShowComingSoon(true);
    if (showComingSoonTimer) {
      clearTimeout(showComingSoonTimer);
    }
    let timer = setTimeout(() => {
      setShowComingSoon(false);
    }, 2000);
    setShowComingSoonTimer(timer);
  };

  const checkEthNet = async () => {
    if (isMobile && !ethereum) {
      window.location.href = "https://metamask.app.link/dapp/aigc.wowow.club/";
    } else {
      console.log(web3, ethereum.networkVersion, typeof ethereum);
      // 获取用户连接的网络 ID
      let networkId = await web3.eth.net.getId();
      console.log("netID：", networkId);

      if (networkId !== 1) {
        // 如果不是以太坊主网，提示用户切换网络
        setShowNetError(true);
        if (showNetErrorTimer) {
          clearTimeout(showNetErrorTimer);
        }
        let timer = setTimeout(() => {
          setShowNetError(false);
        }, 3000);

        setShowNetErrorTimer(timer);
      } else {
        // 如果是以太坊主网，继续执行
        donate();
      }
    }
  };

  return (
    <div className=" main m-0 p-0 w-full flex justify-center items-center flex-col overflow-visible select-none text-black">
      {showPageLoading ? (
        <div className=" w-full h-full fixed top-0 z-50 bg-white flex justify-center items-center ">
          <img
            src={require("../../assets/pages/home/loading.png")}
            className=" w-[200px] h-[200px] animate-rotate"
            alt=""
          />
        </div>
      ) : null}

      {showDialog ? (
        <Dialog closeDialog={() => setShowDialog(false)}>
          <div
            onClick={(e) => {
              e.stopPropagation();
            }}
            className=" w-[80%] min-h-[300px] rounded-2xl bg-white md:w-[600px] relative p-4 pt-10 md:py-8 md:px-11"
          >
            <div
              className={
                styles.closeIcon +
                " absolute top-4 right-4 w-5 h-5 p-3 bg-cover cursor-pointer"
              }
              onClickCapture={() => {
                setShowDialog(false);
              }}
            ></div>
            <div className=" md:leading-8 text-2xl md:text-[32px] mb-8">
              {donateSuccess
                ? "Donation successful, become a core builder of the community."
                : "Make a donation now and become a core contributor！"}
            </div>
            <div className=" mb-4 md:mb-[80px] font-regular">
              🎉Estimated amount of token airdrop rewards{" "}
            </div>
            <div className=" flex flex-col justify-center items-center">
              <div
                className={
                  styles.coinPng +
                  " bg-cover w-[175px] h-[176px] mb-4 md:mb-11 flex justify-center items-center"
                }
              >
                <span className=" text-3xl translate-y-[-15px] text-zong">
                  +{parseFloat(donateCoin) * 150}k
                </span>
              </div>

              {!donateSuccess ? (
                <div
                  className=" w-[80%] md:w-[315px] h-12 bg-black rounded-full text-white mb-4 flex justify-center items-center cursor-pointer"
                  onClick={() => {
                    checkEthNet();
                  }}
                >
                  Donation {donateCoin} eth
                </div>
              ) : null}

              {!donateSuccess ? (
                <div
                  className=" w-[80%] md:w-[315px] h-12 bg-white rounded-full text-black mb-4 border flex justify-center items-center font-regular cursor-pointer"
                  onClick={() => {
                    setShowDialog(false);
                  }}
                >
                  cancel
                </div>
              ) : null}
            </div>
          </div>
        </Dialog>
      ) : null}

      {showNetError ? (
        <div className=" mx-4 py-4 px-20 flex justify-center items-center fixed top-24 rounded-lg bg-yellow36 border-yellow border z-50 backdrop-blur-3xl">
          <div className={styles.netIcon + " w-6 h-6 bg-cover mr-3"}></div>
          <div className=" text-yellow font-regular">
            Please switch to Ethereum mainnet
          </div>
        </div>
      ) : null}

      <div className=" w-full overflow-hidden flex items-center border-b-[1px] border-black h-[60px] fixed top-0 backdrop-blur-2xl z-10">
        <div
          className=" p-2 sm:w-[312px] h-full border-r-[1px] border-black flex items-center justify-center text-2xl font-black mr-3"
          onClick={() =>
            animateScroll.scrollToTop({
              duration: 1000,
              smooth: true,
            })
          }
        >
          AIGCNFTDAO
        </div>
        {links.map((link, index) => {
          return (
            <Link
              to={link.url}
              spy={true}
              smooth={true}
              duration={500}
              activeClass=" border-b-2"
              key={index}
              className=" hidden w-[142px] h-full items-center justify-center m-3 md:flex cursor-pointer"
            >
              {link.name}
            </Link>
          );
        })}

        <div
          className=" px-4 block py-2 md:px-8 border-[1px] border-black rounded-full ml-auto mr-1 font-regular hover:bg-black hover:text-white duration-300 cursor-pointer"
          onClick={() => {
            comingSoon();
          }}
        >
          CREATE
        </div>
        <div
          className=" ml-auto m-3 sm:ml-3 sm:mr-8 sm:px-8 font-regular cursor-pointer max-sm:text-ellipsis max-sm:truncate"
          onClick={() => {
            if (status !== "connected") {
              if (isMobile) {
                if (!ethereum) {
                  window.location.href =
                    "https://metamask.app.link/dapp/aigc.wowow.club/";
                } else {
                  connect();
                }
              } else {
                connect();
              }
            }
          }}
        >
          {status === "connected" ? "Connected" : "Log in"}
        </div>
      </div>

      {showComingSoon ? (
        <span className=" fixed top-20 right-10 px-3 py-1 border backdrop-blur-lg rounded-full text-black text-md hover:animate-float z-50">
          {isMobile
            ? "Please open it on the computer."
            : "Coming soon, stay tuned."}
        </span>
      ) : null}
      <div className=" w-96 h-96 bg-lightBlue blur-[200px] absolute top-12 z-[-1]"></div>

      <div
        id="headerText"
        className=" z-[0] mt-[60px] duration-75 overflow-hidden "
      >
        <div className=" mt-24 text-blue text-[50px] md:text-[66px] text-center md:leading-[112.54px]">
          AIGCNFTDAO
        </div>
        <div className=" text-[50px] md:text-[66px] text-center md:leading-[112.54px]">
          where cutting-edge AI meets crypto art
        </div>
      </div>

      <div className=" w-full mt-24 text-base border-[1px] border-black overflow-hidden">
        <div className=" animate-scrollX flex items-center">
          {Array(50)
            .fill(null)
            .map((item, index) => {
              return (
                <div key={index} className=" mx-[17px] py-2 shrink-0">
                  AIGCNFTDAO
                </div>
              );
            })}
        </div>
      </div>

      <div className=" w-full overflow-hidden border-b-[1px] border-black">
        <div className=" flex items-center min-w-full animate-scrollX_2">
          {avatars.group_1.map((avatar, index) => {
            return (
              <img
                key={index}
                src={avatar.url}
                alt=""
                className=" w-[25%] object-cover"
              ></img>
            );
          })}
        </div>
      </div>

      <div className=" flex overflow-hidden justify-center items-center border-b-[1px] border-black min-w-full">
        {avatars.group_2.map((avatar, index) => {
          return (
            <img
              key={index}
              src={avatar.url}
              alt=""
              className=" w-[25%] object-cover"
            ></img>
          );
        })}
      </div>

      <Element
        className=" w-full bg-whitebg z-[2] flex items-center flex-wrap md:flex-nowrap justify-center STICKY top-[60px]"
        name="STORY"
      >
        <div
          className={
            styles.bg_1 +
            " w-[90%] h-[200px] md:w-[40%] md:h-[643px] bg-cover bg-no-repeat relative mt-[139px] mb-6 md:mb-[60px] shrink-0"
          }
        >
          <div className=" text-[86px] font-black absolute top-[-50px] left-0 right-0 text-center">
            WHAT?
          </div>
        </div>
        <div className=" md:max-w-[55%] m-6 md:m-[60px] text-lg md:text-[24px]">
          AIGCNFTDAO is a web3 platform that uses AI technology to create
          derivative works of popular blue-chip NFTs. Key features include:
          <br />
          <ol className=" font-regular mt-8 pl-6 list-decimal">
            <li>"Private model" trained by the AIGCNFTDAO team</li>
            <li>
              Ability to create derivative works similar to famous NFT projects
              like BAYC and Clone-X
            </li>
            <li>
              Advanced "hybrid style" function for creating new "blue-chip
              style" works
            </li>
            <li>
              Fast on-chain publishing of works, custom feature values, and
              batch image production
            </li>
          </ol>
          <div className=" mt-8 font-regular">
            In summary, AIGCNFTDAO makes it easy, fast, and affordable for
            anyone in the web3 community and crypto art enthusiasts to create
            their own NFT artwork collection.
          </div>
        </div>
      </Element>

      <Element
        className=" w-full pt-[60px] flex flex-wrap justify-center border-b-[1px] border-black bg-whitebg STICKY top-[60px] z-[3]"
        name="DONATE"
      >
        <div className=" lg:w-[45%] h-full w-full flex flex-col border-t-[1px] items-center justify-center relative">
          <div className=" text-[38px] leading-[44px] text-center font-regular mt-10 md:mt-[60px]">
            Make a donation now and
            <br />
            become a core contributor！
          </div>
          <div
            className={
              styles.face +
              " w-[270px] h-[198px] mt-[90px] bg-cover bg-no-repeat relative"
            }
          >
            <div className=" flex absolute w-full bottom-8">
              <div className=" w-16 h-16 mr-auto bg-pink rounded-full blur-2xl"></div>
              <div className=" w-16 h-16 bg-pink rounded-full blur-2xl"></div>
            </div>
            <div
              className={
                styles.mouth +
                " aspect-[5/1] w-[40%] bg-contain bg-center bg-no-repeat absolute bottom-0 left-[30%] right-[30%] duration-300"
              }
              style={
                hoverCoin
                  ? {
                      transform: "scaleY(" + hoverCoin + ")",
                    }
                  : { transform: "scaleY(0.5)" }
              }
            ></div>
          </div>
          <div className=" mx-5 lg:w-[70%] mt-10">
            <div className=" flex items-center text-2xl font-regular mb-3">
              <div>Fundraising progress</div>
              <div className=" ml-auto">{donateProgress}/100</div>
            </div>
            <div className=" relative border">
              <div
                className=" bg-blue h-5"
                style={{ width: `${donateProgress}%` }}
              ></div>
            </div>
          </div>
          <div className=" w-full">
            <div
              className={
                styles.arrow +
                " w-[118px] h-[34px] bg-contain bg-no-repeat mt-16 ml-auto mb-10 mr-16"
              }
            ></div>
          </div>
        </div>
        <div className=" lg:w-[55%] h-full border-[1px] border-b-0 border-l-0 flex flex-wrap  w-full lg:border-t-0">
          <div className=" w-full  h-[164px] border-l-[1px] border-b-[1px] border-t-[1px] flex flex-col justify-center items-center">
            <div className=" text-[38px] font-regular text-center">
              Estimated amount of{" "}
              <span className=" font-black font-bolder text-5xl">
                {hoverCoin ? hoverCoin * 150 + "k" : "?"}
              </span>{" "}
              token airdrop rewards
            </div>
            <div className=" mt-2 w-[60%] h-[6px] bg-blue"></div>
          </div>
          <div className=" flex flex-wrap w-full ">
            {coins.map((coin, index) => {
              return (
                <div
                  className=" w-[50%] h-[50%] flex flex-col items-center justify-center border-[1px] border-t-0 border-r-0 border-black cursor-pointer"
                  key={index}
                  onMouseEnter={() => {
                    setHoverCoin(coin.num);
                  }}
                  onMouseLeave={() => setHoverCoin(null)}
                  onClick={() => {
                    setShowDialog(true);
                    setDonateCoin(coin.num.toString());
                  }}
                >
                  <img
                    src={coin.url}
                    alt=""
                    className=" w-[142px] h-[142px] mt-10 object-cover hover:animate-float duration-500"
                  />
                  <div className=" py-[6px] px-[12px] mt-10 mb-6 rounded-full border-[1px] border-black hover:bg-black hover:text-white duration-300">
                    {coin.num} eth
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Element>

      <Element
        className=" w-full bg-whitebg border-t STICKY z-[4]"
        name="ROADMAP"
      >
        <div
          className={
            styles.roadmapSvg +
            " w-[80%] lg:w-[40%] h-[210px] bg-bottom bg-contain bg-no-repeat lg:mt-[60px] translate-y-[5px] mx-auto"
          }
        ></div>
        <div className=" w-full flex flex-wrap xl:flex-nowrap justify-center border items-center 2xl:border-[0px] bg-whitebg">
          <div className=" w-full xl:w-[27%] flex ">
            <div className=" min-w-[200px] 2xl:h-[650px] w-[70%] flex items-center border-t border-b ">
              <div className=" w-full text-[66px] my-[38px] bg-blue text-right pr-12">
                2023
              </div>
            </div>
            <div className=" h-[650px] min-w-[120px] w-[30%] border flex flex-col justify-center items-center">
              <Link
                to="Q1"
                spy={true}
                smooth={true}
                duration={500}
                activeClass=" text-green"
                className=" text-[66px] duration-300"
                containerId="containerElement"
              >
                Q1
              </Link>
              <Link
                to="Q2"
                spy={true}
                smooth={true}
                duration={500}
                activeClass=" text-green"
                className=" text-[66px] duration-300"
                containerId="containerElement"
              >
                Q2
              </Link>
              <Link
                to="Q3"
                spy={true}
                smooth={true}
                duration={500}
                activeClass=" text-green"
                className=" text-[66px] duration-300"
                containerId="containerElement"
              >
                Q3
              </Link>
            </div>
          </div>

          <div className=" w-full  xl:w-[73%] flex flex-wrap">
            <Element
              name="container"
              className=" h-[650px] w-full border-t border-b xl:w-[65%] xl:h-[650px] overflow-y-scroll overflow-x-hidden relative"
              id="containerElement"
            >
              <Element
                name="Q1"
                className=" w-full h-[648px] shrink-0 text-green text-2xl border-black border bg-whitebg flex justify-center items-center overflow-hidden"
              >
                <div className=" mx-8 mt-[60px] md:mx-24">
                  Build AIGCNFTDAO's unique AI private model. <br />
                  Launch AIGCNFTDAO's prototype. <br />
                  <div className=" text-black">
                    Recruit AIGCNFTDAO MVP core contributors. <br />
                    Launch AIGCNFTDAO 1.0 version.
                    <br />
                    Launch 721w blue-chip freemint plan. <br />
                    Launch public sale.
                    <br />
                  </div>
                </div>
              </Element>

              <Element
                name="Q2"
                className=" w-full h-[648px] shrink-0 text-2xl border-black border bg-whitebg flex justify-center items-center overflow-hidden"
              >
                <div className=" mx-8 mt-[60px] md:mx-24">
                  Launch AIGCNFTDAO 2.0 version. <br />
                  Launch the "New Blue-chip" program for NFT emerging artists.{" "}
                  <br />
                  Create an NFT creators' community. <br />
                  Launch AIGC Creator Academy. <br />
                  Launch Project snapshot and the first round of treasure box
                  airdrop.
                </div>
              </Element>

              <Element
                name="Q3"
                className=" w-full h-[650px] shrink-0 text-2xl border-black border bg-whitebg flex justify-center items-center overflow-hidden"
              >
                <div className=" mx-8 mt-[60px] md:mx-24">
                  Launch AIGCNFTDAO 3.0 version, and introduce new functions
                  such as crowdfunding lock-up, whitelist issuance, and primary
                  issuance.
                  <br />
                  Launch AIGCNFTDAO's public sale.
                </div>
              </Element>
            </Element>
            <div
              className={
                styles.roadmapRight +
                " hidden xl:block w-full xl:w-[35%] bg-cover bg-no-repeat border h-80 xl:h-[650px]"
              }
            ></div>
          </div>
        </div>
      </Element>

      <Element
        className=" w-full z-[5] bg-whitebg border-t STICKY top-[60px]"
        name="FAQ"
      >
        <div
          className={
            styles.faq +
            " w-[80%] lg:w-[40%] h-[210px] bg-bottom bg-contain bg-no-repeat lg:mt-6 translate-y-[8px] mx-auto"
          }
        ></div>
        <div className=" bg-whitebg flex flex-wrap border w-full z-[5]">
          {faqs.map((faq, index) => {
            return (
              <div
                key={index}
                className=" w-full lg:w-[50%] flex flex-col items-center border-r border-t"
              >
                <div
                  className=" flex justify-center items-center text-base w-full px-8 py-8 duration-500"
                  style={
                    !faq.close
                      ? { background: "#000000", color: "#ffffff" }
                      : { borderBottom: "1px solid #000000" }
                  }
                  onClick={() => {
                    setFaqs(
                      faqs.map((f, i) => {
                        if (i === index) {
                          return { ...f, close: !f.close };
                        } else {
                          return f;
                        }
                      })
                    );
                  }}
                >
                  <div>{faq.issue}</div>
                  <div
                    className={
                      styles.arrow_2 +
                      " ml-auto bg-contain bg-no-repeat w-[22.5px] h-[12px] duration-500 shrink-0"
                    }
                    style={
                      !faq.close
                        ? {
                            filter: "invert(100%)",
                            transform: "rotate(-180deg)",
                          }
                        : {}
                    }
                  ></div>
                </div>
                {!faq.close ? (
                  <div className=" px-10 py-10 border-b w-full font-regular">
                    {faq.answer}
                  </div>
                ) : (
                  <></>
                )}
              </div>
            );
          })}
        </div>
      </Element>

      <div className=" bg-whitebg flex flex-wrap w-full justify-center items-center pt-4 lg:pt-44 pb-10 z-[5]">
        <div
          className={
            styles.thanks +
            " w-full h-[500px] lg:w-[40%] lg:h-[698px] bg-contain bg-no-repeat bg-center mb-9 lg:mr-10"
          }
        ></div>
        <div className=" lg:w-[50%] h-[698px] flex justify-center items-center text-2xl leading-10 relative 2xl:pr-20">
          <div className=" px-5">
            AIGCNFTDAO owes its existence to the open spirit of various AI open
            source communities and the free and inclusive community culture of
            various NFT projects. With AI technology evolving rapidly and NFT
            projects emerging constantly, AIGCNFTDAO's goal is to empower
            ordinary people to participate in the co-construction of the NFT
            community and culture through new technology. Let's create the
            future together.
          </div>
          <div
            className={
              styles.thanksRightBg +
              " z-[-1] ml-auto w-[80%] hidden h-full bg-contain bg-no-repeat bg-right absolute top-0 right-0 2xl:block"
            }
          ></div>
        </div>
      </div>

      <div className=" bg-whitebg w-full border-[1px] border-black overflow-hidden z-[5]">
        <div className=" text-lg py-1 md:text-[82px] md:py-5 animate-scrollX flex items-center">
          {Array(30)
            .fill(null)
            .map((item, index) => {
              return (
                <div key={index} className=" mx-2 md:mx-[100px] py-2 shrink-0">
                  AIGCNFTDAO
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}

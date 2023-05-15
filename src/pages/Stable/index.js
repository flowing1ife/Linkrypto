import 'App.css'; 
import {Link} from "react-router-dom"
import styled, { keyframes } from 'styled-components';
import React, {useState, useEffect} from "react";
import { useSelector } from 'react-redux';

import icons from "assets/tokenIcons"
import { useParams } from "react-router-dom";
import { BsBoxArrowLeft } from "react-icons/bs";
import axios from 'axios';


function StableManage() {

  const { id } = useParams();  
  const [showModal, setShowModal] = useState(false);
  const [isloading, setIsloading] = useState(false)

  const userAccount = useSelector(state => state.account) // 지갑주소
  const walletProvider = useSelector(state => state.walletProvider) // 프로바이더

  // nodeklay => "클레이 노드 스테이킹"
  const [investedAsset, setInvestedAsset] = useState({
    "isInvested": true,
    "totalInvested": 0,
    "totalDailyIncome": 0,
    "totalApr": 0,
    "klayInvestedinKlay": 0,
    "klayInvestedinKRW": 0,
    "klayDailyIncomeKlay": 0,
    "klayDailyIncomeKRW": 0,
    "KlayTotalApr": 0,
    "oUsdtInvestedinoUsdt": 0,
    "oUsdtInvestedinKRW": 0,
    "oUsdtDailyIncomeoUsdt": 0,
    "oUsdtDailyIncomeKRW": 0,
    "oUsdtTotalApr": 0,
    "klayProtocolCategorySummary": [
      { "Swapscanner": 0 },
      { "hashed-Ozys (Klaystation)": 0 },
      { "Stake.ly": 0 },
      { "Kokoa Finance": 0 },
      { "Klayswap": 9 }
    ],
    "oUsdtProtocolCategorySummary": [],
    "totalInvestCategory": { "klayStaking": 0, "ousdtStaking": 0 },
    "klayStaking": { "Min": 0, "Max": 0, "balance": 0 },
    "oUsdtStaking": {
      "Min": 0,
      "Max": 0,
      "balance": 0
    },
    "klayAprStatus": { "myStatus": 0, "maxApr": 0 },
    "oUsdtAprStatus": { "myStatus": 0, "maxApr": 0 },
    "klayProtocolCategory": [
      {
        "poolName": "hashed-Ozys (Klaystation)",
        "contractAddress": "0xe33337cb6fbb68954fe1c3fde2b21f56586632cd",
        "category": "노드 스테이킹",
        "investedKlay": 0,
        "tvlKLAY": 0,
        "tvlKRW": 0,
        "apr": 0,
        "liqToken": "sKLAY",
        "unStakingOption": ["스왑", "7일대기"]
      }
    ],
    "oUsdtProtocolCategory": [
      {
        "poolName": "Kleva",
        "contractAddress": "0xaee24956f6ccc58deac3c49ddb65a5c72d8bdd30",
        "category": "빌려주기",
        "investedoUSDT": 0,
        "tvloUSDT": 0,
        "tvlKRW": 0,
        "apr": 0
      }
    ]
  })

useEffect(() => {

  console.log("userAccount",userAccount)
  console.log("localStorage.getItem.address", localStorage.getItem("address") === "")

  // 1) local storage address check
  // null 이면 아예 접속한 적이 없는 것. // "" 이면 접속했엇으나 지갑해제한것.

  // 이 상황이라면 아무 것도 안한다. 
  
  // address 가 바뀌었다.
  if(userAccount === ""){ // 아무것도 아닌 거라면,
    // target 주소가 아무 것도 아닌 것이라면 아무 것도 안한다.
    setInvestedAsset({
      "isInvested": true,
      "totalInvested": 0,
      "totalDailyIncome": 0,
      "totalApr": 0,
      "klayInvestedinKlay": 0,
      "klayInvestedinKRW": 0,
      "klayDailyIncomeKlay": 0,
      "klayDailyIncomeKRW": 0,
      "KlayTotalApr": 0,
      "oUsdtInvestedinoUsdt": 0,
      "oUsdtInvestedinKRW": 0,
      "oUsdtDailyIncomeoUsdt": 0,
      "oUsdtDailyIncomeKRW": 0,
      "oUsdtTotalApr": 0,
      "klayProtocolCategorySummary": [
        { "Swapscanner": 0 },
        { "hashed-Ozys (Klaystation)": 0 },
        { "Stake.ly": 0 },
        { "Kokoa Finance": 0 },
        { "Klayswap": 9 }
      ],
      "oUsdtProtocolCategorySummary": [],
      "totalInvestCategory": { "klayStaking": 0, "ousdtStaking": 0 },
      "klayStaking": { "Min": 0, "Max": 0, "balance": 0 },
      "oUsdtStaking": {
        "Min": 0,
        "Max": 0,
        "balance": 0
      },
      "klayAprStatus": { "myStatus": 0, "maxApr": 0 },
      "oUsdtAprStatus": { "myStatus": 0, "maxApr": 0 },
      "klayProtocolCategory": [
        {
          "poolName": "hashed-Ozys (Klaystation)",
          "contractAddress": "0xe33337cb6fbb68954fe1c3fde2b21f56586632cd",
          "category": "노드 스테이킹",
          "investedKlay": 0,
          "tvlKLAY": 0,
          "tvlKRW": 0,
          "apr": 0,
          "liqToken": "sKLAY",
          "unStakingOption": ["스왑", "7일대기"]
        }
      ],
      "oUsdtProtocolCategory": [
        {
          "poolName": "Kleva",
          "contractAddress": "0xaee24956f6ccc58deac3c49ddb65a5c72d8bdd30",
          "category": "빌려주기",
          "investedoUSDT": 0,
          "tvloUSDT": 0,
          "tvlKRW": 0,
          "apr": 0
        }
      ]
    })

  } else if (userAccount !== undefined || userAccount !== "") { // 지갑 주소가 로딩 되었는데,

    console.log("지갑주소가 바뀜", userAccount)

    if(localStorage.getItem("address") === localStorage.getItem("lastAddress")){ // 마지막에 불러온 주소랑 상태 주소가 같은가?
      console.log("마지막 지갑 주소랑 같음", userAccount)

      const time = Date.now();

      if((time - localStorage.getItem("assetTimestamp")) > 60000){ // 불러온 이력이 있다면 불러온지 1분이 넘었는가?
        loadAsset() // 그러면 다시 자산을 불러온다.

      } else { // 불러온 이력이 없거나 1분 이내라면 기존 데이터를 불러온다.
        setInvestedAsset(JSON.parse(localStorage.getItem("assetList"))) 
      }

    } else { // 그러면 다시 자산을 불러온다.
      loadAsset() 
    }
  
  }




}, [userAccount])

const loadAsset = async () => {

  console.log("loading 시작")
  setIsloading(true)
  const time = Date.now();

  const assetList = await axios.get(`https://wp22qg4khl.execute-api.ap-northeast-2.amazonaws.com/v1/service/investInfo?userAddr=${userAccount}`)
  setInvestedAsset(assetList.data)
  localStorage.setItem("lastAddress", userAccount)
  localStorage.setItem("assetList", JSON.stringify(assetList.data))
  localStorage.setItem("assetTimestamp", time)

  // console.log("storage assetList", localStorage.getItem("assetList"))
  // console.log("storage assetList", time - localStorage.getItem("assetTimestamp")) // 1000

  console.log("assetList",assetList)
  console.log("loading 종료")
  setIsloading(false)    
}

  return (
    <>

      <div>

        <div class="p-4 mt-10">
          <OverBox>
          <div style={{paddingTop:"50px"}}/>

              {/* <div style={{paddingTop:"20px"}}/> */}

              <SubTemplateBlockVertical>

              <Wrappertitle>
                <ManageTitle>
                  <Title>
                    oUSDT 예치하기
                  </Title>
                  <Link to="/invest">
                    <div class="inline-flex items-center px-4 py-2 text-sm font-medium border border-blue-200 text-center text-blue-500 bg-white rounded-lg hover:bg-blue-600 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                      돌아가기
                    </div>
                  </Link>

                </ManageTitle>
              </Wrappertitle>
              <div style={{paddingTop:"20px"}}/>

                  <div class="block p-6 bg-blue-500 border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                    <h5 class="mb-2 text-1xl font-bold tracking-tight text-white dark:text-white">투자현황</h5>
                    <h5 class="mb-2 text-2xl font-bold tracking-tight text-white dark:text-white">
                      {isloading ? 
                          <><ProductSkeleton width="20%" height="30px" /></>   // 로딩 중이고, 자산이 로딩 안된 상황
                          :
                          userAccount !== "" ?
                            <> {investedAsset.oUsdtInvestedinoUsdt.toFixed(1)} oUSDT  </>
                            :  
                            "지갑을 연결해주세요"
                        }

                      
                      <span className="text-xs text-gray mx-5"> 
                      {isloading ? 
                          <><ProductSkeleton width="20%" height="20px" /></>   // 로딩 중이고, 자산이 로딩 안된 상황
                          :
                          userAccount !== "" ?
                            <> {Number(investedAsset.oUsdtInvestedinKRW.toFixed(1)).toLocaleString()} 원  </>
                            :  
                            ""
                        }
                      
                      </span>
                    </h5>
                    <h5 class="mb-2 text-1xl font-bold tracking-tight text-white dark:text-white">
                      {isloading ? 
                          <><ProductSkeleton width="50%" height="30px" /></>   // 로딩 중이고, 자산이 로딩 안된 상황
                          :
                          userAccount !== "" ?
                            <>
                            일 수익 예상 :
                            {" " + investedAsset.oUsdtDailyIncomeoUsdt.toFixed(3)} oUSDT ({investedAsset.oUsdtTotalApr.toFixed(2)} %)
                            <span className="text-xs text-gray mx-5"> {investedAsset.oUsdtDailyIncomeKRW.toFixed(1)} 원</span>
                          </>
                            :  
                            ""
                        }
                      


                    </h5>
                  </div>
                  <div style={{marginTop:"20px"}}></div>
                  <div className="border border-blue-200 rounded-lg p-5">
                  <h5 class="mb-3 text-1xl font-bold tracking-tight text-black dark:text-white">투자 내용</h5>
                  <div style={{marginTop:"10px"}}></div>
                  <div class="mb-1 p-0 text-base font-medium dark:text-blue-500" style={{fontSize:"14px"}}>프로토콜 별</div>
                  <div class="w-full bg-gray-200 rounded-full h-2.5 mb-4 dark:bg-gray-700">
                  {investedAsset.oUsdtProtocolCategorySummary.length > 0 ?
                      <div class="bg-blue-600 h-2.5 rounded-full" style={{width:`${Object.values(investedAsset.oUsdtProtocolCategorySummary[0])[0]}%`}}></div>
                    :
                    <></>
                  }

                  <span style={{fontSize:"12px", marginTop:"20px"}}>
                      {/* Hashed-Ozys (Klaystation) - 75% */}
                        <span class="flex flex-wrap items-center text-sm font-medium text-gray-900 dark:text-white pt-2 gap-1">
                        {investedAsset.oUsdtProtocolCategorySummary.map((res,index)=>(
                          true ?
                          <><span class="pt-1 w-2.5 h-2.5 bg-blue-600 rounded-full mr-1.5"></span><span>{Object.keys(res)[0]}</span></>
                          :
                          <></>
                        ))}
                        </span>
                    </span>
                  
                  </div>
                  <div style={{marginTop:"30px"}}></div>
                  <div class="mb-1 p-0 text-base font-medium dark:text-blue-500" style={{fontSize:"14px"}}>수익율 현황</div>
                  <div class="w-full bg-gray-200 rounded-full h-2.5 mb-4 dark:bg-gray-700">
                    {investedAsset.oUsdtAprStatus.myStatus !== 0 ? 
                    <>
                    <div class="bg-blue-600 h-2.5 rounded-full" style={{width:`${100 * investedAsset.oUsdtAprStatus.myStatus / investedAsset.oUsdtAprStatus.maxApr}%`}}></div>
                    <span style={{fontSize:"12px", marginTop:"20px"}}> 
                      My status - {investedAsset.oUsdtAprStatus.myStatus.toFixed(2)} % 
                      (Max {investedAsset.oUsdtAprStatus.maxApr.toFixed(2)}%)
                    </span>
                    </>
                    :
                    <></>
                    }
                    </div>
                  </div>

                  <div style={{marginTop:"30px"}}></div>


                  <div class="w-full max-w-md bg-white rounded-lg dark:bg-gray-800 dark:border-gray-700">
          <div class="flex items-center justify-between mb-4">
        </div>
        <div class="flow-root">
          {isloading ? 
              <>
                <ProductSkeleton width="100%" height="150px" style={{marginLeft:"0px"}}/>
              </> : 
              userAccount !== "" ?
              <>
              <h5 class="mb-2 text-1xl font-bold tracking-tight text-black dark:text-white">투자상품</h5>
              <ul role="list" class="divide-y divide-gray-200 dark:divide-gray-700" style={{marginLeft:"15px"}}>
              {investedAsset.oUsdtProtocolCategory.map((res)=>(
                <li class="py-3 sm:py-4">
                <div class="flex items-center space-x-4">
                    <div class="flex-shrink-0">
                        <img class="w-8 h-8 rounded-full" src={icons["KLAY"]} alt=""/>
                    </div>
                      
                    <div class="flex-1 min-w-0">
                    <div>
                        <span class="bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">
                        노드 스테이킹
                        </span>
                      </div>
                      <span class="bg-red-100 text-red-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-red-900 dark:text-red-300">
                        {res.investedoUSDT.toFixed(2)} oUSDT 예치중
                      </span>
                        <p class="text-sm font-medium text-gray-900 truncate dark:text-white">
                            {res.poolName}
                        </p>
                        <p class="text-sm text-gray-500 truncate dark:text-gray-400">
                            {/* 풀 KLAY : {Number(res.tvlKLAY.toFixed(0)).toLocaleString()} KLAY <br/> */}
                            풀 TVL :  {Number(res.tvlKRW.toFixed(0)).toLocaleString()} 원
                        </p>
                        <p class="text-sm text-gray-500 truncate dark:text-gray-400">
                            연 수익율 : 현재 {res.apr.toFixed(2)} %
                        </p>
                    </div>
                    <Link to="/detail/0xe33337cb6fbb68954fe1c3fde2b21f56586632cd">
                      <a href="#" class="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-500 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        예치하기
                      </a>
                    </Link>
                </div>
              </li>
                    ))}

                    </ul>
                    </>
                    :
                    <></>
                }
              </div>
            </div>

            </SubTemplateBlockVertical>
          </OverBox>
        </div>
      </div>
      


      



    <div id="crypto-modal" tabindex="-1" aria-hidden="true" class="fixed top-0 left-0 right-0 z-50 hidden w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full">
      <div class="relative w-full max-w-md max-h-full">
        <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <button type="button" class="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white" data-modal-hide="crypto-modal">
                <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>  
                <span class="sr-only">Close modal</span>
            </button>
            <div class="px-6 py-4 border-b rounded-t dark:border-gray-600">
                <h3 class="text-base font-semibold text-gray-900 lg:text-xl dark:text-white">
                    Connect wallet
                </h3>
            </div>
            <div class="p-6">
                <p class="text-sm font-normal text-gray-500 dark:text-gray-400">Connect with one of our available wallet providers or create a new one.</p>

            </div>
      </div>
    </div>
  </div>
    </>
  );
}

const ManageTitle = styled.div`
  width: 460px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  @media screen and (max-width: 500px){
      width: 100%;
      /* margin: 10px 10px; */
      font-size: 12px;
    }
`
/* style={{width:"460px", display:"flex", flexDirection:"row", alignItems:"center", justifyContent:"space-between"}}> */


const ChartCover = styled.div`
  height: 40px;
  border: 2px solid white;
  border-radius: 10px;
  overflow: hidden;
  /* New code below: */
  display: grid;
  grid-template-columns: ${props=> props.a}fr ${props=> props.b}fr ${props=> props.c}fr;
  /* grid-template-columns: ${props=> props.a}fr ${props=> props.b}fr ${props=> props.c}fr; */
`

const AppleChart = styled.div`
  background: #111539;
  color: white;
  font-family: sans-serif;
  font-weight: bold;
  font-size: 12px;
  line-height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Title = styled.h1`
  font-weight: 600;
  font-size: 20px;
`

const Wrappertitle = styled.div`
  margin: 0px auto 10px auto;
  width: 1136px;
  @media screen and (max-width: 950px){
    width: 100%;
    padding-top: 20px;
    color: black;
  }
  @media screen and (max-width: 500px){
    width: 100%;
    padding-top: 20px;
    /* color: gray; */
  }
`
const OverBox = styled.div`

  /* position: relative;
  margin: 10px auto; 
  width: calc(100% - (230px));
  width: -moz-calc(100% - (230px));
  width: -webkit-calc(100% - (230px));
  scroll-behavior: smooth;
  scroll-snap-type: y mandatory;
  height: 100vh;
  overflow: auto;
  padding: 30px; */

  @media screen and (max-width: 950px){
    width: calc(100%);
    width: -moz-calc(100%);
    width: -webkit-calc(100%);
    padding: 10px;
  }
`



const SubTemplateBlockVertical = styled.div`
     /* width: 900px; */
     /* max-width: 500px; */
    margin: 10px auto;
    max-width: 460px;
    /* padding-bottom: 10px; */
    position: relative;
    /* padding:15px; */
    /* display:flex; */
    /* flex-direction:column; */

    /* padding: 20px 25px !important;
    background: #fff; */

    color: rgba(0, 0, 0, 0.87);
    transition: box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    min-width: 0px;
    overflow-wrap: break-word;
    background-color: rgb(255, 255, 255);
    background-clip: border-box;
    /* border: 1px solid rgba(0, 0, 0, 0.125); */
    /* border-radius: 0.75rem; */
    /* box-shadow: rgb(0 0 0 / 10%) 0rem 0.25rem 0.375rem -0.0625rem, rgb(0 0 0 / 6%) 0rem 0.125rem 0.25rem -0.0625rem; */
    /* overflow: visible; */
    
  @media screen and (max-width: 500px){
      width: 100%;
      /* margin: 10px 10px; */
      font-size: 12px;
    }
`;

const SubTemplateBlockSub = styled.div`
     /* width: 900px; */
     /* max-width: 500px; */
    margin: 10px auto;
    width: 1136px;
    padding-bottom: 10px;
    position: relative; /* 추후 박스 하단에 추가 버튼을 위치시키기 위한 설정 */
    padding:15px;
    display:flex;
    flex-direction:column;

    padding: 20px 25px !important;

    color: rgba(0, 0, 0, 0.87);
    transition: box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    min-width: 0px;
    overflow-wrap: break-word;
    background-color: rgb(255, 255, 255);
    background-clip: border-box;
    border: 0.1px solid rgba(0, 0, 0, 0.125);
    border-radius: 0.75rem;
    box-shadow: rgb(0 0 0 / 10%) 0rem 0.25rem 0.375rem -0.0625rem, rgb(0 0 0 / 6%) 0rem 0.125rem 0.25rem -0.0625rem;
    overflow: visible;
    
  @media screen and (max-width: 500px){
      width: 100%;
      /* margin: 10px 10px; */
      font-size: 12px;
    }
`;

const skeletonKeyframes = keyframes`
  0% {
    background-position: -200px 0;
  }
  100% {
    background-position: calc(200px + 100%) 0;
  }
`;


export const ProductSkeleton = styled.div`
  display: inline-block;
  height: ${props => props.height || "20px"};
  width: ${props => props.width || "50%"};
  animation: ${skeletonKeyframes} 1300ms ease-in-out infinite;
  background-color: #eee;
  background-image: linear-gradient( 100deg, rgba(255, 255, 255, 0), rgba(255, 255, 255, 0.5) 50%, rgba(255, 255, 255, 0) 80% );
  background-size: 200px 100%;
  background-repeat: no-repeat;
  border-radius: 4px;
  margin-top: ${props => props.marginTop || "0"}
`;







export default StableManage;


import hashed from 'assets/ci/hashed.png'
import 'App.css'; 
import {Link} from "react-router-dom"
import styled from "styled-components";
import WalletTokenDetailTable from "pages/Portfolio/WalletTokenDetailTable.js"
import react, {useState, useEffect} from "react";
import { useDispatch , useSelector } from 'react-redux';

import icons from "assets/tokenIcons"
import { useParams } from "react-router-dom";
import { BsBoxArrowLeft } from "react-icons/bs";
import axios from 'axios';


function Manage() {

  const { id } = useParams();  
  const [showModal, setShowModal] = useState(false);
  const [isloading, setIsloading] = useState(false)

  const userAccount = useSelector(state => state.account) // 지갑주소
  const walletProvider = useSelector(state => state.walletProvider) // 프로바이더

  // nodeklay => "클레이 노드 스테이킹"
  const [investedAsset, setInvestedAsset] = useState({
    "isInvested": false,
    "totalInvested": 0,
    "totalDailyIncome": 0,
    "totalApr": 0,
    "klayInvestedinKlay": 0,
    "klayInvestedinKRW": 0,
    "klayDailyIncomeKlay": 0,
    "klayDailyIncomeKRW": 0,
    "KlayTotalApr": 0,
    "investCategory": {
        "klayStaking": 0,
        "ousdtStaking": 0
    },
    "klayStaking": {
        "Min": 0,
        "Max": 0,
        "balance": 0
    },
    "ousdtStaking": {
        "Min": 0,
        "Max": 0,
        "balance": 0
    },
    "klayAprStatus": {
      "myStatus": 0,
      "maxApr": 0
    },
    "klayProtocolCategory": [
      {
        "poolName": "hashed-Ozys (Klaystation)",
        "category": "노드 스테이킹",
        "investedKLAY": 0,
        "tvlKLAY": 0,
        "tvlKRW": 0,
        "apr":0,
        "liqToken": "sKLAY",
        "unStakingOption": [
            "스왑",
            "7일대기"
        ]
      }
  ]
})

useEffect(() => {

  if(userAccount === ""){ // 아무것도 아닌 거라면,
    // target 주소가 아무 것도 아닌 것이라면 아무 것도 안한다.
    setInvestedAsset({
      "isInvested": false,
      "totalInvested": 0,
      "totalDailyIncome": 0,
      "totalApr": 0,
      "klayInvestedinKlay": 0,
      "klayInvestedinKRW": 0,
      "klayDailyIncomeKlay": 0,
      "klayDailyIncomeKRW": 0,
      "KlayTotalApr": 0,
      "investCategory": {
          "klayStaking": 0,
          "ousdtStaking": 0
      },
      "klayStaking": {
          "Min": 0,
          "Max": 0,
          "balance": 0
      },
      "ousdtStaking": {
          "Min": 0,
          "Max": 0,
          "balance": 0
      },
      "klayAprStatus": {
        "myStatus": 0,
        "maxApr": 0
      },
      "klayProtocolCategory": [
        {
          "poolName": "hashed-Ozys (Klaystation)",
          "category": "노드 스테이킹",
          "investedKLAY": 0,
          "tvlKLAY": 0,
          "tvlKRW": 0,
          "apr":0,
          "liqToken": "sKLAY",
          "unStakingOption": [
              "스왑",
              "7일대기"
          ]
        }
    ]
  })

  } else if (userAccount.length > 5) { // 지갑 주소가 로딩 되었는데,

    console.log("지갑주소가 바뀜", userAccount)

    if(localStorage.getItem("address") === localStorage.getItem("lastAddress")){ // 마지막에 불러온 주소랑 상태 주소가 같은가?
      // console.log("마지막 지갑 주소랑 같음", userAccount)

      const time = Date.now();
      // console.log("현재시간", time)
      // console.log("마지막 로드 시간", Number(localStorage.getItem("assetTimestamp")))
      // console.log("로드한 이후 시간", time - Number(localStorage.getItem("assetTimestamp")))

      if((time - localStorage.getItem("assetTimestamp")) > 60 * 1000){ // 불러온 이력이 있다면 불러온지 1분이 넘었는가?
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
  localStorage.setItem("assetTimestamp", time)
  localStorage.setItem("lastAddress", userAccount)
  // console.log("storage assetList", localStorage.getItem("assetList"))
  // console.log("storage assetList", time - localStorage.getItem("assetTimestamp")) // 1000

  // localStorage.setItem("assetList", JSON.stringify(assetList.data))
  // localStorage.setItem("address", userAccount)
  // console.log("assetList",assetList)
  // console.log("loading 종료")
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
                    KLAY 예치하기
                    {/* {id} 관리하기 */}
                  </Title>
                  <Link to="/invest">
                    <BsBoxArrowLeft style={{ marginRight: "10px", verticalAlign: "bottom" }}/>
                  </Link>
                </ManageTitle> 
              </Wrappertitle>
              <div style={{paddingTop:"20px"}}/>

                  <div class="block p-6 bg-blue-500 border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                    <h5 class="mb-2 text-1xl font-bold tracking-tight text-white dark:text-white">투자현황</h5>
                    <h5 class="mb-2 text-2xl font-bold tracking-tight text-white dark:text-white">{investedAsset.klayInvestedinKlay.toFixed(2)} KLAY 
                      <span className="text-xs text-gray mx-5"> {Number(investedAsset.klayInvestedinKRW.toFixed(0)).toLocaleString()} 원</span>
                    </h5>
                    <h5 class="mb-2 text-1xl font-bold tracking-tight text-white dark:text-white">
                        일 수익 : {investedAsset.klayDailyIncomeKlay.toFixed(4)} KLAY <span className="text-xs text-gray mx-5"> {investedAsset.klayDailyIncomeKRW.toFixed(4)} 원</span><br/>
                        연 수익율 : {investedAsset.KlayTotalApr.toFixed(2)} %
                    </h5>
                  </div>
                  <div style={{marginTop:"20px"}}></div>
                  <div className="border border-blue-200 rounded-lg p-5">
                  <h5 class="mb-3 text-1xl font-bold tracking-tight text-black dark:text-white">투자 내용</h5>
                  <div style={{marginTop:"10px"}}></div>
                  <div class="mb-1 p-0 text-base font-medium dark:text-blue-500" style={{fontSize:"14px"}}>프로토콜 별</div>
                  <div class="w-full bg-gray-200 rounded-full h-2.5 mb-4 dark:bg-gray-700">
                    <div class="bg-blue-600 h-2.5 rounded-full" style={{width:"85%"}}></div>
                    <span style={{fontSize:"12px", marginTop:"20px"}}>
                      {/* Hashed-Ozys (Klaystation) - 75% */}
                      {investedAsset.klayProtocolCategory.map((res)=>(
                        <div>{res.poolName}</div>
                      ))}
                    </span>
                  </div>
                  <div style={{marginTop:"30px"}}></div>
                  <div class="mb-1 p-0 text-base font-medium dark:text-blue-500" style={{fontSize:"14px"}}>수익율 현황</div>
                  <div class="w-full bg-gray-200 rounded-full h-2.5 mb-4 dark:bg-gray-700">
                    <div class="bg-blue-600 h-2.5 rounded-full" style={{width:"50%"}}></div>
                    <span style={{fontSize:"12px", marginTop:"20px"}}> 
                      My status - {investedAsset.klayAprStatus.myStatus.toFixed(2)} % 
                      (Max {investedAsset.klayAprStatus.maxApr.toFixed(2)}%)
                    </span>
                  </div>
                  
                  </div>

                  <div style={{marginTop:"30px"}}></div>


      <div class="w-full max-w-md bg-white rounded-lg dark:bg-gray-800 dark:border-gray-700">
          <div class="flex items-center justify-between mb-4">
              <h5 class="mb-2 text-1xl font-bold tracking-tight text-black dark:text-white">투자관리</h5>
        </div>
        <div class="flow-root">
              <ul role="list" class="divide-y divide-gray-200 dark:divide-gray-700" style={{marginLeft:"15px"}}>
                <li class="py-3 sm:py-4">
                <div class="flex items-center space-x-4">
                    <div class="flex-shrink-0">
                        <img class="w-8 h-8 rounded-full" src={icons["KLAY"]} alt=""/>
                        {/* <img class="w-8 h-8 rounded-full" src="/docs/images/people/profile-picture-1.jpg" alt="Neil image" /> */}
                    </div>
                    <div class="flex-1 min-w-0">
                      <span class="bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">노드 스테이킹</span>
                      <span class="bg-red-100 text-red-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-red-900 dark:text-red-300">210 KLAY 예치중</span>
                        <p class="text-sm font-medium text-gray-900 truncate dark:text-white">
                            Hashed-Ozys (Klaystaion)
                        </p>
                        <p class="text-sm text-gray-500 truncate dark:text-gray-400">
                            예치총액 : 12,312,122 KLAY (21,222,000원)
                        </p>
                        <p class="text-sm text-gray-500 truncate dark:text-gray-400">
                            연 수익율 : 현재 9.5 %
                        </p>
                        <p class="text-sm text-gray-500 truncate dark:text-gray-400">
                            유동성 토큰 : sKLAY
                        </p>
                        <p class="text-sm text-gray-500 truncate dark:text-gray-400">
                            언스테이킹 옵션 : 스왑 / 7일 대기
                        </p>
                    </div>
                    
                    <a href="#" class="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-500 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">예치하기</a>
                </div>
              </li>
            <li class="py-3 sm:py-4">
                <div class="flex items-center space-x-4">
                    <div class="flex-shrink-0">
                        <img class="w-8 h-8 rounded-full" src={icons["KLAY"]} alt=""/>
                        {/* <img class="w-8 h-8 rounded-full" src="/docs/images/people/profile-picture-1.jpg" alt="Neil image" /> */}
                    </div>
                    <div class="flex-1 min-w-0">
                      <span class="bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">빌려주기</span>
                      <span class="bg-red-100 text-red-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-red-900 dark:text-red-300">190 KLAY 예치중</span>
                        <p class="text-sm font-medium text-gray-900 truncate dark:text-white">
                            klayswap
                        </p>
                        <p class="text-sm text-gray-500 truncate dark:text-gray-400">
                            예치총액 : 312,122 KLAY (21,222,111원)
                        </p>
                        <p class="text-sm text-gray-500 truncate dark:text-gray-400">
                            연 수익율 : 현재 7.5 %
                        </p>
                    </div>
                    <a href="#" class="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-500 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">예치하기</a>
                </div>
            </li>

        </ul>
   </div>
</div>



            {/* <div class="p-4 bg-white rounded-lg md:p-8 dark:bg-gray-800" id="faq" role="tabpanel" aria-labelledby="faq-tab">
            <div id="accordion-flush" data-accordion="collapse" data-active-classes="bg-white dark:bg-gray-800 text-gray-900 dark:text-white" data-inactive-classes="text-gray-500 dark:text-gray-400">
                <h2 id="accordion-flush-heading-1">
                    <button type="button" class="flex items-center justify-between w-full py-5 font-medium text-left text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400" data-accordion-target="#accordion-flush-body-1" aria-expanded="true" aria-controls="accordion-flush-body-1">
                    <span>이자는 어디에서 발생하는 건가요?</span>
                    <svg data-accordion-icon class="w-6 h-6 rotate-180 shrink-0" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                    </button>
                </h2>
                <div id="accordion-flush-body-1" class="hidden" aria-labelledby="accordion-flush-heading-1">
                    <div class="py-5 border-b border-gray-200 dark:border-gray-700">
                    <p class="mb-2 text-gray-500 dark:text-gray-400">Flowbite is an open-source library of interactive components built on top of Tailwind CSS including buttons, dropdowns, modals, navbars, and more.</p>
                    <p class="text-gray-500 dark:text-gray-400">Check out this guide to learn how to <a href="/docs/getting-started/introduction/" class="text-blue-600 dark:text-blue-500 hover:underline">get started</a> and start developing websites even faster with components on top of Tailwind CSS.</p>
                    </div>
                </div>
                <h2 id="accordion-flush-heading-2">
                    <button type="button" class="flex items-center justify-between w-full py-5 font-medium text-left text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400" data-accordion-target="#accordion-flush-body-2" aria-expanded="false" aria-controls="accordion-flush-body-2">
                    <span>Is there a Figma file available?</span>
                    <svg data-accordion-icon class="w-6 h-6 shrink-0" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                    </button>
                </h2>
                <div id="accordion-flush-body-2" class="hidden" aria-labelledby="accordion-flush-heading-2">
                    <div class="py-5 border-b border-gray-200 dark:border-gray-700">
                    <p class="mb-2 text-gray-500 dark:text-gray-400">Flowbite is first conceptualized and designed using the Figma software so everything you see in the library has a design equivalent in our Figma file.</p>
                    <p class="text-gray-500 dark:text-gray-400">Check out the <a href="https://flowbite.com/figma/" class="text-blue-600 dark:text-blue-500 hover:underline">Figma design system</a> based on the utility classes from Tailwind CSS and components from Flowbite.</p>
                    </div>
                </div>
                <h2 id="accordion-flush-heading-3">
                    <button type="button" class="flex items-center justify-between w-full py-5 font-medium text-left text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400" data-accordion-target="#accordion-flush-body-3" aria-expanded="false" aria-controls="accordion-flush-body-3">
                    <span>What are the differences between Flowbite and Tailwind UI?</span>
                    <svg data-accordion-icon class="w-6 h-6 shrink-0" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                    </button>
                </h2>
                <div id="accordion-flush-body-3" class="hidden" aria-labelledby="accordion-flush-heading-3">
                    <div class="py-5 border-b border-gray-200 dark:border-gray-700">
                    <p class="mb-2 text-gray-500 dark:text-gray-400">The main difference is that the core components from Flowbite are open source under the MIT license, whereas Tailwind UI is a paid product. Another difference is that Flowbite relies on smaller and standalone components, whereas Tailwind UI offers sections of pages.</p>
                    <p class="mb-2 text-gray-500 dark:text-gray-400">However, we actually recommend using both Flowbite, Flowbite Pro, and even Tailwind UI as there is no technical reason stopping you from using the best of two worlds.</p>
                    <p class="mb-2 text-gray-500 dark:text-gray-400">Learn more about these technologies:</p>
                    <ul class="pl-5 text-gray-500 list-disc dark:text-gray-400">
                        <li><a href="https://flowbite.com/pro/" class="text-blue-600 dark:text-blue-500 hover:underline">Flowbite Pro</a></li>
                        <li><a href="https://tailwindui.com/" rel="nofollow" class="text-blue-600 dark:text-blue-500 hover:underline">Tailwind UI</a></li>
                    </ul>
                    </div>
                </div>
                </div>
        </div> */}

                  

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





export default Manage;


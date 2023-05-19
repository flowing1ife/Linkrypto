import 'App.css'; 
import axios from 'axios';
import styled, { keyframes } from 'styled-components';
import react, {useState, useEffect} from "react";
import { useDispatch , useSelector } from 'react-redux';
import { useParams, useNavigate } from "react-router-dom";
// import metamaskDepositExecutor from './metamaskExecutor.js';

import poolInfos from "./poolInfos.json"


function Detail() {

  const { id } = useParams();  
  const [showModal, setShowModal] = useState(false);
  const [isloading, setIsloading] = useState(false)

  const userAccount = useSelector(state => state.account) // 지갑주소
  const walletProvider = useSelector(state => state.walletProvider) // 프로바이더

  const [detailAsset, setDetailAsset] = useState({
    "poolName": "",
    "category": "",
    "contractAddress": "",
    "investedToken": 0,
    "availableToken": 0,
    "tvlToken": 0,
    "tvlKRW": 0,
    "apr": 0
  })

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
    "protocolCategorySummary":[{"Swapscanner":0}],
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
  // console.log("history",history)

  // const thisOption = investedAsset.klayProtocolCategory.filter(res=> res.contractAddress === id)
  // console.log("investedAsset.klayProtocolCategory",investedAsset.klayProtocolCategory)

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
      "protocolCategorySummary":[{"Swapscanner":0}],
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
  setIsloading(false)    
}

const requestDeposit = async () => {

  if(walletProvider === "metamask"){

    // metamaskDepositExecutor(userAccount, id, 3)

  } else if (walletProvider === "kaikas") {
    const data = window.caver.klay.abi.encodeFunctionCall(
      {
        name: 'stake',
        type: 'function',
        inputs: []
      },
      []
    )
    window.caver.klay
    .sendTransaction({
      type: 'SMART_CONTRACT_EXECUTION',
      from: "0xc847D70D3Ceb7E543e7ede2aD0AC596E2fFbcEC8",
      to: "0xf80f2b22932fcec6189b9153aa18662b15cc9c00",
      data,
      value: window.caver.utils.toPeb('1', 'KLAY'),
      gas: 800000
    })
    .once('transactionHash', (transactionHash) => {
      console.log('txHash', transactionHash);
     })
    .once('receipt', (receipt) => {
        console.log('receipt', receipt);
    })
    .once('error', (error) => {
        console.log('error', error);
        alert("지불에 실패하셨습니다.");
    })
  } else {
    alert("지갑 연결이 필요합니다.")
  }





  if(id==="0xe33337cb6fbb68954fe1c3fde2b21f56586632cd"){






    // console.log(address)

  // const data = window.web3.eth.abi.encodeFunctionCall(
    //   {
    //     name: 'stakeKlay',
    //     type: 'function',
    //     inputs: [
    //       {
    //         "name": "address",
    //         "type": "address"
    //       }
    //     ]
    //   },
    //   [
    //     "0xc847D70D3Ceb7E543e7ede2aD0AC596E2fFbcEC8"
    //   ]
    // )
  //   window.web3.eth
  //   .sendTransaction({
  //     type: 'SMART_CONTRACT_EXECUTION',
  //     from: "0xc847D70D3Ceb7E543e7ede2aD0AC596E2fFbcEC8",
  //     to: "0xe33337cb6fbb68954fe1c3fde2b21f56586632cd",
  //     data,
  //     value: window.caver.utils.toPeb('3', 'KLAY'),
  //     gas: 800000
  //   })
  //   .once('transactionHash', (transactionHash) => {
  //     console.log('txHash', transactionHash);
  //  })
  //  .once('receipt', (receipt) => {
  //     console.log('receipt', receipt);
  //  })
  //  .once('error', (error) => {
  //     console.log('error', error);
  //     alert("지불에 실패하셨습니다.");
  //  })
  // } else if(id==="0xf80f2b22932fcec6189b9153aa18662b15cc9c00"){
    // const data = window.caver.klay.abi.encodeFunctionCall(
    //     {
    //       name: 'stake',
    //       type: 'function',
    //       inputs: []
    //     },
    //     []
    //   )
    //   window.caver.klay
    //   .sendTransaction({
    //     type: 'SMART_CONTRACT_EXECUTION',
    //     from: "0xc847D70D3Ceb7E543e7ede2aD0AC596E2fFbcEC8",
    //     to: "0xf80f2b22932fcec6189b9153aa18662b15cc9c00",
    //     data,
    //     value: window.caver.utils.toPeb('1', 'KLAY'),
    //     gas: 800000
    //   })
    //   .once('transactionHash', (transactionHash) => {
    //     console.log('txHash', transactionHash);
    //  })
    //  .once('receipt', (receipt) => {
    //     console.log('receipt', receipt);
    //  })
    //  .once('error', (error) => {
    //     console.log('error', error);
    //     alert("지불에 실패하셨습니다.");
    //  })
  //   } else if(id==="0xf50782a24afcb26acb85d086cf892bfffb5731b5"){
  //   const data = window.caver.klay.abi.encodeFunctionCall(
  //       {
  //         name: 'AaANwg8',
  //         type: 'function',
  //         inputs: [
  //           {
  //             "name": "address",
  //             "type": "address"
  //           },
  //           {
  //             "name": "address",
  //             "type": "address"
  //           },
  //           {
  //             "name": "address",
  //             "type": "address"
  //           },
  //           {
  //             "name": "uint136",
  //             "type": "uint136"
  //           },
  //           {
  //             "name": "uint40",
  //             "type": "uint40"
  //           },
  //           {
  //             "name": "uint40",
  //             "type": "uint40"
  //           },
  //           {
  //             "name": "uint24",
  //             "type": "uint24"
  //           },
  //           {
  //             "name": "uint8",
  //             "type": "uint8"
  //           },
  //           {
  //             "name": "uint256",
  //             "type": "uint256"
  //           },
  //           {
  //             "name": "bytes32",
  //             "type": "bytes32"
  //           },
  //           {
  //             "name": "bytes32",
  //             "type": "bytes32"
  //           },
  //           {
  //             "name": "uint256",
  //             "type": "uint256"
  //           }
  //         ]
  //       },
  //       [0x0000000000000000000000000000000000000040, 0x00000000000000000000000000000000000003e0, 0x0000000000000000000000000000000000000380, 32, 6, 416, 11305193, 255, 50000000000000000000, 0x0000000000000000000000000000000000000000000000000000000000000300, 0x000000000000000000000000999999999939ba65abb254339eec0b2a0dac80e9, 0]
  //     )
  //     window.caver.klay
  //     .sendTransaction({
  //       type: 'SMART_CONTRACT_EXECUTION',
  //       from: "0xc847D70D3Ceb7E543e7ede2aD0AC596E2fFbcEC8",
  //       to: "0xf50782a24afcb26acb85d086cf892bfffb5731b5",
  //       data,
  //       value: window.caver.utils.toPeb('50', 'KLAY'),
  //       gas: 800000
  //     })
  //     .once('transactionHash', (transactionHash) => {
  //       console.log('txHash', transactionHash);
  //    })
  //    .once('receipt', (receipt) => {
  //       console.log('receipt', receipt);
  //    })
  //    .once('error', (error) => {
  //       console.log('error', error);
  //       alert("지불에 실패하셨습니다.");
  //    })
    }
  }


  const Backbutton = () => {
    const navigate = useNavigate();
    const onClickBtn = () => {
      navigate(-1);
    };
    return (
      <button onClick={onClickBtn} class="inline-flex items-center px-4 py-2 text-sm font-medium border border-blue-200 text-center text-blue-500 bg-white rounded-lg hover:bg-blue-600 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
      돌아가기
      </button>
    )
  }


  return (
    <>

      <div>

        <div class="p-4 mt-10">
          <OverBox>
          <div style={{paddingTop:"50px"}}/>
          
          
              {/* <div style={{paddingTop:"20px"}}/> */}

              <SubTemplateBlockVertical>
              {/* <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"> */}

    {/* </div> */}

          <div>
          <div class="px-4 sm:px-0">
          <Wrappertitle>
                <ManageTitle>
                  <Title>
                  <h3 class="text-base font-semibold leading-7 text-gray-900">예치 하기</h3>
                  {/* <p class="mt-1 max-w-2xl text-sm leading-6 text-gray-500">Liquidity Staking</p> */}
                    {/* {id} 관리하기 */}
                  </Title>
                  <Backbutton class="inline-flex items-center px-4 py-2 text-sm font-medium border border-blue-200 text-center text-blue-500 bg-white rounded-lg hover:bg-blue-600 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"/>
                  {/* <Link to="/manage/klayNode">
                    <a href="#" class="inline-flex items-center px-4 py-2 text-sm font-medium border border-blue-200 text-center text-blue-500 bg-white rounded-lg hover:bg-blue-600 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                      돌아가기
                    </a>
                  </Link> */}
                </ManageTitle> 
              </Wrappertitle>

              <div style={{paddingTop:"20px"}}/>

                  <div class="block p-6 bg-blue-500 border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                    <h5 class="mb-2 text-1xl font-bold tracking-tight text-white dark:text-white">{poolInfos[id].poolName} 투자현황</h5>
                    <h5 class="mb-2 text-2xl font-bold tracking-tight text-white dark:text-white">
                      {isloading ? 
                          <><ProductSkeleton width="20%" height="30px" /></>   // 로딩 중이고, 자산이 로딩 안된 상황
                          :
                          userAccount !== "" ?
                            <> {detailAsset.investedToken.toFixed(2)} KLAY  </>
                            :  
                            "지갑을 연결해주세요"
                      }
                      
                      <span className="text-xs text-gray mx-5">
                      {isloading ? 
                          <><ProductSkeleton width="5%" height="30px" /></>   // 로딩 중이고, 자산이 로딩 안된 상황
                          :
                          userAccount !== "" ?
                            <> {Number(investedAsset.klayInvestedinKRW.toFixed(0)).toLocaleString()} 원  </>
                            :  
                            ""
                      }
                        
                      </span>
                    </h5>

                  </div>
                  <div style={{marginTop:"20px"}}></div>
                  <div className="border border-gray-200 rounded-lg p-5">
                  <ul class="text-sm font-medium text-center text-gray-400 divide-x divide-blue-200 border border-blue-300 rounded-lg flex dark:divide-blue-700 dark:text-blue-400">
                  <li class="w-full">
                      <a href="#" class="inline-block w-full p-2 text-blue-600 bg-blue-100 rounded-l-lg focus:ring-1 focus:ring-blue-300 active focus:outline-none dark:bg-blue-700 dark:text-white">
                        예치
                      </a>
                  </li>
                  <li class="w-full">
                      <a href="#" class="inline-block w-full p-2 bg-white rounded-r-lg hover:text-blue-700 hover:bg-blue-50 focus:ring-1 focus:outline-none focus:ring-blue-300 dark:hover:text-white dark:bg-blue-800 dark:hover:bg-blue-700">
                        인출
                      </a>
                  </li>
              </ul>
              <div style={{marginTop:"20px"}}></div>
                  <div className="p-2">
                  <h5 class="mb-2 text-1xl font-medium tracking-tight text-black dark:text-white">예치</h5>
                  <div style={{marginTop:"10px"}}></div>
          <div class="items-center">   
              <label for="voice-search" class="sr-only">Search</label>
              <div class="relative w-full">
                  <input type="text" id="voice-search" class="bg-white border border-blue-300 text-blue-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-300 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                    placeholder="예치가능 : 20.00 KLAY" required 
                  />
              </div>              
          </div>

          <div style={{marginTop:"20px"}}></div>

          <div style={{textAlign:"right"}}>
            <button onClick={requestDeposit} style={{width:"100%"}} type="submit" class="py-2.5 px-3 text-sm font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                <span style={{width:"30px"}}>예치하기</span>
            </button>
          </div>
          </div>
                  </div>
            </div>

            <div style={{marginTop:"30px"}}></div>
            <div class="block p-6 border border-gray-200 rounded-lg dark:hover:bg-gray-700">

            <h5 style={{marginLeft:"30px"}} class="mb-2 text-1xl font-medium tracking-tight text-black dark:text-white">풀 상세정보</h5>
            <div class="mt-6 border-t border-gray-100">
              <dl class="divide-y divide-gray-100">
                <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt style={{marginLeft:"50px"}} class="text-sm font-medium leading-6 text-gray-900">이름</dt>
                  <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                    {poolInfos[id].poolName}
                  </dd>
                </div>
                <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt style={{marginLeft:"50px"}} class="text-sm font-medium leading-6 text-gray-900">타입</dt>
                  <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  {poolInfos[id].poolType}
                  </dd>
                </div>
                <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt style={{marginLeft:"50px"}} class="text-sm font-medium leading-6 text-gray-900">상태</dt>
                  <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">자산 규모 : 353,100,000 원</dd>
                  <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-1 sm:mt-0"></dd>
                  <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">예치된 토큰 : 23,220 KLAY</dd>
                  <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-1 sm:mt-0"></dd>
                  <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">연 수익율 : 6.7 %</dd>
                </div>
                <div class="px-4 py-1 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt style={{marginLeft:"50px"}} class="text-sm font-medium leading-6 text-gray-900">정보</dt>
                  <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                    운영사 : {poolInfos[id].info.operation}
                  </dd>
                  <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-1 sm:mt-0"></dd>
                  <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                    시작일자 : {poolInfos[id].info.startDate}
                  </dd>
                  <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-1 sm:mt-0"></dd>
                  <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                    사고이력 : {poolInfos[id].info.hackingHistory}
                  </dd>
                  <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-1 sm:mt-0"></dd>
                  <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                    오딧여부 : {poolInfos[id].info.auditPerformed}
                  </dd>
                </div>
              </dl>
            </div>
          </div>
          </div>
          {/* <div style={{marginTop:"30px"}}></div> */}
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




export default Detail;


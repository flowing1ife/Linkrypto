import 'App.css'; 
import axios from 'axios';
import styled, { keyframes } from 'styled-components';
import react, {useState, useEffect} from "react";
import { useDispatch , useSelector } from 'react-redux';
import { useParams, useNavigate } from "react-router-dom";
import {metamaskDepositExecutor, metamaskWithdrawalExecutor, metamaskSwapExecutor, metamaskOusdtDepositExecutor} from './metamaskExecutor.js';
import icons from "assets/tokenIcons"
import Swal from 'sweetalert2'

import poolInfos from "./poolInfos.json"


function Detail() {

  const { id } = useParams();  
  const [showModal, setShowModal] = useState(false);
  const [isloading, setIsloading] = useState(false);
  const [selection, setSelection] = useState("예치");
  const [depositAmount, setDepositAmount] = useState()
  const [withdrawalAmount, setWithdrawalAmount] = useState()

  

  const userAccount = useSelector(state => state.account) // 지갑주소
  const walletProvider = useSelector(state => state.walletProvider) // 프로바이더

  const [detailAsset, setDetailAsset] = useState({
    "poolName": "",
    "category": "",
    "contractAddress": "",
    // "TokenName": 0,
    "investedToken": 0,
    "availableToken": 0,
    "tvlToken": 0,
    "tvlKRW": 0,
    "apr": 0
  })


  useEffect(() => {
    console.log("depositAmount",depositAmount)
    loadAsset()
  }, [userAccount])


  const loadAsset = async () => {

    console.log("loading 시작")
    setIsloading(true)

    console.log("userAccount",userAccount)
    if(userAccount !== ""){
      const assetList = await axios.get(`https://wp22qg4khl.execute-api.ap-northeast-2.amazonaws.com/v1/service/managePool?userAddr=${userAccount}&contractAddress=${id}`)
      console.log("assetList",assetList.data)
      setDetailAsset(assetList.data)
    } else {
      setDetailAsset({
        "poolName": "",
        "category": "",
        "contractAddress": "",
        "investedToken": 0,
        "availableToken": 0,
        "tvlToken": 0,
        "tvlKRW": 0,
        "apr": 0
      })
    }
    console.log("loading 종료")
    setIsloading(false)    
  }

  const requestWithdrawal = async () => {

    if(walletProvider === "metamask"){

      const metamaskReturn = await metamaskWithdrawalExecutor(userAccount, id, withdrawalAmount, detailAsset.investedToken)
      console.log("metamaskReturn",metamaskReturn)

    } else {

    }
  
  }

  const requestSwap = async () => {

    if(walletProvider === "metamask"){

      
      // metamaskWithdrawalExecutor(userAccount, id, withdrawalAmount, detailAsset.investedToken)

    } else {

    }

  }

  const requestDeposit = async () => {

    if(walletProvider === "metamask"){

      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 5000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      })      

      setIsloading(true)

      let trxReturn = {}

      
      if(poolInfos[id].poolToken === "KLAY"){
        trxReturn = await metamaskDepositExecutor(userAccount, id, depositAmount)
      } else {
        trxReturn = await metamaskOusdtDepositExecutor(userAccount, id, depositAmount)
      }

      setIsloading(false)

      Toast.fire({
        icon: 'success',
        title: '예치가 성공적으로 실행되었습니다.',
        html: `<a href=https://scope.klaytn.com/tx/${trxReturn.transactionHash} target="_blank">상세내역보기</a>`
      })

      await loadAsset()


    } else if (walletProvider === "kaikas") {
      const data = window.caver.klay.abi.encodeFunctionCall(
        {
          name: 'stake',
          type: 'function',
          inputs: []
        },
        []
      )
      await window.caver.klay
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
        loadAsset()
      })
      .once('receipt', (receipt) => {
          console.log('receipt', receipt);
          loadAsset()
        })
      .once('error', (error) => {
          console.log('error', error);
          alert("지불에 실패하셨습니다.");
      })
    } else {
      alert("지갑 연결이 필요합니다.")
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

  const selectionDeposit = () => {
    setSelection("예치")
  }

  const selectionWithdrawler = () => {
    setSelection("인출")
  }

  const maxDepositHandler = () => {
    setDepositAmount(detailAsset.availableToken)
  }

  const maxWithdrawerHandler = () => {
    setWithdrawalAmount(detailAsset.investedToken)
  }
  

  return (
    <>
      <div>
        <div class="p-4 mt-10">
          <OverBox>
          <div style={{paddingTop:"50px"}}/>
          <SubTemplateBlockVertical>
            <div>
              <div class="px-4 sm:px-0">
                <Wrappertitle>
                  <ManageTitle>
                    <Title>
                    <h3 class="text-base font-semibold leading-7 text-gray-900">예치 하기</h3>
                    </Title>
                    <Backbutton class="inline-flex items-center px-4 py-2 text-sm font-medium border border-blue-200 text-center text-blue-500 bg-white rounded-lg hover:bg-blue-600 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"/>
                  </ManageTitle> 
                </Wrappertitle>

              <div style={{paddingTop:"20px"}}/>

                  <div class="block p-6 bg-blue-500 border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                    <h5 class="mb-2 text-1xl font-bold tracking-tight text-white dark:text-white">{poolInfos[id].poolName} 투자현황</h5>
                    <h5 class="mb-2 text-2xl font-bold tracking-tight text-white dark:text-white">
                      {isloading ? 
                          <><ProductSkeleton width="20%" height="30px" /></> 
                          :
                          userAccount !== "" ?
                            <> {detailAsset.investedToken.toFixed(2)} {poolInfos[id].poolToken}  </>
                            :  
                            "지갑을 연결해주세요"
                      }
                      
                      <span className="text-xs text-gray mx-5">
                      {isloading ? 
                          <><ProductSkeleton width="5%" height="30px" /></> 
                          :
                          userAccount !== "" ?
                            <> 
                            {/* {Number(investedAsset.klayInvestedinKRW.toFixed(0)).toLocaleString()} 원   */}
                            </>
                            :  
                            ""
                      }
                        
                      </span>
                    </h5>

                  </div>
                  <div style={{marginTop:"20px"}}></div>
                  <div className="border border-gray-200 rounded-lg p-5">
                  <div style={{marginTop:"10px"}}></div>

              {selection === "예치" ? 

              <ul class="text-sm font-medium text-center text-gray-400 divide-x divide-blue-200 border border-blue-300 rounded-lg flex dark:divide-blue-700 dark:text-blue-400">
                  <li class="w-full">
                      <a onClick={selectionDeposit} href="#" class="inline-block w-full p-2 text-blue-600 bg-blue-100 rounded-l-lg focus:ring-1 focus:ring-blue-300 active focus:outline-none dark:bg-blue-700 dark:text-white">
                        예치
                      </a>
                  </li>
                  <li class="w-full">
                      <a onClick={selectionWithdrawler} href="#" class="inline-block w-full p-2 bg-white rounded-r-lg hover:text-blue-700 hover:bg-blue-50 focus:ring-1 focus:outline-none focus:ring-blue-300 dark:hover:text-white dark:bg-blue-800 dark:hover:bg-blue-700">
                        인출
                      </a>
                  </li>
              </ul>
              :
              <ul class="text-sm font-medium text-center text-gray-400 divide-x divide-blue-200 border border-blue-300 rounded-lg flex dark:divide-blue-700 dark:text-blue-400">
              <li class="w-full">
                  <a onClick={selectionDeposit} href="#" class="inline-block w-full p-2 text-gray bg-white rounded-l-lg focus:ring-1 focus:ring-blue-300 active focus:outline-none dark:bg-blue-700 dark:text-white">
                    예치
                  </a>
              </li>
              <li class="w-full">
                  <a onClick={selectionWithdrawler} href="#" class="inline-block w-full p-2 text-blue-600 bg-blue-100 rounded-r-lg hover:text-blue-700 hover:bg-blue-50 focus:ring-1 focus:outline-none focus:ring-blue-300 dark:hover:text-white dark:bg-blue-800 dark:hover:bg-blue-700">
                    인출
                  </a>
              </li>
              </ul>
              }



          <div style={{marginTop:"20px"}}></div>
              <div className="p-2">
              <h5 class="mb-2 text-1xl font-medium tracking-tight text-black dark:text-white">
              {selection === "예치" ? "예치" : "인출"}</h5>
              <div style={{marginTop:"10px"}}></div>
              <div class="items-center">   
              
                  <label for="voice-search" class="sr-only">Search</label>
                  
                  <div class="relative w-full">
                      {selection === "예치" ? 
                      <>
                        <div class="relative">
                            <div class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                            </div>
                            <input type="number" value={depositAmount} onChange={e => setDepositAmount(e.target.value)} class="block p-4 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-100 dark:placeholder-gray-100 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder={`잔액 : ${detailAsset.availableToken} ${poolInfos[id].poolToken}`} required  />
                            <button onClick={maxDepositHandler}  class="text-white absolute right-2.5 bottom-2.5 bg-blue-500 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Max</button>
                        </div>
                      </>
                      :
                      <>
                      <div class="relative">
                      <div class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                      </div>
                      <input type="number" value={withdrawalAmount} onChange={e => setWithdrawalAmount(e.target.value)} class="block p-4 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-100 dark:placeholder-gray-100 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder={`잔액 : ${detailAsset.investedToken} ${poolInfos[id].poolToken}`} required  />
                      <button onClick={maxWithdrawerHandler}  class="text-white absolute right-2.5 bottom-2.5 bg-blue-500 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Max</button>
                      </div>
                      </>
                    }
                  </div>              
              </div>

              {/* maxWithdrawerHandler */}




          <div style={{marginTop:"20px"}}></div>
            <div style={{textAlign:"right"}}>
              <div style={{marginTop:"30px"}}></div>
              {selection === "예치" ? 
                <button onClick={requestDeposit} style={{width:"100%"}} type="submit" class="py-2.5 px-3 text-sm font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-800 focus:ring-2 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    <span style={{width:"30px"}}>예치하기</span>
                </button>
                :
                poolInfos[id].unstakingOption === 2 ?
                <div style={{display:"flex", flexDirection:"row", justifyContent:"space-between"}}>
                <button onClick={requestSwap} style={{width:"30%"}} type="submit" class="py-2.5 px-3 text-sm font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-800 focus:ring-2 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    <span style={{width:"30px"}}>스왑 (즉시)</span>
                </button>
                <button onClick={requestWithdrawal} style={{width:"65%"}} type="submit" class="py-2.5 px-3 text-sm font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-800 focus:ring-2 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    <span style={{width:"30px"}}>인출 (7일 소요)</span>
                </button>
                </div>
                :
                poolInfos[id].unstakingOption === 1 ?
                <button onClick={requestWithdrawal} style={{width:"100%"}} type="submit" class="py-2.5 px-3 text-sm font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-800 focus:ring-2 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                  <span style={{width:"30px"}}>인출하기</span>
                </button>
                :
                <button onClick={requestWithdrawal} style={{width:"100%"}} type="submit" class="py-2.5 px-3 text-sm font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-800 focus:ring-2 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    <span style={{width:"30px"}}>인출 (7일 소요)</span>
                </button>
              }
              </div>

            </div>
          </div>
          </div>


          <div style={{marginTop:"30px"}}></div>
          <div class="block p-6 border border-gray-200 rounded-lg dark:hover:bg-gray-700">
            <h5 class="mb-2 text-1xl font-medium tracking-tight text-black dark:text-white">풀 상세정보</h5>
            <div class="mt-6 border-t border-gray-100">
              <dl class="divide-y divide-gray-100">
                <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt class="text-sm font-medium leading-6 text-gray-900">이름</dt>
                  <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                    {poolInfos[id].poolName}
                  </dd>
                </div>
                <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt class="text-sm font-medium leading-6 text-gray-900">타입</dt>
                  <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  {poolInfos[id].poolType}
                  </dd>
                </div>
                <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt class="text-sm font-medium leading-6 text-gray-900">상태</dt>
                  <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                    풀 규모 : {TransScale(detailAsset.tvlKRW)}
                  </dd>
                  <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-1 sm:mt-0"></dd>
                  <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                    예치된 토큰 : {Number(detailAsset.tvlToken.toFixed(0)).toLocaleString()} {poolInfos[id].poolToken}
                  </dd>
                  <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-1 sm:mt-0"></dd>
                  <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                    연 수익율 : {detailAsset.apr.toFixed(2)} %
                  </dd>
                </div>
                <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt class="text-sm font-medium leading-6 text-gray-900">정보</dt>
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

function TransScale(props) {

  // console.log("props",props)

  return (
    <>
      {props > 100000000 ?
        " " + (props / 100000000).toFixed(2) + " 억원"
        : props >  10000 ?
        " " + (props / 10000).toFixed(2) + " 만원"
        :
        " " + props
      }
    </>
  )

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


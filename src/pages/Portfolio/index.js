import 'App.css'; 
import {Link} from "react-router-dom"
import styled from "styled-components";
import WalletTokenDetailTable from "pages/Portfolio/WalletTokenDetailTable.js"
import Sidenav from "component/sideNav"
import React, {useEffect, useState} from "react";
import { useDispatch , useSelector } from 'react-redux';
import {connect} from 'redux/reducers/WalletActions'
import { getAddress, disconnect } from "redux/reducers/WalletActions";


function Portfolio() {

  // 화면이 로딩 되었을때, 월렛이 로딩되어 있는지 확인한다. 
  // > 월렛이 로딩되어 있는게 없다면, connect wallet 화면이 뜨도록 한다.
  // > 월렛이 로딩되어 있는게 있다면, 해당 주소로 자산을 불러온다.

  const [isAssetLoaded, setIsAssetLoaded] = useState(false)
  
  const [assetInfo, setAssetInfo] = useState({
    totalValue : 0,
    token : {
      totalValue : 0,
      tokenList: [{
        symbol: "KLAY",
        price: 12,
        balance: 20,
        value: 240
    }]
    }
  })

  const userAccount = useSelector(state => state.account)


  useEffect(() => {
    if (userAccount !== "") {
      console.log("userAccount",userAccount)
      setIsAssetLoaded(true)
      // 자산 데이터를 불러온다. 
      // console.log("userAccount", userAccount)
      // Connect wallet 을 알리는 화면이 나오도록 한다.
      // dispatch(getAddress());      
    } else {
      setIsAssetLoaded(false)
      // 해당 주소의 자산을 불러온다.

    }
  }, [userAccount]);

  async function getPortfolio () {

  }

  return (
    <>
      <Sidenav />
      <div class="p-4 sm:ml-64" style={{backgroundColor:"rgba(0,0,0,.02)"}}>
        <div class="p-4 mt-10">
          <OverBox>
            <div style={{paddingTop:"20px"}}/>
            <Wrappertitle>
                  <Title>Dashboard
                  </Title>
              </Wrappertitle>

              <div style={{paddingTop:"20px"}}/>

              {!isAssetLoaded ? 
              <>
              <TopCover>
              <div class="grid mb-6 lg:mb-16 md:grid-cols-2">
                <SubTemplateBlockVertical>
                    <h5 class="mb-2 text-1xl font-bold tracking-tight text-gray-900 dark:text-white">KLAY</h5>
                    <div style={{fontSize:"15px"}}> 내 KLAY : 221 개 (32,213원) - 평균 수익율 9% </div>
                    <div class="mb-1 mt-5 text-base font-medium text-blue-700 dark:text-blue-500" style={{fontSize:"14px"}}>투자된 비율 (45%)</div>
                    <div class="w-20 bg-gray-200 rounded-full h-2.5 mb-4 dark:bg-gray-700">
                      <div class="bg-blue-600 h-2.5 rounded-full" style={{width:"45%"}}></div>
                    </div>
                  
                    <br/>
                    <div style={{fontSize:"15px"}}> KLAY 채굴, 빌려주기</div>
                    <div style={{fontSize:"15px"}}> - 투자 가능한 풀 숫자 : 21 개</div>
                    <div style={{fontSize:"15px"}}> - 수익율 분포 : 9 ~ 23 % </div>
                    {/* <div class="mb-1 mt-5 text-base font-medium text-blue-700 dark:text-blue-500" style={{fontSize:"14px"}}>Connect Wallet</div> */}
                </SubTemplateBlockVertical>
                <SubTemplateBlockVertical>
                    <h5 class="mb-2 text-1xl font-bold tracking-tight text-gray-900 dark:text-white">USDT </h5>
                    <div style={{fontSize:"15px"}}> 내 KLAY : 221 개 (211 Dollar)  </div>
                    <div style={{fontSize:"15px"}}> 투자된 KLAY : 23 % </div>
                    <div style={{fontSize:"15px"}}> 현재 수익율 평균 : 8 % </div>
                    <br/>

                    <div style={{fontSize:"15px"}}> 투자 가능한 풀 숫자 : 21 개</div>
                    <div style={{fontSize:"15px"}}>  </div>
                    <div style={{fontSize:"15px"}}> 수익율 분포 : 9 ~ 23 % </div>
                    {/* <div class="mb-1 mt-5 text-base font-medium text-blue-700 dark:text-blue-500" style={{fontSize:"14px"}}>Connect Wallet</div> */}
                </SubTemplateBlockVertical>
              </div>
              </TopCover>
              <div style={{height:"20vh"}}></div>
            </>
            :
            <>
              <SubTemplateBlockVertical>
                  <h5 class="mb-2 text-1xl font-bold tracking-tight text-gray-900 dark:text-white">Total Value</h5>
                  <div style={{fontSize:"24px"}}>$ {assetInfo.totalValue} </div>
                  <div class="mb-1 mt-5 text-base font-medium text-blue-700 dark:text-blue-500" style={{fontSize:"14px"}}>Token (45%)</div>
                  <div class="w-full bg-gray-200 rounded-full h-2.5 mb-4 dark:bg-gray-700">
                    <div class="bg-blue-600 h-2.5 rounded-full" style={{width:"45%"}}></div>
                  </div>
              </SubTemplateBlockVertical>
              <WalletTokenDetailTable data={assetInfo} />
            </>
            }
          
          </OverBox>
        </div>
      </div>
    </>
  );
}



const Title = styled.h1`
  font-weight: 600;
  font-size: 20px;
`

const Wrappertitle = styled.div`
  margin: 0px auto 10px auto;
  width: 80%;
  @media screen and (max-width: 950px){
    width: 100%;
    padding-top: 20px;
    color: black;
  }
  @media screen and (max-width: 500px){
    width: 100%;
    padding-top: 20px;
    color: gray;
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


const TopCover = styled.div`
     margin: 10px auto;
    width: 80%;
`

const SubTemplateBlockVertical = styled.div`
     /* width: 900px; */
     /* max-width: 500px; */
    /* margin: 10px auto; */
    width: 95%;
    /* width: 1136px; */
    padding-bottom: 10px;
    position: relative; /* 추후 박스 하단에 추가 버튼을 위치시키기 위한 설정 */
    padding:15px;
    display:flex;
    flex-direction:column;

    padding: 20px 25px !important;
    background: #fff;

    color: rgba(0, 0, 0, 0.87);
    transition: box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    min-width: 0px;
    overflow-wrap: break-word;
    background-color: rgb(255, 255, 255);
    background-clip: border-box;
    border: 1px solid rgba(0, 0, 0, 0.125);
    border-radius: 0.75rem;
    box-shadow: rgb(0 0 0 / 10%) 0rem 0.25rem 0.375rem -0.0625rem, rgb(0 0 0 / 6%) 0rem 0.125rem 0.25rem -0.0625rem;
    overflow: visible;
    
  @media screen and (max-width: 500px){
      width: 100%;
      /* margin: 10px 10px; */
      font-size: 12px;
    }
`;



export default Portfolio;


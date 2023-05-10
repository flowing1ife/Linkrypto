import hashed from 'assets/ci/hashed.png'
import 'App.css'; 
import {Link} from "react-router-dom"
import styled from "styled-components";
import WalletTokenDetailTable from "pages/Portfolio/WalletTokenDetailTable.js"
import React from "react";
import icons from "assets/tokenIcons"
import stakingData from "./data/stakeList.json"
import Sidenav from "component/sideNav"


function Staking() {
  
  const [showModal, setShowModal] = React.useState(false);
  const [showStakeModal, setShowStakeModal] = React.useState(false);
  const [poolindex, setPoolindex] = React.useState(0);

  function manageHandler (param,e) {
    setShowStakeModal(true)
    setPoolindex(param)
  }

  return (
    <>
      <Sidenav />
      <div class="p-4 sm:ml-64" style={{backgroundColor:"rgba(0,0,0,.02)"}}>

        <div class="p-4 mt-10">
          <OverBox>
          <div style={{paddingTop:"30px"}}/>
              <Wrappertitle>
                  <Title>Staking
                  </Title>
              </Wrappertitle>

              <div style={{paddingTop:"20px"}}/>

              <SubTemplateBlockVertical>
                  <h5 class="mb-2 text-1xl font-bold tracking-tight text-gray-900 dark:text-white">KLAY 보유현황</h5>
                  <div style={{ fontSize: "24px" }}>132,321 ($21,222) </div>
                  <div class="mb-1 mt-5 text-base font-medium text-blue-700 dark:text-blue-500" style={{fontSize:"14px"}}>Staked (85%)</div>
                  <div class="w-full bg-gray-200 rounded-full h-2.5 mb-4 dark:bg-gray-700">
                    <div class="bg-blue-600 h-2.5 rounded-full" style={{width:"85%"}}></div>
                  </div>
                  <div class="mb-1 mt-5 text-base font-medium text-blue-700 dark:text-blue-500" style={{fontSize:"14px"}}>klaystation (25%)</div>
                  <div class="w-full bg-gray-200 rounded-full h-2.5 mb-4 dark:bg-gray-700">
                    <div class="bg-blue-600 h-2.5 rounded-full" style={{width:"25%"}}></div>
                  </div>
              </SubTemplateBlockVertical>
          </OverBox>
        </div>
        
        <div class="p-4 mt-0">

          <div>
              {/* <div class="p-5 h-screen"> */}
              {/* <h1 class="text-xl mb-2">Your orders</h1> */}
              <SubTemplateBlockVertical>
              <h5 class="mb-5 text-1xl font-bold tracking-tight text-gray-900 dark:text-white">
                Staking List
              </h5>
              <div class="overflow-auto rounded-lg shadow hidden md:block">
                <table class="w-full">
                  <thead class="bg-gray-50 border-b-2 border-gray-200">
                  <tr>
                    <th class="p-3 w-20 text-sm font-semibold tracking-wide text-left">Protocol</th>
                    <th class="w-20 p-3 text-sm font-semibold tracking-wide text-left">Name</th>
                    <th class="w-24 p-3 text-sm font-semibold tracking-wide text-left">Type</th>
                    <th class="w-32 p-3 text-sm font-semibold tracking-wide text-left">liq token</th>
                    <th class="w-24 p-3 text-sm font-semibold tracking-wide text-left">TVL</th>
                    <th class="w-32 p-3 text-sm font-semibold tracking-wide text-left">APR</th>
                    <th class="w-24 p-3 text-sm font-semibold tracking-wide text-left">My</th>
                    <th class="w-32 p-3 text-sm font-semibold tracking-wide text-left">Action</th>
                  </tr>
                  </thead>
                  <tbody class="divide-y divide-gray-100">
                  {stakingData.map((res,index)=>
                  <tr class="bg-white">
                    <td class="p-3 text-sm text-gray-700 whitespace-nowrap">
                      {res.protocol}
                    </td>
                    <td class="p-3 text-sm text-gray-700 whitespace-nowrap">
                      {res.poolName}
                    </td>
                    <td class="p-3 text-sm text-gray-700 whitespace-nowrap">{res.poolType}</td>
                    <td class="p-3 text-sm text-gray-700 whitespace-nowrap">{res.liqToken}</td>                    
                    <td class="p-3 text-sm text-gray-700 whitespace-nowrap">{res.poolTVL}</td>
                    <td class="p-3 text-sm text-gray-700 whitespace-nowrap">{res.poolAPR}</td>
                    <td class="p-3 text-sm text-gray-700 whitespace-nowrap">
                    {res.stakingAmount}
                    </td>
                    <td class="p-3 text-sm text-gray-700 whitespace-nowrap">
                      <button onClick={(e) => manageHandler(index, e)} type="button" data-modal-target="stake-modal" data-modal-toggle="stake-modal" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">
                        Manage
                      </button>
                    </td>
                  </tr>
                  )}
                  </tbody>
                </table>
              </div>
          
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 md:hidden">
                <div class="bg-white space-y-3 p-4 rounded-lg shadow">
                  <div class="flex items-center space-x-2 text-sm">
                    <div>
                        Staking : 311,222 ($ 12,321)
                    </div>
                  </div>
                  <div class="text-sm text-gray-700">
                      Node : Hashed (klaystation)
                  </div>
                  <div class="text-sm font-medium text-black">
                      Type : Staking
                  </div>
                  <div class="text-sm font-medium text-black">
                      Liq Token : sKLAY
                  </div>
                  <div class="text-sm font-medium text-black">
                      TVL : $ 123,222
                  </div>
                  <div class="text-sm font-medium text-black">
                      APR : 5.2 %
                  </div>
                  <div>
                    <button onClick={(index) => manageHandler(index)} type="button" data-modal-target="stake-modal" data-modal-toggle="stake-modal" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">
                      Manage                      
                    </button>
                </div>
                </div>

              </div>
              </SubTemplateBlockVertical>
            </div>
      </div>
      </div>
      {/* <WalletTokenDetailTable /> */}

    </>
  );
}


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



const SubTemplateBlockVertical = styled.div`
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

export default Staking;


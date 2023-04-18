import React,{useState, useContext, useEffect} from "react";
import styled from 'styled-components';
import icons from "assets/tokenIcons"


const WalletTokenDetailTable = () => {

    const assetState = {
        isWallet : true,
        totalValue : 1,
        token : {
          totalValue : 0,
          tokenList : [{
              symbol: "KLAY",
              price: 12,
              balance: 20,
              value: 240
          }],
          smallTokenList : [{
            symbol: "KLAY",
            price: 12,
            balance: 20,
            value: 240
         }]
        },
        klayswap : {
          totalValue : 1,
          vKSP : 200,
          stakedKSP : {
              balance : 1,
              price : 0.12,
              value : 2,
              unlockedDate : "2011-20-11"
          },
          pairPool : [{
                pairList : ["KLAY", "LAY"],
                balance : [32,11],
                value : 23.1
            }],
          singlePool : [{
                pairToken : "KLAY",
                balance : 231,
                price : 2,
                value : 23.1
            }],
          plusPool : [{
                pairList : ["KLAY", "LAY"],
                supply : [32,11],
                borrow : [2,1],
                debtRatio : 21,
                value : 0
            }]
          }
        }

    return (
        <>
            <SubTemplateBlockVertical style={{marginTop:"20px"}}>
                <div style={{ fontSize: "14px", color: "#657795" }}>
                    <h5 class="mb-1 text-xl font-medium text-gray-500 dark:text-white">
                        Tokens
                        <span style={{float:"right", fontSize:"16px", marginRight:"5px"}}>$ {assetState.token.totalValue.toLocaleString(1)}</span>
                    </h5>
                    <span style={{ fontSize: "12px" }}>
                    </span>
                </div>

                <Table>
                    <Thead>
                        <Th>Asset</Th>
                        <Thr>Token Price ($)</Thr>
                        <Thrr>Value ($)</Thrr>
                    </Thead>
                    <tbody>
                    {assetState.token.tokenList.map((token) => (
                        <Tr>
                            <Td>
                            <div class="flex items-center space-x-4">
                                <img class="w-10 h-10 rounded-full" src={icons["KLAY"]} alt=""/>
                                <div class="font-medium dark:text-white">
                                    <div>Klay</div>
                                    <div class="text-sm text-gray-500 dark:text-gray-400">{token.balance.toFixed(3)}</div>
                                </div>
                            </div>
                            </Td>
                            <Tdr>{token.price.toFixed(3)}</Tdr>
                            <Tdrr>{(token.price * token.balance).toFixed(3)}</Tdrr>
                        </Tr>
                    ))}
                    </tbody>                    
                </Table>                
            </SubTemplateBlockVertical>
            {
                assetState.klayswap.totalValue === 0 ?
                <></> :
                <SubTemplateBlockVertical style={{marginTop:"20px"}}>
                <div style={{ fontSize: "15px", color: "#657795" }}>
                    <h5 class="mb-1 text-xl font-medium text-gray-500 dark:text-white">
                        <div class="flex items-center" style={{justifyContent:"space-between"}}>
                            <div>
                                <img class="w-10 h-10 p-1 rounded-full ring-1 ring-gray-100 dark:ring-gray-100" src={icons["Klayswap"]} alt="logo" />
                            </div>
                            <div>
                            <span style={{float:"right", fontSize:"16px", marginRight:"5px"}}>$ {assetState.token.totalValue.toLocaleString(1)}</span>
                            </div>
                        </div>
                    </h5>
                </div>

                    {assetState.klayswap.stakedKSP.balance === 0 ?
                    <></> :
                    <>
                    <span style={{fontSize:"13px", marginTop:"15px", color:"gray"}}>Staking</span>

                    <Table>
                        <Thead>
                            <Th>Token</Th>
                            <Th>unlockedDate</Th>
                            <Thr>Balance ($)</Thr>
                            <Thrr>Value ($)</Thrr>
                        </Thead>
                        <tbody>
                            <Tr>
                                <Td>KSP</Td>
                                <Td>{assetState.klayswap.stakedKSP.UnlockedDate}</Td>
                                <Tdr>{assetState.klayswap.stakedKSP.balance}</Tdr>
                                <Tdrr>{assetState.klayswap.stakedKSP.value.toFixed(1)}</Tdrr>
                            </Tr>
                        </tbody>
                    </Table>   
                    </>
                    }

                    {assetState.klayswap.vKSP === 0 ?
                    <></>
                    :
                    <>
                    <span style={{fontSize:"13px", marginTop:"15px", color:"gray"}}>Voting Power</span>

                    <Table>
                        <Thead>
                            <Th>Token</Th>
                            <Thrr>Number</Thrr>
                        </Thead>
                        <tbody>
                            <Tr>
                                <Td>vKSP</Td>
                                <Tdrr>{assetState.klayswap.vKSP}</Tdrr>
                            </Tr>
                        </tbody>
                    </Table>  
                    </> 
                    }

                    {assetState.klayswap.singlePool.length === 0 ?
                    <></>
                    :
                    <>
                    <span style={{fontSize:"13px", marginTop:"15px", color:"gray"}}>Single Deposit</span>

                    
                    <Table>
                        <Thead>
                            <Th>Token</Th>
                            <Thr>Balance ($)</Thr>
                            <Thrr>Value ($)</Thrr>
                        </Thead>
                        <tbody>
                            {assetState.klayswap.singlePool.map((res)=>(
                            <Tr>
                                <Td>{res.depositToken}</Td>
                                <Tdr>{res.balance.toFixed(4)}</Tdr>
                                <Tdrr>{res.value.toFixed(4)}</Tdrr>
                            </Tr>
                            ))
                            }
                        </tbody>
                    </Table>       
                    </>
                    }        

                {assetState.klayswap.pairPool.length === 0 ?
                    <></>
                    :
                    <>
                <span style={{fontSize:"13px", marginTop:"15px", color:"gray"}}>Pair Deposit</span>

                <Table>
                    <Thead>
                        <Th>Pool</Th>
                        <Thr>Balance</Thr>
                        <Thrr>Value ($)</Thrr>
                    </Thead>
                    <tbody>
                    {assetState.klayswap.pairPool.map((res)=>(
                        <Tr>
                            <Td>
                                <Imgs src={icons[res.pairList[0]]} alt="logo" height="18px" width="18px" style={{ padding: "1px", verticalAlign: "middle", borderRadius: "15px" }} />
                                <Imgs src={icons[res.pairList[1]]} alt="logo" height="18px" width="18px" style={{ padding: "1px", verticalAlign: "middle", borderRadius: "15px" }} />
                            </Td>
                            <Tdr>
                                {res.balance[0]} {res.pairList[0]} + {res.balance[1]} {res.pairList[1]}
                            </Tdr>
                            <Tdrr>25</Tdrr>
                        </Tr>
                    ))}
                    </tbody>
                </Table>    
                </>            
                }

             <span style={{fontSize:"13px", marginTop:"15px", color:"gray"}}>Plus Deposit</span>

                <Table>
                    <Thead>
                        <Th>Pool</Th>
                        <Thr>Balance ($)</Thr>
                        <Thrr>Value ($)</Thrr>
                    </Thead>
                    <tbody>
                        <Tr>
                            <Td>Klay</Td>
                            <Tdr>23</Tdr>
                            <Tdrr>0.3</Tdrr>
                        </Tr>
                    </tbody>
                </Table>      



            </SubTemplateBlockVertical>
        }

        </>
    )
}

const Imgs = styled.img`
  width: 20px;
  height: 20px;
  border: 0.5px solid #eaeaea;
  border-radius:50%;
`


const Tr = styled.tr`
    height: 45px;
    background: #fff;
`

const Td = styled.td`
    color: #050f19;
    padding: 12px 29px!important;
    font-size: 12px;
    font-weight: 400;
    line-height: normal;
    text-align: left;
    border-bottom: 1px solid #edeff1 !important;
    @media screen and (max-width: 500px){
        padding: 10px 10px!important;
    }
`

const Tdrr = styled.td`
    color: #050f19;
    padding: 12px 29px!important;
    font-size: 14px;
    font-weight: 500;
    line-height: normal;
    text-align: right;
    border-bottom: 1px solid #edeff1 !important;
`

const Tdr = styled.td`
    color: #050f19;
    /* padding: 12px 29px!important; */
    font-size: 14px;
    font-weight: 500;
    line-height: normal;
    text-align: right;
    padding-right: 70px;
    border-bottom: 1px solid #edeff1 !important;
    @media screen and (max-width: 500px){
        display: none;
    }
`


const Thr = styled.th`
    cursor: auto;
    background: #f9fafb;
    text-align: inherit;
    color: rgba(0,0,0,.87);
    padding-right: 70px;
    font-style: none;
    font-weight: 700;
    text-transform: none;
    border-bottom: 1px solid rgba(34,36,38,.1);
    border-left: none;
    text-align:right;

    @media screen and (max-width: 500px){
        display: none;
    }
`

const Th = styled.th`
    cursor: auto;
    background: #f9fafb;
    text-align: inherit;
    color: rgba(0,0,0,.87);
    padding: 12px 29px!important;
    font-style: none;
    font-weight: 700;
    text-transform: none;
    border-bottom: 1px solid rgba(34,36,38,.1);
    border-left: none;
    @media screen and (max-width: 500px){
        padding: 10px 10px!important;
    }
`


const Thrr = styled.th`
    cursor: auto;
    background: #f9fafb;
    text-align: right;
    color: rgba(0,0,0,.87);
    padding: 12px 29px!important;
    font-style: none;
    font-weight: 700;
    text-transform: none;
    border-bottom: 1px solid rgba(34,36,38,.1);
    border-left: none;
`

const Thead = styled.thead`
    color: #657795!important;
    padding: 12px 29px!important;
    font-size: 15px;
    background: transparent!important;
    font-style: normal;
    font-weight: 600;
    text-transform: uppercase!important;
`

const Table = styled.table`
    width: 100%;
    background: #fff;
    margin: 1em 0;
    /* border: 1px solid rgba(34,36,38,.15); */
    -webkit-box-shadow: none;
    box-shadow: none;
    border-radius: 0.28571429rem;
    color: rgba(0,0,0,.87);
    border-collapse: separate;
    border-spacing: 0;
    
        
  @media screen and (max-width: 500px){
      width: 310px;
      font-size: 20px;
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
      width: 360px;
      /* margin: 10px 10px; */
      font-size: 15px;
    }
`;

export default WalletTokenDetailTable;
import 'App.css'; 
import React, {useEffect} from "react";
import icons from "assets/tokenIcons"
import { ethers } from "ethers";
import { useDispatch , useSelector } from 'react-redux';
import {connectMetamask, connectKaikas, getAddress, disconnect, walletConnectModalOpen, walletConnectModalClose } from 'redux/reducers/WalletActions'

function Topnav () {

  const dispatch = useDispatch();

  const conMetamask = () => {
    dispatch(connectMetamask())
  }

  const klayButton = () => {
    // dispatch(connect())
    dispatch(walletConnectModalOpen())
    // dispatch(walletConnectModalClose())
    // console.log("userAccount", userAccount)
    console.log("walletConnectModal", walletConnectModal)
  }

  const connectKaikas12 = () => {
    dispatch(connectKaikas())
  }

  const userAccount = useSelector(state => state.account)
  const walletConnectModal = useSelector(state => state.walletConnect)

  useEffect(()=>{

    console.log("walletConnectModal",walletConnectModal)

    // address, wallet
    const lastWallet = localStorage.getItem("wallet");
    const lastAddress = localStorage.getItem("address");
    // console.log("lastWallet",lastWallet)
    // console.log("lastAddress",lastAddress)

    if(lastWallet === "metamask"){
        // dispatch(getAddress());
        dispatch(connectMetamask())
    } else if (lastWallet === "kaikas"){
        console.log("kaikas")
    }
    // const currentFont = localStorage.getItem("font");
    // console.log("userAccount",userAccount)
    // if(userAccount === ""){
    //     setShowModal(true)
    // }
  })

  const [showModal, setShowModal] = React.useState(false);
  const [showManageModal, setShowManageModal] = React.useState(false);

  const [accountinfo, setAccountinfo] = React.useState("")
  const [tempAccountInfo, setTempAccountInfo] = React.useState("")
  const [walletInfo, setWalletInfo] = React.useState("")

  const walletDisconnect = async () => {
    setWalletInfo("")
    setAccountinfo("")
    // localStorage.setItem("address", "")
    // localStorage.setItem("wallet", "")
    setShowManageModal(false)
  }

  const accountUpdate = async () => {
    console.log("clicked")
    setAccountinfo(tempAccountInfo)
    setWalletInfo("noConnect")
    localStorage.setItem("address", tempAccountInfo)
    localStorage.setItem("wallet", "noConnect")
    setShowModal(false)
  }

  const accountHandler = (e) => {
    //   console.log(e.target.value)
    setTempAccountInfo(e.target.value)
  }

  


  const connectMetamask1 = async () => {
    try {

        const provider = await new ethers.BrowserProvider(window.ethereum)
        console.log("provider", provider)
        const account = await provider.send("eth_requestAccounts", []); // 이게 있어야 연동이 된다.
        console.log("account",account) // account[0]에 유저의 주소가 나타난다.


        setAccountinfo(account[0])
        setWalletInfo("metamask")
        localStorage.setItem("address", account[0])
        localStorage.setItem("wallet", "metamask")
        setShowModal(false)
        setShowManageModal(false)

        // const network = await provider.getNetwork()
        // console.log("network",network)
        // const blockNumber = await provider.getBlockNumber()
        // console.log("blockNumber", blockNumber)
        // const balance = await provider.getBalance("devrick.eth")
        // formatEther(balance)
        // '0.182334002436162568'
        // console.log("balance", balance)

        // const trxCount = await provider.getTransactionCount("devrick.eth")
        // console.log("trxCount", trxCount)
        // const getNetwork = await provider.getNetwork()
        // console.log("getNetwork", getNetwork)

        // const changeNetwork = await provider.request( {
        //     "method":'wallet_switchEthereumChain', 
        //     "params": [{"chainId": '0x'+ (8217).toString(16)}]
        //  })

        //  console.log("changeNetwork",changeNetwork)

        // chain Id : 8217n (klaytn.cypress), 1n (ethereum. mainnet), 42161n(arbitrum.one)
        // 메타마스크 체인 상태 확인하기

        // When sending a transaction, the value is in wei, so parseEther
        // converts ether to wei.
        // tx = await signer.sendTransaction({
        //     to: "ethers.eth",
        //     value: parseEther("1.0")
        // });
        
        // Often you may wish to wait until the transaction is mined
        // receipt = await tx.wait();

    } catch {

    }
  }

  const connectKaikas1 = async () => {
    const { klaytn } = window
    console.log("klaytn", klaytn)
    if (klaytn) {
        try {
            await klaytn.enable()
            klaytn.on('accountsChanged', () => console.log("account changed"))
            setAccountinfo(klaytn.selectedAddress)
            setWalletInfo("kaikas")
            localStorage.setItem("address", klaytn.selectedAddress)
            localStorage.setItem("wallet", "kaikas")
            setShowModal(false)
            setShowManageModal(false)
        } catch (error) {
            console.log(error)
        }
    } else {
        console.log('Non-Kaikas browser detected. You should consider trying Kaikas!')
    }
  }

    // const getBalances = async () => {

    //     const address = "0xd068c52d81f4409b9502da926ace3301cc41f623"
        
    //     const kip7 = new (window.caver.klay.Contract)([{
    //         "constant": true,
    //         "inputs": [
    //           {
	// 			"name": "account",
	// 			"type": "address"
    //           }
    //         ],
    //         "name": "balanceOf",
    //         "outputs": [
    //           {
	// 			"name": "",
	// 			"type": "uint256"
    //           }
    //         ],
    //         "payable": false,
    //         "stateMutability": "view",
    //         "type": "function"
    //       }],address);

    //       const balance = await kip7.methods.balanceOf("0xc847D70D3Ceb7E543e7ede2aD0AC596E2fFbcEC8").call()
    //       console.log("balance", balance)
    //      return balance

    // }

    const getBalances = async () => {

        const data = window.caver.klay.abi.encodeFunctionCall(
            {
              name: 'stakeKlay',
              type: 'function',
              inputs: [
                {
                  "name": "walletAddress",
                  "type": "address"
                }
              ]
            },
            [
              "0xc847D70D3Ceb7E543e7ede2aD0AC596E2fFbcEC8"
            ]
          )
          window.caver.klay
          .sendTransaction({
            type: 'SMART_CONTRACT_EXECUTION',
            from: "0xc847D70D3Ceb7E543e7ede2aD0AC596E2fFbcEC8",
            to: "0xe33337cb6fbb68954fe1c3fde2b21f56586632cd",
            data,
            value: window.caver.utils.toPeb('5', 'KLAY'),
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
      }

      const getKlaystationBalance = async () => {

        dispatch(disconnect());

        // const address = "0xd068c52d81f4409b9502da926ace3301cc41f623"
        
        // const kip7 = new (window.caver.klay.Contract)([{
        //     "constant": true,
        //     "inputs": [
        //         {
        //             "name": "account",
        //             "type": "address"
        //         }
        //     ],
        //     "name": "getUserStat",
        //     "outputs": [
        //         {
        //             "name": "",
        //             "type": "uint256"
        //         }
        //     ],
        //     "payable": false,
        //     "stateMutability": "view",
        //     "type": "function"
        // }],"0xe33337cb6fbb68954fe1c3fde2b21f56586632cd");

        // const balance = await kip7.methods.getUserStat("0xc847D70D3Ceb7E543e7ede2aD0AC596E2fFbcEC8").call()
        // console.log("balance", Number(balance)/1e+18)

        // return balance

    }

  return (
    <>
      <nav class="fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
        <div class="px-3 py-3 lg:px-5 lg:pl-3">
          <div class="flex items-center justify-between">

            <div class="flex items-center justify-start">
                <button data-drawer-target="logo-sidebar" data-drawer-toggle="logo-sidebar" aria-controls="logo-sidebar" type="button" class="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
                    <span class="sr-only">Open sidebar</span>
                    <svg class="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path clip-rule="evenodd" fill-rule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
                    </svg>
                </button>
                <span class="flex ml-2 md:mr-24 self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white">Linkrypto</span>
            </div>

            <div class="flex items-center">
                <div class="flex items-center ml-3">
                  <div>
                    {userAccount}
                  <button onClick={klayButton} type="button" data-modal-target="crypto-modal" data-modal-toggle="crypto-modal" class="text-gray-900 ml-1 bg-white hover:bg-gray-100 border border-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-600 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700">
                      <img class="w-4 h-4 rounded-full" src={icons["KLAY"]} alt=""/>
                  </button>
                    
                  {accountinfo === "" ?
                  <button onClick={() => setShowModal(true)} type="button" data-modal-target="crypto-modal" data-modal-toggle="crypto-modal" class="text-white ml-1 bg-primary-700 hover:bg-gray-100 border border-gray-200 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center">
                    <svg aria-hidden="true" class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"></path></svg>
                    Connect wallet 
                  </button>
                  :
                  <button onClick={() => setShowManageModal(true)} type="button" data-modal-target="crypto-modal" data-modal-toggle="crypto-modal" class="text-white ml-1 bg-primary-700 hover:bg-gray-100 border border-gray-200 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center">
                      
                      {walletInfo === "metamask" ?
                            <svg aria-hidden="true" class="h-4" viewBox="0 0 40 38" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M39.0728 0L21.9092 12.6999L25.1009 5.21543L39.0728 0Z" fill="#E17726"/><path d="M0.966797 0.0151367L14.9013 5.21656L17.932 12.7992L0.966797 0.0151367Z" fill="#E27625"/><path d="M32.1656 27.0093L39.7516 27.1537L37.1004 36.1603L27.8438 33.6116L32.1656 27.0093Z" fill="#E27625"/><path d="M7.83409 27.0093L12.1399 33.6116L2.89876 36.1604L0.263672 27.1537L7.83409 27.0093Z" fill="#E27625"/><path d="M17.5203 10.8677L17.8304 20.8807L8.55371 20.4587L11.1924 16.4778L11.2258 16.4394L17.5203 10.8677Z" fill="#E27625"/><path d="M22.3831 10.7559L28.7737 16.4397L28.8067 16.4778L31.4455 20.4586L22.1709 20.8806L22.3831 10.7559Z" fill="#E27625"/><path d="M12.4115 27.0381L17.4768 30.9848L11.5928 33.8257L12.4115 27.0381Z" fill="#E27625"/><path d="M27.5893 27.0376L28.391 33.8258L22.5234 30.9847L27.5893 27.0376Z" fill="#E27625"/><path d="M22.6523 30.6128L28.6066 33.4959L23.0679 36.1282L23.1255 34.3884L22.6523 30.6128Z" fill="#D5BFB2"/><path d="M17.3458 30.6143L16.8913 34.3601L16.9286 36.1263L11.377 33.4961L17.3458 30.6143Z" fill="#D5BFB2"/><path d="M15.6263 22.1875L17.1822 25.4575L11.8848 23.9057L15.6263 22.1875Z" fill="#233447"/><path d="M24.3739 22.1875L28.133 23.9053L22.8184 25.4567L24.3739 22.1875Z" fill="#233447"/><path d="M12.8169 27.0049L11.9606 34.0423L7.37109 27.1587L12.8169 27.0049Z" fill="#CC6228"/><path d="M27.1836 27.0049L32.6296 27.1587L28.0228 34.0425L27.1836 27.0049Z" fill="#CC6228"/><path d="M31.5799 20.0605L27.6165 24.0998L24.5608 22.7034L23.0978 25.779L22.1387 20.4901L31.5799 20.0605Z" fill="#CC6228"/><path d="M8.41797 20.0605L17.8608 20.4902L16.9017 25.779L15.4384 22.7038L12.3988 24.0999L8.41797 20.0605Z" fill="#CC6228"/><path d="M8.15039 19.2314L12.6345 23.7816L12.7899 28.2736L8.15039 19.2314Z" fill="#E27525"/><path d="M31.8538 19.2236L27.2061 28.2819L27.381 23.7819L31.8538 19.2236Z" fill="#E27525"/><path d="M17.6412 19.5088L17.8217 20.6447L18.2676 23.4745L17.9809 32.166L16.6254 25.1841L16.625 25.1119L17.6412 19.5088Z" fill="#E27525"/><path d="M22.3562 19.4932L23.3751 25.1119L23.3747 25.1841L22.0158 32.1835L21.962 30.4328L21.75 23.4231L22.3562 19.4932Z" fill="#E27525"/><path d="M27.7797 23.6011L27.628 27.5039L22.8977 31.1894L21.9414 30.5138L23.0133 24.9926L27.7797 23.6011Z" fill="#F5841F"/><path d="M12.2373 23.6011L16.9873 24.9926L18.0591 30.5137L17.1029 31.1893L12.3723 27.5035L12.2373 23.6011Z" fill="#F5841F"/><path d="M10.4717 32.6338L16.5236 35.5013L16.4979 34.2768L17.0043 33.8323H22.994L23.5187 34.2753L23.48 35.4989L29.4935 32.641L26.5673 35.0591L23.0289 37.4894H16.9558L13.4197 35.0492L10.4717 32.6338Z" fill="#C0AC9D"/><path d="M22.2191 30.231L23.0748 30.8354L23.5763 34.8361L22.8506 34.2234H17.1513L16.4395 34.8485L16.9244 30.8357L17.7804 30.231H22.2191Z" fill="#161616"/><path d="M37.9395 0.351562L39.9998 6.53242L38.7131 12.7819L39.6293 13.4887L38.3895 14.4346L39.3213 15.1542L38.0875 16.2779L38.8449 16.8264L36.8347 19.1742L28.5894 16.7735L28.5179 16.7352L22.5762 11.723L37.9395 0.351562Z" fill="#763E1A"/><path d="M2.06031 0.351562L17.4237 11.723L11.4819 16.7352L11.4105 16.7735L3.16512 19.1742L1.15488 16.8264L1.91176 16.2783L0.678517 15.1542L1.60852 14.4354L0.350209 13.4868L1.30098 12.7795L0 6.53265L2.06031 0.351562Z" fill="#763E1A"/><path d="M28.1861 16.2485L36.9226 18.7921L39.7609 27.5398L32.2728 27.5398L27.1133 27.6049L30.8655 20.2912L28.1861 16.2485Z" fill="#F5841F"/><path d="M11.8139 16.2485L9.13399 20.2912L12.8867 27.6049L7.72971 27.5398H0.254883L3.07728 18.7922L11.8139 16.2485Z" fill="#F5841F"/><path d="M25.5283 5.17383L23.0847 11.7736L22.5661 20.6894L22.3677 23.4839L22.352 30.6225H17.6471L17.6318 23.4973L17.4327 20.6869L16.9139 11.7736L14.4707 5.17383H25.5283Z" fill="#F5841F"/></svg>
                          : walletInfo === "kaikas" ?                           
                            <svg width="22" height="20" viewBox="0 0 84 78" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                          <g clip-path="url(#clip0_18_550)">
                          <path d="M62.2792 39.2422L57.2156 49.2888C54.6738 54.3322 49.5099 57.517 43.8737 57.517H10.1773C4.57122 57.4969 0 62.0883 0 67.6742C0 73.2601 4.57122 77.8514 10.1773 77.8514H78.9264C82.9953 77.8514 85.4065 73.3003 83.1159 69.9347L62.2892 39.2422H62.2792Z" fill="#99B3FF"/>
                          <path d="M73.8127 0H15.3513C6.87191 0 0 6.87191 0 15.3513V67.6742C0 62.0883 4.57122 57.497 10.1773 57.497H43.8837C49.5199 57.497 54.6839 54.3122 57.2257 49.2687L78.3337 7.33405C80.0316 3.96843 77.5902 0 73.8127 0Z" fill="#3366FF"/>
                          <path d="M45.5115 31.6168C48.9273 31.6168 51.7002 29.4567 51.7002 26.7843C51.7002 24.1119 48.9273 21.9519 45.5115 21.9519C42.0956 21.9519 39.3228 24.1119 39.3228 26.7843C39.3228 29.4567 42.0956 31.6168 45.5115 31.6168Z" fill="#DAFF86"/>
                          </g>
                          <defs>
                          <clipPath id="clip0_18_550">
                          <rect width="84" height="77.8514" fill="white"/>
                          </clipPath>
                          </defs>
                      </svg> 
                           : 
                           <svg aria-hidden="true" class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"></path></svg>
                        }                         
                      
                      <span style={{marginLeft:"10px"}}>{accountinfo.slice(0,5)}...{accountinfo.slice(accountinfo.length-4,accountinfo.length)}</span>
                  </button>
                  }

                  </div>                  
                </div>
              </div>
          </div>
        </div>
      </nav>

      
      {walletConnectModal ? (
            <>
            <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                <div className="relative w-full max-w-md max-h-full">
                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                    
                    <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                    <h3 className="text-2xl font-semibold">
                        지갑연결
                    </h3>
                    <button onClick={() => dispatch(walletConnectModalClose())}>
                        <span className="bg-transparent text-black opacity-1 h-6 w-6 text-2xl block outline-none focus:outline-none">
                        ×
                        </span>
                    </button>
                    </div>
                    
                    <div class="p-6">
                    
                    <p class="text-sm font-normal text-gray-500 dark:text-gray-400">지갑을 연결하세요. (조회, 관리 가능) </p>
                        <ul class="my-4 space-y-3">
                            <li>
                                <a href="#" class="flex items-center p-3 text-base font-bold text-gray-900 rounded-lg bg-gray-50 hover:bg-gray-100 group hover:shadow dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white">
                                    <svg aria-hidden="true" class="h-4" viewBox="0 0 40 38" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M39.0728 0L21.9092 12.6999L25.1009 5.21543L39.0728 0Z" fill="#E17726"/><path d="M0.966797 0.0151367L14.9013 5.21656L17.932 12.7992L0.966797 0.0151367Z" fill="#E27625"/><path d="M32.1656 27.0093L39.7516 27.1537L37.1004 36.1603L27.8438 33.6116L32.1656 27.0093Z" fill="#E27625"/><path d="M7.83409 27.0093L12.1399 33.6116L2.89876 36.1604L0.263672 27.1537L7.83409 27.0093Z" fill="#E27625"/><path d="M17.5203 10.8677L17.8304 20.8807L8.55371 20.4587L11.1924 16.4778L11.2258 16.4394L17.5203 10.8677Z" fill="#E27625"/><path d="M22.3831 10.7559L28.7737 16.4397L28.8067 16.4778L31.4455 20.4586L22.1709 20.8806L22.3831 10.7559Z" fill="#E27625"/><path d="M12.4115 27.0381L17.4768 30.9848L11.5928 33.8257L12.4115 27.0381Z" fill="#E27625"/><path d="M27.5893 27.0376L28.391 33.8258L22.5234 30.9847L27.5893 27.0376Z" fill="#E27625"/><path d="M22.6523 30.6128L28.6066 33.4959L23.0679 36.1282L23.1255 34.3884L22.6523 30.6128Z" fill="#D5BFB2"/><path d="M17.3458 30.6143L16.8913 34.3601L16.9286 36.1263L11.377 33.4961L17.3458 30.6143Z" fill="#D5BFB2"/><path d="M15.6263 22.1875L17.1822 25.4575L11.8848 23.9057L15.6263 22.1875Z" fill="#233447"/><path d="M24.3739 22.1875L28.133 23.9053L22.8184 25.4567L24.3739 22.1875Z" fill="#233447"/><path d="M12.8169 27.0049L11.9606 34.0423L7.37109 27.1587L12.8169 27.0049Z" fill="#CC6228"/><path d="M27.1836 27.0049L32.6296 27.1587L28.0228 34.0425L27.1836 27.0049Z" fill="#CC6228"/><path d="M31.5799 20.0605L27.6165 24.0998L24.5608 22.7034L23.0978 25.779L22.1387 20.4901L31.5799 20.0605Z" fill="#CC6228"/><path d="M8.41797 20.0605L17.8608 20.4902L16.9017 25.779L15.4384 22.7038L12.3988 24.0999L8.41797 20.0605Z" fill="#CC6228"/><path d="M8.15039 19.2314L12.6345 23.7816L12.7899 28.2736L8.15039 19.2314Z" fill="#E27525"/><path d="M31.8538 19.2236L27.2061 28.2819L27.381 23.7819L31.8538 19.2236Z" fill="#E27525"/><path d="M17.6412 19.5088L17.8217 20.6447L18.2676 23.4745L17.9809 32.166L16.6254 25.1841L16.625 25.1119L17.6412 19.5088Z" fill="#E27525"/><path d="M22.3562 19.4932L23.3751 25.1119L23.3747 25.1841L22.0158 32.1835L21.962 30.4328L21.75 23.4231L22.3562 19.4932Z" fill="#E27525"/><path d="M27.7797 23.6011L27.628 27.5039L22.8977 31.1894L21.9414 30.5138L23.0133 24.9926L27.7797 23.6011Z" fill="#F5841F"/><path d="M12.2373 23.6011L16.9873 24.9926L18.0591 30.5137L17.1029 31.1893L12.3723 27.5035L12.2373 23.6011Z" fill="#F5841F"/><path d="M10.4717 32.6338L16.5236 35.5013L16.4979 34.2768L17.0043 33.8323H22.994L23.5187 34.2753L23.48 35.4989L29.4935 32.641L26.5673 35.0591L23.0289 37.4894H16.9558L13.4197 35.0492L10.4717 32.6338Z" fill="#C0AC9D"/><path d="M22.2191 30.231L23.0748 30.8354L23.5763 34.8361L22.8506 34.2234H17.1513L16.4395 34.8485L16.9244 30.8357L17.7804 30.231H22.2191Z" fill="#161616"/><path d="M37.9395 0.351562L39.9998 6.53242L38.7131 12.7819L39.6293 13.4887L38.3895 14.4346L39.3213 15.1542L38.0875 16.2779L38.8449 16.8264L36.8347 19.1742L28.5894 16.7735L28.5179 16.7352L22.5762 11.723L37.9395 0.351562Z" fill="#763E1A"/><path d="M2.06031 0.351562L17.4237 11.723L11.4819 16.7352L11.4105 16.7735L3.16512 19.1742L1.15488 16.8264L1.91176 16.2783L0.678517 15.1542L1.60852 14.4354L0.350209 13.4868L1.30098 12.7795L0 6.53265L2.06031 0.351562Z" fill="#763E1A"/><path d="M28.1861 16.2485L36.9226 18.7921L39.7609 27.5398L32.2728 27.5398L27.1133 27.6049L30.8655 20.2912L28.1861 16.2485Z" fill="#F5841F"/><path d="M11.8139 16.2485L9.13399 20.2912L12.8867 27.6049L7.72971 27.5398H0.254883L3.07728 18.7922L11.8139 16.2485Z" fill="#F5841F"/><path d="M25.5283 5.17383L23.0847 11.7736L22.5661 20.6894L22.3677 23.4839L22.352 30.6225H17.6471L17.6318 23.4973L17.4327 20.6869L16.9139 11.7736L14.4707 5.17383H25.5283Z" fill="#F5841F"/></svg>
                                    <span class="flex-1 ml-3 whitespace-nowrap" onClick={conMetamask}>MetaMask</span>
                                    {/* <span class="inline-flex items-center justify-center px-2 py-0.5 ml-3 text-xs font-medium text-gray-500 bg-gray-200 rounded dark:bg-gray-700 dark:text-gray-400">Popular</span> */}
                                </a>
                            </li>
                            <li>
                                <a href="#" class="flex items-center p-3 text-base font-bold text-gray-900 rounded-lg bg-gray-50 hover:bg-gray-100 group hover:shadow dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white">
                                <svg width="22" height="20" viewBox="0 0 84 78" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <g clip-path="url(#clip0_18_550)">
                                        <path d="M62.2792 39.2422L57.2156 49.2888C54.6738 54.3322 49.5099 57.517 43.8737 57.517H10.1773C4.57122 57.4969 0 62.0883 0 67.6742C0 73.2601 4.57122 77.8514 10.1773 77.8514H78.9264C82.9953 77.8514 85.4065 73.3003 83.1159 69.9347L62.2892 39.2422H62.2792Z" fill="#99B3FF"/>
                                        <path d="M73.8127 0H15.3513C6.87191 0 0 6.87191 0 15.3513V67.6742C0 62.0883 4.57122 57.497 10.1773 57.497H43.8837C49.5199 57.497 54.6839 54.3122 57.2257 49.2687L78.3337 7.33405C80.0316 3.96843 77.5902 0 73.8127 0Z" fill="#3366FF"/>
                                        <path d="M45.5115 31.6168C48.9273 31.6168 51.7002 29.4567 51.7002 26.7843C51.7002 24.1119 48.9273 21.9519 45.5115 21.9519C42.0956 21.9519 39.3228 24.1119 39.3228 26.7843C39.3228 29.4567 42.0956 31.6168 45.5115 31.6168Z" fill="#DAFF86"/>
                                        </g>
                                        <defs>
                                        <clipPath id="clip0_18_550">
                                        <rect width="84" height="77.8514" fill="white"/>
                                        </clipPath>
                                        </defs>
                                    </svg>
                                    <span class="flex-1 ml-3 whitespace-nowrap" onClick={connectKaikas}>Kaikas</span>
                                </a>
                            </li>
                        </ul>
                    <p class="text-sm font-normal text-gray-500 dark:text-gray-400">주소 불러오기 (조회만 가능) </p>
                    
                    <div class="mt-3"></div>

                    {/* <form>    */}
                        <label for="search" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">0x123...</label>
                        <div class="relative">
                            <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                <svg aria-hidden="true" class="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                            </div>
                            <input onChange={accountHandler} value={tempAccountInfo} type="search" id="search" class="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="0x123..." />
                            <button onClick={accountUpdate} class="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">입력</button>
                        </div>
                    {/* </form> */}
                    
                    </div>
                </div>
                </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
            </>
        ) : null}

        {showManageModal ? (
            <>
            <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                <div className="relative w-full max-w-md max-h-full">
                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                    
                    <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                    <h3 className="text-2xl font-semibold">
                        지갑관리
                    </h3>
                    <button onClick={() => setShowManageModal(false)}>
                        <span className="bg-transparent text-black opacity-1 h-6 w-6 text-2xl block outline-none focus:outline-none">
                        ×
                        </span>
                    </button>
                    </div>
                    
                    <div class="p-6">
                    
                    <p class="text-sm font-normal text-gray-500 dark:text-gray-400">지갑변경</p>
                        <ul class="my-4 space-y-3">
                            <li>
                                <a href="#" class="flex items-center p-3 text-base font-bold text-gray-900 rounded-lg bg-gray-50 hover:bg-gray-100 group hover:shadow dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white">
                                    <svg aria-hidden="true" class="h-5" viewBox="0 0 40 38" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M39.0728 0L21.9092 12.6999L25.1009 5.21543L39.0728 0Z" fill="#E17726"/><path d="M0.966797 0.0151367L14.9013 5.21656L17.932 12.7992L0.966797 0.0151367Z" fill="#E27625"/><path d="M32.1656 27.0093L39.7516 27.1537L37.1004 36.1603L27.8438 33.6116L32.1656 27.0093Z" fill="#E27625"/><path d="M7.83409 27.0093L12.1399 33.6116L2.89876 36.1604L0.263672 27.1537L7.83409 27.0093Z" fill="#E27625"/><path d="M17.5203 10.8677L17.8304 20.8807L8.55371 20.4587L11.1924 16.4778L11.2258 16.4394L17.5203 10.8677Z" fill="#E27625"/><path d="M22.3831 10.7559L28.7737 16.4397L28.8067 16.4778L31.4455 20.4586L22.1709 20.8806L22.3831 10.7559Z" fill="#E27625"/><path d="M12.4115 27.0381L17.4768 30.9848L11.5928 33.8257L12.4115 27.0381Z" fill="#E27625"/><path d="M27.5893 27.0376L28.391 33.8258L22.5234 30.9847L27.5893 27.0376Z" fill="#E27625"/><path d="M22.6523 30.6128L28.6066 33.4959L23.0679 36.1282L23.1255 34.3884L22.6523 30.6128Z" fill="#D5BFB2"/><path d="M17.3458 30.6143L16.8913 34.3601L16.9286 36.1263L11.377 33.4961L17.3458 30.6143Z" fill="#D5BFB2"/><path d="M15.6263 22.1875L17.1822 25.4575L11.8848 23.9057L15.6263 22.1875Z" fill="#233447"/><path d="M24.3739 22.1875L28.133 23.9053L22.8184 25.4567L24.3739 22.1875Z" fill="#233447"/><path d="M12.8169 27.0049L11.9606 34.0423L7.37109 27.1587L12.8169 27.0049Z" fill="#CC6228"/><path d="M27.1836 27.0049L32.6296 27.1587L28.0228 34.0425L27.1836 27.0049Z" fill="#CC6228"/><path d="M31.5799 20.0605L27.6165 24.0998L24.5608 22.7034L23.0978 25.779L22.1387 20.4901L31.5799 20.0605Z" fill="#CC6228"/><path d="M8.41797 20.0605L17.8608 20.4902L16.9017 25.779L15.4384 22.7038L12.3988 24.0999L8.41797 20.0605Z" fill="#CC6228"/><path d="M8.15039 19.2314L12.6345 23.7816L12.7899 28.2736L8.15039 19.2314Z" fill="#E27525"/><path d="M31.8538 19.2236L27.2061 28.2819L27.381 23.7819L31.8538 19.2236Z" fill="#E27525"/><path d="M17.6412 19.5088L17.8217 20.6447L18.2676 23.4745L17.9809 32.166L16.6254 25.1841L16.625 25.1119L17.6412 19.5088Z" fill="#E27525"/><path d="M22.3562 19.4932L23.3751 25.1119L23.3747 25.1841L22.0158 32.1835L21.962 30.4328L21.75 23.4231L22.3562 19.4932Z" fill="#E27525"/><path d="M27.7797 23.6011L27.628 27.5039L22.8977 31.1894L21.9414 30.5138L23.0133 24.9926L27.7797 23.6011Z" fill="#F5841F"/><path d="M12.2373 23.6011L16.9873 24.9926L18.0591 30.5137L17.1029 31.1893L12.3723 27.5035L12.2373 23.6011Z" fill="#F5841F"/><path d="M10.4717 32.6338L16.5236 35.5013L16.4979 34.2768L17.0043 33.8323H22.994L23.5187 34.2753L23.48 35.4989L29.4935 32.641L26.5673 35.0591L23.0289 37.4894H16.9558L13.4197 35.0492L10.4717 32.6338Z" fill="#C0AC9D"/><path d="M22.2191 30.231L23.0748 30.8354L23.5763 34.8361L22.8506 34.2234H17.1513L16.4395 34.8485L16.9244 30.8357L17.7804 30.231H22.2191Z" fill="#161616"/><path d="M37.9395 0.351562L39.9998 6.53242L38.7131 12.7819L39.6293 13.4887L38.3895 14.4346L39.3213 15.1542L38.0875 16.2779L38.8449 16.8264L36.8347 19.1742L28.5894 16.7735L28.5179 16.7352L22.5762 11.723L37.9395 0.351562Z" fill="#763E1A"/><path d="M2.06031 0.351562L17.4237 11.723L11.4819 16.7352L11.4105 16.7735L3.16512 19.1742L1.15488 16.8264L1.91176 16.2783L0.678517 15.1542L1.60852 14.4354L0.350209 13.4868L1.30098 12.7795L0 6.53265L2.06031 0.351562Z" fill="#763E1A"/><path d="M28.1861 16.2485L36.9226 18.7921L39.7609 27.5398L32.2728 27.5398L27.1133 27.6049L30.8655 20.2912L28.1861 16.2485Z" fill="#F5841F"/><path d="M11.8139 16.2485L9.13399 20.2912L12.8867 27.6049L7.72971 27.5398H0.254883L3.07728 18.7922L11.8139 16.2485Z" fill="#F5841F"/><path d="M25.5283 5.17383L23.0847 11.7736L22.5661 20.6894L22.3677 23.4839L22.352 30.6225H17.6471L17.6318 23.4973L17.4327 20.6869L16.9139 11.7736L14.4707 5.17383H25.5283Z" fill="#F5841F"/></svg>
                                    <span class="flex-1 ml-3 whitespace-nowrap" onClick={connectMetamask}>
                                        MetaMask
                                    </span>
                                    {walletInfo === "metamask" ?
                                    <span class="inline-flex items-center justify-center px-2 py-0.5 ml-3 text-xs font-medium text-gray-500 bg-green-100 rounded dark:bg-gray-700 dark:text-gray-400">
                                        연결됨
                                    </span> :
                                    <></>
                                    }
                                </a>
                            </li>
                            <li>
                                <a href="#" class="flex items-center p-3 text-base font-bold text-gray-900 rounded-lg bg-gray-50 hover:bg-gray-100 group hover:shadow dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white">
                                    {/* <svg aria-hidden="true" class="h-5" viewBox="0 0 292 292" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M145.7 291.66C226.146 291.66 291.36 226.446 291.36 146C291.36 65.5541 226.146 0.339844 145.7 0.339844C65.2542 0.339844 0.0400391 65.5541 0.0400391 146C0.0400391 226.446 65.2542 291.66 145.7 291.66Z" fill="#3259A5"/><path d="M195.94 155.5C191.49 179.08 170.8 196.91 145.93 196.91C117.81 196.91 95.0204 174.12 95.0204 146C95.0204 117.88 117.81 95.0897 145.93 95.0897C170.8 95.0897 191.49 112.93 195.94 136.5H247.31C242.52 84.7197 198.96 44.1797 145.93 44.1797C89.6904 44.1797 44.1104 89.7697 44.1104 146C44.1104 202.24 89.7004 247.82 145.93 247.82C198.96 247.82 242.52 207.28 247.31 155.5H195.94Z" fill="white"/></svg> */}
                                    <svg width="22" height="20" viewBox="0 0 84 78" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <g clip-path="url(#clip0_18_550)">
                                        <path d="M62.2792 39.2422L57.2156 49.2888C54.6738 54.3322 49.5099 57.517 43.8737 57.517H10.1773C4.57122 57.4969 0 62.0883 0 67.6742C0 73.2601 4.57122 77.8514 10.1773 77.8514H78.9264C82.9953 77.8514 85.4065 73.3003 83.1159 69.9347L62.2892 39.2422H62.2792Z" fill="#99B3FF"/>
                                        <path d="M73.8127 0H15.3513C6.87191 0 0 6.87191 0 15.3513V67.6742C0 62.0883 4.57122 57.497 10.1773 57.497H43.8837C49.5199 57.497 54.6839 54.3122 57.2257 49.2687L78.3337 7.33405C80.0316 3.96843 77.5902 0 73.8127 0Z" fill="#3366FF"/>
                                        <path d="M45.5115 31.6168C48.9273 31.6168 51.7002 29.4567 51.7002 26.7843C51.7002 24.1119 48.9273 21.9519 45.5115 21.9519C42.0956 21.9519 39.3228 24.1119 39.3228 26.7843C39.3228 29.4567 42.0956 31.6168 45.5115 31.6168Z" fill="#DAFF86"/>
                                        </g>
                                        <defs>
                                        <clipPath id="clip0_18_550">
                                        <rect width="84" height="77.8514" fill="white"/>
                                        </clipPath>
                                        </defs>
                                    </svg>

                                    <span class="flex-1 ml-3 whitespace-nowrap" onClick={connectKaikas}>Kaikas</span>
                                    {walletInfo === "kaikas" ?
                                    <span class="inline-flex items-center justify-center px-2 py-0.5 ml-3 text-xs font-medium text-gray-500 bg-green-100 rounded dark:bg-gray-700 dark:text-gray-400">
                                        연결됨
                                    </span> :
                                    <></>
                                    }

                                </a>
                            </li>
                        </ul>
                    <p class="text-sm font-normal text-gray-500 dark:text-gray-400">연결해제</p>
                    
                    <div class="mt-3"></div>
                        <button class="w-full items-center p-3 text-white font-bold text-gray-900 rounded-lg bg-primary-100 hover:bg-primary-700 group hover:shadow dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white">
                            <div style={{textAlign:"center"}} onClick={walletDisconnect}>해제</div>
                        </button>                    
                    </div>
                </div>
                </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
            </>
        ) : null}
    </>
  );
}

export default Topnav;


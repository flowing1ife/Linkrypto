import Web3 from 'web3';

const metamaskSwapExecutor = async () => {

}

const metamaskOusdtDepositExecutor = async (accountAddress, targetContract, amount) => {

    const web3 = new Web3(window.ethereum);

    const userAddress = accountAddress
    const protocolAddress = targetContract
    const depositAmount = amount

    let transactionInfo = {}

    switch (protocolAddress) {
        case '0xe0e67b991d6b5cf73d8a17a10c3de74616c1ec11': // 1 - klaystation : hashed - ozys             
            transactionInfo = await bifiOusdtDeposit(userAddress, protocolAddress, depositAmount)
            break;
        case '0xeffa404dac6ba720002974c54d57b20e89b22862': // 2 - klaystation : hankyung     
            transactionInfo = await klaystationDeposit(userAddress, protocolAddress, depositAmount)
            break;
        case '0x962cdb28e662b026df276e5ee7fdf13a06341d68': // 3 - klaystation : FSN
            transactionInfo = await klaystationDeposit(userAddress, protocolAddress, depositAmount)
            break;
        case '0x0795aea6948fc1d31809383edc4183b220abd71f': // 4 - klaystation : jump - everstake
            transactionInfo = await klaystationDeposit(userAddress, protocolAddress, depositAmount)
            break;
        default:
            console.log(`Sorry, we are out of ${protocolAddress}.`);
    }

    const web3Return = await web3.eth
    .sendTransaction(transactionInfo)
    .once('transactionHash', (transactionHash) => {
      console.log('txHash', transactionHash);
    })
    .once('receipt', (receipt) => {
        console.log('receipt', receipt);
    })
    .once('error', (error) => {
        console.log('error', error);
        alert("지불에 실패하셨습니다.");
    }).then((txHash) => {return txHash})
    .catch((error) => console.error(error));

    return web3Return
}

const metamaskOusdtWithdrawalExecutor = async (accountAddress, targetContract, amount, balance) => {

    const web3 = new Web3(window.ethereum);

    const userAddress = accountAddress
    const protocolAddress = targetContract
    const withdrawalAmount = amount
    const userBalance = balance

    let transactionInfo = {}

    switch (protocolAddress) {
        case '0xe0e67b991d6b5cf73d8a17a10c3de74616c1ec11': // 1 - klaystation : hashed - ozys             
            transactionInfo = await bifiWithdrawal(userAddress, protocolAddress, withdrawalAmount, userBalance)
            break;
        case '0xeffa404dac6ba720002974c54d57b20e89b22862': // 2 - klaystation : hankyung     
            transactionInfo = await klaystationWithdrawal(userAddress, protocolAddress, withdrawalAmount, userBalance)
            break;
        case '0x962cdb28e662b026df276e5ee7fdf13a06341d68': // 3 - klaystation : FSN
            transactionInfo = await klaystationWithdrawal(userAddress, protocolAddress, withdrawalAmount, userBalance)
            break;
        case '0x0795aea6948fc1d31809383edc4183b220abd71f': // 4 - klaystation : jump - everstake
            transactionInfo = await klaystationWithdrawal(userAddress, protocolAddress, withdrawalAmount, userBalance)
            break;
        case '0xf80f2b22932fcec6189b9153aa18662b15cc9c00': // 5 - stakely
            transactionInfo = await stakelyWithdrawal(userAddress, protocolAddress, withdrawalAmount)
            break;
        default:
            console.log(`Sorry, we are out of ${protocolAddress}.`);
    }

    const web3Return = await web3.eth
    .sendTransaction(transactionInfo)
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

    return web3Return

}


const metamaskDepositExecutor = async (accountAddress, targetContract, amount) => {

    const web3 = new Web3(window.ethereum);

    const userAddress = accountAddress
    const protocolAddress = targetContract
    const depositAmount = amount

    let transactionInfo = {}

    switch (protocolAddress) {
        case '0xe33337cb6fbb68954fe1c3fde2b21f56586632cd': // 1 - klaystation : hashed - ozys             
            transactionInfo = await klaystationDeposit(userAddress, protocolAddress, depositAmount)
            break;
        case '0xeffa404dac6ba720002974c54d57b20e89b22862': // 2 - klaystation : hankyung     
            transactionInfo = await klaystationDeposit(userAddress, protocolAddress, depositAmount)
            break;
        case '0x962cdb28e662b026df276e5ee7fdf13a06341d68': // 3 - klaystation : FSN
            transactionInfo = await klaystationDeposit(userAddress, protocolAddress, depositAmount)
            break;
        case '0x0795aea6948fc1d31809383edc4183b220abd71f': // 4 - klaystation : jump - everstake
            transactionInfo = await klaystationDeposit(userAddress, protocolAddress, depositAmount)
            break;
        case '0xf80f2b22932fcec6189b9153aa18662b15cc9c00': // 5 - stakely
            transactionInfo = await stakelyDeposit(userAddress, protocolAddress, depositAmount)
            break;
        case '0xa691c5891d8a98109663d07bcf3ed8d3edef820a': // 6 - kleva 
            transactionInfo = await klevaDeposit(userAddress, protocolAddress, depositAmount)
            break;
        case '0x829fcfb6a6eea9d14eb4c14fac5b29874bdbad13': // 7 - bifi 
            transactionInfo = await bifiDeposit(userAddress, protocolAddress, depositAmount)
            break;
        case '0x74ba03198fed2b15a51af242b9c63faf3c8f4d34': // 8 - klaymore 
            transactionInfo = await klaymoreDeposit(userAddress, protocolAddress, depositAmount)
            break;        
        case '0x7087d5a9e3203d39ec825d02d92f66ed3203b18a': // 9 - kokoa
            transactionInfo = await kokoaDeposit(userAddress, protocolAddress, depositAmount)
            break;      
        case '0x6d219198816947d8bb4f88ba502a0518a7c516b1': // 10 - klaybank
            transactionInfo = await klaybankDeposit(userAddress, protocolAddress, depositAmount)
            break;      
        case '0xe4c3f5454a752bddda18ccd239bb1e00ca42d371': // 11 - klayswap
            transactionInfo = await klayswapDeposit(userAddress, protocolAddress, depositAmount)
            break;   
        default:
            console.log(`Sorry, we are out of ${protocolAddress}.`);
    }

    const web3Return = await web3.eth
    .sendTransaction(transactionInfo)
    .once('transactionHash', (transactionHash) => {
      console.log('txHash', transactionHash);
    })
    .once('receipt', (receipt) => {
        console.log('receipt', receipt);
    })
    .once('error', (error) => {
        console.log('error', error);
        alert("지불에 실패하셨습니다.");
    }).then((txHash) => {return txHash})
    .catch((error) => console.error(error));

    return web3Return


}

const metamaskWithdrawalExecutor = async (accountAddress, targetContract, amount, balance) => {

    const web3 = new Web3(window.ethereum);

    const userAddress = accountAddress
    const protocolAddress = targetContract
    const withdrawalAmount = amount
    const userBalance = balance

    let transactionInfo = {}

    switch (protocolAddress) {
        case '0xe33337cb6fbb68954fe1c3fde2b21f56586632cd': // 1 - klaystation : hashed - ozys             
            transactionInfo = await klaystationWithdrawal(userAddress, protocolAddress, withdrawalAmount, userBalance)
            break;
        case '0xeffa404dac6ba720002974c54d57b20e89b22862': // 2 - klaystation : hankyung     
            transactionInfo = await klaystationWithdrawal(userAddress, protocolAddress, withdrawalAmount, userBalance)
            break;
        case '0x962cdb28e662b026df276e5ee7fdf13a06341d68': // 3 - klaystation : FSN
            transactionInfo = await klaystationWithdrawal(userAddress, protocolAddress, withdrawalAmount, userBalance)
            break;
        case '0x0795aea6948fc1d31809383edc4183b220abd71f': // 4 - klaystation : jump - everstake
            transactionInfo = await klaystationWithdrawal(userAddress, protocolAddress, withdrawalAmount, userBalance)
            break;
        case '0xf80f2b22932fcec6189b9153aa18662b15cc9c00': // 5 - stakely
            transactionInfo = await stakelyWithdrawal(userAddress, protocolAddress, withdrawalAmount)
            break;
        case '0xa691c5891d8a98109663d07bcf3ed8d3edef820a': // 6 - kleva 
            transactionInfo = await klevaDeposit(userAddress, protocolAddress, withdrawalAmount)
            break;
        case '0x829fcfb6a6eea9d14eb4c14fac5b29874bdbad13': // 7 - bifi 
            transactionInfo = await bifiWithdrawal(userAddress, protocolAddress, withdrawalAmount)
            break;
        case '0x74ba03198fed2b15a51af242b9c63faf3c8f4d34': // 8 - klaymore 
            transactionInfo = await klaymoreWithdrawal(userAddress, protocolAddress, withdrawalAmount)
            break;        
        case '0x7087d5a9e3203d39ec825d02d92f66ed3203b18a': // 9 - kokoa 
            transactionInfo = await kokoaWithdrawal(userAddress, protocolAddress, withdrawalAmount)
            break;
        case '0x6d219198816947d8bb4f88ba502a0518a7c516b1': // 10 - klaybank 
            transactionInfo = await klaybankWithdrawal(userAddress, protocolAddress, withdrawalAmount, userBalance)
            break;        
        case '0xf50782a24afcb26acb85d086cf892bfffb5731b5': // 11 - swapscanner 
            transactionInfo = await swapscannerWithdrawal(userAddress, protocolAddress, withdrawalAmount, userBalance)
            break;
        case '0xe4c3f5454a752bddda18ccd239bb1e00ca42d371': // 12 - klayswap 
            transactionInfo = await klayswapWithdrawal(userAddress, protocolAddress, withdrawalAmount, userBalance)
            break;
        default:
            console.log(`Sorry, we are out of ${protocolAddress}.`);
    }

    const web3Return = await web3.eth
    .sendTransaction(transactionInfo)
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

    return web3Return

}

async function klaystationDeposit (addr, contAddr, amount) {
    const web3 = new Web3(window.ethereum);
    const transAmount = amount * 1e+18;
    const protocolABI = {name: 'stakeKlay',type: 'function', inputs: [{"name": "address","type": "address"}]}
    const abiInput =[addr]
    const data = await web3.eth.abi.encodeFunctionCall(protocolABI,abiInput)
    return {
        from: addr,
        to: contAddr,
        data,
        value: transAmount,
        gas: 800000
    }
}

async function stakelyDeposit (addr, contAddr, amount) {
    const web3 = new Web3(window.ethereum);
    const protocolABI = {name: 'stake',type: 'function', inputs: []}
    const abiInput =[]
    const data = await web3.eth.abi.encodeFunctionCall(protocolABI,abiInput)
    return {
        from: addr,
        to: contAddr,
        data,
        value: amount * 1e+18,
        gas: 800000
    }
}

// 

async function bifiOusdtDeposit (addr, contAddr, amount) { // flag 가 full calculation 모드를 위함이라는데 잘 모르겠음.

    let tokenAmount = 0;
    let klayAmount = 0;

    const web3 = new Web3(window.ethereum);
    const amountBN = web3.utils.toWei(amount,'ether');
    const protocolABI = {name: 'deposit',type: 'function', inputs: [{"name": "amount","type": "uint256"},{"name": "flag","type": "bool"}]}
    const abiInput =[amountBN, false]
    const data = await web3.eth.abi.encodeFunctionCall(protocolABI,abiInput)

        return {
            from: addr,
            to: contAddr,
            data,
            gas: 400000
        }

}

async function bifiDeposit (addr, contAddr, amount) { // flag 가 full calculation 모드를 위함이라는데 잘 모르겠음.

    let tokenAmount = 0;
    let klayAmount = 0;

    if(contAddr === "0x829fcfb6a6eea9d14eb4c14fac5b29874bdbad13"){
        tokenAmount = 0;
        klayAmount = amount * 1e+18
    }

    const web3 = new Web3(window.ethereum);
    const amountBN = web3.utils.toWei(amount,'ether');
    const protocolABI = {name: 'deposit',type: 'function', inputs: [{"name": "amount","type": "uint256"},{"name": "flag","type": "bool"}]}
    const abiInput =[tokenAmount, 0]
    const data = await web3.eth.abi.encodeFunctionCall(protocolABI,abiInput)

    if(contAddr === "0x829fcfb6a6eea9d14eb4c14fac5b29874bdbad13"){
        return {
            from: addr,
            to: contAddr,
            data,
            value: klayAmount,
            gas: 400000
        }
    }

}

async function klevaDeposit (addr, contAddr, amount) {
    const web3 = new Web3(window.ethereum);
    const amountBN = web3.utils.toWei('3','ether');
    // console.log("amountBN", amountBN)
    const protocolABI = {name: 'deposit',type: 'function', inputs: [{"name": "amount","type": "uint256"}]}
    const abiInput =[amountBN]
    const data = await web3.eth.abi.encodeFunctionCall(protocolABI,abiInput)
    return {
        from: addr,
        to: contAddr,
        data,
        value: amountBN,
        gas: 200000
    }
}

async function klaymoreDeposit (addr, contAddr, amount) {
    const web3 = new Web3(window.ethereum);
    // const amountBN = web3.utils.toWei('3','ether');
    // console.log("amountBN", amountBN)
    const protocolABI = {name: 'stakeKlay',type: 'function', inputs: [{"name": "address","type": "address"}]}
    const abiInput =[addr]
    const data = await web3.eth.abi.encodeFunctionCall(protocolABI,abiInput)
    return {
        from: addr,
        to: contAddr,
        data,
        value: amount * 1e+18,
        gas: 300000
    }
}

async function kokoaDeposit (addr, contAddr, amount) {
    const web3 = new Web3(window.ethereum);
    // const amountBN = web3.utils.toWei('3','ether');
    // console.log("amountBN", amountBN)
    if(contAddr === "0x7087d5a9e3203d39ec825d02d92f66ed3203b18a"){
        const protocolABI = {name: 'stakeAndBorrow',type: 'function', inputs: [{"name": "uint256","type": "uint256"}]}
        const abiInput =[0]
        const data = await web3.eth.abi.encodeFunctionCall(protocolABI,abiInput)
        return {
            from: addr,
            to: contAddr,
            data,
            value: amount * 1e+18,
            gas: 2000000
        }
    }
}

async function klaybankDeposit (addr, contAddr, amount) {
    const web3 = new Web3(window.ethereum);
    if(contAddr === "0x6d219198816947d8bb4f88ba502a0518a7c516b1"){
        const protocolABI = {name: 'depositETH',type: 'function', inputs: [{"name": "address","type": "address"},{"name": "address","type": "address"},{"name": "uint16","type": "uint16"}]}
        const abiInput =["0x4B6Ece52D0EF60aE054f45c45D6bA4F7a0C2cC67", addr, 0]
        const data = await web3.eth.abi.encodeFunctionCall(protocolABI,abiInput)
        return {
            from: addr,
            to: contAddr,
            data,
            value: amount * 1e+18,
            gas: 1000000
        }
    }
}

async function klayswapDeposit (addr, contAddr, amount) {
    const web3 = new Web3(window.ethereum);
    if(contAddr === "0xe4c3f5454a752bddda18ccd239bb1e00ca42d371"){
        const protocolABI = {name: 'depositKlay',type: 'function', inputs: []}
        const abiInput =[]
        const data = await web3.eth.abi.encodeFunctionCall(protocolABI,abiInput)
        return {
            from: addr,
            to: contAddr,
            data,
            value: amount * 1e+18,
            gas: 500000
        }
    }
}



async function stakelyWithdrawal (addr, contAddr, amount) {
    const web3 = new Web3(window.ethereum);
    const amountBN = web3.utils.toWei(amount.toString(),'ether');
    const protocolABI = {name: 'unstake',type: 'function', inputs: [{"name": "uint256","type": "uint256"}]}
    const abiInput =[amountBN]
    const data = await web3.eth.abi.encodeFunctionCall(protocolABI,abiInput)
    return {
        from: addr,
        to: contAddr,
        data,
        gas: 1000000
    }
}


async function klaystationWithdrawal (addr, contAddr, amount, balance) {

    // 최대치일 경우
    // 115792089237316195423570985008687907853269984665640564039457584007913129639935
    const web3 = new Web3(window.ethereum);
    let amountBN = 0;

    if(amount === balance){
        amountBN = 115792089237316195423570985008687907853269984665640564039457584007913129639935
    } else {
        amountBN = web3.utils.toWei(amount.toString(),'ether');
    }
    // const amountBN = web3.utils.toWei(amount.toString(),'ether');
    const protocolABI = {name: 'unstakeKlay',type: 'function', inputs: [{"name": "address","type": "address"},{"name": "uint256","type": "uint256"}]}
    const abiInput =[addr,amountBN]
    const data = await web3.eth.abi.encodeFunctionCall(protocolABI, abiInput)
    return {
        from: addr,
        to: contAddr,
        data,
        gas: 1600000
    }
}

async function bifiWithdrawal (addr, contAddr, amount) { // flag 가 full calculation 모드를 위함이라는데 잘 모르겠음.

    let klayAmount = 0;

    const web3 = new Web3(window.ethereum);
    const amountBN = web3.utils.toWei(amount,'ether');
    const protocolABI = {name: 'withdraw',type: 'function', inputs: [{"name": "amount","type": "uint256"},{"name": "flag","type": "bool"}]}
    const abiInput =[amountBN, false]
    const data = await web3.eth.abi.encodeFunctionCall(protocolABI,abiInput)

    return {
        from: addr,
        to: contAddr,
        data,
        gas: 650000
    }

}

async function klaymoreWithdrawal (addr, contAddr, amount) { // flag 가 full calculation 모드를 위함이라는데 잘 모르겠음.

    const web3 = new Web3(window.ethereum);
    const amountBN = web3.utils.toWei(amount,'ether');
    const protocolABI = {name: '0x76332348',type: 'function', inputs: [{"name": "address","type": "address"},{"name": "uint256","type": "uint256"}]}
    const abiInput =[addr, amountBN]
    const data = await web3.eth.abi.encodeFunctionCall(protocolABI,abiInput)
    return {
        from: addr,
        to: contAddr,
        data,
        gas: 7300000
    }

}

async function kokoaWithdrawal (addr, contAddr, amount) { // flag 가 full calculation 모드를 위함이라는데 잘 모르겠음.

    const web3 = new Web3(window.ethereum);
    const amountBN = web3.utils.toWei(amount,'ether');
    const protocolABI = {name: 'repayAndUnstake',type: 'function', inputs: [{"name": "uint256","type": "uint256"},{"name": "uint256","type": "uint256"}]}
    const abiInput =[amountBN, 0]
    const data = await web3.eth.abi.encodeFunctionCall(protocolABI,abiInput)
    return {
        from: addr,
        to: contAddr,
        data,
        gas: 1500000
    }

}

async function klaybankWithdrawal (addr, contAddr, amount, balance) {

    const web3 = new Web3(window.ethereum);
    // const amountBN = 
    const protocolABI = {name: 'withdrawETH',type: 'function', inputs: [{"name": "address","type": "address"},{"name": "uint256","type": "uint256"},{"name": "address","type": "address"}]}
    let amountBN = 0;

    if(amount === balance){
        amountBN = 115792089237316195423570985008687907853269984665640564039457584007913129639935
    } else {
        amountBN = web3.utils.toWei(amount.toString(),'ether');
    }

    const abiInput =["0x4B6Ece52D0EF60aE054f45c45D6bA4F7a0C2cC67", amountBN, addr]
    const data = await web3.eth.abi.encodeFunctionCall(protocolABI,abiInput)
    return {
        from: addr,
        to: contAddr,
        data,
        gas: 1500000
    }

}

async function swapscannerWithdrawal (addr, contAddr, amount) {

    const web3 = new Web3(window.ethereum);
    const amountBN = web3.utils.toWei(amount.toString(),'ether');
    const protocolABI = {name: 'unstake',type: 'function', inputs: [{"name": "uint256","type": "uint256"}]}
    const abiInput =[amountBN]

    const data = await web3.eth.abi.encodeFunctionCall(protocolABI,abiInput)

    return {
        from: addr,
        to: contAddr,
        data,
        gas: 1500000
    }

}

async function klayswapWithdrawal (addr, contAddr, amount) {
    const web3 = new Web3(window.ethereum);
    if(contAddr === "0xe4c3f5454a752bddda18ccd239bb1e00ca42d371"){
        const protocolABI = {name: 'depositKlay',type: 'function', inputs: []}
        const abiInput =[]
        const data = await web3.eth.abi.encodeFunctionCall(protocolABI,abiInput)
        return {
            from: addr,
            to: contAddr,
            data,
            value: amount * 1e+18,
            gas: 500000
        }
    }
}

export {
    metamaskDepositExecutor,
    metamaskWithdrawalExecutor,
    metamaskSwapExecutor,
    metamaskOusdtDepositExecutor,
    metamaskOusdtWithdrawalExecutor
}
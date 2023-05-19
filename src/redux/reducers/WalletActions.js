// modals : connect wallet, manage wallet
export const WALLET_CONNECT_MODAL_OPEN = "WALLET_CONNECT_MODAL_OPEN";
export const WALLET_CONNECT_MODAL_CLOSE = "WALLET_CONNECT_MODAL_CLOSE";
export const WALLET_MANAGE_MODAL_OPEN = "WALLET_MANAGE_MODAL_OPEN";
export const WALLET_MANAGE_MODAL_CLOSE = "WALLET_MANAGE_MODAL_CLOSE";
export const CHAIN_MANAGE_MODAL_OPEN = "CHAIN_MANAGE_MODAL_OPEN";
export const CHAIN_MANAGE_MODAL_CLOSE = "CHAIN_MANAGE_MODAL_CLOSE";

// modals : connec
export const ADDRESS_CONNECT = "ADDRESS_CONNECT"
export const METAMASK_CONNECT = "METAMASK_CONNECT";
export const WALLET_KAIKAS_CONNECT = "WALLET_KAIKAS_CONNECT";
export const WALLET_DISCONNECT = "WALLET_DISCONNECT";
export const CONNECT_REFRESH = "CONNECT_REFRESH";
export const WALLET_MODAL = "WALLET_MODAL";

// MODAL 상태관리
// wallet connect modal open
const connectWalletModalOpen = payload => {
    return {
        type: WALLET_CONNECT_MODAL_OPEN,
        payload
    };
};

// wallet connect modal close
const connectWalletModalClose = payload => {
    return {
        type: WALLET_CONNECT_MODAL_CLOSE,
        payload
    };
};

// wallet manage modal open
const manageWalletModalOpen = payload => {
    return {
        type: WALLET_MANAGE_MODAL_OPEN,
        payload
    };
};

// wallet manage modal close
const manageWalletModalClose = payload => {
    return {
        type: WALLET_MANAGE_MODAL_CLOSE,
        payload
    };
};

// wallet manage modal open
const manageChainModalOpen = payload => {
  return {
      type: CHAIN_MANAGE_MODAL_OPEN,
      payload
  };
};

// wallet manage modal close
const manageChainModalClose = payload => {
  return {
      type: CHAIN_MANAGE_MODAL_CLOSE,
      payload
  };
};

// matamask connect
const metamaskConnect = payload => {
    return {
        type: METAMASK_CONNECT,
        payload,
    };
};

// kaikas connect
const walletKaikasConnect = payload => {
    return {
        type: WALLET_KAIKAS_CONNECT,
        payload,
    };
};

// kaikas connect
const addressConnect = payload => {
    return {
        type: ADDRESS_CONNECT,
        payload,
    };
};


// wallet 초기화
const connectRefresh = payload => {
  return {
    type: CONNECT_REFRESH,
    payload,
  };
};


// wallet connect modal open
export const walletConnectModalOpen = () => async dispatch => {
    dispatch(connectWalletModalOpen({ walletConnectModal: true }));
}

// wallet connect modal open
export const walletConnectModalClose = () => async dispatch => {
    dispatch(connectWalletModalClose({ walletConnectModal: false }));
}

// wallet manage modal open
export const walletManageModalOpen = () => async dispatch => {
    dispatch(manageWalletModalOpen({ walletManageModal: true }));
}

// wallet manage modal open
export const walletManageModalClose = () => async dispatch => {
    dispatch(manageWalletModalClose({ walletManageModal: false }));
}

// chain manage modal open
export const chainManageModalOpen = () => async dispatch => {
  dispatch(manageChainModalOpen({ chainManageModal: true }));
}

// chain manage modal open
export const chainManageModalClose = () => async dispatch => {
  dispatch(manageChainModalClose({ chainManageModal: false }));
}

// metamask connect
export const connectMetamask = () => async dispatch => {
  if (window.ethereum) {
    try {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      dispatch(metamaskConnect({ account: accounts[0] }));
      localStorage.setItem("address", accounts[0])
      localStorage.setItem("wallet", "metamask")
} catch (error) {
      console.error(error);
    }
  }
};

export const connectAddress = (address) => async dispatch => {
    dispatch(addressConnect({ account: address}));
};

export const connectKaikas = () => async dispatch => {
    
    const { klaytn } = window

    if (klaytn) {
        try {
            await klaytn.enable()
            klaytn.on('accountsChanged', () => console.log("account changed"))
            const accounts = klaytn.selectedAddress
            // console.log("accounts",accounts)
            // console.log("klaytn",klaytn)

            // setAccountinfo(klaytn.selectedAddress)
            // setWalletInfo("kaikas")
            dispatch(walletKaikasConnect({ account: accounts }));
            localStorage.setItem("address", klaytn.selectedAddress)
            localStorage.setItem("wallet", "kaikas")
            // setShowModal(false)
            // setShowManageModal(false)
        } catch (error) {
            console.log(error)
        }
    } else {
        console.log('Non-Kaikas browser detected. You should consider trying Kaikas!')
    }

};

export const disconnect = () => async dispatch => {
    dispatch(connectRefresh({ account: "", walletProvider: ""}));
  };


export const getAddress = () => async dispatch => {
  if (window.ethereum) {
    try {
      const addressArray = await window.ethereum.request({
        method: "eth_accounts",
      });

      if (addressArray.length > 0) {
        dispatch(connectRefresh({ account: addressArray[0] }));
      }
    } catch (error) {
      console.error(error);
    }
  }
};
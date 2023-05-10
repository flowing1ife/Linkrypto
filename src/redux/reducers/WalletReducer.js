import { 
    WALLET_CONNECT_MODAL_OPEN,
    WALLET_CONNECT_MODAL_CLOSE, 
    WALLET_MANAGE_MODAL_OPEN,
    WALLET_MANAGE_MODAL_CLOSE,
    METAMASK_CONNECT,
    WALLET_KAIKAS_CONNECT,
    ADDRESS_CONNECT,
    CONNECT_REFRESH } from "./WalletActions";

const initialState = {
  account: "",
  walletProvider: "",
  walletConnectModal: false,
  walletManageModal: false
};

const WalletReducer = (state = initialState, action) => {
  switch (action.type) {

    case WALLET_CONNECT_MODAL_OPEN:
    return {
        ...state,
        walletConnect: action.payload.walletConnectModal
        };

    case WALLET_CONNECT_MODAL_CLOSE:
    return {
        ...state,
        walletConnect: action.payload.walletConnectModal
        };

    case WALLET_MANAGE_MODAL_OPEN:
    return {
        ...state,
        walletManage: action.payload.walletManageModal
        };

    case WALLET_MANAGE_MODAL_CLOSE:
    return {
        ...state,
        walletManage: action.payload.walletManageModal
        };
        
    case METAMASK_CONNECT:
      return {
        ...state,
        walletProvider: "metamask",
        account: action.payload.account
      };

    case WALLET_KAIKAS_CONNECT:
    return {
        ...state,
        walletProvider: "kaikas",
        account: action.payload.account
    };        

    case ADDRESS_CONNECT:
    return {
        ...state,
        walletProvider: "noProvider",
        account: action.payload.account
    };        
    
    case CONNECT_REFRESH:
    return {
        account: "",
        walletProvider: "",
        walletConnectModal: false,
        walletManageModal: false
    };
        
    default:
    return state;
  }
};

export default WalletReducer;
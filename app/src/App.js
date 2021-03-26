import React from 'react';
import logo from './logo.svg';
import './App.css';

const Web3 = require('web3')
const HDWalletProvider = require('@truffle/hdwallet-provider')
const moment = require('moment-timezone')

// WEB3 CONFIG

// TODO CHANGE WEB3
const web3 = new Web3(new HDWalletProvider(process.env.REACT_APP_PRIVATE_KEY, process.env.REACT_APP_RPC_URL))

// Ropsten DAI
const DAI_ABI = require('./abis/RopstenDAI.json')
const DAI_ADDRESS = process.env.REACT_APP_ROPSTEN_DAI_ADDRESS
const daiContract = new web3.eth.contract(DAI_ABI, DAI_ADDRESS);

// Ropsten Uniswap Dai Exchange: https://ropsten.etherscan.io/address/0xc0fc958f7108be4060F33a699a92d3ea49b0B5f0
const UNISWAP_DAI_EXCHANGE_ABI = require('./abis/RopstenUniSwapDAIExchange.js')
const UNISWAP_DAI_EXCHANGE_ADDRESS = process.env.REACT_APP_ROPSTEN_UNISWAP_DAI_EXCHANGE_ADDRESS
const exchangeContract = new web3.eth.contract(UNISWAP_DAI_EXCHANGE_ABI, UNISWAP_DAI_EXCHANGE_ADDRESS);


// const ETH_SELL_PRICE = web3.utils.toWei('200', 'Ether') // 200 Dai a.k.a. $200 USD 

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      DAI_ADDRESS: '',
      UNISWAP_DAI_EXCHANGE_ADDRESS: '',
      ETH_AMOUNT: ''
    };
  }

  componentDidMount() {
    this.setState({
      DAI_ADDRESS: DAI_ADDRESS,
      UNISWAP_DAI_EXCHANGE_ADDRESS: UNISWAP_DAI_EXCHANGE_ADDRESS
    });
  }

  setMinimunETH = (e) => {
    console.log(web3)
    this.setState({
      ETH_AMOUNT: e.target.value // web3.utils.toWei(e.target.value.toString(), 'Ether')
    });

  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />

          <p><b>DAI ADRRESS: </b>{this.state.DAI_ADDRESS}</p>
          <p><b>UNISWAP DAI EXCHANGE ADDRESS: </b>{this.state.UNISWAP_DAI_EXCHANGE_ADDRESS}</p>
          <p><b>MINIMUM ETH TO SWAP: </b>{this.state.ETH_AMOUNT}</p>
          <br />

          <p>Set minimum eth to swap</p>
          <input type="text" onChange={this.setMinimunETH} value={this.state.ETH_AMOUNT} />
        </header>
      </div>
    );
  }
}

export default App;

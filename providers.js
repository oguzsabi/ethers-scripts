import "dotenv/config"
import { ethers } from "ethers";
import { formatEther } from "ethers/utils";
import axios from "axios";

const infuraId = process.env.INFURA_PROJECT_ID;
const infuraMainnetUrl = `https://mainnet.infura.io/v3/${infuraId}`
const infuraSepoliaUrl = `https://sepolia.infura.io/v3/${infuraId}`
const coingeckoUrl = 'https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd';

const mainnetProvider = new ethers.JsonRpcProvider(infuraMainnetUrl);
const sepoliaProvider = new ethers.JsonRpcProvider(infuraSepoliaUrl);

const response = await axios.get(coingeckoUrl);
const vitalikBalance = await mainnetProvider.getBalance("vitalik.eth");
const alzartanBalance = await sepoliaProvider.getBalance("alzartan.eth");

const ethPrice = response.data.ethereum.usd;
const vitalikBalanceInEth = formatEther(vitalikBalance);
const vitalikBalanceInUsd = vitalikBalanceInEth * ethPrice;
const alzartanBalanceInEth = formatEther(alzartanBalance);
const alzartanBalanceInUsd = alzartanBalanceInEth * ethPrice;

console.log(`Vitalik has ${vitalikBalanceInEth} ETH. That's $${vitalikBalanceInUsd}`);
console.log(`Alzartan has ${alzartanBalanceInEth} Sepolia ETH. That's $${alzartanBalanceInUsd}`);
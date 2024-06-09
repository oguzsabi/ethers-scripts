import "dotenv/config";
import { ethers, Wallet } from "ethers";
import { formatEther } from "ethers/utils";

// // RANDOM WALLET CREATION
// const wallet = Wallet.createRandom();

// console.log(`Wallet address: ${wallet.address}`);
// console.log(`Wallet private key: ${wallet.privateKey}`);
// console.log(`Wallet mnemonic: ${wallet.mnemonic.phrase}`);

// let path, myWallet;

// for (let i = 0; i < 10; i++) {
//     path = `m/44'/60'/0'/0/${i}`;
//     myWallet = Wallet.fromPhrase(wallet.mnemonic.phrase, path);
//     console.log(`Wallet address: ${myWallet.address}`);
//     console.log(`Wallet private key: ${myWallet.privateKey}`);
// }

const infuraId = process.env.INFURA_PROJECT_ID;
const infuraSepoliaUrl = `https://sepolia.infura.io/v3/${infuraId}`
const sepoliaProvider = new ethers.JsonRpcProvider(infuraSepoliaUrl);

const personalWallet = new Wallet(process.env.WALLET_PRIVATE_KEY, sepoliaProvider);
const myBalance = await sepoliaProvider.getBalance(personalWallet.address);
console.log(`Personal wallet address: ${personalWallet.address}`);

const message = "Hello World";
const signature = await personalWallet.signMessage(message);
console.log(`Signed message from personal wallet: ${signature}`);
console.log(`Message verification: ${ethers.verifyMessage(message, signature) === personalWallet.address}`);

console.log(`My balance: ${myBalance}`);
console.log(`1% of my balance: ${myBalance / 100n}`);

const tx = await personalWallet.sendTransaction({ to: process.env.TARGET_WALLET_PUBLIC_ADDRESS, value: myBalance / 100n });
await tx.wait();
console.log(`Transaction hash: ${tx.hash}`);
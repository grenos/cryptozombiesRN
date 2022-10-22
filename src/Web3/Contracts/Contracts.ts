import { ethers, Wallet as EthersWallet } from 'ethers';
import { ZombieAbi } from '~Web3/Abi';
import { ethersProvider, WalletGlobal } from '../../../index';

export const Wallet: EthersWallet = new WalletGlobal().wallet;
const connectedWallet = Wallet?.connect(ethersProvider);

export const ZombieContract = new ethers.Contract(
    ZombieAbi.networks['11155111'].address,
    ZombieAbi.abi,
    connectedWallet,
);

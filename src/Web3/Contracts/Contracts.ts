import { ethers, Wallet as EthersWallet } from 'ethers';
import { ZombieAbi } from '~Web3/Abi';
import { WalletGlobal } from '../../../index';

export const Wallet: EthersWallet = new WalletGlobal().wallet;

export const ZombieContract = new ethers.Contract(
    ZombieAbi.networks['11155111'].address,
    ZombieAbi.abi,
    Wallet,
);

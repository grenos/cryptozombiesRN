import { ethers, Wallet as EthersWallet } from 'ethers';
import { ERC20, LinkAddress } from '~Web3/Abi';
import { WalletGlobal } from '../../../index';

const Wallet: EthersWallet = new WalletGlobal().wallet;
export const ChainLinkToken = new ethers.Contract(LinkAddress, ERC20, Wallet);

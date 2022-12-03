import { BigNumber, ethers } from 'ethers';
import { ERC20, LinkAddress } from '~Web3/Abi';
import { connectedWallet } from '../../..';

export const ChainLinkToken = new ethers.Contract(
    LinkAddress,
    ERC20,
    connectedWallet,
);

export const getTokenBalance = async (
    tokenAddress: string,
    walletAddress: string,
): Promise<BigNumber> => {
    let balance: BigNumber = BigNumber.from(0);
    try {
        const token = new ethers.Contract(tokenAddress, ERC20, connectedWallet);
        balance = await token.balanceOf(walletAddress);
    } catch (error) {
        console.log(error);
    }

    return balance;
};

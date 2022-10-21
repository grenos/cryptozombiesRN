import { useCallback, useEffect, useState } from 'react';
import { ethers } from 'ethers';
import { ethersProvider } from '../../../index';

export const useGetWallet = () => {
    const [address, setAddress] = useState('');
    const [mnemonic, setMnemmonic] = useState('');
    const [funds, setFunds] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    const getWallet = useCallback(async () => {
        const wallet = ethers.Wallet.fromMnemonic(
            'rely spot column badge lunch forest question about ketchup produce misery angry',
        );
        const connectedWallet = wallet.connect(ethersProvider);
        setAddress(connectedWallet.address);
        setMnemmonic(connectedWallet.mnemonic.phrase);

        const balance = await ethersProvider.getBalance(
            connectedWallet.address,
        );
        setFunds(ethers.utils.formatEther(ethers.BigNumber.from(balance)));
        setIsLoading(false);
    }, []);

    useEffect(() => {
        getWallet();
    }, [getWallet]);

    return { address, mnemonic, funds, isLoading };
};

// const contract = new ethers.Contract(
//     CONTRACT_ADDRESS,
//     TestContract.abi,
//     connectedWallet,
// );
// console.log(contract);
// const response = await contract.getValue();
// console.log(response.toString());
// const resp1 = await contract.setValue(5);
// console.log(resp1);
// contract.once('ValueChange', value => {
//     console.log('VALUE HAS CHAMGED TO : ' + value);
// });

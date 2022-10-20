export const TestContract = {
    contractName: 'TestContract',
    abi: [
        {
            anonymous: false,
            inputs: [
                {
                    indexed: false,
                    internalType: 'uint256',
                    name: 'testValue',
                    type: 'uint256',
                },
            ],
            name: 'ValueChange',
            type: 'event',
        },
        {
            inputs: [],
            name: 'getValue',
            outputs: [
                {
                    internalType: 'uint256',
                    name: '',
                    type: 'uint256',
                },
            ],
            stateMutability: 'view',
            type: 'function',
            constant: true,
        },
        {
            inputs: [
                {
                    internalType: 'uint256',
                    name: '_value',
                    type: 'uint256',
                },
            ],
            name: 'setValue',
            outputs: [],
            stateMutability: 'nonpayable',
            type: 'function',
        },
    ],
};

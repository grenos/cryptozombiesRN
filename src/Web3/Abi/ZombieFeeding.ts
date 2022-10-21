export const ZombieFeeding = [
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: 'uint256',
                name: 'zombieId',
                type: 'uint256',
            },
            {
                indexed: false,
                internalType: 'string',
                name: 'name',
                type: 'string',
            },
            {
                indexed: false,
                internalType: 'uint256',
                name: 'dna',
                type: 'uint256',
            },
        ],
        name: 'NewZombie',
        type: 'event',
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: 'address',
                name: 'previousOwner',
                type: 'address',
            },
            {
                indexed: true,
                internalType: 'address',
                name: 'newOwner',
                type: 'address',
            },
        ],
        name: 'OwnershipTransferred',
        type: 'event',
    },
    {
        inputs: [
            {
                internalType: 'string',
                name: '_name',
                type: 'string',
            },
        ],
        name: 'createRandomZombie',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [],
        name: 'owner',
        outputs: [
            {
                internalType: 'address',
                name: '',
                type: 'address',
            },
        ],
        stateMutability: 'view',
        type: 'function',
        constant: true,
    },
    {
        inputs: [],
        name: 'renounceOwnership',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'address',
                name: 'newOwner',
                type: 'address',
            },
        ],
        name: 'transferOwnership',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'uint256',
                name: '',
                type: 'uint256',
            },
        ],
        name: 'zombieToOwner',
        outputs: [
            {
                internalType: 'address',
                name: '',
                type: 'address',
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
                name: '',
                type: 'uint256',
            },
        ],
        name: 'zombies',
        outputs: [
            {
                internalType: 'string',
                name: 'name',
                type: 'string',
            },
            {
                internalType: 'uint256',
                name: 'dna',
                type: 'uint256',
            },
            {
                internalType: 'uint32',
                name: 'level',
                type: 'uint32',
            },
            {
                internalType: 'uint32',
                name: 'readyTime',
                type: 'uint32',
            },
            {
                internalType: 'uint16',
                name: 'winCount',
                type: 'uint16',
            },
            {
                internalType: 'uint16',
                name: 'lossCount',
                type: 'uint16',
            },
        ],
        stateMutability: 'view',
        type: 'function',
        constant: true,
    },
    {
        inputs: [
            {
                internalType: 'address',
                name: '_address',
                type: 'address',
            },
        ],
        name: 'setKittyContractAddress',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'uint256',
                name: '_zombieId',
                type: 'uint256',
            },
            {
                internalType: 'uint256',
                name: '_kittyId',
                type: 'uint256',
            },
        ],
        name: 'feedOnKitty',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
    },
];
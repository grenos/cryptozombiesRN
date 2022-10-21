require('dotenv').config();
const { MNEMONIC, INNFURA_API_KEY } = process.env;
const HDWalletProvider = require('@truffle/hdwallet-provider');

module.exports = {
    /*
     * $ truffle migrate --network sepolia
     */
    networks: {
        development: {
            host: '127.0.0.1',
            port: 7545,
            network_id: '*',
        },
        sepolia: {
            provider: () =>
                new HDWalletProvider(
                    MNEMONIC,
                    `https://sepolia.infura.io/v3/${INNFURA_API_KEY}`,
                ),
            network_id: 11155111,
            confirmations: 1,
            timeoutBlocks: 200,
        },
    },

    mocha: {},

    compilers: {
        solc: {
            version: '0.8.17',
        },
    },
};

const SafeMath16 = artifacts.require('SafeMath16');
const SafeMath32 = artifacts.require('SafeMath32');
// const zombieattack = artifacts.require('zombieattack');
// const zombiefactory = artifacts.require('zombiefactory');
// const zombiefeeding = artifacts.require('zombiefeeding');
// const zombiehelper = artifacts.require('zombiehelper');
const zombieownership = artifacts.require('zombieownership');

module.exports = function (deployer) {
    deployer.deploy(SafeMath16);
    deployer.deploy(SafeMath32);
    // deployer.deploy(zombieattack);
    // deployer.deploy(zombiefactory);
    // deployer.deploy(zombiefeeding);
    // deployer.deploy(zombiehelper);
    deployer.deploy(zombieownership);
};

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./zombiefactory.sol";

// this is an interface of a function of the ctyptokitty contract
abstract contract KittyInterface {
  function getKitty(uint256 _id) virtual external view returns (
    bool isGestating,
    bool isReady,
    uint256 cooldownIndex,
    uint256 nextActionAt,
    uint256 siringWithId,
    uint256 birthTime,
    uint256 matronId,
    uint256 sireId,
    uint256 generation,
    uint256 genes
  );
}

contract ZombieFeeding is ZombieFactory {

  KittyInterface kittyContract;

  modifier onlyOwnerOf(uint _zombieId) {
    require(msg.sender == zombieToOwner[_zombieId], "You are not the owner of this zombie");
    _;
  }

  function setKittyContractAddress(address _address) external onlyOwner {
    kittyContract = KittyInterface(_address);
  }

  // storage keyword -> points to the exact Zombie struct in the storage so any changes made in the function will be written to the blockchain
  function _triggerCooldown(Zombie storage _zombie) internal {
    _zombie.readyTime = uint32(block.timestamp + cooldownTime);
  }

  function _isReady(Zombie storage _zombie) internal view returns (bool) {
      return (_zombie.readyTime <= block.timestamp);
  }

  function feedAndMultiply(uint _zombieId, uint _targetDna, string memory _kittyName, string memory _species) internal onlyOwnerOf(_zombieId) {
    Zombie storage myZombie = zombies[_zombieId];
    require(_isReady(myZombie), "Zombie is still in cooldown period");
    _targetDna = _targetDna % dnaModulus;
    uint newDna = (myZombie.dna + _targetDna) / 2;
    // we cant directly compare strings so we convert to a hash and compare the hashes
    if (keccak256(abi.encodePacked(_species)) == keccak256(abi.encodePacked("kitty"))) {
      newDna = newDna - newDna % 100 + 99;
    }
    _createZombie(_kittyName, newDna);
    _triggerCooldown(myZombie);
  }

  function feedOnKitty(uint _zombieId, string memory _kittyName) public {
    // fake cryptokitty dna creation function
    uint kittyDna = _makeFakeKittyDna(_kittyName);
    // this is how we deconstruct a tuple so we can get only the values that we're interested in.
    // (,,,,,,,,,kittyDna) = kittyContract.getKitty(_kittyId);
    feedAndMultiply(_zombieId, kittyDna, _kittyName, "kitty");
  }

  function _makeFakeKittyDna(string memory _str) private pure returns (uint) {
    uint rand = uint(keccak256(abi.encodePacked(_str)));
    uint _dnaModulus = 10 ** 72;
    return rand % _dnaModulus;
  }
}

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "./SafeMath32.sol";
import "./SafeMath16.sol";

contract ZombieFactory is Ownable {

  // importing multiple instances of the same library for different types
  using SafeMath for uint256;
  using SafeMath32 for uint32;
  using SafeMath16 for uint16;

  event NewZombie(uint zombieId, string name, uint dna);

  uint dnaDigits = 16;
  // the two stars mean "in the power of" so in this case it would be 10^16
  uint dnaModulus = 10 ** dnaDigits;
  uint cooldownTime = 1 days;

  struct Zombie {
    string name;
    uint dna;
    uint32 level;
    uint32 readyTime;
    uint16 winCount;
    uint16 lossCount;
  }

  Zombie[] public zombies;

  mapping (uint => address) public zombieToOwner;
  mapping (address => uint) ownerZombieCount;


  // memory keyword -> to save something reference and not change what is written to the blockchain, in thi case the _name will be only available 
  // in the scope / execution of this function and then it gets deleted.

  // internal keyword -> this function is only callable from this contract or for any other contract that inherits from this contract.
  function _createZombie(string memory _name, uint _dna) internal {
    zombies.push(Zombie(_name, _dna, 1, uint32(block.timestamp + cooldownTime), 0, 0));
    uint id = zombies.length - 1;
    zombieToOwner[id] = msg.sender;
    ownerZombieCount[msg.sender] = ownerZombieCount[msg.sender].add(1);
    emit NewZombie(id, _name, _dna);
  }

  // private keyword -> this function is only callable from this contract
  // view keyword -> this function only allows read operations thus not using any gas. its free
  function _generateRandomDna(string memory _str) private view returns (uint) {
    // we cant directly compare strings so we convert to a hash and compare the hashes
    // or in this case we want to convert the string of the name to a uint so we can create the dna
    uint rand = uint(keccak256(abi.encodePacked(_str)));
    return rand % dnaModulus;
  }

  function createRandomZombie(string memory _name) public {
    require(ownerZombieCount[msg.sender] == 0);
    uint randDna = _generateRandomDna(_name);
    randDna = randDna - randDna % 100;
    _createZombie(_name, randDna);
  }

}

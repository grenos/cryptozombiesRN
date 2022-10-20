// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract TestContract {
    uint private testValue = 2;

    event ValueChange(uint testValue);

    function getValue() external view returns(uint) {
        return testValue;
    }

    function setValue(uint _value) external {
        testValue = _value;
        emit ValueChange(_value);
    }
}
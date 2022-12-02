// SPDX-License-Identifier: MIT
pragma solidity ^0.8.14;

contract MyAbi {
    uint256 public number;

    function callWithoutAbi(uint256 data) public pure returns (uint256) {
        return data + 1;
    }

    function changeWithoutAbi() public {
        number++;
    }
}

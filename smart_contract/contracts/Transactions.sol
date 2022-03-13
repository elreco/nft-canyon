// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Transactions {
    address private owner;
    uint256 private amount = 10000000000000000;
    address payable receiver = payable(0xe0C5123B0FD1A7D94bB8D84bBAF1026B699C6dC6);
    mapping (address => uint) balanceOf;

    event Transfer(address indexed sender, address indexed receiver, uint256 amount, string remark, uint256 timestamp);

    constructor() {
        owner = msg.sender;
        balanceOf[tx.origin] = msg.sender.balance;
    }

    function sendMoney(string memory remark) public returns(bool success) {
        if (balanceOf[owner] < amount) return false;
        balanceOf[owner] -= amount;
        balanceOf[receiver] += amount;

        emit Transfer(msg.sender, receiver, amount, remark, block.timestamp);
        return true;
    }

    function getBalance(address addr) public view returns(uint) {
        return balanceOf[addr];
    }

    function getAmount() public view returns(uint256) {
        return amount;
    }

    function getReceiver() public view returns(address) {
        return receiver;
    }
}
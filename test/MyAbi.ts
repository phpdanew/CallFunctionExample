import { expect } from "chai";
import { ethers } from "hardhat";
import { MyAbi } from "../typechain-types";

describe("CallTest", () => {
  let contract: any;
  beforeEach(async () => {
    const contractFactory = await ethers.getContractFactory("MyAbi");
    const instance = await contractFactory.deploy();
    contract = await instance.deployed();
    console.log(`contract address:${contract.address}`);
  });

  it("without abi call", async () => {
    const [signer] = await ethers.getSigners();
    const funcSig = "0xf3642cb9";
    const param = ethers.utils.hexZeroPad("0xa", 32);
    const data = ethers.utils.hexConcat([funcSig, param]);
    const ret = await signer.provider!.call({
      from: signer.address,
      to: contract.address,
      data: data,
    });
    expect(ret).to.equal(
      "0x000000000000000000000000000000000000000000000000000000000000000b"
    );
  });
  it("without abi sendTransaction", async () => {
    const [signer] = await ethers.getSigners();
    const funcSig = "0x197e5151";
    const tx = {
      from: signer.address,
      to: contract.address,
      data: funcSig,
    };
    const ret = await signer.sendTransaction(tx);
    await ret.wait();
    const myAbiContract: MyAbi = contract;
    const number = await myAbiContract.number();
    expect(number.toNumber()).to.equal(1);
  });
});

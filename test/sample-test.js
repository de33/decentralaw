const { expect } = require("chai");

describe("ContractSign", function () {
  it("Should return the new greeting once it's changed", async function () {
    const ContractSign = await ethers.getContractFactory("ContractSign");
    const contractSign = await ContractSign.deploy();
    await contractSign.deployed();

    expect(await contractSign.contractSign()).to.equal("Hello, world!");

    const setContractSignTx = await contractSign.setGreeting("Hola, mundo!");

    // wait until the transaction is mined
    await setContractSignTx.wait();

    expect(await contractSign.contractSign()).to.equal("Hola, mundo!");
  });
});

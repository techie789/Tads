const AidTracker = artifacts.require("AidTracker");

contract("AidTracker", (accounts) => {
  it("should allow verified users to donate", async () => {
    const aidTracker = await AidTracker.deployed();
    await aidTracker.verifyUser(accounts[0]);
    await aidTracker    .donate({ from: accounts[0], value: web3.utils.toWei("1", "ether") });
    const donations = await aidTracker.getDonations();
    assert.equal(donations.length, 1);
    assert.equal(donations[0].donor, accounts[0]);
    assert.equal(donations[0].amount, web3.utils.toWei("1", "ether"));
  });

  it("should allow verified users to request aid", async () => {
    const aidTracker = await AidTracker.deployed();
    await aidTracker.verifyUser(accounts[1]);
    await aidTracker.requestAid("Need food supplies", web3.utils.toWei("0.5", "ether"), { from: accounts[1] });
    const requests = await aidTracker.getRequests();
    assert.equal(requests.length, 1);
    assert.equal(requests[0].recipient, accounts[1]);
    assert.equal(requests[0].description, "Need food supplies");
    assert.equal(requests[0].amount, web3.utils.toWei("0.5", "ether"));
    assert.equal(requests[0].fulfilled, false);
  });

  it("should allow verified users to fulfill aid requests", async () => {
    const aidTracker = await AidTracker.deployed();
    await aidTracker.donate({ from: accounts[0], value: web3.utils.toWei("1", "ether") });
    await aidTracker.fulfillRequest(0, { from: accounts[0] });
    const requests = await aidTracker.getRequests();
    assert.equal(requests[0].fulfilled, true);
    const recipientBalance = await web3.eth.getBalance(accounts[1]);
    assert.equal(recipientBalance, web3.utils.toWei("100.5", "ether")); // assuming initial balance was 100 ETH
  });
});

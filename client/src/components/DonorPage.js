import React, { useState } from 'react';
import web3 from '../utils/web3';
import AidTracker from '../abis/AidTracker.json';

const DonorPage = () => {
  const [amount, setAmount] = useState('');

  const donate = async (event) => {
    event.preventDefault();
    const accounts = await web3.eth.getAccounts();
    const networkId = await web3.eth.net.getId();
    const networkData = AidTracker.networks[networkId];
    if (networkData) {
      const aidTracker = new web3.eth.Contract(AidTracker.abi, networkData.address);
      await aidTracker.methods.donate().send({ from: accounts[0], value: web3.utils.toWei(amount, 'ether') });
    } else {
      console.error('Smart contract not deployed to detected network.');
    }
  };

  return (
    <div>
      <h2>Donor Page</h2>
      <form onSubmit={donate}>
        <div>
          <label>Amount (ETH): </label>
          <input type="text" value={amount} onChange={(e) => setAmount(e.target.value)} />
        </div>
        <button type="submit">Donate</button>
      </form>
    </div>
  );
};

export default DonorPage;

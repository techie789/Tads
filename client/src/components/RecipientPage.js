import React, { useState, useEffect } from 'react';
import web3 from '../utils/web3';
import AidTracker from '../abis/AidTracker.json';

const RecipientPage = () => {
  const [requests, setRequests] = useState([]);
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');

  useEffect(() => {
    const loadRequests = async () => {
      const networkId = await web3.eth.net.getId();
      const networkData = AidTracker.networks[networkId];
      if (networkData) {
        const aidTracker = new web3.eth.Contract(AidTracker.abi, networkData.address);
        const requestList = await aidTracker.methods.getRequests().call();
        setRequests(requestList);
      } else {
        console.error('Smart contract not deployed to detected network.');
      }
    };

    loadRequests();
  }, []);

  const requestAid = async (event) => {
    event.preventDefault();
    const accounts = await web3.eth.getAccounts();
    const networkId = await web3.eth.net.getId();
    const networkData = AidTracker.networks[networkId];
    if (networkData) {
      const aidTracker = new web3.eth.Contract(AidTracker.abi, networkData.address);
      await aidTracker.methods.requestAid(description, web3.utils.toWei(amount, 'ether')).send({ from: accounts[0] });
    } else {
      console.error('Smart contract not deployed to detected network.');
    }
  };

  return (
    <div>
      <h2>Recipient Page</h2>
      <form onSubmit={requestAid}>
        <div>
          <label>Description: </label>
          <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
        </div>
        <div>
          <label>Amount (ETH): </label>
          <input type="text" value={amount} onChange={(e) => setAmount(e.target.value)} />
        </div>
        <button type="submit">Request Aid</button>
      </form>
      <h3>Existing Requests</h3>
      <ul>
        {requests.map((request, index) => (
          <li key={index}>
            Recipient: {request.recipient} | Description: {request.description} | Amount: {web3.utils.fromWei(request.amount, 'ether')} ETH | Fulfilled: {request.fulfilled ? 'Yes' : 'No'}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecipientPage;

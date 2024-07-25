import React, { useState, useEffect } from 'react';
import web3 from '../utils/web3';
import AidTracker from '../abis/AidTracker.json';

const Dashboard = () => {
  const [donations, setDonations] = useState([]);

  useEffect(() => {
    const loadDonations = async () => {
      const networkId = await web3.eth.net.getId();
      const networkData = AidTracker.networks[networkId];
      if (networkData) {
        const aidTracker = new web3.eth.Contract(AidTracker.abi, networkData.address);
        const donationList = await aidTracker.methods.getDonations().call();
        setDonations(donationList);
      } else {
        console.error('Smart contract not deployed to detected network.');
      }
    };

    loadDonations();
  }, []);

  return (
    <div>
      <h2>Dashboard</h2>
      <ul>
        {donations.map((donation, index) => (
          <li key={index}>
            Donor: {donation.donor} | Amount: {web3.utils.fromWei(donation.amount, 'ether')} ETH | Timestamp: {new Date(donation.timestamp * 1000).toLocaleString()}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;

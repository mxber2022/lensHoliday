export const CONTRACT_ADDRESS = '0x14F9AF6a7cbd60A757Aef5a55AD75D5cCccF28B9';

export const CONTRACT_ABI = [
  {
    "inputs": [
      { "name": "_title", "type": "string" },
      { "name": "_description", "type": "string" },
      { "name": "_goal", "type": "string" },
      { "name": "_startTime", "type": "uint256" },
      { "name": "_endTime", "type": "uint256" },
      { "name": "_registrationStartTime", "type": "uint256" },
      { "name": "_registrationEndTime", "type": "uint256" },
      { "name": "_minStake", "type": "uint256" }
    ],
    "name": "createContest",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{ "name": "_contestId", "type": "uint256" }],
    "name": "registerForContest",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [{ "name": "_contestId", "type": "uint256" }],
    "name": "joinContest",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      { "name": "_contestId", "type": "uint256" },
      { "name": "_participant", "type": "address" }
    ],
    "name": "registeredParticipants",
    "outputs": [{ "name": "", "type": "bool" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{ "name": "_contestId", "type": "uint256" }],
    "name": "getContest",
    "outputs": [
      { "name": "title", "type": "string" },
      { "name": "description", "type": "string" },
      { "name": "goal", "type": "string" },
      { "name": "startTime", "type": "uint256" },
      { "name": "endTime", "type": "uint256" },
      { "name": "registrationStartTime", "type": "uint256" },
      { "name": "registrationEndTime", "type": "uint256" },
      { "name": "totalStaked", "type": "uint256" },
      { "name": "minStake", "type": "uint256" },
      { "name": "participantCount", "type": "uint256" },
      { "name": "active", "type": "bool" }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "contestCount",
    "outputs": [{ "name": "", "type": "uint256" }],
    "stateMutability": "view",
    "type": "function"
  }
];
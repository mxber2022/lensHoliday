# DreamStake 🌟

Dream Stake is a decentralized contest platform where participants pool their assets, which are then staked in yield-generating protocols like Aave. Participants compete by completing predefined goals, and those who successfully achieve these goals share the interest earned on the pooled assets.

## Features ✨

- **Challenge Creation**: Create custom challenges with specific goals and timeframes
- **Stake-Based Accountability**: Stake ETH to commit to your goals
- **Proof Submission**: Document your progress with descriptions and file uploads
- **Reward System**: Earn rewards through yield farming upon successful completion
- **Community Engagement**: Join challenges and track participants' progress

## Tech Stack 🛠️

- **Frontend**: React + TypeScript + Vite
- **Styling**: TailwindCSS
- **Web3**:
  - Wagmi for Ethereum interactions
  - ConnectKit for wallet connection
  - Viem for Ethereum utilities
- **Smart Contracts**: Solidity
- **Storage**: Supabase for proof storage
- **UI Components**: Custom components with Lucide icons

## Getting Started 🚀

1. Clone the repository:

```bash
git clone https://github.com/mxber2022/dreamstake.git
cd dreamstake
```

2. Install dependencies:

```bash
npm install
```

3. Set up environment variables:
   Create a `.env` file with:

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_key
VITE_WALLETCONNECT_PROJECT_ID=your_walletconnect_id
```

4. Start the development server:

```bash
npm run dev
```

## Smart Contract 📄

The DreamContest smart contract is deployed on Lens testnet at:
``

### Key Functions:

- `createContest`: Create a new challenge
- `registerForContest`: Register for a challenge
- `joinContest`: Join and stake in a challenge
- `completeGoal`: Mark a goal as completed (owner only)
- `claimRewards`: Claim rewards after successful completion

## Project Structure 📁

```
src/
├── components/         # React components
├── hooks/             # Custom React hooks
├── config/            # Configuration files
├── lib/              # Utility functions and libraries
├── types/            # TypeScript type definitions
└── App.tsx           # Main application component
```

## Contributing 🤝

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License 📝

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments 🙏

- [OpenZeppelin](https://openzeppelin.com/) for secure smart contract components
- [Wagmi](https://wagmi.sh/) for React hooks for Ethereum
- [ConnectKit](https://docs.family.co/connectkit) for wallet connection
- [Lucide](https://lucide.dev/) for beautiful icons

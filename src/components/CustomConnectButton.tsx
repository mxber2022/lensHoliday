import React from 'react';
import { ConnectKitButton } from 'connectkit';

export function CustomConnectButton() {
  return (
    <ConnectKitButton.Custom>
      {({ isConnected, isConnecting, show, address, ensName }) => {
        return (
          <button
            onClick={show}
            className="btn-primary flex items-center gap-2 min-w-[160px] justify-center"
          >
            {isConnected ? (
              <span>
                {ensName || `${address?.slice(0, 6)}...${address?.slice(-4)}`}
              </span>
            ) : isConnecting ? (
              <span>Connecting...</span>
            ) : (
              <span>Connect Wallet</span>
            )}
          </button>
        );
      }}
    </ConnectKitButton.Custom>
  );
}
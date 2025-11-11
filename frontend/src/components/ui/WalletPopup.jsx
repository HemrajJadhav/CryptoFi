import { motion } from "framer-motion";
import { X } from "lucide-react";
import { useState } from "react";
import NeoButton from "../common/NeoButton";

const WalletPopup = ({ onClose, onConnect }) => {
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState("");

  const wallets = [
    {
      name: "MetaMask",
      icon: "🦊",
      connector: connectMetaMask,
      id: "metamask",
    },
    {
      name: "Coinbase Wallet",
      icon: "💙",
      connector: connectCoinbaseWallet,
      id: "coinbase",
    },
    {
      name: "WalletConnect",
      icon: "🔗",
      connector: connectWalletConnect,
      id: "walletconnect",
    },
  ];

  // MetaMask Connection Function
  async function connectMetaMask() {
    try {
      setIsConnecting(true);
      setError("");

      // Check if MetaMask is installed
      if (!window.ethereum) {
        throw new Error(
          "MetaMask is not installed. Please install it to continue."
        );
      }

      // Check if it's actually MetaMask
      if (!window.ethereum.isMetaMask) {
        throw new Error("Please use MetaMask wallet.");
      }

      // Request account access
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });

      if (accounts.length === 0) {
        throw new Error(
          "No accounts found. Please connect an account in MetaMask."
        );
      }

      const userAddress = accounts[0];

      // Get chain ID
      const chainId = await window.ethereum.request({
        method: "eth_chainId",
      });

      // Return only essential data (no provider object to avoid circular references)
      const connectionData = {
        address: userAddress,
        chainId: parseInt(chainId),
        walletType: "metamask",
        // Don't include the provider object as it causes circular reference issues
      };

      return connectionData;
    } catch (error) {
      console.error("MetaMask connection error:", error);

      // Handle specific MetaMask errors
      if (error.code === 4001) {
        throw new Error("Connection rejected by user.");
      } else if (error.code === -32002) {
        throw new Error(
          "Connection request already pending. Please check MetaMask."
        );
      } else {
        throw new Error(error.message || "Failed to connect to MetaMask.");
      }
    } finally {
      setIsConnecting(false);
    }
  }

  // Coinbase Wallet Connection (placeholder)
  async function connectCoinbaseWallet() {
    try {
      if (window.coinbaseWalletExtension) {
        const accounts = await window.coinbaseWalletExtension.request({
          method: "eth_requestAccounts",
        });
        return {
          address: accounts[0],
          walletType: "coinbase",
        };
      } else {
        throw new Error("Coinbase Wallet not detected");
      }
    } catch (error) {
      throw new Error("Coinbase Wallet not available");
    }
  }

  // WalletConnect Connection (placeholder)
  async function connectWalletConnect() {
    throw new Error("WalletConnect integration coming soon");
  }

  const handleWalletConnect = async (walletConnector, walletName) => {
    try {
      setError("");
      const connectionData = await walletConnector();

      // Call the parent component's onConnect with wallet data
      if (onConnect) {
        onConnect(connectionData);
      }

      // Close the popup on successful connection
      onClose();
    } catch (err) {
      setError(`Failed to connect to ${walletName}: ${err.message}`);
    }
  };

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center"
      initial="hidden"
      animate="visible"
      exit="hidden"
      variants={{
        hidden: { opacity: 0 },
        visible: { opacity: 1 },
      }}
    >
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 10 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        className="bg-white rounded-xl p-6 shadow-2xl w-80 relative z-10"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-3 right-3 text-gray-500 hover:text-black"
          onClick={onClose}
          disabled={isConnecting}
        >
          <X className="w-5 h-5" />
        </button>

        <h2 className="text-2xl font-bold mb-4 text-center">Connect Wallet</h2>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
            {error}
          </div>
        )}

        {isConnecting && (
          <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg text-blue-700 text-sm text-center">
            <div className="flex items-center justify-center gap-2">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-700"></div>
              Connecting to wallet...
            </div>
          </div>
        )}

        <div className="flex flex-col gap-3">
          {wallets.map((wallet) => (
            <NeoButton
              key={wallet.id}
              variant="secondary"
              fullWidth
              onClick={() => handleWalletConnect(wallet.connector, wallet.name)}
              disabled={isConnecting}
            >
              <span className="text-xl mr-2">{wallet.icon}</span>
              {wallet.name}
            </NeoButton>
          ))}
        </div>

        <div className="mt-4 text-xs text-gray-500 text-center">
          By connecting, I accept the Terms of Service
        </div>
      </motion.div>
    </motion.div>
  );
};

export default WalletPopup;

import { motion } from "framer-motion";
import { X } from "lucide-react";
import NeoButton from "../common/NeoButton";

const WalletPopup = ({ onClose }) => {
  const wallets = [
    { name: "MetaMask", icon: "🦊" },
    { name: "Coinbase Wallet", icon: "💙" },
    { name: "WalletConnect", icon: "🔗" },
  ];

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
        >
          <X className="w-5 h-5" />
        </button>
        <h2 className="text-2xl font-bold mb-4 text-center">Connect Wallet</h2>
        <div className="flex flex-col gap-3">
          {wallets.map((wallet) => (
            <NeoButton
              key={wallet.name}
              variant="secondary"
              fullWidth
              onClick={() => onClose()}
            >
              <span className="text-xl mr-2">{wallet.icon}</span>
              {wallet.name}
            </NeoButton>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default WalletPopup;

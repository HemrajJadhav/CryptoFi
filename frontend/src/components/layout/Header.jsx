import { Wallet } from "lucide-react";
import NeoButton from "../common/NeoButton";

const Header = ({ onOpenWallet }) => {
  return (
    <header className="w-full flex justify-end items-center py-4 mb-8 z-10 relative">
      <NeoButton variant="connect" icon={Wallet} onClick={onOpenWallet}>
        Connect Wallet
      </NeoButton>
    </header>
  );
};

export default Header;

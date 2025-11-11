import React, { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import Sidebar from "./components/layout/Sidebar";
import Header from "./components/layout/Header";
import WalletPopup from "./components/ui/WalletPopup";
import LoginPage from "./components/pages/LoginPage";
import DashboardPage from "./components/pages/DashboardPage";
import InvestPage from "./components/pages/InvestPage";
import BorrowPage from "./components/pages/BorrowPage";
import LiquidatePage from "./components/pages/LiquidatePage";
import AnimatedPage from "./components/common/AnimatedPage";

export default function App() {
  const [currentPage, setCurrentPage] = useState("login");
  const [showWalletPopup, setShowWalletPopup] = useState(false);
  const [walletData, setWalletData] = useState(null);
  const [isConnected, setIsConnected] = useState(false);

  const handleLogin = () => setCurrentPage("dashboard");
  const handleLogout = () => {
    setCurrentPage("login");
    setWalletData(null);
    setIsConnected(false);
    // Clear localStorage on logout
    localStorage.removeItem("walletConnection");
  };

  const openWallet = () => setShowWalletPopup(true);
  const closeWallet = () => setShowWalletPopup(false);

  // Handle wallet connection
  const handleWalletConnect = (connectionData) => {
    // Create a clean object without circular references for storage
    const cleanConnectionData = {
      address: connectionData.address,
      chainId: connectionData.chainId,
      walletType: connectionData.walletType,
      // Don't store the provider object as it contains circular references
    };

    setWalletData(connectionData);
    setIsConnected(true);

    // Format address for display
    const formattedAddress = `${connectionData.address.slice(
      0,
      6
    )}...${connectionData.address.slice(-4)}`;
    console.log(`Connected to: ${formattedAddress}`);

    // Store only the essential data in localStorage
    localStorage.setItem(
      "walletConnection",
      JSON.stringify(cleanConnectionData)
    );
  };

  // Check for existing wallet connection on app load
  useEffect(() => {
    const savedConnection = localStorage.getItem("walletConnection");
    if (savedConnection) {
      try {
        const connectionData = JSON.parse(savedConnection);
        setWalletData(connectionData);
        setIsConnected(true);
      } catch (error) {
        console.error("Error loading saved wallet connection:", error);
        localStorage.removeItem("walletConnection");
      }
    }
  }, []);

  return (
    <>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800;900&display=swap'); body { font-family: 'Poppins', sans-serif; }`}</style>

      <div className=" font-space relative min-h-screen w-full">
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `radial-gradient(circle at 30% 70%, rgba(173, 216, 230, 0.35), transparent 60%), radial-gradient(circle at 70% 30%, rgba(255, 182, 193, 0.4), transparent 60%)`,
            backgroundColor: "#fefcff",
          }}
        />

        <div
          className={`relative z-10 ${showWalletPopup ? "filter blur-sm" : ""}`}
        >
          <AnimatePresence mode="wait">
            {currentPage === "login" ? (
              <AnimatedPage key="login">
                <LoginPage onLogin={handleLogin} />
              </AnimatedPage>
            ) : (
              <AnimatedPage key="layout">
                <div className="flex w-full min-h-screen">
                  <Sidebar
                    setCurrentPage={setCurrentPage}
                    onLogout={handleLogout}
                  />
                  <main className="flex-1 p-8 overflow-y-auto relative">
                    <Header
                      onOpenWallet={openWallet}
                      isConnected={isConnected}
                      walletData={walletData}
                    />
                    <AnimatePresence mode="wait">
                      <AnimatedPage key={currentPage}>
                        {currentPage === "dashboard" && (
                          <DashboardPage walletData={walletData} />
                        )}
                        {currentPage === "invest" && (
                          <InvestPage walletData={walletData} />
                        )}
                        {currentPage === "borrow" && (
                          <BorrowPage walletData={walletData} />
                        )}
                        {currentPage === "liquidate" && (
                          <LiquidatePage walletData={walletData} />
                        )}
                      </AnimatedPage>
                    </AnimatePresence>
                  </main>
                </div>
              </AnimatedPage>
            )}
          </AnimatePresence>
        </div>

        <AnimatePresence>
          {showWalletPopup && (
            <WalletPopup
              onClose={closeWallet}
              onConnect={handleWalletConnect}
            />
          )}
        </AnimatePresence>
      </div>
    </>
  );
}

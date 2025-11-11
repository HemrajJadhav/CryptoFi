import React, { useState } from "react";
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

  const handleLogin = () => setCurrentPage("dashboard");
  const handleLogout = () => setCurrentPage("login");
  const openWallet = () => setShowWalletPopup(true);
  const closeWallet = () => setShowWalletPopup(false);

  return (
    <>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800;900&display=swap'); body { font-family: 'Poppins', sans-serif; }`}</style>

      <div className="relative font-space min-h-screen w-full">
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
                    <Header onOpenWallet={openWallet} />
                    <AnimatePresence mode="wait">
                      <AnimatedPage key={currentPage}>
                        {currentPage === "dashboard" && <DashboardPage />}
                        {currentPage === "invest" && <InvestPage />}
                        {currentPage === "borrow" && <BorrowPage />}
                        {currentPage === "liquidate" && <LiquidatePage />}
                      </AnimatedPage>
                    </AnimatePresence>
                  </main>
                </div>
              </AnimatedPage>
            )}
          </AnimatePresence>
        </div>

        <AnimatePresence>
          {showWalletPopup && <WalletPopup onClose={closeWallet} />}
        </AnimatePresence>
      </div>
    </>
  );
}

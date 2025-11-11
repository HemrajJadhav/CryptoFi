import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  PiggyBank,
  ArrowDownUp,
  Flame,
  LogOut,
  X,
  ChevronLeftCircle,
  ChevronRightCircle,
} from "lucide-react";
import NeoButton from "../common/NeoButton";

const Sidebar = ({ setCurrentPage, onLogout }) => {
  const [isOpen, setIsOpen] = useState(true);
  const handleClose = () => setIsOpen(!isOpen);

  const navItems = [
    { name: "Dashboard", icon: LayoutDashboard, page: "dashboard" },
    { name: "Invest", icon: PiggyBank, page: "invest" },
    { name: "Borrow", icon: ArrowDownUp, page: "borrow" },
    { name: "Liquidate", icon: Flame, page: "liquidate" },
  ];

  return (
    <motion.nav
      className="border-r border-gray-200 h-screen flex flex-col p-4 shadow-lg backdrop-blur-2xl z-10 sticky top-0"
      initial={{ width: "250px" }}
      animate={{ width: isOpen ? "250px" : "90px" }}
      transition={{ type: "spring" }}
    >
      <div className="flex items-center justify-between mb-8 px-2 w-full overflow-hidden">
        <motion.h1
          initial={{ opacity: 1 }}
          animate={{ opacity: isOpen ? 1 : 0 }}
          className={`text-3xl font-black flex  ${isOpen ? "w-full" : "w-0"}`}
        >
          <span className="font-space font-bold text-4xl">Crypto</span>
          <span className="text-blue-600 font-space text-4xl">Fi</span>
        </motion.h1>
        <div
          className={`absolute transition-all ${
            isOpen ? "right-5" : "left-6.5"
          } `}
        >
          {isOpen ? (
            <ChevronLeftCircle
              onClick={handleClose}
              className="w-6 h-6 text-gray-600 hover:text-black bg-gray-100 rounded-sm hover:bg-gray-300 cursor-pointer "
            />
          ) : (
            <ChevronRightCircle
              onClick={handleClose}
              className="w-6 h-6 text-gray-600 hover:text-black bg-gray-100 rounded-sm hover:bg-gray-300 cursor-pointer"
            />
          )}
        </div>
      </div>

      <div className="flex-1 flex flex-col gap-3">
        {navItems.map((item) => (
          <NeoButton
            key={item.page}
            onClick={() => setCurrentPage(item.page)}
            className={`w-full ${isOpen ? "justify-start" : "justify-center"}`}
            variant="secondary"
          >
            <item.icon
              className={`w-7 h-7 transition-all duration-200 ${
                isOpen ? "" : "hidden"
              }`}
            />
            <item.icon
              className={`w-7 h-7 transition-all duration-200 ${
                isOpen ? "hidden" : ""
              }`}
            />
            <motion.span
              initial={{ opacity: 1 }}
              animate={{
                opacity: isOpen ? 1 : 0,
                display: isOpen ? "block" : "none",
              }}
              className="ml-2"
            >
              {item.name}
            </motion.span>
          </NeoButton>
        ))}
      </div>

      <div className="mt-auto flex flex-col gap-4">
        <div
          className={`flex items-center gap-3 mb-4 ${
            isOpen ? "px-2" : "justify-center"
          }`}
        >
          <div className="w-10 h-10 rounded-3xl border-2 flex items-center justify-center font-bold text-lg bg-gray-100 border-gray-300">
            HJ
          </div>

          {isOpen && (
            <div>
              <p className="font-bold">Hemraj Jadhav</p>
              <p className="text-xs text-gray-500">Investor</p>
            </div>
          )}
        </div>

        <NeoButton
          onClick={onLogout}
          className={`w-full ${isOpen ? "justify-start" : "justify-center"}`}
          variant="secondary"
        >
          <LogOut className="w-6 h-6" />
          <motion.span
            initial={{ opacity: 1 }}
            animate={{
              opacity: isOpen ? 1 : 0,
              display: isOpen ? "block" : "none",
            }}
            className="ml-2"
          >
            Logout
          </motion.span>
        </NeoButton>
      </div>
    </motion.nav>
  );
};

export default Sidebar;

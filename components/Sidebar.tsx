
import React from 'react';
import type { Page } from '../types';
import { DashboardIcon, TransactionsIcon, GovernanceIcon, SecurityIcon, LogoIcon } from './icons';

interface SidebarProps {
  currentPage: Page;
  setCurrentPage: (page: Page) => void;
}

const NavItem: React.FC<{
  pageName: Page;
  currentPage: Page;
  setCurrentPage: (page: Page) => void;
  children: React.ReactNode;
}> = ({ pageName, currentPage, setCurrentPage, children }) => {
  const isActive = currentPage === pageName;
  return (
    <li
      onClick={() => setCurrentPage(pageName)}
      className={`flex items-center p-3 my-1 rounded-lg cursor-pointer transition-colors duration-200 ${
        isActive
          ? 'bg-blue-600/20 text-blue-300'
          : 'text-gray-400 hover:bg-gray-700/50 hover:text-white'
      }`}
    >
      {children}
      <span className="ml-3 font-medium">{pageName}</span>
    </li>
  );
};

const Sidebar: React.FC<SidebarProps> = ({ currentPage, setCurrentPage }) => {
  return (
    <nav className="w-64 bg-gray-900/70 backdrop-blur-lg border-r border-gray-800 p-5 flex-col hidden md:flex">
      <div className="flex items-center space-x-3 mb-10">
        <LogoIcon className="w-10 h-10 text-blue-500" />
        <span className="text-2xl font-semibold text-white">DeFiChain</span>
      </div>
      <ul>
        <NavItem pageName="Dashboard" currentPage={currentPage} setCurrentPage={setCurrentPage}>
          <DashboardIcon className="w-6 h-6" />
        </NavItem>
        <NavItem pageName="Transactions" currentPage={currentPage} setCurrentPage={setCurrentPage}>
          <TransactionsIcon className="w-6 h-6" />
        </NavItem>
        <NavItem pageName="Governance" currentPage={currentPage} setCurrentPage={setCurrentPage}>
          <GovernanceIcon className="w-6 h-6" />
        </NavItem>
        <NavItem pageName="Security" currentPage={currentPage} setCurrentPage={setCurrentPage}>
          <SecurityIcon className="w-6 h-6" />
        </NavItem>
      </ul>
      <div className="mt-auto text-center text-gray-500 text-xs">
          <p>&copy; 2024 DeFiChain Simulator</p>
          <p>This is a simulation. Not real finance.</p>
      </div>
    </nav>
  );
};

export default Sidebar;

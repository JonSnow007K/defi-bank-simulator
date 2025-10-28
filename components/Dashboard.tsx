import React from 'react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import type { UserAccount, TransactionType, BalanceData } from '../types';
import { DepositIcon, WithdrawIcon, TransferIcon } from './icons';

interface DashboardProps {
  account: UserAccount | null;
  balanceHistory: BalanceData[];
  onAction: (type: TransactionType) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ account, balanceHistory, onAction }) => {
  if (!account) return null;

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-gray-700/80 p-2 border border-gray-600 rounded-md shadow-lg">
          <p className="label text-sm text-gray-300">{`${label}`}</p>
          <p className="intro text-white font-bold">{`Balance: ₹${payload[0].value.toLocaleString()}`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Balance Card */}
        <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700">
          <h2 className="text-gray-400 text-sm font-medium mb-2">Total Balance</h2>
          <p className="text-4xl font-bold text-white">₹{account.balance.toLocaleString()}</p>
          <p className="text-green-400 text-sm mt-1">+2.5% vs last month</p>
        </div>

        {/* Action Buttons */}
        <div className="md:col-span-2 bg-gray-800/50 p-6 rounded-xl border border-gray-700 flex items-center justify-around">
          <ActionButton icon={<DepositIcon />} label="Deposit" onClick={() => onAction('Deposit')} />
          <ActionButton icon={<WithdrawIcon />} label="Withdraw" onClick={() => onAction('Withdraw')} />
          <ActionButton icon={<TransferIcon />} label="Transfer" onClick={() => onAction('Transfer')} />
        </div>
      </div>

      {/* Balance History Chart */}
      <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700">
        <h2 className="text-lg font-semibold text-white mb-4">Balance History</h2>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={balanceHistory}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#4A5568" />
              <XAxis dataKey="name" stroke="#A0AEC0" />
              <YAxis stroke="#A0AEC0" tickFormatter={(value) => `₹${Number(value).toLocaleString()}`} />
              <Tooltip content={<CustomTooltip />} />
              <defs>
                <linearGradient id="colorBalance" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#2563EB" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#2563EB" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <Area type="monotone" dataKey="balance" stroke="#3B82F6" fill="url(#colorBalance)" fillOpacity={1} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

const ActionButton: React.FC<{ icon: React.ReactNode; label: string; onClick: () => void; }> = ({ icon, label, onClick }) => (
  <div className="flex flex-col items-center space-y-2">
    <button
      onClick={onClick}
      className="w-16 h-16 bg-blue-600/20 hover:bg-blue-600/40 rounded-full flex items-center justify-center text-blue-300 transition-colors duration-300"
    >
      {icon}
    </button>
    <span className="text-sm font-medium text-gray-300">{label}</span>
  </div>
);

export default Dashboard;

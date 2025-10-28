import React from 'react';
import type { Transaction, TransactionStatus, TransactionAction, TokenHolder } from '../types';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, AreaChart, Area } from 'recharts';
import { TransactionsIcon, UsersIcon, LockClosedIcon } from './icons';

const getStatusBadge = (status: TransactionStatus) => {
  switch (status) {
    case 'Completed':
      return 'bg-green-500/20 text-green-300';
    case 'Pending':
      return 'bg-yellow-500/20 text-yellow-300';
    case 'Failed':
      return 'bg-red-500/20 text-red-300';
  }
};

const getActionColor = (action: TransactionAction) => {
    if (action.includes('In') || action.includes('Deposit')) return 'text-green-400';
    if (action.includes('Out') || action.includes('Withdrawal')) return 'text-red-400';
    return 'text-gray-300';
};

const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-gray-700/80 p-2 border border-gray-600 rounded-md shadow-lg">
          <p className="label text-sm text-gray-300">{`Address: ${label}`}</p>
          <p className="intro text-white font-bold">{`Balance: $${payload[0].value.toLocaleString()}`}</p>
        </div>
      );
    }
    return null;
};

const Transactions: React.FC<{ transactions: Transaction[], tokenHolders: TokenHolder[] }> = ({ transactions, tokenHolders }) => {
  const activeParticipants = new Set([...transactions.map(t => t.from), ...transactions.map(t => t.to)]).size;
  const totalValueLocked = tokenHolders.reduce((acc, holder) => acc + holder.balance, 0);

  const formattedTokenHolders = tokenHolders.map(h => ({
      name: `${h.address.slice(0, 6)}...`,
      balance: h.balance
  }));

  const transactionVolume = transactions.map(t => ({
      date: new Date(t.date).toLocaleDateString(),
      amount: t.amount
  })).reverse();


  return (
    <div className="space-y-6">
        <div>
            <h2 className="text-2xl font-bold text-white">Network Analytics</h2>
            <p className="text-gray-400 mt-1">An overview of on-chain activity and token distribution.</p>
        </div>

        {/* Stat Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <StatCard icon={<TransactionsIcon className="w-6 h-6"/>} title="Total Transactions" value={transactions.length.toLocaleString()} />
            <StatCard icon={<UsersIcon className="w-6 h-6"/>} title="Active Participants" value={activeParticipants.toLocaleString()} />
            <StatCard icon={<LockClosedIcon className="w-6 h-6"/>} title="Total Value Locked" value={`$${totalValueLocked.toLocaleString()}`} />
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700">
                <h3 className="text-lg font-semibold text-white mb-4">Top Token Holders</h3>
                <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={formattedTokenHolders} layout="vertical" margin={{ top: 5, right: 20, left: 50, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#4A5568" horizontal={false} />
                            <XAxis type="number" stroke="#A0AEC0" tickFormatter={(value) => `$${Number(value/1000000).toFixed(1)}M`} />
                            <YAxis type="category" dataKey="name" stroke="#A0AEC0" width={70} />
                            <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(37, 99, 235, 0.1)' }}/>
                            <Bar dataKey="balance" fill="#2563EB" radius={[0, 4, 4, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
                </div>
                    <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700">
                        <h3 className="text-lg font-semibold text-white mb-4">Transaction Volume</h3>
                        <div className="h-80">
                            <ResponsiveContainer width="100%" height="100%">
                            <AreaChart
                                data={transactionVolume}
                                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                                >
                                <CartesianGrid strokeDasharray="3 3" stroke="#4A5568" />
                                <XAxis
                                dataKey="date"
                                stroke="#A0AEC0"
                                tickFormatter={(dateString) => {
                                    const date = new Date(dateString);
                                    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
                                }}
                                />

                                <YAxis
                                stroke="#A0AEC0"
                                tickFormatter={(value) => `$${Number(value / 1000).toFixed(0)}k`}
                                />
                                <Tooltip
                                content={({ active, payload, label }) =>
                                    active && payload?.length ? (
                                    <div className="bg-gray-700/80 p-2 border border-gray-600 rounded-md shadow-lg">
                                        <p className="text-sm text-gray-300">{label}</p>
                                        <p className="text-white font-bold">
                                        {`Volume: $${payload[0].value.toLocaleString()}`}
                                        </p>
                                    </div>
                                    ) : null
                                    }
                                />
                        <defs>
                            <linearGradient id="colorVolume" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#22C55E" stopOpacity={0.8} />
                                <stop offset="95%" stopColor="#22C55E" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                            <Area
                            type="monotone"
                            dataKey="amount"
                            stroke="#16A34A"
                            fill="url(#colorVolume)"
                            fillOpacity={1}
                            />
                        </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>


        <div className="bg-gray-800/50 rounded-xl border border-gray-700 overflow-hidden">
            <div className="p-4 sm:p-6">
                <h2 className="text-xl font-semibold text-white">Transaction History</h2>
                <p className="text-sm text-gray-400 mt-1">A transparent log of all on-chain movements.</p>
            </div>
        <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-400">
            <thead className="text-xs text-gray-300 uppercase bg-gray-700/50">
                <tr>
                <th scope="col" className="px-6 py-3">Transaction ID</th>
                <th scope="col" className="px-6 py-3">Date</th>
                <th scope="col" className="px-6 py-3">Action</th>
                <th scope="col" className="px-6 py-3">Amount</th>
                <th scope="col" className="px-6 py-3 hidden md:table-cell">From</th>
                <th scope="col" className="px-6 py-3 hidden md:table-cell">To</th>
                <th scope="col" className="px-6 py-3">Status</th>
                </tr>
            </thead>
            <tbody>
                {transactions.map((tx) => (
                <tr key={tx.id} className="bg-gray-800/50 border-b border-gray-700 hover:bg-gray-700/50">
                    <td className="px-6 py-4 font-mono text-blue-400 whitespace-nowrap">{`${tx.id.substring(0, 10)}...`}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{tx.date}</td>
                    <td className="px-6 py-4 font-medium">{tx.action}</td>
                    <td className={`px-6 py-4 font-semibold ${getActionColor(tx.action)}`}>{`$${tx.amount.toLocaleString()}`}</td>
                    <td className="px-6 py-4 font-mono hidden md:table-cell">{`${tx.from.substring(0, 10)}...`}</td>
                    <td className="px-6 py-4 font-mono hidden md:table-cell">{`${tx.to.substring(0, 10)}...`}</td>
                    <td className="px-6 py-4">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusBadge(tx.status)}`}>
                        {tx.status}
                    </span>
                    </td>
                </tr>
                ))}
            </tbody>
            </table>
        </div>
        </div>
    </div>
  );
};

const StatCard: React.FC<{icon: React.ReactNode, title: string, value: string}> = ({ icon, title, value }) => (
    <div className="bg-gray-800/50 p-5 rounded-xl border border-gray-700 flex items-center space-x-4">
        <div className="p-3 bg-blue-600/20 text-blue-300 rounded-full">
            {icon}
        </div>
        <div>
            <p className="text-sm text-gray-400">{title}</p>
            <p className="text-2xl font-bold text-white">{value}</p>
        </div>
    </div>
);

export default Transactions;
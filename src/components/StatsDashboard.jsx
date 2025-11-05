import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Activity, Coins, Send, Shield, Database } from 'lucide-react';

const StatCard = ({ icon: Icon, label, value, accent }) => (
  <motion.div
    whileHover={{ y: -4 }}
    className={`relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur ${accent}`}
  >
    <div className="pointer-events-none absolute inset-0 opacity-30" />
    <div className="flex items-center gap-3">
      <div className="rounded-xl bg-white/10 p-2">
        <Icon className="size-5 text-white" />
      </div>
      <div>
        <div className="text-sm text-white/70">{label}</div>
        <div className="text-2xl font-semibold text-white">{value}</div>
      </div>
    </div>
  </motion.div>
);

const StatsDashboard = () => {
  const [ticker, setTicker] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setTicker((n) => (n + 1) % 1000), 1500);
    return () => clearInterval(t);
  }, []);

  return (
    <section className="relative -mt-24 bg-black px-6 pb-16 pt-6 sm:pt-12">
      <div className="mx-auto grid w-full max-w-7xl gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard icon={Coins} label="Balance" value={`${(12345.67 + ticker).toFixed(2)} BFC`} accent="shadow-[inset_0_0_0_1px_rgba(255,255,255,0.06)]" />
        <StatCard icon={Send} label="Pending TX" value={(3 + (ticker % 3)).toString()} accent="" />
        <StatCard icon={Activity} label="Hashrate" value={`${(42 + (ticker % 10))} H/s`} accent="" />
        <StatCard icon={Database} label="Blocks" value={(128 + (ticker % 5)).toString()} accent="" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mx-auto mt-10 w-full max-w-7xl overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-white/[0.03] p-6 backdrop-blur"
      >
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h3 className="text-lg font-semibold text-white">Real-time Dashboard</h3>
            <p className="text-sm text-white/70">Live updates on balance, transactions, and chain status.</p>
          </div>
          <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 px-3 py-1 text-emerald-300">
            <span className="relative flex size-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
            </span>
            Live
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default StatsDashboard;

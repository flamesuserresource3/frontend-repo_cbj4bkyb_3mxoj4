import React, { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Wallet, Copy, Key } from 'lucide-react';

const randomHex = (len) =>
  Array.from(crypto.getRandomValues(new Uint8Array(len)))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');

const WalletRow = ({ w, onCopy }) => (
  <motion.div
    whileHover={{ scale: 1.01 }}
    className="rounded-xl border border-white/10 bg-white/5 p-4 text-white backdrop-blur"
  >
    <div className="flex items-center justify-between gap-3">
      <div className="min-w-0">
        <div className="flex items-center gap-2">
          <Wallet className="size-4 text-cyan-300" />
          <p className="truncate font-medium">{w.name}</p>
        </div>
        <p className="mt-1 truncate text-xs text-white/70">{w.address}</p>
      </div>
      <button
        onClick={() => onCopy(w.address)}
        className="inline-flex items-center gap-2 rounded-lg bg-white/10 px-3 py-2 text-sm text-white hover:bg-white/15"
      >
        <Copy className="size-4" /> Copy
      </button>
    </div>
    <div className="mt-3 flex items-center gap-2 rounded-lg bg-black/40 p-3 text-xs text-white/60">
      <Key className="size-4 text-fuchsia-300" />
      <span className="truncate">{w.privateKey}</span>
    </div>
  </motion.div>
);

const WalletManager = () => {
  const [wallets, setWallets] = useState(() => [
    { id: 1, name: 'Primary', address: '0x' + randomHex(20), privateKey: '0x' + randomHex(32) },
  ]);
  const [name, setName] = useState('');
  const [copied, setCopied] = useState('');

  const total = useMemo(() => wallets.length, [wallets]);

  const createWallet = () => {
    const label = name.trim() || `Wallet ${wallets.length + 1}`;
    const newWallet = {
      id: Date.now(),
      name: label,
      address: '0x' + randomHex(20),
      privateKey: '0x' + randomHex(32),
    };
    setWallets((w) => [newWallet, ...w]);
    setName('');
  };

  const copy = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied('Copied!');
      setTimeout(() => setCopied(''), 1200);
    } catch {
      setCopied('Copy failed');
      setTimeout(() => setCopied(''), 1200);
    }
  };

  return (
    <section className="relative mx-auto w-full max-w-7xl px-6 py-10">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-white">Wallet Management</h2>
          <p className="text-sm text-white/70">Create and manage multiple non-custodial wallets.</p>
        </div>
        <div className="inline-flex items-center gap-2 rounded-full bg-white/5 px-3 py-1 text-sm text-white/80">
          <Wallet className="size-4 text-cyan-300" /> {total} total
        </div>
      </div>

      <div className="mb-5 grid gap-3 sm:grid-cols-[1fr_auto]">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Wallet label"
          className="rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-white placeholder-white/50 outline-none focus:ring-2 focus:ring-cyan-500/40"
        />
        <button
          onClick={createWallet}
          className="rounded-xl bg-gradient-to-r from-cyan-500 to-fuchsia-500 px-5 py-3 font-medium text-white shadow-lg shadow-cyan-500/20 hover:brightness-110"
        >
          Create Wallet
        </button>
      </div>

      {copied && (
        <div className="mb-3 text-sm text-emerald-300">{copied}</div>
      )}

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {wallets.map((w) => (
          <WalletRow key={w.id} w={w} onCopy={copy} />
        ))}
      </div>
    </section>
  );
};

export default WalletManager;

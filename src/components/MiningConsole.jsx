import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Hammer, Play, Pause, CheckCircle2, Cpu } from 'lucide-react';

const MiningConsole = () => {
  const [mining, setMining] = useState(false);
  const [hashrate, setHashrate] = useState(0);
  const [blocks, setBlocks] = useState(0);
  const [reward, setReward] = useState(0);
  const timer = useRef(null);

  useEffect(() => {
    if (mining) {
      timer.current = setInterval(() => {
        setHashrate((h) => 40 + Math.floor(Math.random() * 20));
        // Simulate finding a block roughly every 5-10 seconds
        if (Math.random() < 0.18) {
          setBlocks((b) => b + 1);
          setReward((r) => r + 100);
        }
      }, 1000);
    }
    return () => {
      if (timer.current) clearInterval(timer.current);
    };
  }, [mining]);

  return (
    <section className="relative mx-auto w-full max-w-7xl px-6 pb-16">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-white">Mining</h2>
          <p className="text-sm text-white/70">Proof-of-work simulation with 100 coins reward per block.</p>
        </div>
        <div className="inline-flex items-center gap-2 rounded-full bg-white/5 px-3 py-1 text-sm text-white/80">
          <Cpu className="size-4 text-violet-300" /> {hashrate} H/s
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <motion.div
          whileHover={{ y: -3 }}
          className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-white/[0.03] p-6 text-white backdrop-blur"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Hammer className="size-5 text-amber-300" />
              <h3 className="font-semibold">Miner Control</h3>
            </div>
            <span className={`rounded-full px-2 py-0.5 text-xs ${mining ? 'bg-emerald-500/10 text-emerald-300' : 'bg-white/10 text-white/70'}`}>
              {mining ? 'Running' : 'Idle'}
            </span>
          </div>

          <div className="mt-6 flex items-center gap-3">
            <button
              onClick={() => setMining((m) => !m)}
              className={`inline-flex items-center gap-2 rounded-xl px-5 py-3 font-medium text-white transition-all ${
                mining
                  ? 'bg-white/10 hover:bg-white/15'
                  : 'bg-gradient-to-r from-cyan-500 to-fuchsia-500 shadow-lg shadow-cyan-500/20 hover:brightness-110'
              }`}
            >
              {mining ? <Pause className="size-5" /> : <Play className="size-5" />}
              {mining ? 'Pause' : 'Start Mining'}
            </button>
            <div className="text-sm text-white/70">Hashrate updates live every second.</div>
          </div>
        </motion.div>

        <motion.div
          whileHover={{ y: -3 }}
          className="rounded-2xl border border-white/10 bg-black/40 p-6 text-white backdrop-blur"
        >
          <h3 className="mb-4 flex items-center gap-2 font-semibold"><CheckCircle2 className="size-5 text-emerald-300" /> Progress</h3>
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-xl bg-white/5 p-4">
              <div className="text-sm text-white/70">Blocks mined</div>
              <div className="text-2xl font-semibold">{blocks}</div>
            </div>
            <div className="rounded-xl bg-white/5 p-4">
              <div className="text-sm text-white/70">Rewards earned</div>
              <div className="text-2xl font-semibold">{reward} BFC</div>
            </div>
          </div>
        </motion.div>

        <motion.div
          whileHover={{ y: -3 }}
          className="rounded-2xl border border-white/10 bg-black/40 p-6 text-white backdrop-blur"
        >
          <h3 className="mb-4 font-semibold">Console</h3>
          <div className="h-40 overflow-auto rounded-lg bg-black/60 p-3 font-mono text-xs text-emerald-300">
            <AnimatePresence initial={false}>
              {Array.from({ length: Math.min(10, blocks) }).map((_, i) => (
                <motion.div
                  key={`blk-${i}-${blocks}`}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  [+] Block found • Reward: 100 BFC • Height {i + 1}
                </motion.div>
              ))}
            </AnimatePresence>
            {!blocks && (
              <div className="text-white/50">No blocks yet. Start the miner to begin.</div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default MiningConsole;

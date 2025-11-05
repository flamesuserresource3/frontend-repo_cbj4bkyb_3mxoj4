import React from 'react';
import Spline from '@splinetool/react-spline';
import { motion } from 'framer-motion';
import { Rocket, Shield, Wallet } from 'lucide-react';

const Hero = () => {
  return (
    <section className="relative h-[80vh] w-full overflow-hidden bg-black">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/44zrIZf-iQZhbQNQ/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/60 via-black/10 to-black/90" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/90 to-transparent" />

      <div className="relative z-10 mx-auto flex h-full max-w-7xl items-center px-6">
        <div className="max-w-3xl text-white">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="font-display text-4xl font-bold leading-tight sm:text-6xl"
          >
            Blockchain Finance
            <span className="bg-gradient-to-r from-cyan-400 via-fuchsia-400 to-violet-400 bg-clip-text text-transparent"> Studio</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.7 }}
            className="mt-4 text-base/7 text-white/80 sm:text-lg/8"
          >
            Create wallets, send and receive coins, mine blocks, and explore a simulated chain — all in a sleek, animated experience.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.7 }}
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            <button className="group inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-fuchsia-500 px-5 py-3 font-medium text-white shadow-lg shadow-cyan-500/20 transition-transform hover:scale-[1.02] focus:outline-none">
              <Rocket className="size-5 transition-transform group-hover:-rotate-12" />
              Launch App
            </button>
            <button className="inline-flex items-center gap-2 rounded-xl bg-white/10 px-5 py-3 font-medium text-white backdrop-blur-md transition-colors hover:bg-white/15 focus:outline-none">
              <Wallet className="size-5" />
              Create Wallet
            </button>
            <div className="ml-2 hidden items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/70 backdrop-blur md:flex">
              <Shield className="size-4 text-emerald-400" />
              Non-custodial • Local keys
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

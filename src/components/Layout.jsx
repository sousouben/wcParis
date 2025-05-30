
import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import { motion } from 'framer-motion';

const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Navbar />
      </motion.div>
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;

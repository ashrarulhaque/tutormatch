import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import FlashMessageDisplay from './FlashMessageDisplay';

const Layout: React.FC = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <FlashMessageDisplay/>
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
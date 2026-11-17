import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import SiteFooter from '../components/SiteFooter';
import { AdSlot, useAdScripts } from '../components/ads/AdSlot';

const RootLayout: React.FC = () => {
  useAdScripts();

  return (
    <>
      <div className="app-backdrop" aria-hidden="true" />
      <Navbar />
      <AdSlot slot="header728x90" className="flex justify-center py-2" />
      <main className="text-center px-4 pb-16">
        <Outlet />
      </main>
      <SiteFooter />
    </>
  );
};

export default RootLayout;
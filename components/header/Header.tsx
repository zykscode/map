/* eslint-disable tailwindcss/no-custom-classname */
import React from 'react';

import Breadcrumbs from '../Breaadcrumbs';
import Navbar from './Navbar';

export default function Header() {
  return (
    <header className="header">
      <div className="nav-header">
        <Breadcrumbs />
        <Navbar />
      </div>
    </header>
  );
}

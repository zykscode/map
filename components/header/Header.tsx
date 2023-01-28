import React from 'react';
import Breadcrumbs from '../Breaadcrumbs';
import Navbar from './Navbar';

type Props = {};

export default function Header({}: Props) {
  return (
    <header className="header">
      <div className="nav-header">
        <Breadcrumbs />
        <Navbar />
      </div>
    </header>
  );
}

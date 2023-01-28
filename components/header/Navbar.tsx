import { navs } from '#/lib/data/siteMetadata';
import Link from 'next/link';
import React from 'react';
import Button from '../Button';
import Logo from '../Logo';
import Toggle from '../mobile/Toggle';
import ToggleThemeButton from '../ToggleThemeButton';

type Props = {};

const Navbar = (props: Props) => {
  return (
    <nav className="nav-header-rhs breadcrumbs">
      {navs.map((nav) => {
        return (
          <Link
            className="breadcrumb button"
            key={nav.name}
            href={`/${nav.link}`}
          >
            {nav.name}
          </Link>
        );
      })}

      <ToggleThemeButton />
    </nav>
  );
};

export default Navbar;

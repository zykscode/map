import React from 'react';
import Logo from './Logo';


type Props = {};

const Breadcrumbs = (props: Props) => {
  console.log({ todo: 'add site name' });
  return (
    <div className="breadcrumbs">
      <div className="breadcrumb active">
        <Logo />
      </div>
    </div>
  );
};

export default Breadcrumbs;

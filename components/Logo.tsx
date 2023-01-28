import Image from 'next/image';
import React from 'react';
import logo from '#/public/static/images/me.png';

const Logo = () => {
  return <Image src={logo} alt={'site Logo'} className='rounded-full h-10 w-10' />;
};

export default Logo;

import React from 'react';
import Image from 'next/image';

const Logo = () => {
  return (
    <Image
      src="/raven-logo.png"
      alt="Logo de Raven"
      width={150}
      height={60}
    />
  );
};

export default Logo;
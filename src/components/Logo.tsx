import React from 'react';
import Image from 'next/image';

const Logo = () => {
  return (
    <Image
      src="/raven-logo.png"
      alt="Logo de Raven"
      width={150}
      height={50.26}
    />
  );
};

export default Logo;
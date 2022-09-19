import React from 'react';

const Overlay = ({ className = 'z-50', onClick }) => {
  return (
    <div
      className={`${className} fixed inset-0 w-full h-full bg-graphite opacity-[0.1]`}
      onClick={onClick}
    />
  );
};

export default Overlay;

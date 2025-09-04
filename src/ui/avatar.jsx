import React from 'react';

const Avatar = ({ src, alt, ...props }) => {
  return (
    <img
      src={src}
      alt={alt}
      className="inline-block h-10 w-10 rounded-full ring-2 ring-white"
      {...props}
    />
  );
};

const AvatarFallback = ({ children, ...props }) => {
  return (
    <div
      className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-gray-200"
      {...props}
    >
      {children}
    </div>
  );
};

const AvatarImage = ({ src, alt, ...props }) => {
  return (
    <img
      src={src}
      alt={alt}
      className="aspect-square h-full w-full"
      {...props}
    />
  );
};

export { Avatar, AvatarFallback, AvatarImage };


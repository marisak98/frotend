import React from "react";

function Logo() {
  return (
    <div>
      <a href="/" className="flex items-center gap-2">
        <img src="/logo.jpeg" alt="Logo" className="h-8 w-8" />
        <div className="text-center font-bold">
          <span className="text-red-500 bg-clip-text text-3xl leading-tight tracking-tighter">
            Javier
          </span>
          <span className="text-black bg-clip-text text-3xl leading-tight tracking-tighter">
            Diez
          </span>
        </div>
      </a>
    </div>
  );
}

export default Logo;

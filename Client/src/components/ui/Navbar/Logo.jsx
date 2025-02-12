import React from "react";
import Link from "next/link";
import Image from "next/image";

const Logo = () => {
  return (
    <Link href="/" className="ml-4">
      <Image
        src="/logo.svg"
        width={120}
        height={120}
        alt="PET SEA TRAVEL"
      />
    </Link>
  );
};

export default Logo;

import React from 'react'
import { ShoppingCart } from 'lucide-react';
import Link from 'next/link';

const Cart = () => {
  return (
    <Link href="#" >
        <ShoppingCart size={32}/>
    </Link>
  )
}

export default Cart
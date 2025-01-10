import React from 'react';
import { IoFilterSharp } from "react-icons/io5";

export default function ProductFilters() {
  return (
    <section className='product-filter-container'>
      <button className='filter-btn'><IoFilterSharp />Filter</button>
    </section>
  )
}

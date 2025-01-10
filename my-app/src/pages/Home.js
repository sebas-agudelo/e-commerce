import React from "react";
import {Link} from 'react-router-dom'

export default function Home() {
  return (
    <main className="home-main">
      <article className="hero-video">
        <video autoPlay loop muted>
          <source src="/124869-732319039_small.mp4" />
        </video>
      </article>
      <article className="buy-btn">
          <Link to={'/products'}>Utforska</Link>
      </article>
    </main>
  );
}

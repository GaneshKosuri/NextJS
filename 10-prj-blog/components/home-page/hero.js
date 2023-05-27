import Image from 'next/image';

import classes from './hero.module.css';

function Hero() {
  return (
    <section className={classes.hero}>
      <div className={classes.image}>
        <Image
          src='/images/site/ganesh.png'
          alt='An image showing Max'
          width={300}
          height={300}
        />
      </div>
      <h1>Hi, I'm Ganesh Kosuri</h1>
      <p>
        I blog about web development - especially frontend frameworks like
        NextJS or Vue.
      </p>
    </section>
  );
}

export default Hero;

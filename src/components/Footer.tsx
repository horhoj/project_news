import React from 'react';
import powerByImg from '~/assets/power__by-img.png';

export function Footer() {
  return (
    <footer className={'global-container mx-auto p-4 bg-white flex flex-col items-center text-xs'}>
      <ul className={'flex items-center justify-center gap-5'}>
        <li>Log In</li>
        <li>About Us</li>
        <li>Publishers</li>
        <li>Sitemap</li>
      </ul>
      <div className={'pt-6'}>Powered by</div>
      <img src={powerByImg} alt="power by" className={'w-[84px] aspect-auto pt-2'} />
      <div className={'py-6 '}>© 2023 Besider. Inspired by Insider</div>
    </footer>
  );
}

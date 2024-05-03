// components/Loading.js
// 'use client';
// import React, { useEffect, useRef } from 'react';
// import { useTheme } from 'next-themes';

const Loading = () => {
//  const container = useRef(null);
//  // const { theme } = useTheme();
//  // theme === 'light' ? '/loading.json' : '/imposter.json', 

//  useEffect(() => {
//     const loadLottie = async () => {
//         const lottie = await import('lottie-web');
//         lottie.loadAnimation({
//           container: container.current, // the dom element that will contain the animation
//           renderer: 'svg',
//           loop: true,
//           autoplay: true,
//           path: '/loading.json' // the path to the animation json
//         });
//       }
//     loadLottie();
//  }, []); // Add theme as a dependency to re-run the effect if the theme changes

 return <div className="justify-center items-center w-screen h-screen" >Loading....</div>;
};

export default Loading;

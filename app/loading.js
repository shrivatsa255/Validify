// components/Loading.js
'use client'
import React, { useEffect,useRef } from 'react';
import lottie from 'lottie-web';
import { useTheme } from 'next-themes';

const Loading = () => {
 const container = useRef(null);
const {theme} = useTheme()
 useEffect(() => {
    lottie.loadAnimation({
      container: container.current, // the dom element that will contain the animation
      renderer: 'svg',
      loop: true,
      autoplay: true,
      path: theme ==='light' ? '/loading.json' : '/imposter.json', // the path to the animation json
    });
 }, []);

 return <div className="justify-center items-center w-screen h-screen " ref={container}></div>;
};

export default Loading;

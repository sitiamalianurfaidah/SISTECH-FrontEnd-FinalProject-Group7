'use client';

import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import '../styles/globals.css';

const Home = () => {
  const [isHovered, setIsHovered] = useState(false);
  const router = useRouter();

  return (
    <>
      <Head>
        <meta name="description" content="Identify your perfect profession based on your personality" />
        <title>Discover Your Ideal Career</title>
      </Head>
      {/* Background utama putih */}
      <div className="h-screen bg-[#F5F7FA] text-white flex flex-col justify-center items-center">
        {/* Navbar */}
        <nav className="w-full px-8 py-6 flex justify-between items-center">
          <Image src="/pathmatch-logo.svg" alt="PathMatch Logo" width={150} height={30} />
        </nav>

        {/* Card biru */}
        <div className="relative z-10 max-w-6xl mx-auto bg-[#003E85] rounded-[70px] pt-5 md:pt-10 pb-0 overflow-hidden">

          {/* SHAPES - Kiri */}
          <div className="absolute top-10 left-70 opacity-40 animate-pulse-slow z-0 space-y-4">
            <Image src="/triangle.svg" alt="triangle" width={25} height={25} />
            <Image src="/circle.svg" alt="circle" width={30} height={30} />
            <Image src="/square.svg" alt="square" width={35} height={35} />
          </div>

          {/* SHAPES - Kanan */}
          <div className="absolute top-10 right-70 opacity-40 animate-pulse-slow z-0 space-y-4">
            <Image src="/square.svg" alt="square" width={35} height={35} />
            <Image src="/triangle.svg" alt="triangle" width={30} height={30} />
            <Image src="/circle.svg" alt="circle" width={25} height={25} />
          </div>

          {/* Main content */}
          <div className="relative z-10 flex flex-col items-center text-center">
            <h1 className="text-4xl md:text-5xl ml-80 mr-80 font-archivo-expanded font-bold leading-tight text-[#F5F7FA]">
              Discover the ideal <span className="text-[#FFD000]">career</span> for you
            </h1>
            <p className="mt-4 ml-50 mr-50 mb-0 text-sm md:text-lg font-space-grotesk text-[#F5F7FA] max-w-2xl">
              Identify your perfect profession based on your personality
            </p>

            {/* Start Quiz Button */}
            <button
              onClick={() => router.push('/quiz')}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              className={`mt-4 px-10 py-3 rounded-[10px] font-space-mono text-lg transition-all duration-300 ${
                isHovered
                  ? 'bg-white text-[#161616] shadow-lg transform scale-105'
                  : 'bg-[#FFD000] text-[#161616] hover:shadow-lg'
              }`}
            >
              Start Quiz
            </button>

            {/* Lightning kiri */}
            <div className="absolute left-[230px] bottom-10 z-0">
              <Image src="/lightning.svg" alt="lightning" width={190} height={190} />
            </div>

            {/* Lightning kanan */}
            <div className="absolute right-[250px] bottom-10 z-0">
              <Image src="/lightning.svg" alt="lightning" width={190} height={190} />
            </div>

            {/* Mobile Mockup */}
            <div className="mt-5 mb-0 w-full max-w-sm mx-auto pb-0 ml-37 mr-5">
              <Image
                src="/mobile-mockup.png"
                alt="Mobile phone with PathMatch quiz"
                width={250}
                height={250}
                className="shadow-2xl"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;

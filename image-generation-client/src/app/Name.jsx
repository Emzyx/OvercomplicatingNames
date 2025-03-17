'use client';

import bg from './allen-sc-middle-final.png';
import bgSmol from './allen-nath-t-normed.png';
import Image from 'next/image';
import { Inter_Tight } from 'next/font/google';
import React, { useState } from 'react';
import { Button } from '@nextui-org/react';

const namesProcessed = require('../data/tNamesWLength.json');

const { names } = namesProcessed;

const font = Inter_Tight({
  subsets: ['latin'],
  display: 'swap',
});

const lowercaseIt = (nameAllCaps) => {
  return ''.concat(nameAllCaps.charAt(0), nameAllCaps.slice(1).toLowerCase());
};

export const Name = () => {
  const [idx, setIdx] = useState(0);
  const [name, setName] = useState(lowercaseIt(names[0]));
  const [isOpaque, setIsOpaque] = useState(true);

  const onNextClick = () => {
    setIdx((prevState) => {
      const nextIdx = prevState + (1 % names.length);
      setName(lowercaseIt(names[nextIdx]));
      return nextIdx;
    });
    setIsOpaque(true);
  };

  const onMakeOpaque = () => {
    setIsOpaque(false);
  };

  const renderButtons = () => (
    <div className="flex justify-around">
      <Button id="next-button" color="primary" onClick={onNextClick}>
        Next name
      </Button>
      <div id="name">{name}</div>
      <Button id="opaque-button" color="secondary" onClick={onMakeOpaque}>
        Set Visible
      </Button>
    </div>
  );

  const renderSmallName = () => (
    <div className="py-0.5">
      <div
        style={{
          zIndex: -1,
          position: 'relative',
          top: '40px',
          left: '2px',
        }}
      >
        <Image src={bgSmol} width={315} alt="Picture of the name" />
      </div>
      <div
        id="lil-name-div"
        className={[
          'font-bold',
          'text-3xl',
          font ? font.className : 'font-sans',
          isOpaque ? 'text-transparent' : 'text-green-700',
        ].join(' ')}
      >
        {`Allen Nathaniel ${`Tygrett`}`}
      </div>
    </div>
  );

  const renderBigMiddleName = () => (
    <div className="justify-center">
      <div
        style={{
          zIndex: -1,
          position: 'relative',
          top: '78px',
          left: '-7px',
        }}
      >
        <Image src={bg} width={230} alt="Picture of the name" />
      </div>
      <div
        id="name-div"
        className={[
          'font-bold',
          'text-6xl',
          font ? font.className : 'font-sans',
          isOpaque ? 'text-transparent' : 'text-green-700',
        ].join(' ')}
      >
        {'Tygrett'}
      </div>
    </div>
  );

  return (
    <div>
      {renderButtons()}
      <div className="py-16" />
      {renderSmallName()}
      <div className="py-16" />
      {renderBigMiddleName()}
      <div className="py-16" />
    </div>
  );
};

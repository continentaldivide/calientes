'use client';
import React, { useEffect, useRef } from 'react';
import { Grid, html } from 'gridjs';

type Sauce = {
  _id: string;
  name: string;
  manufacturer: string;
  description: string;
  scoville: number;
  img: string;
  likes: number;
  episodes: string[];
  createdAt: string;
  updatedAt: string;
};

function getRandomSauces(sauces: Sauce[], count: number) {
  const shuffledSauces = sauces.sort(() => 0.5 - Math.random());
  return shuffledSauces.slice(0, count);
}

const getSauces: () => Promise<{ sauces: Sauce[] }> = async () => {
  const res = await fetch(`${process.env.REACT_APP_SERVER_URL}/api-v1/sauces`);
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data');
  }
  return res.json();
};

// EpisodesGrid component
const SomeSaucesGrid = () => {
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (wrapperRef.current) {
      getSauces().then(({ sauces }) => {
        const mappedSauces = getRandomSauces(sauces, 5).map((sauce) => [
          sauce.name,
          sauce.scoville,
          sauce.manufacturer,
          sauce._id,
        ]);

        const grid = new Grid({
          columns: ['Name', 'Scoville', 'Manufacturer'],
          data: mappedSauces.map((sauce) => [
            html(`<a href="sauces/${sauce[3]}">${sauce[0]}</a>`),
            sauce[1],
            sauce[2],
          ]),
          sort: true,
          resizable: true,
        });

        if (wrapperRef.current) {
          grid.render(wrapperRef.current);
        }
      });
    }
  }, []);

  return <div ref={wrapperRef} />;
};

export default SomeSaucesGrid;

'use client';
import React, { useEffect, useRef } from 'react';
import { Grid, html } from 'gridjs';
import './grid.module.css';
import 'gridjs/dist/theme/mermaid.css';

type Guests = {
  _id: string;
  name: string;
  profession: string;
  img: string;
  wallOfFlame: boolean;
  wallOfShame: boolean;
  episodes: string[];
  likes: number;
  totalWingsEaten: number;
  createdAt: string;
  updatedAt: string;
};

const getGuests: () => Promise<{ guests: Guests[] }> = async () => {
  const res = await fetch(`${process.env.REACT_APP_SERVER_URL}/api-v1/guests`);
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data');
  }
  return res.json();
};

const AllGuestsGrid = () => {
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (wrapperRef.current) {
      getGuests().then(({ guests }) => {
        const mappedGuests = guests.map((guest) => [
          guest.name,
          guest.profession,
          guest._id,
        ]);

        const grid = new Grid({
          columns: ['Name', 'Profession'],
          data: mappedGuests.map((guest) => [
            html(`<a href="guests/${guest[2]}">${guest[0]}</a>`),
            guest[1],
          ]),
          sort: true,
          resizable: true,
          search: true,
        });

        if (wrapperRef.current) {
          grid.render(wrapperRef.current);
        }
      });
    }
  }, []);

  return <div ref={wrapperRef} />;
};

export default AllGuestsGrid;

'use client'

import React, { useEffect, useRef } from 'react';
import { Grid } from 'gridjs';

// type definition
type Episode = {
  _id: string;
  title: string;
  seasonNumber: number;
  seasonId: string;
  overallEpisodeNumber: string;
  seasonEpisodeNumber: string;
  airDate: string;
  guests: string[];
  sauces: string[];
  success: boolean;
  guestDab: boolean;
  likes: number;
  carefulCount: number;
  createdAt: string;
  updatedAt: string;
};

// asynchronous function to fetch episodes
const getEpisodes = async (): Promise<{ episodes: Episode[] }> => {
  const res = await fetch('http://localhost:8000/api-v1/episodes');
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data');
  }
  return res.json();
};

// EpisodesGrid component
const EpisodesGrid = () => {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (wrapperRef.current) {
      getEpisodes().then(({ episodes }) => {
        const mappedEpisodes = episodes.map((episode) => [
          episode.title,
          episode.seasonNumber,
          episode.seasonEpisodeNumber,
        ]);

        const grid = new Grid({
          columns: ['Title', 'Season', 'Episode Number'],
          data: mappedEpisodes,
        });

        if (wrapperRef.current) {
          grid.render(wrapperRef.current);
        }
      });
    }
  }, []);

  return <div ref={wrapperRef}></div>;
};

export default EpisodesGrid;
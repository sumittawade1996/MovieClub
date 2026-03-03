import { useState, useEffect } from 'react';
import { Movie } from '@/types/movie';

const STORAGE_KEY = 'movie_listing_app_movies';

const INITIAL_MOVIES: Movie[] = [
  {
    id: '1',
    title: 'The Dark Knight',
    posterUrl: 'https://miaoda-site-img.s3cdn.medo.dev/images/KLing_ed551562-a4b6-4869-bf87-cf806fafb3e4.jpg',
    link: 'https://www.google.com/search?q=watch+The+Dark+Knight',
    createdAt: Date.now() - 1000000,
  },
  {
    id: '2',
    title: 'Interstellar',
    posterUrl: 'https://miaoda-site-img.s3cdn.medo.dev/images/KLing_73fd2fc8-a0dc-4032-9cec-2081886fee62.jpg',
    link: 'https://www.google.com/search?q=watch+Interstellar',
    createdAt: Date.now() - 900000,
  },
  {
    id: '3',
    title: 'Inception',
    posterUrl: 'https://miaoda-site-img.s3cdn.medo.dev/images/KLing_f649ff8e-bc10-4e85-aeb8-98f312c24b36.jpg',
    link: 'https://www.google.com/search?q=watch+Inception',
    createdAt: Date.now() - 800000,
  },
  {
    id: '4',
    title: 'Parasite',
    posterUrl: 'https://miaoda-site-img.s3cdn.medo.dev/images/KLing_7b6466fc-bcde-49da-991b-30b196b32c70.jpg',
    link: 'https://www.google.com/search?q=watch+Parasite',
    createdAt: Date.now() - 700000,
  },
  {
    id: '5',
    title: 'Pulp Fiction',
    posterUrl: 'https://miaoda-site-img.s3cdn.medo.dev/images/KLing_7fc7d8af-c62d-4f6c-b723-86a7ddacd240.jpg',
    link: 'https://www.google.com/search?q=watch+Pulp+Fiction',
    createdAt: Date.now() - 600000,
  },
  {
    id: '6',
    title: 'The Matrix',
    posterUrl: 'https://miaoda-site-img.s3cdn.medo.dev/images/KLing_5b711f28-b7dc-4ce7-a94e-0c4a251b7234.jpg',
    link: 'https://www.google.com/search?q=watch+The+Matrix',
    createdAt: Date.now() - 500000,
  }
];

export function useMovies() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedMovies = localStorage.getItem(STORAGE_KEY);
    if (storedMovies) {
      try {
        setMovies(JSON.parse(storedMovies));
      } catch (e) {
        console.error('Failed to parse movies from localStorage', e);
        setMovies(INITIAL_MOVIES);
      }
    } else {
      setMovies(INITIAL_MOVIES);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_MOVIES));
    }
    setLoading(false);
  }, []);

  const saveMovies = (newMovies: Movie[]) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newMovies));
      setMovies(newMovies);
    } catch (e) {
      console.error('Failed to save movies to localStorage', e);
      if (e instanceof Error && e.name === 'QuotaExceededError') {
        alert('Local storage is full. Please remove some movies or use smaller images.');
      } else {
        alert('Failed to save changes. Please try again.');
      }
    }
  };

  const addMovie = (movie: Omit<Movie, 'id' | 'createdAt'>) => {
    const newMovie: Movie = {
      ...movie,
      id: crypto.randomUUID(),
      createdAt: Date.now(),
    };
    const updatedMovies = [newMovie, ...movies];
    saveMovies(updatedMovies);
  };

  const deleteMovie = (id: string) => {
    const updatedMovies = movies.filter((m) => m.id !== id);
    saveMovies(updatedMovies);
  };

  return { movies, loading, addMovie, deleteMovie };
}

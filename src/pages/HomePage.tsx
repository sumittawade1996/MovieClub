import { useMovies } from "@/hooks/use-movies";
import { MovieGrid } from "@/components/MovieGrid";
import { Skeleton } from "@/components/ui/skeleton";

export default function HomePage() {
  const { movies, loading } = useMovies();

  return (
    <div className="min-h-screen bg-black text-white font-inter">
      <header className="sticky top-0 z-50 bg-black/80 backdrop-blur-md border-b border-white/10 px-6 py-4 flex items-center justify-between">
        <h1 className="text-3xl font-extrabold text-primary tracking-tighter uppercase">
          Movie<span className="text-white">Listing</span>
        </h1>
      </header>
      
      <main className="container mx-auto px-4 py-8">
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2 border-l-4 border-primary pl-3">
            Trending Movies
          </h2>
          {loading ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
              {[...Array(12)].map((_, i) => (
                <Skeleton key={i} className="aspect-[2/3] w-full bg-muted rounded-lg" />
              ))}
            </div>
          ) : (
            <MovieGrid movies={movies} />
          )}
        </section>
      </main>

      <footer className="border-t border-white/10 py-12 mt-auto">
        <div className="container mx-auto px-4 text-center">
          <p className="text-muted-foreground text-sm">
            © 2026 Movie Listing Web App. Built with modern technology.
          </p>
        </div>
      </footer>
    </div>
  );
}

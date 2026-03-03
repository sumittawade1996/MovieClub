import { Movie } from "@/types/movie";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Play, Share2 } from "lucide-react";
import { toast } from "sonner";

interface MovieCardProps {
  movie: Movie;
}

export function MovieCard({ movie }: MovieCardProps) {
  const handleShare = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const shareData = {
      title: movie.title,
      text: `Check out ${movie.title} on MovieListing!`,
      url: movie.link,
    };

    try {
      if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(movie.link);
        toast.success("Link copied to clipboard!");
      }
    } catch (err) {
      if ((err as Error).name !== 'AbortError') {
        await navigator.clipboard.writeText(movie.link);
        toast.success("Link copied to clipboard!");
      }
    }
  };

  return (
    <Card className="group relative overflow-hidden bg-card border-none transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(229,9,20,0.3)]">
      <div className="aspect-[2/3] w-full overflow-hidden relative">
        <img
          src={movie.posterUrl}
          alt={movie.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
        />
        
        {/* Share Button in top right corner on hover */}
        <button
          onClick={handleShare}
          className="absolute top-2 right-2 z-20 p-2 bg-black/60 backdrop-blur-md rounded-full text-white opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-primary"
          title="Share Movie"
        >
          <Share2 className="w-4 h-4" />
        </button>

        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
          <h3 className="text-lg font-bold text-white mb-2 line-clamp-2">{movie.title}</h3>
          <div className="flex gap-2">
            <Button
              asChild
              className="flex-1 bg-primary hover:bg-primary/90 text-white font-semibold transition-all duration-300 shadow-[0_0_15px_rgba(229,9,20,0.5)] hover:shadow-[0_0_25px_rgba(229,9,20,0.8)]"
            >
              <a href={movie.link} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2">
                <Play className="w-4 h-4 fill-current" />
                Watch
              </a>
            </Button>
          </div>
        </div>
      </div>
      <CardContent className="p-3 bg-black">
        <h3 className="text-sm font-medium text-white truncate group-hover:hidden">{movie.title}</h3>
      </CardContent>
    </Card>
  );
}

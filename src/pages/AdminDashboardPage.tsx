import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMovies } from "@/hooks/use-movies";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Trash2, LogOut, PlusCircle, LayoutDashboard, Globe } from "lucide-react";
import { toast } from "sonner";

export default function AdminDashboardPage() {
  const { movies, addMovie, deleteMovie } = useMovies();
  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");
  const [posterUrl, setPosterUrl] = useState("");
  const navigate = useNavigate();

  const handleBackToSite = () => {
    navigate("/");
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 1024 * 1024) { // 1MB limit for localStorage safety
        toast.error("Image too large. Please select an image under 1MB.");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setPosterUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !link || !posterUrl) {
      toast.error("Please fill in all fields.");
      return;
    }
    addMovie({ title, link, posterUrl });
    setTitle("");
    setLink("");
    setPosterUrl("");
    // Reset file input manually if needed
    (document.getElementById("poster-upload") as HTMLInputElement).value = "";
    toast.success("Movie added successfully!");
  };

  return (
    <div className="min-h-screen bg-black text-zinc-100 p-4 md:p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <header className="flex flex-col md:flex-row items-center justify-between gap-4 border-b border-white/10 pb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <LayoutDashboard className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold uppercase tracking-tight">Admin Dashboard</h1>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" asChild className="border-zinc-800 hover:bg-zinc-900">
              <a href="/" className="flex items-center gap-2">
                <Globe className="w-4 h-4" />
                View Website
              </a>
            </Button>
            <Button variant="destructive" onClick={handleBackToSite} className="flex items-center gap-2">
              <LogOut className="w-4 h-4" />
              Exit Admin
            </Button>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <Card className="bg-zinc-950 border-white/10 h-fit">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <PlusCircle className="w-5 h-5 text-primary" />
                Add New Movie
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Movie Title</Label>
                  <Input
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Inception"
                    className="bg-zinc-900 border-zinc-800"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="poster-upload" className="flex justify-between">
                    <span>Poster Image</span>
                    <span className="text-xs text-zinc-500">Max 1MB</span>
                  </Label>
                  <Input
                    id="poster-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="bg-zinc-900 border-zinc-800 cursor-pointer file:text-zinc-400 file:bg-transparent file:border-0"
                  />
                  {posterUrl && (
                    <div className="mt-2 rounded-lg overflow-hidden border border-white/10 aspect-[2/3] w-24 relative group">
                      <img src={posterUrl} alt="Preview" className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <span className="text-[10px] text-white">Preview</span>
                      </div>
                    </div>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="link">Streaming Link</Label>
                  <Input
                    id="link"
                    value={link}
                    onChange={(e) => setLink(e.target.value)}
                    placeholder="https://example.com/watch"
                    className="bg-zinc-900 border-zinc-800"
                    required
                  />
                </div>
                <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-white font-bold">
                  Add Movie
                </Button>
              </form>
            </CardContent>
          </Card>

          <Card className="bg-zinc-950 border-white/10 lg:col-span-2">
            <CardHeader>
              <CardTitle className="text-xl">Manage Movies ({movies.length})</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="border-white/10 hover:bg-transparent">
                      <TableHead className="text-zinc-400">Poster</TableHead>
                      <TableHead className="text-zinc-400">Title</TableHead>
                      <TableHead className="text-zinc-400">Link</TableHead>
                      <TableHead className="text-right text-zinc-400">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {movies.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={4} className="text-center py-12 text-zinc-500">
                          No movies found. Add one to get started!
                        </TableCell>
                      </TableRow>
                    ) : (
                      movies.map((movie) => (
                        <TableRow key={movie.id} className="border-white/10 hover:bg-zinc-900/50 transition-colors">
                          <TableCell>
                            <img src={movie.posterUrl} alt={movie.title} className="w-12 h-16 object-cover rounded shadow-md" />
                          </TableCell>
                          <TableCell className="font-medium">{movie.title}</TableCell>
                          <TableCell className="text-zinc-500 text-sm truncate max-w-[150px]">{movie.link}</TableCell>
                          <TableCell className="text-right">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => {
                                if (confirm("Are you sure you want to delete this movie?")) {
                                  deleteMovie(movie.id);
                                  toast.success("Movie deleted");
                                }
                              }}
                              className="text-zinc-500 hover:text-red-500 hover:bg-red-500/10"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

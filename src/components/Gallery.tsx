import { useState } from "react";
import { X, ZoomIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import { categories, Work, WorkCategory } from "@/data/works";
import { useWorks } from "@/hooks/useWorks";

const filters: { label: string; value: WorkCategory | "all" }[] = [
  { label: "Все", value: "all" },
  ...categories.map((c) => ({ label: c.label, value: c.value })),
];

const Gallery = () => {
  const [selectedCategory, setSelectedCategory] = useState<WorkCategory | "all">("all");
  const [selectedImage, setSelectedImage] = useState<Work | null>(null);
  const { works, isLoading } = useWorks();

  const filteredArtworks =
    selectedCategory === "all"
      ? works
      : works.filter((artwork) => artwork.category === selectedCategory);

  const openLightbox = (artwork: Work) => {
    setSelectedImage(artwork);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  return (
    <section className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">Full Portfolio</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Game art for Plarium and personal work — filtered by project for now, skill tags coming
            as pieces are catalogued
          </p>
        </div>

        {/* Category filters */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {filters.map((filter) => (
            <Button
              key={filter.value}
              variant={selectedCategory === filter.value ? "magical" : "ghost"}
              onClick={() => setSelectedCategory(filter.value)}
              className="transition-all duration-300"
            >
              {filter.label}
            </Button>
          ))}
        </div>

        {/* Gallery grid */}
        {isLoading && <p className="text-center text-muted-foreground py-12">Загрузка…</p>}
        {!isLoading && filteredArtworks.length === 0 && (
          <p className="text-center text-muted-foreground py-12">
            Здесь пока пусто — добавьте работы через CRM (/admin) или загрузите изображения в
            src/assets/works/.
          </p>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredArtworks.map((artwork) => (
            <div
              key={artwork.id}
              className="group relative aspect-square overflow-hidden rounded-lg border border-border shadow-glow-subtle hover:shadow-magical transition-all duration-300 cursor-pointer"
              onClick={() => openLightbox(artwork)}
            >
              <img
                src={artwork.image}
                alt={artwork.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              {/* Hover overlay */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="text-center text-white">
                  <ZoomIn className="w-8 h-8 mx-auto mb-2" />
                  <h3 className="font-semibold text-lg capitalize">{artwork.title}</h3>
                  <p className="text-sm text-gray-300">{artwork.project}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox modal */}
        {selectedImage && (
          <div
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
            onClick={closeLightbox}
          >
            <div className="relative max-w-5xl max-h-full">
              <img
                src={selectedImage.image}
                alt={selectedImage.title}
                className="max-w-full max-h-full object-contain rounded-lg"
                onClick={(e) => e.stopPropagation()}
              />
              <Button
                variant="ghost"
                size="icon"
                onClick={closeLightbox}
                className="absolute top-4 right-4 bg-black/50 text-white hover:bg-black/70"
              >
                <X className="w-6 h-6" />
              </Button>
              <div className="absolute bottom-4 left-4 bg-black/70 text-white p-4 rounded-lg">
                <h3 className="font-bold text-xl capitalize">{selectedImage.title}</h3>
                <p className="text-gray-300">{selectedImage.project}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Gallery;

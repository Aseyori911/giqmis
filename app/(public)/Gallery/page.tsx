"use client";
import { useEffect, useState } from "react";
import Image from "next/image";

type GalleryItem = {
  id: string;
  title: string;
  description: string;
  category: string;
  media_url: string;
  media_type: string;
  date_label: string;
};

type NewsPost = {
  id: string;
  title: string;
  body: string;
  image_url: string;
  published_at: string;
};

export default function Gallery() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [posts, setPosts] = useState<NewsPost[]>([]);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch("/api/admin/gallery").then((r) => r.json()),
      fetch("/api/admin/galleryNews").then((r) => r.json()),
    ]).then(([gData, nData]) => {
      setItems(gData.items || []);
      setPosts(nData.posts || []);
      setLoading(false);
    });
  }, []);

  const categories = [
    "all",
    ...Array.from(new Set(items.map((i) => i.category))),
  ];
  const filtered =
    filter === "all" ? items : items.filter((i) => i.category === filter);

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-r from-black/70 to-black/70 bg-cover bg-center text-white py-32 text-center min-h-[400px] flex items-center justify-center">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-white mb-4">Our Gallery</h2>
          <p className="text-lg text-white max-w-3xl mx-auto">
            Explore memorable moments from our classes, events, and cultural
            celebrations at GIQMIS.
          </p>
        </div>
      </section>

      {/* Filter tabs */}
      <section className="bg-white py-8 border-b border-gray-200 shadow-sm text-center">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-6 py-2 rounded-full font-medium capitalize transition-all duration-300 hover:-translate-y-1
                  ${
                    filter === cat
                      ? "bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg shadow-orange-500/30"
                      : "bg-gray-100 hover:bg-gray-200"
                  }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          {loading ? (
            <p className="text-center text-gray-400 py-20">Loading gallery…</p>
          ) : filtered.length === 0 ? (
            <p className="text-center text-gray-400 py-20">
              No items in this category yet.
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
              {filtered.map((item) => (
                <div
                  key={item.id}
                  className="relative overflow-hidden rounded-xl shadow-lg cursor-pointer transition-all duration-300 hover:-translate-y-3 hover:shadow-xl bg-white group"
                >
                  <div className="absolute top-5 right-5 bg-orange-500 text-white px-4 py-1.5 rounded-full text-sm font-medium z-10 shadow capitalize">
                    {item.category}
                  </div>
                  {item.date_label && (
                    <div className="absolute top-5 left-5 bg-black/60 text-white px-3 py-1.5 rounded-full text-xs z-10">
                      {item.date_label}
                    </div>
                  )}

                  {item.media_type === "video" ? (
                    <video
                      src={item.media_url}
                      className="w-full h-72 object-cover transition-transform duration-500 group-hover:scale-105"
                      controls
                    />
                  ) : (
                    <div className="relative h-72 overflow-hidden">
                      <Image
                        src={item.media_url}
                        alt={item.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                    </div>
                  )}

                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent text-white p-6 translate-y-3/4 group-hover:translate-y-0 transition-transform duration-300">
                    <h4 className="text-xl mb-2">{item.title}</h4>
                    {item.description && (
                      <p className="text-sm opacity-90 leading-relaxed">
                        {item.description}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* News Posts Section */}
          {posts.length > 0 && (
            <div className="mt-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center relative inline-block">
                Latest News
                <span className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-16 h-1 bg-orange-500 rounded-full" />
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {posts.map((post) => (
                  <div
                    key={post.id}
                    className="bg-white rounded-xl shadow-md overflow-hidden hover:-translate-y-2 transition-all duration-300"
                  >
                    {post.image_url && (
                      <div className="relative h-48">
                        <Image
                          src={post.image_url}
                          alt={post.title}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, 33vw"
                        />
                      </div>
                    )}
                    <div className="p-5">
                      <p className="text-xs text-orange-500 font-semibold mb-1">
                        {new Date(post.published_at).toLocaleDateString(
                          "en-GB",
                          { day: "numeric", month: "long", year: "numeric" },
                        )}
                      </p>
                      <h3 className="text-lg font-bold text-gray-800 mb-2">
                        {post.title}
                      </h3>
                      <p className="text-sm text-gray-600 leading-relaxed">
                        {post.body}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

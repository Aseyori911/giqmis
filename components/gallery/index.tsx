"use client";

import { useEffect, useState } from "react";
import { GalleryItem, NewsPost } from "./types";
import HeroBanner from "./heroBanner";
import FilterTabs from "./filterTabs";
import GalleryGrid from "./galleryGrid";
import NewsSection from "./newsSection";
import ScrollToTop from "../scrollToTop";

export default function GalleryPage() {
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
    <div className="bg-white dark:bg-stone-900 transition-colors">
      <HeroBanner />
      <FilterTabs categories={categories} filter={filter} onFilter={setFilter} />
      <section className="py-12">
        <div className="container mx-auto px-4">
          <GalleryGrid items={filtered} loading={loading} />
          <NewsSection posts={posts} />
        </div>
      </section>
      <ScrollToTop />
    </div>
  );
}
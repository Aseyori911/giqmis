"use client";
import { ChevronUp } from "lucide-react";

const ScrollToTop = () => {
  return (
    <div className="fixed bottom-5 right-5 z-50">
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center text-orange-500 hover:bg-orange-200 transition-colors"
      >
        <ChevronUp />
      </button>
    </div>
  );
};

export default ScrollToTop;

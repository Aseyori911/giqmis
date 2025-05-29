import Image from "next/image";
import Menuu from "./menuu";
import Active from "./active";

export default function Header() {
  return (
    <div>
      <header className="bg-white shadow-sm fixed top-0 left-0 right-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            {/* Logo Section */}
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 flex justify-center items-center relative">
                <Image
                  src="/Gladtidings_LOGO.JPG"
                  alt="Glad"
                  fill
                  style={{ objectFit: "cover" }}
                  sizes="48px"
                  className="max-w-full max-h-full object-contain"
                />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">
                  GI<span className="text-orange-500">QM</span>IS
                </h1>
                <p className="italic text-[12px] md:text-xs text-orange-600">
                  LET KNOWLEDGE FLOURISH
                </p>
              </div>
            </div>

            {/* Right Section */}
            <div className="flex items-center space-x-1 gap-15 lg:gap-10">
              <Active />
              <div className="bar flex items-center gap-8">
                {/* Language Switch */}
                <div className="sm:flex items-center text-sm text-gray-600">
                  <span className="lang hover:text-orange-600 cursor-pointer transition-colors">
                    English
                  </span>
                  <span className="mx-2">|</span>
                  <span className="lang hover:text-orange-600 cursor-pointer transition-colors">
                    العربية
                  </span>
                </div>
                {/* Mobile Menu Toggle */}
                <div className="md:hidden">
                  <Menuu />
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}

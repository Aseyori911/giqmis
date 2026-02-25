"use client";
// app/admin/login/page.tsx

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, Eye, EyeOff } from "lucide-react";
import Image from "next/image";

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Login failed.");
        setLoading(false);
        return;
      }

      router.push("/admin");
      router.refresh();
    } catch {
      setError("Network error. Please try again.");
      setLoading(false);
    }
  };

  return (
<div className="min-h-screen flex items-center justify-center 
  bg-[linear-gradient(135deg,#1c1917_0%,#111827_60%,#0f172a_100%)] 
  font-serif p-4 relative"
>
  {/* Background pattern */}
<div
  className="fixed inset-0 pointer-events-none opacity-30
  bg-[radial-gradient(circle_at_top,rgba(249,115,22,0.15),transparent_60%)]"
/>


  <div className="relative w-full max-w-sm bg-white 
    rounded-2xl shadow-[0_25px_60px_rgba(0,0,0,0.4)] p-10"
  >
    
    {/* Logo */}
    <div className="relative w-14 h-14 rounded-xl 
      bg-gradient-to-br from-orange-400 to-orange-500
      flex items-center justify-center 
      mx-auto mb-6 
      shadow-[0_6px_20px_rgba(249,115,22,0.35)] 
      overflow-hidden"
    >
      <Image
        src="/Gladtidings_LOGO.JPG"
        alt="Glad Tidings Logo"
        fill
        className="object-contain p-2"
        sizes="56px"
        priority
      />
    </div>

    {/* Form */}
    <form onSubmit={handleSubmit}>
      <div className="mb-6">
        <label className="block text-xs font-bold text-stone-600 mb-2 uppercase tracking-wider">
          Admin Password
        </label>

        <div className="relative">
          <Lock
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400"
          />

          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter admin password"
            required
            className={`w-full py-2.5 pl-10 pr-10 rounded-lg text-sm 
              bg-white outline-none border transition-all
              ${error 
                ? "border-red-400 focus:ring-2 focus:ring-red-200" 
                : "border-stone-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
              }`}
          />

          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 
              text-stone-400 hover:text-orange-500 transition"
          >
            {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        </div>

        {error && (
          <p className="mt-2 text-sm text-red-600">
            ⚠ {error}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={loading || !password}
        className={`w-full py-2.5 rounded-lg text-sm font-bold text-white 
          flex items-center justify-center gap-2 transition-all duration-200
          ${
            loading || !password
              ? "bg-orange-200 cursor-not-allowed"
              : "bg-orange-500 hover:bg-orange-600 active:scale-[0.98]"
          }`}
      >
        {loading ? "Verifying…" : "Sign In"}
      </button>
    </form>

    <p className="text-center mt-6 text-xs text-stone-400">
      Only authorized staff should access this URL.
    </p>
  </div>
</div>

  );
}

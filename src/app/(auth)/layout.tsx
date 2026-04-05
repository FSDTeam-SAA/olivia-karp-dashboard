import React from "react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-background">
      {/* Left side: Branding & Visuals */}
      <div className="hidden lg:flex w-1/2 relative bg-primary items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-br from-primary via-[#ff9b50] to-[#ff7b1c] opacity-90" />
        <div className="relative z-10 text-center px-12 animate-in fade-in slide-in-from-left duration-700">
          <h1 className="text-5xl font-bold text-white mb-6">Olivia Karp</h1>
          <p className="text-xl text-white/90 max-w-md leading-relaxed">
            Welcome to your premium dashboard. Manage your projects, track your
            progress, and elevate your creative workflow with elegance and ease.
          </p>
          <div className="mt-12 flex justify-center">
            <div className="w-32 h-32 rounded-full border-4 border-white/20 bg-white/10 backdrop-blur-md flex items-center justify-center transform hover:scale-105 transition-transform duration-300">
              <span className="text-white text-4xl font-bold">OK</span>
            </div>
          </div>
        </div>
        {/* Subtle background decorative elements */}
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#ff6a00]/20 rounded-full blur-3xl" />
      </div>

      {/* Right side: Forms */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white dark:bg-card">
        <div className="w-full max-w-md space-y-8 animate-in fade-in slide-in-from-right duration-700">
          <div className="lg:hidden text-center mb-8">
            <h1 className="text-4xl font-bold text-primary">Olivia Karp</h1>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}

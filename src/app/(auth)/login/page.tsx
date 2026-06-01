import { LoginForm } from "@/features/auth/components/login-form";

export default function LoginPage() {
  return (
    <div className="relative min-h-svh w-full overflow-hidden">
      {/* Video de fondo */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 h-full w-full object-cover "
      >
        <source src="/video-login.mp4" type="video/mp4" />
      </video>

      {/* Overlay sutil para mejorar contraste */}
      <div className="absolute inset-0 bg-white/20 backdrop-blur-[2px] " />

      {/* Contenedor centrado con caja liquid glass */}
      <div className="relative z-10 flex min-h-svh items-center justify-center p-6">
        <div
          className="w-full max-w-sm rounded-3xl border border-white/40 p-8 shadow-2xl"
          style={{
            background:
              "linear-gradient(135deg, rgba(255,255,255,0.55) 0%, rgba(255,255,255,0.25) 100%)",
            backdropFilter: "blur(20px) saturate(180%)",
            WebkitBackdropFilter: "blur(20px) saturate(180%)",
            boxShadow:
              "0 8px 32px rgba(0,0,0,0.12), inset 0 1px 0 rgba(255,255,255,0.8), inset 0 -1px 0 rgba(255,255,255,0.2)",
          }}
        >
          {/* Reflejo tipo liquid en la parte superior */}
          <div
            className="pointer-events-none absolute inset-x-4 top-2 h-px rounded-full"
            style={{
              background:
                "linear-gradient(90deg, transparent, rgba(255,255,255,0.9), transparent)",
            }}
          />
          <LoginForm />
        </div>
      </div>
    </div>
  );
}

import AuthHero from "./AuthHero";

export default function AuthLayout({ children }) {
  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-slate-100">
      <AuthHero />

      <div className="flex items-center justify-center p-10">{children}</div>
    </div>
  );
}

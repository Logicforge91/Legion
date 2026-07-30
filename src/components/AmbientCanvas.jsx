export default function AmbientCanvas() {
  return <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden="true">
    <div className="ambient-orb -left-32 top-[12%] size-80 animate-float bg-mint-300/10" />
    <div className="ambient-orb -right-28 top-[44%] size-96 animate-float bg-aqua-300/10 [animation-delay:-3s]" />
    <div className="absolute inset-0 animate-grid opacity-[0.035] [background-image:linear-gradient(rgba(199,255,107,.5)_1px,transparent_1px),linear-gradient(90deg,rgba(199,255,107,.5)_1px,transparent_1px)] [background-size:44px_44px]" />
  </div>;
}

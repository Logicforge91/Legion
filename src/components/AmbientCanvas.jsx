export default function AmbientCanvas() {
  return <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden="true">
    <div className="ambient-orb -left-32 top-[10%] size-96 animate-float bg-mint-300/[0.08]" />
    <div className="ambient-orb -right-28 top-[36%] size-[30rem] animate-float bg-aqua-300/[0.09] [animation-delay:-3.5s]" />
    <div className="ambient-orb left-1/3 bottom-[15%] size-[26rem] animate-float bg-amber-300/[0.04] [animation-delay:-6s]" />
    <div className="absolute inset-0 animate-grid opacity-[0.032] [background-image:radial-gradient(rgba(199,255,94,0.45)_1px,transparent_1px)] [background-size:36px_36px]" />
  </div>;
}

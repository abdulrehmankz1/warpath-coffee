type Props = {
  top: string;
  name: string;
  meta: string;
};

export function DogTag({ top, name, meta }: Props) {
  return (
    <div
      className="inline-flex flex-col justify-center text-combat-900 font-mono font-bold text-[11px] tracking-[.18em] uppercase relative min-w-[180px]"
      style={{
        background: "linear-gradient(180deg,#9a8451 0%,#c49a48 35%,#7a5e26 100%)",
        padding: "14px 28px 14px 38px",
        borderRadius: "6px 6px 22px 22px",
        boxShadow:
          "inset 0 1px 0 rgba(255,255,255,.45), inset 0 -1px 0 rgba(0,0,0,.25), 0 6px 18px rgba(0,0,0,.35)",
      }}
    >
      <span
        className="absolute top-1/2 left-3.5 w-2.5 h-2.5 rounded-full bg-combat-900 -translate-y-1/2"
        style={{ boxShadow: "inset 0 1px 1px rgba(0,0,0,.6)" }}
      />
      <span className="text-[10px] opacity-75 mb-0.5 tracking-[.22em]">{top}</span>
      <span className="font-stencil font-extrabold text-lg tracking-[.04em] leading-none">{name}</span>
      <span className="text-[9px] mt-1 opacity-85">{meta}</span>
    </div>
  );
}

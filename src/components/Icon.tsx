const paths: Record<string, React.ReactNode> = {
  veena: (<><circle cx="12" cy="34" r="8" /><path d="M18 28 40 6" /><path d="M36 6h5v5" /><path d="M22 24l2 2M26 20l2 2M30 16l2 2" /><circle cx="41" cy="14" r="3" /></>),
  lotus: (<><path d="M24 40c-6-4-9-11-8-18 4 2 7 6 8 10 1-4 4-8 8-10 1 7-2 14-8 18Z" /><path d="M24 40c-9 0-15-5-17-12 6 0 11 3 14 7M24 40c9 0 15-5 17-12-6 0-11 3-14 7" /><path d="M24 32c-1-8 0-14 0-20" /></>),
  lamp: (<><path d="M24 6c3 4 5 7 5 10a5 5 0 0 1-10 0c0-3 2-6 5-10Z" /><path d="M12 28h24l-3 6H15l-3-6Z" /><path d="M18 34v4h12v-4" /><path d="M14 42h20" /></>),
  temple: (<><path d="M8 42h32M10 36h28M14 36V22h20v14" /><path d="M24 6l9 8H15l9-8Z" /><path d="M17 14h14v8H17z" /><path d="M22 36v-6h4v6" /></>),
  note: (<><path d="M18 36V10l18-4v24" /><circle cx="13" cy="36" r="5" /><circle cx="31" cy="30" r="5" /><path d="M18 18l18-4" /></>),
  garland: (<><path d="M6 14c6 14 30 14 36 0" /><circle cx="12" cy="20" r="2" /><circle cx="20" cy="24" r="2" /><circle cx="28" cy="24" r="2" /><circle cx="36" cy="20" r="2" /><path d="M24 26v10M20 40h8" /></>),
  hands: (<path d="M24 42s-14-8-14-19a7 7 0 0 1 14-3 7 7 0 0 1 14 3c0 11-14 19-14 19Z" />),
  shield: (<><path d="M24 6l14 5v12c0 9-6 16-14 19-8-3-14-10-14-19V11l14-5Z" /><path d="M18 24l4 4 8-8" /></>),
  phone: (<path d="M10 8h8l4 10-5 3a22 22 0 0 0 10 10l3-5 10 4v8a4 4 0 0 1-4 4A32 32 0 0 1 6 12a4 4 0 0 1 4-4Z" />),
  mail: (<><rect x="6" y="12" width="36" height="24" rx="3" /><path d="M6 14l18 12 18-12" /></>),
  pin: (<><path d="M24 42s-12-11-12-21a12 12 0 0 1 24 0c0 10-12 21-12 21Z" /><circle cx="24" cy="21" r="4" /></>),
  clock: (<><circle cx="24" cy="24" r="16" /><path d="M24 14v10l6 4" /></>),
  menu: (<path d="M8 14h32M8 24h32M8 34h32" />),
  close: (<path d="M12 12l24 24M36 12L12 36" />),
};

export type IconName = keyof typeof paths;

export function Icon({ name, className = "w-8 h-8" }: { name: IconName | string; className?: string }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      {paths[name]}
    </svg>
  );
}

export function WhatsAppIcon({ className = "w-[18px] h-[18px]" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8s-.4-.1-.6.1-.6.8-.8 1-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4.3-.4.8-1.4.1-.2 0-.3 0-.5l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.8 12 12 0 0 0 4.6 4c1.7.7 2.1.6 2.9.5a2.5 2.5 0 0 0 1.6-1.1 2 2 0 0 0 .2-1.2c-.1-.1-.3-.2-.5-.3Z" />
    </svg>
  );
}

export function Kolam({ className = "" }: { className?: string }) {
  const petal = (<><path d="M100 100c0-30 10-50 0-80-10 30 0 50 0 80Z" /><path d="M100 100c-8-20-6-40 0-60 6 20 8 40 0 60Z" /></>);
  return (
    <svg viewBox="0 0 200 200" fill="none" stroke="currentColor" strokeWidth="1" className={className} aria-hidden="true">
      {[0, 45, 90, 135, 180, 225, 270, 315].map((r) => (<g key={r} transform={`rotate(${r} 100 100)`}>{petal}</g>))}
      <circle cx="100" cy="100" r="92" /><circle cx="100" cy="100" r="60" /><circle cx="100" cy="100" r="14" />
    </svg>
  );
}

export function SocialIcon({ name, className = "w-5 h-5" }: { name: "instagram" | "youtube" | "facebook" | "google"; className?: string }) {
  const p: Record<string, React.ReactNode> = {
    instagram: (<><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" /></>),
    youtube: (<><path d="M22 12s0-4-.5-5.5A3 3 0 0 0 19.4 4.5C17.9 4 12 4 12 4s-5.9 0-7.4.5A3 3 0 0 0 2.5 6.5C2 8 2 12 2 12s0 4 .5 5.5a3 3 0 0 0 2.1 2C6.1 20 12 20 12 20s5.9 0 7.4-.5a3 3 0 0 0 2.1-2C22 16 22 12 22 12Z" /><path d="M10 9l5 3-5 3V9Z" fill="currentColor" stroke="none" /></>),
    facebook: (<path d="M14 8h3V4h-3a4 4 0 0 0-4 4v3H7v4h3v6h4v-6h3l1-4h-4V8Z" />),
    google: (<><path d="M12 3l2.4 5 5.6.6-4.2 3.8 1.2 5.6L12 15.2 7 18l1.2-5.6L4 8.6 9.6 8 12 3Z" /></>),
  };
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">{p[name]}</svg>
  );
}

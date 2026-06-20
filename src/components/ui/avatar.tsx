export function Avatar({ fallback }: { fallback: string }) {
  return <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">{fallback}</div>;
}


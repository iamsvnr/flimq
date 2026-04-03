export default function MovieCardSkeleton() {
  return (
    <div className="flex-shrink-0">
      <div className="w-full aspect-[2/3] skeleton rounded-xl" />
      <div className="mt-2 space-y-1.5">
        <div className="h-3 skeleton w-3/4" />
        <div className="h-3 skeleton w-1/2" />
      </div>
    </div>
  );
}

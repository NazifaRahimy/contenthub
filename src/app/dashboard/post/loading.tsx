export default function Loading() {
  return (
    <div className="space-y-4 p-6">
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className="h-24 bg-gray-200 animate-pulse rounded"
        />
      ))}
    </div>
  );
}

export function ProductCardSkeleton() {
  return (
    <div className="card p-4 space-y-3">
      <div className="skeleton h-48 w-full rounded-lg" />
      <div className="skeleton h-3 w-3/4" />
      <div className="skeleton h-3 w-1/2" />
      <div className="skeleton h-4 w-1/3" />
      <div className="skeleton h-9 w-full rounded-lg" />
    </div>
  )
}

export function ProductDetailSkeleton() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8 grid md:grid-cols-2 gap-8">
      <div className="space-y-3">
        <div className="skeleton h-80 w-full rounded-xl" />
        <div className="flex gap-2">
          {[0,1,2].map(i => <div key={i} className="skeleton h-16 w-16 rounded-lg" />)}
        </div>
      </div>
      <div className="space-y-4">
        <div className="skeleton h-6 w-full" />
        <div className="skeleton h-4 w-1/2" />
        <div className="skeleton h-8 w-1/3" />
        <div className="skeleton h-4 w-full" />
        <div className="skeleton h-4 w-2/3" />
        <div className="skeleton h-10 w-full rounded-lg" />
      </div>
    </div>
  )
}

export function OrderSkeleton() {
  return (
    <div className="card p-4 space-y-3">
      <div className="flex justify-between">
        <div className="skeleton h-4 w-1/4" />
        <div className="skeleton h-4 w-1/4" />
      </div>
      <div className="skeleton h-16 w-full rounded-lg" />
      <div className="skeleton h-4 w-1/3" />
    </div>
  )
}

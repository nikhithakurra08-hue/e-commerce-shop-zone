import { Star } from 'lucide-react'

interface Props {
  rating: number
  size?: number
  showCount?: boolean
  count?: number
}

export default function StarRating({ rating, size = 14, showCount, count }: Props) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map(star => (
        <Star
          key={star}
          size={size}
          className={star <= Math.round(rating) ? 'fill-amazon-500 text-amazon-500' : 'fill-gray-200 text-gray-200'}
        />
      ))}
      <span className="text-xs text-amazon-600 font-medium ml-0.5">{rating.toFixed(1)}</span>
      {showCount && count !== undefined && (
        <span className="text-xs text-gray-500">({count.toLocaleString()})</span>
      )}
    </div>
  )
}

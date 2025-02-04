interface ProgressDotsProps {
  total: number
  current: number
}

export function ProgressDots({ total, current }: ProgressDotsProps) {
  return (
    <div
      className="flex gap-2 justify-center mb-6"
      role="progressbar"
      aria-valuemin={1}
      aria-valuemax={total}
      aria-valuenow={current}
    >
      {Array.from({ length: total }).map((_, i) => (
        <div
          key={i}
          className={`h-2 w-2 rounded-full transition-colors ${i === current ? "bg-[#7CBCD4]" : "bg-gray-200"}`}
          aria-hidden="true"
        />
      ))}
    </div>
  )
}


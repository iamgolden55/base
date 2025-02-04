interface OnboardingCardProps {
  title: string
  description: string
  imageSrc: string
  imageAlt: string
  children?: React.ReactNode
}

export function OnboardingCard({ title, description, imageSrc, imageAlt, children }: OnboardingCardProps) {
  return (
    <div className="relative h-full w-full flex flex-col items-center">
      <div
        className="absolute inset-0 bg-contain bg-center bg-no-repeat -z-10"
        style={{ backgroundImage: `url(${imageSrc})` }}
        aria-hidden="true"
      />
      <div className="w-full max-w-md mt-auto mb-8 p-6 bg-white rounded-3xl shadow-lg mx-4">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">
          {title.split(" ").map((word, i) => (
            <span key={i} className={i === 1 && word === "TripWell" ? "text-[#7CBCD4]" : ""}>
              {word}{" "}
            </span>
          ))}
        </h2>
        <p className="text-gray-600 mb-6">{description}</p>
        {children}
      </div>
    </div>
  )
}


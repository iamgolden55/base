export default function OnboardingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // This completely replaces any parent layouts
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  )
} 
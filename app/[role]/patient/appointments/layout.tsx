export default function AppointmentsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="appointments-layout">
      {children}
    </div>
  )
}
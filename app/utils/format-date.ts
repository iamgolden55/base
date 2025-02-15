export function formatDate(date: string | Date): string {
    // Create a consistent date formatter that will work the same on server and client
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "numeric",
      day: "numeric",
    }).format(new Date(date))
  }
  
  
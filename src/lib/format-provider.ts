/**
 * Providers only have an ID to identify them. This function formats the ID
 * into a human-readable string.
 *
 * Format example: pp_stripe-blik_dkk
 *
 * @param id - The ID of the provider
 * @returns A formatted string
 */
export const formatProvider = (id: string) => {
  if (!id || typeof id !== 'string') {
    return 'Unknown Provider'
  }

  const parts = id.split("_")
  
  // Handle different formats
  if (parts.length < 2) {
    // If format is unexpected, just return capitalized version
    return id.charAt(0).toUpperCase() + id.slice(1)
  }

  const [_, name, type] = parts
  
  if (!name) {
    return id
  }

  try {
    return (
      name
        .split("-")
        .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
        .join(" ") + (type ? ` (${type.toUpperCase()})` : "")
    )
  } catch (error) {
    // Fallback if something goes wrong
    return id
  }
}

export const getFullStrapiUrl = (uri?: string) => {
  if (!uri) return '';
  const isFullUrl = uri.startsWith('http://') || uri.startsWith('https://');
  return isFullUrl ? uri : `${process.env.EXPO_PUBLIC_HOST}${uri.startsWith('/') ? uri : `/${uri}`}`;
};

export function buildStrapiFilters(filters: any, prefix = 'filters'): Record<string, string> {
  const params: Record<string, string> = {};

  const build = (obj: any, path: string[]) => {
    Object.entries(obj).forEach(([key, value]) => {
      const newPath = [...path, key];
      if (typeof value === 'object' && value !== null) {
        build(value, newPath);
      } else {
        const paramKey = newPath.reduce((acc, part) => `${acc}[${part}]`, prefix);
        params[paramKey] = String(value);
      }
    });
  };

  build(filters, []);
  return params;
}

export function extractDateTimePart(
  isoString: string,
  part: "year" | "date" | "time" | "datetime" = "datetime"
): string | null {
  if (!isoString) return null;

  const dateObj = new Date(isoString);
  if (isNaN(dateObj.getTime())) return null; // invalid date

  switch (part) {
    case "year":
      return dateObj.getFullYear().toString();

    case "date":
      // Format YYYY-MM-DD
      return dateObj.toISOString().slice(0, 10);

    case "time":
      // Format HH:MM:SS (UTC)
      return dateObj.toISOString().slice(11, 19);

    case "datetime":
    default:
      // Format YYYY-MM-DD HH:MM:SS (local time)
      // Let's show local time for better UX
      const datePart = dateObj.toLocaleDateString();
      const timePart = dateObj.toLocaleTimeString();
      return `${datePart} ${timePart}`;
  }
}

/**
 * Removes properties with empty string, null, or undefined values from an object.
 * @param obj The object to sanitize.
 * @returns A new object with only valid values.
 */
export const sanitizeObject = <T extends Record<string, any>>(obj: T): Partial<T> => {
  const sanitized = Object.fromEntries(
    Object.entries(obj).filter(([_, value]) => {
      if (typeof value === 'string') return value.trim() !== '';
      return value !== null && value !== undefined;
    })
  );

  return sanitized as Partial<T>;
};

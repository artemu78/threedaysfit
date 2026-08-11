/** Resolve a client/public asset in both root and repository-subpath builds. */
export function assetPath(path: string): string {
  const normalizedPath = path.replace(/^\.\//, "").replace(/^\//, "");
  return `${import.meta.env.BASE_URL}${normalizedPath}`;
}

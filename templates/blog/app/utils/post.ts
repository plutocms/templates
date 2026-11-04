export function postDate(
  post: Pick<PlutoPostSummary, "createdAt" | "publishedAt">,
  style: "medium" | "long" = "medium",
): string {
  const value = post.publishedAt || post.createdAt;
  return value
    ? new Intl.DateTimeFormat("en", { dateStyle: style }).format(new Date(value))
    : "";
}

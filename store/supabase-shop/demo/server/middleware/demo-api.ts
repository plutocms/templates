// The demo has no Supabase project. While the pages prerender, this answers the
// public API from demo-fixture.json (fiction), so the static build writes the
// same files as a real shop. It is in store/, so it never reaches a user.
import fixture from "../../demo-fixture.json";

const PREFIX = "/api/pluto/v1/";

export default defineEventHandler((event) => {
  const at = event.path.indexOf(PREFIX);
  if (at === -1) {
    return;
  }
  const [route, type, ...id] = event.path
    .slice(at + PREFIX.length)
    .split("?")[0]!
    .split("/")
    .map(decodeURIComponent);

  if (route === "index.json") {
    return { types: fixture.types };
  }
  const entry = fixture.types[type as keyof typeof fixture.types] as
    | PlutoPublicIndexType
    | undefined;
  if (!entry) {
    throw createError({ statusCode: 404, statusMessage: "Not found." });
  }
  if (route === "content" && id.length === 0) {
    return queryPublicIndex(entry, getQuery(event));
  }

  const key = id.join("/");
  const index = entry.items.findIndex(
    (item) => String(item.id) === key || item.slug === key,
  );
  if (index === -1) {
    throw createError({ statusCode: 404, statusMessage: "Not found." });
  }
  if (route === "content") {
    return { data: entry.items[index] };
  }
  if (route === "surround") {
    return {
      data: {
        previous: entry.items[index - 1] ?? null,
        next: entry.items[index + 1] ?? null,
      },
    };
  }
  throw createError({ statusCode: 404, statusMessage: "Not found." });
});

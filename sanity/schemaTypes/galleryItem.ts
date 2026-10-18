import { defineField, defineType } from "sanity";

export const galleryItem = defineType({
  name: "galleryItem",
  title: "Gallery Item",
  type: "document",
  fields: [
    defineField({ name: "title", type: "string", validation: (r) => r.required() }),
    defineField({ name: "image", type: "image", options: { hotspot: true }, fields: [defineField({ name: "alt", type: "string", title: "Alt text (describe the image)", validation: (r) => r.required() })], validation: (r) => r.required() }),
    defineField({ name: "videoUrl", type: "url", description: "Optional" }),
    defineField({ name: "category", title: "Event / category", type: "string" }),
    defineField({ name: "order", type: "number", title: "Display order" }),
    defineField({ name: "published", type: "boolean", initialValue: false }),
  ],
  preview: { select: { title: "title", subtitle: "category", media: "image" } },
});

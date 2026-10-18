import { defineField, defineType } from "sanity";

export const leader = defineType({
  name: "leader",
  title: "Leader / Coordinator",
  type: "document",
  fields: [
    defineField({ name: "name", type: "string", validation: (r) => r.required() }),
    defineField({ name: "slug", type: "slug", options: { source: "name" }, validation: (r) => r.required() }),
    defineField({ name: "role", title: "Official role", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "category",
      type: "string",
      options: {
        list: [
          { title: "Movement Founder / National Leader", value: "national-leader" },
          { title: "National Executive", value: "national-executive" },
          { title: "Executive", value: "executive" },
          { title: "State Leadership", value: "state" },
          { title: "Senatorial District Coordinator", value: "senatorial" },
          { title: "Local Government Coordinator", value: "lga" },
          { title: "Ward Coordinator", value: "ward" },
          { title: "Other Appointed Leaders", value: "other" },
        ],
      },
      validation: (r) => r.required(),
    }),
    defineField({ name: "state", type: "string" }),
    defineField({ name: "lga", title: "Local government area", type: "string" }),
    defineField({ name: "order", title: "Display order", type: "number", description: "Lower numbers appear first." }),
    defineField({ name: "photo", type: "image", options: { hotspot: true }, fields: [defineField({ name: "alt", type: "string", title: "Alt text" })] }),
    defineField({ name: "bio", title: "Approved biography", type: "text", rows: 6 }),
    defineField({ name: "contactEmail", title: "Official contact email (only if approved)", type: "string" }),
    defineField({ name: "published", type: "boolean", initialValue: false, description: "Only published profiles appear on the website." }),
  ],
  preview: { select: { title: "name", subtitle: "role", media: "photo" } },
});

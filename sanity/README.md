# Sanity schemas

Create a Sanity Studio (`npm create sanity@latest`), then copy `schemaTypes/` into it and register `schemaTypes` in `sanity.config.ts`.
The website reads documents of type `leader`, `article` and `galleryItem` where `published == true`. Drafts are never shown.

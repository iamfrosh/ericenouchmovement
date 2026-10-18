import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/SectionHeading";

export default function NotFound() {
  return (
    <Container className="py-28">
      <Eyebrow>Error 404</Eyebrow>
      <h1 className="text-4xl font-extrabold">Page not found</h1>
      <p className="mb-8 mt-4 max-w-[48ch] text-lg text-ink-soft">The page you are looking for does not exist or has moved.</p>
      <ButtonLink href="/">Back to home</ButtonLink>
    </Container>
  );
}

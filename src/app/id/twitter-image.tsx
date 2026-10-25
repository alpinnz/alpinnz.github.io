import { createOpenGraphImage, size } from "@/components/site/generated-open-graph-image";

export const alt = "Alfin Noviaji, Full Stack Developer di Malang, Indonesia";
export const dynamic = "force-static";
export { size };
export const contentType = "image/png";

export default function TwitterImage() {
  return createOpenGraphImage("id");
}

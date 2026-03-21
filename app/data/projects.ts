export type Project = {
  id: number;
  title: string;
  desc: string;
  img: string;
};

export const projects: Project[] = [
  {
    id: 1,
    title: "3D Modern Lamp Design",
    desc: "A refined lighting concept highlighting modern forms, soft illumination, and elegant interior styling.",
    img: "/projects/3d-modern-lamp-design.jpg",
  },
  {
    id: 2,
    title: "Neoclassical Interior Suite",
    desc: "A harmony of classic detailing and modern finishes, creating a luxurious yet timeless living experience.",
    img: "/projects/interior-design-neoclassical-style-with-furnishings-decor.jpg",
  },
  {
    id: 3,
    title: "Minimal Luxury Living",
    desc: "A calm and spacious composition featuring soft tones, clean textures, and balanced architectural lighting.",
    img: "/projects/minimal-amazing-interior.jpg",
  },
  {
    id: 4,
    title: "Contemporary Minimalist",
    desc: "Sleek lines, neutral palettes, and refined materials define a modern interior with effortless sophistication.",
    img: "/projects/minimal-amazing-interior-design.jpg",
  },
  {
    id: 5,
    title: "Modern Clean Interior",
    desc: "A curated blend of elegant shapes, smooth textures, and functional decor for a polished contemporary home.",
    img: "/projects/modern-clean-interior-design.jpg",
  },
];

export function toProjectSlug(title: string) {
  return String(title).trim().replace(/\s+/g, "-");
}


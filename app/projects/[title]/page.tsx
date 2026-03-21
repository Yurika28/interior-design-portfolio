import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { projects, toProjectSlug } from "@/app/data/projects";



export default async function ProjectPage({ params }: { params: Promise<{ title: string }>}) {
  const resolvedParams = await params;
  const title = resolvedParams.title;

  // 2. Now you can use it like normal
  const slug = toProjectSlug(title).toLowerCase();
  
  const project = projects.find(
    (p) => toProjectSlug(p.title).toLowerCase() === slug
  );

  if (!project) return notFound();

  return (
    <section className="relative w-full min-h-screen bg-[url('/marble-bg.jpg')] bg-cover bg-center text-white py-24 overflow-hidden">
      <div className="absolute inset-0 bg-black/20" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 ">
        <Link href="/#projects" className="text-amber-300 hover:underline">
          Back to projects
        </Link>

        <h1 className="mt-6 text-4xl md:text-6xl font-light leading-tight drop-shadow-[0_2px_10px_rgba(0,0,0,0.35)]">
          {project.title}
        </h1>

        <div className="mt-10 relative h-[320px] sm:h-[420px] md:h-[520px] rounded-3xl overflow-hidden shadow-[0_20px_80px_rgba(0,0,0,0.35)]">
          <Image src={project.img} alt={project.title} fill className="object-contain" priority />
        </div>

        <p className="mt-8 max-w-2xl text-neutral-300 leading-relaxed text-base sm:text-lg ">
          {project.desc}
        </p>
      </div>
    </section>
  );
}


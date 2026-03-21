"use client";

import { FileStack, Eye, Target } from "lucide-react";

const textCards = [
  {
    id: "t1",
    icon: Target,
    text:
      "Transform concepts into powerful visual stories that inspire clients, investors, and future homeowners.",
    style: { left: "10%", bottom: "25%", width: "20%" },
    mobileStyle: { left: "8%", top: "8%", width: "70%" },
  },
  {
    id: "t2",
    icon: Eye,
    text:
      "We are a creative studio specializing in architectural visualization and 3D design.",
    style: { left: "35%", top: "30%", width: "20%" },
    mobileStyle: { right: "8%", top: "45%", width: "80%" },
  },
  {
    id: "t3",
    icon: FileStack,
    text:
      "With a passion for detail and realism, we deliver images that not only illustrate but also evoke emotion.",
    style: { right: "10%", bottom: "25%", width: "20%" },
    mobileStyle: { left: "8%", bottom: "5%", width: "80%" },
  },
];

export default function TextCards({ isMobile }) {
  return (
    <>
      {textCards.map((card) => {
        const Icon = card.icon;

        return (
          <div
            key={card.id}
            className="
              absolute
              rounded-2xl px-4 py-5
              text-white shadow-2xl
              backdrop-blur-sm
              bg-linear-to-r from-gray-200/20 via-gray-100/10 to-transparent
            "
            style={{
              ...(isMobile ? card.mobileStyle : card.style),
              minWidth: 220,
            }}
          >
            <div className="flex gap-3 items-start">
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                <Icon className="w-5 h-5" />
              </div>
              <p className="text-xs leading-relaxed">{card.text}</p>
            </div>
          </div>
        );
      })}
    </>
  );
}


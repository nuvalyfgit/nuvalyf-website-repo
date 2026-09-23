import Image from "next/image";

import { cn } from "@/lib/utils";
import logoDark from "@/public/nuva-lyf-logo.png";
import logoLight from "@/public/nuva-lyf-logo-light.png";

/**
 * Two variants of the same artwork.
 *
 * The supplied file is dark ink on transparent, drawn for light surfaces. The
 * header and footer are deep navy, where that ink disappears. Rather than
 * flattening the mark with a `brightness(0) invert(1)` filter - which would
 * throw away the teal stethoscope and the green leaf - the light variant
 * recolours only the low-chroma ink to white and leaves the brand colours
 * untouched. Both files are the same 2000x518 source.
 */
export function BrandLogo({ inverse = false }: { inverse?: boolean }) {
  return (
    <a
      href="#home"
      className="inline-flex items-center rounded-md transition-opacity hover:opacity-80"
      aria-label="NUVA LYF home"
    >
      <Image
        src={inverse ? logoLight : logoDark}
        alt="NUVA LYF"
        priority
        sizes="220px"
        className={cn("h-8 w-auto object-contain sm:h-9")}
      />
    </a>
  );
}

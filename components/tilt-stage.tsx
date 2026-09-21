"use client";

import { useRef, type PointerEvent, type ReactNode } from "react";

import { cn } from "@/lib/utils";

/**
 * Writes normalised pointer position (-1..1) to `--px` / `--py` so CSS can tilt
 * the composition in 3D. Deliberately tiny:
 *
 * - No state, no re-renders. It mutates two custom properties directly, so the
 *   React tree never re-renders while the pointer moves.
 * - Children stay server components; this only wraps them.
 * - Both properties default to 0 in CSS, so the server HTML is already the
 *   correct at-rest frame and nothing shifts on hydration.
 * - Ignored entirely on touch, where there is no pointer to follow.
 */
export function TiltStage({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  function handleMove(event: PointerEvent<HTMLDivElement>) {
    if (event.pointerType !== "mouse") return;
    const node = ref.current;
    if (!node) return;

    const rect = node.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width - 0.5;
    const py = (event.clientY - rect.top) / rect.height - 0.5;

    node.style.setProperty("--px", (px * 2).toFixed(3));
    node.style.setProperty("--py", (py * 2).toFixed(3));
  }

  function handleLeave() {
    const node = ref.current;
    if (!node) return;
    node.style.setProperty("--px", "0");
    node.style.setProperty("--py", "0");
  }

  return (
    <div
      ref={ref}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
      className={cn("tilt", className)}
    >
      {children}
    </div>
  );
}

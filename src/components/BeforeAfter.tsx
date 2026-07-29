import { useCallback, useRef, useState } from "react";
// PLACEHOLDER ASSET: before-after.jpg is a single side-by-side comparison
// image (sketch left, final right), not two separately-framed shots of the
// same piece. Cropping it into "left half" / "right half" below is a stand-in
// so the drag-reveal mechanic can be reviewed — swap in a matched
// sketch/final pair of the same artwork for the real version (see
// design/portfolio-structure.md).
import beforeAfterImage from "@/assets/before-after.jpg";

const MIN_PERCENT = 4;
const MAX_PERCENT = 96;

const BeforeAfter = () => {
  const [percent, setPercent] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const draggingRef = useRef(false);

  const setFromClientY = useCallback((clientY: number) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const raw = ((clientY - rect.top) / rect.height) * 100;
    setPercent(Math.min(MAX_PERCENT, Math.max(MIN_PERCENT, raw)));
  }, []);

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    draggingRef.current = true;
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    setFromClientY(e.clientY);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!draggingRef.current) return;
    setFromClientY(e.clientY);
  };

  const handlePointerUp = () => {
    draggingRef.current = false;
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowUp") {
      e.preventDefault();
      setPercent((p) => Math.max(MIN_PERCENT, p - 5));
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      setPercent((p) => Math.min(MAX_PERCENT, p + 5));
    }
  };

  return (
    <section className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-display text-4xl md:text-5xl font-extrabold uppercase tracking-tight mb-4 text-foreground">
            Creative Process
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            From rough sketch to finished illustration — drag to compare
          </p>
        </div>

        <div className="relative max-w-xl mx-auto">
          <div
            ref={containerRef}
            className="relative aspect-[3/4] overflow-hidden rounded-lg border border-border cursor-ns-resize select-none"
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerUp}
          >
            {/* Before layer (sketch) — full frame, sits underneath */}
            <img
              src={beforeAfterImage}
              alt="Rough sketch stage"
              className="absolute inset-0 h-full w-full object-cover"
              style={{ objectPosition: "0% 50%" }}
              draggable={false}
            />

            {/* After layer (final) — clipped from the top down to `percent` */}
            <div
              className="absolute inset-0 overflow-hidden"
              style={{ clipPath: `inset(0 0 ${100 - percent}% 0)` }}
            >
              <img
                src={beforeAfterImage}
                alt="Finished illustration"
                className="absolute inset-0 h-full w-full object-cover"
                style={{ objectPosition: "100% 50%" }}
                draggable={false}
              />
            </div>

            {/* Drag handle */}
            <div
              role="slider"
              tabIndex={0}
              aria-label="Compare sketch and final illustration"
              aria-valuenow={Math.round(percent)}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-orientation="vertical"
              onKeyDown={handleKeyDown}
              className="absolute left-0 right-0 z-10 flex items-center justify-center focus:outline-none"
              style={{ top: `${percent}%`, transform: "translateY(-50%)" }}
            >
              <div className="h-px w-full bg-primary" />
              <div className="absolute h-9 w-9 rounded-full bg-primary border-2 border-background flex items-center justify-center transition-transform duration-300 hover:scale-110">
                <div className="h-3 w-3 rounded-full bg-primary-foreground" />
              </div>
            </div>

            {/* Labels */}
            <div className="absolute top-4 left-4 bg-card/80 backdrop-blur-sm px-3 py-1 rounded-md border border-border">
              <span className="text-xs uppercase tracking-wide font-medium text-muted-foreground">
                Sketch
              </span>
            </div>
            <div className="absolute bottom-4 left-4 bg-card/80 backdrop-blur-sm px-3 py-1 rounded-md border border-border">
              <span className="text-xs uppercase tracking-wide font-medium text-primary">
                Final
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BeforeAfter;

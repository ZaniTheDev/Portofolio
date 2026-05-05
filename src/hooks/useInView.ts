import { useEffect, useRef, useState, RefObject } from "react";

/**
 * Fires once when the observed element enters the viewport.
 * @param threshold  - IntersectionObserver threshold (0–1). Default 0.15.
 * @returns [ref, isVisible] — attach `ref` to the element you want to watch.
 */
export function useInView(threshold = 0.15): [RefObject<HTMLDivElement>, boolean] {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState<boolean>(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);

  return [ref, visible];
}

import { useEffect, useRef } from "react";

export type ScrollLoaderProps = {
  isVisible?: boolean;
  onIntersect: () => void;
};

const ScrollLoader: React.FC<ScrollLoaderProps> = ({
  isVisible,
  onIntersect,
}) => {
  const observerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!observerRef.current) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry && entry.isIntersecting) {
        onIntersect();
      }
    });
    observer.observe(observerRef.current);

    return () => observer.disconnect();
  }, [onIntersect]);

  return (
    <div className="flex flex-col items-center">
      <div ref={observerRef} />
      {isVisible && (
        <div
          className="radial-progress animate-spin text-primary"
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          style={{ "--value": 70, "--size": "3rem" }}
        />
      )}
    </div>
  );
};

export default ScrollLoader;

import { cn } from "@/lib/utils";
import { useState } from "react";

interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallback?: React.ReactNode;
}

export default function Image({ className, src, alt, fallback, ...props }: ImageProps) {
  const [error, setError] = useState(false);

  if (error && fallback) {
    return <>{fallback}</>;
  }

  return (
    <img
      className={cn("", className)}
      src={src}
      alt={alt}
      onError={() => setError(true)}
      {...props}
    />
  );
}


import React from "react";

interface SkeletonProps {
  jml: number;
}

export default function Skeleton({ jml }: SkeletonProps) {
  return (
    <>
      {Array(jml)
        .fill(0)
        .map((_, index) => (
          <div key={index} className="result-card skeleton">
            <div className="recipient skeleton"></div>
            <div className="message skeleton"></div>
            <div className="message skeleton"></div>
          </div>
        ))}
    </>
  );
}

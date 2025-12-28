import React from "react";
import Image from "next/image";

export default function AboutRoute() {
  return (
    <div className="p-6 xl:p-8" style={{ backgroundColor: "var(--glxp-beige)", color: "var(--glxp-black)" }}>
      <h1 style={{ fontSize: "2rem", fontWeight: "bold", marginBottom: "1.5rem", color: "var(--glxp-yellow)" }}>About Me</h1>
      <div>
        <p style={{ marginBottom: "1rem", lineHeight: "1.5" }}>
          Welcome to my website.
        </p>
        <p style={{ marginBottom: "1rem", lineHeight: "1.5" }}>
          I am an IT engineer with a background in both software and hardware development.
        </p>
        <p style={{ marginBottom: "1rem", lineHeight: "1.5" }}>
          Beyond my professional work, I wander the streets with a camera. Street photography gives me a reason to step outside, to slow down, and to observe the world as it unfolds in ordinary moments. I am also deeply interested in fashion design, architectural design, philosophy, and subcultures—fields that continuously shape the way I think, create, and see.
        </p>
        <p style={{ marginBottom: "1rem", lineHeight: "1.5" }}>
          Here, I share my photographic work, technical writings, and pieces of music I love. I hope these fragments of technology and art may resonate with you.
        </p>
      </div>
      <div style={{ display: "flex", justifyContent: "center", marginTop: "2rem" }}>
        <div style={{ position: "relative", width: "300px", height: "400px" }}>
          <Image
            src="/content/AboutMe.JPG"
            alt="About Me"
            fill
            style={{ objectFit: "contain" }}
          />
        </div>
      </div>
    </div>
  );
}

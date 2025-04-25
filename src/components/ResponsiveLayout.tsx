"use client";

import { ReactNode } from "react";
import { useScreenSize } from "../hooks/useScreenSize";

interface ResponsiveLayoutProps {
  children: ReactNode;
  mobileClassName?: string;
  desktopClassName?: string;
}

export function ResponsiveLayout({
  children,
  mobileClassName = "",
  desktopClassName = "",
}: ResponsiveLayoutProps) {
  const { isDesktop, isMobile } = useScreenSize();

  return (
    <div className={isDesktop ? desktopClassName : mobileClassName}>
      {children}
    </div>
  );
}

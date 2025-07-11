"use client";
import { useEventListener } from "@/use/eventListener";
import { Image, Modal, ModalBody, ModalContent } from "@heroui/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef } from "react";
import { useEvent } from "react-use";
import styles from "./WrapperPost.module.css";
import "@/app/markdown.css";

interface WrapperPostProps extends React.PropsWithChildren {
  content?: React.ReactNode;
  frontmatter?: PostFrontmatter;
}

export function WrapperPost({ children, content }: WrapperPostProps) {
  const router = useRouter();
  const contentRef = useRef<HTMLElement>(null);

  function navigate() {
    if (!location.hash) return;

    const element = document.querySelector(decodeURIComponent(location.hash));
    if (!element) return;

    const rect = element.getBoundingClientRect();
    const offset = window.scrollY + rect.top - 80;
    window.scrollTo({
      top: offset,
      behavior: "smooth",
    });

    return true;
  }

  const handleAnchors = (e: Event) => {
    const event = e as MouseEvent;
    const target = event.target as HTMLElement;
    const link = target.closest("a");

    if (
      !event.defaultPrevented &&
      link &&
      event.button === 0 &&
      link.target !== "_blank" &&
      link.rel !== "external" &&
      !link.download &&
      !event.metaKey &&
      !event.ctrlKey &&
      !event.shiftKey &&
      !event.altKey
    ) {
      const url = new URL(link.href);
      if (url.origin !== window.location.origin) return;

      event.preventDefault();
      const { pathname, hash } = url;
      if (hash && (!pathname || pathname === location.pathname)) {
        window.history.replaceState({}, "", hash);
        navigate();
      } else {
        router.push(pathname + hash);
      }
    }
  };

  useEventListener(null, "hashchange", navigate);
  useEventListener(contentRef.current!, "click", handleAnchors, {
    passive: false,
  });

  useEffect(() => {
    setTimeout(() => {
      if (!navigate()) setTimeout(navigate, 1000);
    }, 1);
  }, []);

  return (
    <div className={`${styles.article} slide-enter-content`}>
      <ImagePreview />
      <article ref={contentRef}>{content}</article>
      {children}
    </div>
  );
}

function ImagePreview() {
  const [imagePreviewState, setImagePreviewState] = React.useState(false);
  const imageModel = React.useRef<HTMLImageElement>(null);

  useEvent("click", (e) => {
    const path = Array.from(e.composedPath());
    const first = path[0];

    if (!(first instanceof HTMLElement)) return;
    if (first.tagName !== "IMG") return;
    if (first.classList.contains("no-preview")) return;
    if (first.classList.contains("no-img")) return;

    // 判断该元素是否在MD容器内
    const article = document.querySelector(".slide-enter-content article");
    if (!article || !article.contains(first)) return;

    imageModel.current = first as HTMLImageElement;

    setImagePreviewState(true);
  });

  return (
    <Modal
      isOpen={imagePreviewState}
      onOpenChange={setImagePreviewState}
      backdrop="blur"
      placement="center"
      size="full"
      classNames={{
        base: "bg-transparent",
      }}
    >
      <ModalContent
        className="mx-auto"
        onClick={() => setImagePreviewState(false)}
      >
        <ModalBody className="flex items-center justify-center overflow-auto">
          <Image
            src={imageModel.current?.src ?? ""}
            alt={imageModel.current?.alt ?? ""}
            removeWrapper
            className={`max-w-full max-h-full z-10 bg-cover`}
            onClick={(e) => e.stopPropagation()}
          />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

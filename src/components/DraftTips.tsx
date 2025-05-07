import { memo } from "react";

export const DraftTips = memo(({ draft }: { draft?: boolean }) => {
  if (!draft) return undefined;

  return (
    <p className="px-4 py-2 text-orange-400 border-orange-400 slide-enter bg-orange-400/10 border-l-3">
      This is a draft post, the content may be incomplete. Please check back
      later.
    </p>
  );
});

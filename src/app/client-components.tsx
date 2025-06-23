"use client";

import FirstVisitModal from "@/components/FirstVisitModal";
import PastorMessage from "@/components/pastor-message";

export function ClientFirstVisitModal() {
  return (
    <FirstVisitModal videoUrls={[
      "https://www.facebook.com/pasteurhermanntano/videos/651434039959985",
      "https://www.facebook.com/pasteurhermanntano/videos/725174849362205",
      "https://www.facebook.com/pasteurhermanntano/videos/670268458970941",
      "https://www.facebook.com/pasteurhermanntano/videos/725174849362205",
      "https://www.facebook.com/pasteurhermanntano/videos/651434039959985",
      "https://www.facebook.com/pasteurhermanntano/videos/670268458970941",
      "https://www.facebook.com/pasteurhermanntano/videos/725174849362205"
    ]} />
  );
}

export function ClientPastorMessage() {
  return <PastorMessage />;
}

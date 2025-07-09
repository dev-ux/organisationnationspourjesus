"use client";

import FirstVisitModal from "@/components/FirstVisitModal";
import PastorMessage from "@/components/pastor-message";

export function ClientFirstVisitModal() {
  return (
    <FirstVisitModal videoUrls={[
      "https://www.facebook.com/pasteurhermanntano/videos/1545923519460317",
      "https://www.facebook.com/pasteurhermanntano/videos/1642662756550642",
      "https://www.facebook.com/pasteurhermanntano/videos/670268458970941",
      "https://www.facebook.com/pasteurhermanntano/videos/1020856390034517",
      

    ]} />
  );
}

export function ClientPastorMessage() {
  return <PastorMessage />;
}

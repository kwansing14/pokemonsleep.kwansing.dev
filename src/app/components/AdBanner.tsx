"use client";

import { type CSSProperties, type FC, useEffect } from "react";

type Props = Pick<CSSProperties, "height" | "width">;

export const AdBanner: FC<Props> = (props) => {
  useEffect(() => {
    const adsbygoogleArray = window.adsbygoogle || ([] as unknown[]);
    adsbygoogleArray.push({});
  }, []);

  // It's a good idea to use an `id` that can't be easily detected as a banneable banner.
  // That way adblockers won't remove your fallback state too and you could show a custom
  // message in that case if the ad is blocked
  return (
    <div className="px-4" style={{ ...props }}>
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client="ca-pub-6022766845001236"
        data-ad-slot="7917842835"
        data-ad-format="auto"
        data-full-width-responsive="true"
      ></ins>
    </div>
  );
};

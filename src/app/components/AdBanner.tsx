import { type CSSProperties, type FC, useState, useEffect } from "react";

type Props = Pick<CSSProperties, "height" | "width">;

export const AdBanner: FC<Props> = (props) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      const { googletag } = window;
      googletag.cmd.push(() => googletag.display("my-banner"));
      setLoading(false);
    }, 3000);
  }, []);

  // It's a good idea to use an `id` that can't be easily detected as a banneable banner.
  // That way adblockers won't remove your fallback state too and you could show a custom
  // message in that case if the ad is blocked
  return (
    <div id="my-banner" style={{ ...props }}>
      {loading ? (
        <div className="mx-auto h-full w-full rounded-md border-2">
          <div className="flex h-full animate-pulse flex-row items-center justify-center space-x-5">
            <div className="h-12 w-12 rounded-full bg-gray-300 "></div>
            <div className="flex flex-col space-y-3">
              <div className="h-6 w-36 rounded-md bg-gray-300 "></div>
              <div className="h-6 w-24 rounded-md bg-gray-300 "></div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

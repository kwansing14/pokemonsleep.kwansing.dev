"use client";
import { useState, useEffect, Suspense } from "react";
import Image from "next/image";
import { Copy, Check, Loader } from "lucide-react";
import toast from "react-hot-toast";
import { updateLocalStorage, copyToClipboard } from "@/utils";
import { twMerge } from "tailwind-merge";

interface Props {
  id: string;
  pic: string;
}

export interface checkedState {
  [key: string]: boolean;
}

const ID: React.FC<Props> = ({ id, pic }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [usingFallbackImage, setUsingFallbackImage] = useState(false);
  const [storageState, setStorageState] = useState<checkedState>({
    [id]: false,
  });

  const fallbackImgSrc = "/questionmark.png";

  const handleClick = async (id: string) => {
    if (!storageState[id]) {
      const t = toast.loading("Copying to clipboard...");
      await copyToClipboard(id);
      toast.success("Copied to clipboard!", { id: t });
    }
    const newState = { [id]: !storageState[id] };
    setStorageState(newState);
    updateLocalStorage<checkedState>(newState);
  };

  useEffect(() => {
    const data = localStorage.getItem("pschecked");
    if (!data) {
      setIsLoading(false);
      return;
    }
    if (data) {
      const res = JSON.parse(data) as checkedState;
      setStorageState(res);
    }
    setIsLoading(false);
  }, []);

  return (
    <>
      <div className="flex w-full items-center justify-start gap-4 rounded-l-lg border border-slate-500 px-4 sm:w-64">
        <div className="h-12 w-12 overflow-hidden rounded-full border-slate-700">
          {pic && (
            <Suspense fallback={<Loader className="w-6 animate-spin" />}>
              <Image
                className={twMerge(
                  "mx-auto h-full object-contain",
                  usingFallbackImage && "py-1"
                )}
                src={usingFallbackImage ? fallbackImgSrc : pic}
                alt="Random Pokemon Image"
                width={usingFallbackImage ? 24 : 48}
                height={usingFallbackImage ? 48 : 48}
                onError={() => setUsingFallbackImage(true)}
                unoptimized
              />
            </Suspense>
          )}
        </div>
        <div>{id}</div>
      </div>
      <button
        className="flex w-16 items-center justify-center rounded-r-lg border border-slate-500"
        onClick={() => handleClick(id)}
        aria-label="copy researcher ID"
      >
        {isLoading && <Loader className="w-6 animate-spin" />}
        {!isLoading && storageState[id] && <Check className="w-6" />}
        {!isLoading && !storageState[id] && <Copy className="w-6" />}
      </button>
    </>
  );
};

export default ID;

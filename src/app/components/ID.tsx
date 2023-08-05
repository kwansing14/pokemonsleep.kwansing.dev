import Image from "next/image";
import { Copy, Check, Loader } from "lucide-react";
import { convertIdToString, qrCodeSalt } from "@/utils";
import QRCode from "react-qr-code";
import { useContextHook } from "@/app/context";
import { twMerge } from "tailwind-merge";

interface Props {
  id: string;
  pic: string;
  checked: boolean;
  isLoading: boolean;
  handleCopy: (id: string) => void;
}

export interface checkedState {
  [key: string]: boolean;
}

const ID: React.FC<Props> = ({ id, pic, checked, isLoading, handleCopy }) => {
  const getQRValue = `${qrCodeSalt}${convertIdToString(id)}`;
  const { showQR } = useContextHook();
  return (
    <div className={twMerge("flex w-full", showQR && "mb-16")}>
      <div className="flex w-full items-center justify-start gap-4 rounded-l-lg border border-slate-500 px-4 sm:w-64">
        <div className="h-12 w-12 overflow-hidden rounded-full border-slate-700">
          {pic && (
            <Image
              src={pic}
              alt="Picture of the author"
              width={48}
              height={48}
              unoptimized
            />
          )}
        </div>
        <div className="flex w-full flex-col items-center justify-center gap-2 py-2">
          <div>{id}</div>
          {showQR && (
            <QRCode
              className={twMerge("h-32 w-32 border")}
              value={getQRValue}
            />
          )}
        </div>
      </div>
      <button
        className="flex w-16 items-center justify-center rounded-r-lg border border-slate-500"
        onClick={() => handleCopy(id)}
        aria-label="copy researcher ID"
      >
        {isLoading && <Loader className="w-6 animate-spin" />}
        {!isLoading && checked && <Check className="w-6" />}
        {!isLoading && !checked && <Copy className="w-6" />}
      </button>
    </div>
  );
};

export default ID;

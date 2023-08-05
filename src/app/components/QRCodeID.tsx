import QRCode from "react-qr-code";
import { convertIdToString, qrCodeSalt } from "@/utils";
import { Copy, Check, Loader } from "lucide-react";

interface Props {
  id: string;
  pic: string;
  checked: boolean;
  isLoading: boolean;
  handleCopy: (id: string) => void;
}

const QRCodeID: React.FC<Props> = ({ id, isLoading, checked }) => {
  const getQRValue = `${qrCodeSalt}${convertIdToString(id)}`;
  return (
    <>
      <div className="flex gap-2 border">
        <QRCode className="h-32 w-32" value={getQRValue} />
        <div className="flex items-center">
          {isLoading && <Loader className="w-6 animate-spin" />}
          {!isLoading && checked && <Check className="w-16" />}
          {!isLoading && !checked && <Copy className="w-16" />}
        </div>
      </div>
    </>
  );
};

export default QRCodeID;

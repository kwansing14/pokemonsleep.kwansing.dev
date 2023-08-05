"use client";
import { useContextHook } from "@/app/context";

const Slider = () => {
  const { showQR, setShowQR } = useContextHook();
  const toggle = () => {
    setShowQR(!showQR);
  };

  return (
    <div className="mt-2 flex w-full justify-end">
      <button
        className="rounded border bg-slate-300 px-4 py-2 text-slate-900"
        onClick={toggle}
      >
        {showQR && "Show QR"}
        {!showQR && "Hide QR"}
      </button>
    </div>
  );
};

export default Slider;

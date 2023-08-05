"use client";

import { useEffect, useState } from "react";
import ID from "@/app/components/ID";
import toast from "react-hot-toast";
import { updateLocalStorage, copyToClipboard } from "@/utils";
interface Props {
  ids: {
    id: string;
    researcherID: string;
    pic: string;
  }[];
}

export interface checkedState {
  [key: string]: boolean;
}

const IDS: React.FC<Props> = ({ ids }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [storageState, setStorageState] = useState<checkedState>();

  const handleCopy = async (id: string) => {
    if (!storageState) return;
    if (!storageState[id]) {
      const t = toast.loading("Copying to clipboard...");
      await copyToClipboard(id);
      toast.success("Copied to clipboard!", { id: t });
    }
    const newState = { ...storageState, [id]: !storageState[id] };
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
    <div className="flex flex-wrap justify-between gap-4">
      {ids.map((id) => (
        <div className="flex w-full sm:w-auto" key={id.id}>
          <ID
            id={id.researcherID}
            pic={id.pic}
            checked={storageState?.[id.researcherID] || false}
            isLoading={isLoading}
            handleCopy={handleCopy}
          />
        </div>
      ))}
      {ids.length % 3 === 2 && <div className="w-80" />}
    </div>
  );
};

export default IDS;

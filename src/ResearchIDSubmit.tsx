"use client";

import { useState } from "react";
import { api } from "@/trpc/client";
import { useRouter } from "next/navigation";
import { updateLocalStorage } from "@/utils";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/app/components/FAQpopover";

const ResearchIdSubmit = () => {
  const [v, setV] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const mutate = api.id.createNewID.mutate;

  const getImage = async () => {
    try {
      const id = getRandomNumber();
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const data = await res.json();
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      return data?.sprites?.other["official-artwork"].front_default as string;
    } catch (e) {
      throw new Error("Error fetching image");
    }
  };

  const numToId = (nString: string) => {
    return nString.replace(/\d{4}(?!$)/g, "$&-");
  };

  const getRandomNumber = () => {
    return Math.floor(Math.random() * 1009) + 1;
  };

  const isValueValid = (value: string) => {
    const reg = /^\d{4}-\d{4}-\d{4}$/;
    return reg.test(value);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    const string = value.match(/\d+/g)?.join("");
    if (string && string.length > 11 && string.length < 13) {
      setV(numToId(string));
    } else {
      setV(value.slice(0, 14));
    }
  };

  const handleSubmit = async () => {
    if (!v) return;
    if (!isValueValid(v)) return;
    setIsLoading(true);
    try {
      const randomPokemonImage = await getImage();
      await mutate({
        researcherID: v,
        pic: randomPokemonImage,
        checked: false,
      });
      setIsLoading(false);
      updateLocalStorage({ [v]: true });
      router.refresh();
    } catch (e) {
      setIsLoading(false);
      throw new Error("Error submitting ID");
    }
  };

  return (
    <>
      <div className="mb-4 flex items-end justify-between pt-8 sm:pt-8">
        <div>Paste your Researcher ID here:</div>
        <Popover>
          <PopoverTrigger className="flex items-center justify-center rounded-md border border-slate-300 px-4 py-2 hover:bg-slate-800">
            FAQ
          </PopoverTrigger>
          <PopoverContent className="mr-4 bg-slate-900">
            <ul className="-mb-2 text-sm [&>li]:mb-2">
              <li>
                1. Only the most recent 100 IDS added will be displayed in the
                list.
              </li>
              <li>
                2. If the same ID is added again, the previous entry will be
                removed, and the identical ID will take its place at the top.
              </li>
              <li>
                3. A randomly generated Pokemon image is included for purely
                aesthetic purposes, with no functional significance.
              </li>
            </ul>
          </PopoverContent>
        </Popover>
      </div>
      <input
        className="mb-4 mr-4 w-full rounded-lg border border-slate-500 bg-transparent px-4 py-4 outline-none focus:border-slate-300 sm:mb-12 sm:w-80"
        onChange={handleChange}
        value={v}
        aria-label="input researcher ID"
      />
      <button
        className="mb-8 w-full rounded-lg bg-slate-300 px-8 py-4 text-slate-800 transition-all disabled:cursor-not-allowed disabled:opacity-50 sm:mb-0 sm:w-auto"
        onClick={handleSubmit}
        disabled={!isValueValid(v) || isLoading}
        aria-label="add researcher ID"
      >
        submit
      </button>
    </>
  );
};

export default ResearchIdSubmit;

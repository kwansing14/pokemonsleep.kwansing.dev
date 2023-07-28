"use client";

import { useState } from "react";
import { api } from "@/trpc/client";

const ResearchIdSubmit = () => {
  //https://pokeapi.co/api/v2/pokemon/{id or name}/
  const [v, setV] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const mutate = api.id.createNewID.mutate;

  const numToId = (num: number) => {
    return num.toString().replace(/\d{4}(?!$)/g, "$&-");
  };

  const isValueValid = (value: string) => {
    const reg = /^\d{4}-\d{4}-\d{4}$/;
    return reg.test(value);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    const string = value.match(/\d+/g)?.join("");
    if (string && string.length > 11 && string.length < 13) {
      setV(numToId(Number(string)));
    } else {
      setV(value.slice(0, 14));
    }
  };

  const handleSubmit = async () => {
    if (!v) return;
    if (!isValueValid(v)) return;
    setIsLoading(true);
    try {
      await mutate({
        researcherID: v,
        pic: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/35.png",
        checked: false,
      });
      setIsLoading(false);
    } catch (e) {
      console.log(e);
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="mx-8 mb-4 pt-24">Paste your Researcher ID here:</div>
      <input
        className="mx-8 mb-12 w-80 rounded-lg border border-slate-500 bg-transparent px-4 py-4 outline-none focus:border-slate-300"
        onChange={handleChange}
        value={v}
      />
      <button
        className="rounded-lg bg-slate-300 px-8 py-4 text-slate-800 transition-all disabled:cursor-not-allowed disabled:opacity-50"
        onClick={handleSubmit}
        disabled={!isValueValid(v) || isLoading}
      >
        submit
      </button>
    </>
  );
};

export default ResearchIdSubmit;

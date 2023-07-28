import ResearchIdSubmit from "./ResearchIDSubmit";
import ListOfIDs from "./ListOfIDs";

export default function Home() {
  return (
    <main className="mx-auto min-h-screen w-full max-w-7xl px-4">
      <h1 className="mt-4 border-l-4 py-1 pl-8 text-2xl text-slate-200 sm:mt-12 sm:text-4xl">
        A place for pokemon researchers to add each other.
      </h1>
      <ResearchIdSubmit />
      <div className="w-full border-t border-slate-400" />
      {/* @ts-expect-error - Async Server Component */}
      <ListOfIDs />
    </main>
  );
}

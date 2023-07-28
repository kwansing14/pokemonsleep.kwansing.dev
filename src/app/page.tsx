import ResearchIdSubmit from "./ResearchIDSubmit";
import ListOfIDs from "./ListOfIDs";
import { api } from "@/trpc/server";

export default async function Home() {
  const ids = await api.id.getAllIds.query();
  return (
    <main className="mx-auto min-h-screen w-full max-w-7xl px-4">
      <ResearchIdSubmit />
      <div className="w-full border-t border-slate-400" />
      <ListOfIDs ids={ids} />
    </main>
  );
}

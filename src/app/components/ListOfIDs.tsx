import IDS from "@/app/components/IDS";
import { api } from "@/trpc/server";

async function ListOfIDs() {
  const ids = await api.id.getAllIds.query();
  return (
    <div className="mt-8 flex flex-wrap justify-between gap-4 sm:mt-12">
      <IDS ids={ids} />
    </div>
  );
}

export default ListOfIDs;

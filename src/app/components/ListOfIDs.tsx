import ID from "@/app/components/ID";
import { api } from "@/trpc/server";

async function ListOfIDs() {
  // set delay
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const ids = await api.id.getAllIds.query();
  return (
    <div className="mt-8 flex flex-wrap justify-between gap-4 sm:mt-12">
      <div className="flex flex-wrap justify-between gap-4">
        {ids.map((id) => (
          <div className="flex w-full sm:w-auto" key={id.id}>
            <ID id={id.researcherID} pic={id.pic} />
          </div>
        ))}
        {ids.length % 3 === 2 && <div className="w-80" />}
      </div>
    </div>
  );
}

export default ListOfIDs;

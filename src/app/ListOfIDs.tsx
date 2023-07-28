import ID from "./ID";

interface Props {
  ids?: {
    id: string;
    pic: string;
    checked: boolean | null;
    researcherID: string;
  }[];
}

const ListOfIDs: React.FC<Props> = ({ ids = [] }) => {
  return (
    <div className="mt-8 flex flex-wrap justify-between gap-4 sm:mt-12">
      <div className="flex flex-wrap justify-between gap-4">
        {ids.map((id) => (
          <div className="flex w-full sm:w-auto" key={id.id}>
            <ID id={id.researcherID} pic={id.pic} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListOfIDs;

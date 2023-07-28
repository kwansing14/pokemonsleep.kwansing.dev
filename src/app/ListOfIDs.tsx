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
    <div className="mx-8 mt-12 flex flex-wrap justify-between gap-4">
      <div className="flex flex-wrap justify-between gap-4">
        {ids.map((id) => (
          <div className="flex" key={id.id}>
            <ID id={id.researcherID} pic={id.pic} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListOfIDs;

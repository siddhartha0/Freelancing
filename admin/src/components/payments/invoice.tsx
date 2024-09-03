import { useGetProjectByIdQuery } from "@/state-management";
import { LoaderSpinner } from "@/units";
import { useParams } from "react-router-dom";

export const Invoice = () => {
  const { id } = useParams();

  const { data, isLoading } = useGetProjectByIdQuery(id);

  console.log(data);

  return isLoading ? (
    <LoaderSpinner />
  ) : (
    <main className="flex flex-col gap-4 bg-white"></main>
  );
};

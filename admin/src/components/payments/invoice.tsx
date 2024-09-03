import { useGetProjectByIdQuery } from "@/state-management";
import { LoaderSpinner, Text } from "@/units";
import { useParams } from "react-router-dom";

export const Invoice = () => {
  const { id } = useParams();

  const { data, isLoading } = useGetProjectByIdQuery(id);

  console.log(data?.details);

  return isLoading ? (
    <LoaderSpinner />
  ) : (
    <main className="flex flex-col gap-4 bg-white p-8 rounded-xl">
      <header className="flex justify-between">
        <section className="flex gap-12">
          <div className="flex flex-col gap-2">
            <Text>Project Owner</Text>
            <Text size="small">{data?.details.ownerId.name}</Text>
            <Text size="small">{data?.details.ownerId.email}</Text>
            <Text size="small">{data?.details.ownerId.contact}</Text>
          </div>

          <div className="flex flex-col gap-2">
            <Text>Client </Text>
            <Text size="small">{data?.details.acceptedClientId.name}</Text>
            <Text size="small">{data?.details.acceptedClientId.email}</Text>
            <Text size="small">{data?.details.acceptedClientId.contact}</Text>
          </div>
        </section>

        <section className="flex flex-col gap-2">
          <Text>Project Details</Text>

          <div className="flex gap-4">
            <Text size="small">Paying Status : </Text>
            <Text size="small">{data?.details.salaryStatus}</Text>
          </div>
          <div className="flex gap-4">
            <Text size="small">To Pay : </Text>
            <Text size="small">
              Rs. {data?.details.moneySentPerSalaryStatus}
            </Text>
          </div>
          <div className="flex gap-4">
            <Text size="small">Project Duration : </Text>
            <Text size="small">{data?.details.projectDuration}</Text>
          </div>
        </section>
      </header>
    </main>
  );
};

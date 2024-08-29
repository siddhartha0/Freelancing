import { PaymentHeader } from "@/constant";
import { useGetAllProjectQuery } from "@/state-management";
import { LoaderSpinner, Text } from "@/units";
import React, { useMemo } from "react";

interface dataTypes {
  _id: string;
  postedDate: string;
  postTitle: string;
  ownerId: { name: string };
  acceptedClientId: { name: string };
  completed: boolean;
  salary: number;
}

export const Payment = React.memo(() => {
  const { data, isLoading } = useGetAllProjectQuery({});

  const acceptedJobs = useMemo(() => {
    if (data) {
      return data.JobPost.filter((job: dataTypes) => job.acceptedClientId);
    }
  }, [data]);

  return (
    <main>
      {isLoading ? (
        <LoaderSpinner />
      ) : (
        <section className="flex flex-col gap-4  bg-text-secondary p-4 rounded-lg">
          <header className="grid grid-cols-7 place-items-center justify-between border-b border-b-black border-opacity-[.1]   p-2">
            {PaymentHeader.map((header: string, index: number) => (
              <Text key={header + index} classNAME="capitalize">
                {header}
              </Text>
            ))}
          </header>

          {acceptedJobs && acceptedJobs?.length > 0 ? (
            <section className="flex flex-col gap-5">
              {acceptedJobs?.map((header: dataTypes, index: number) => (
                <div
                  key={header._id + index}
                  className="grid grid-cols-7 place-items-center  p-2 border-b border-b-text-secondary "
                >
                  <Text size="tiny">{header.acceptedClientId.name}</Text>
                  <Text size="tiny">{header.ownerId.name}</Text>
                  <Text size="tiny">{header.postTitle}</Text>
                  <Text size="tiny">{header.postedDate.slice(0, 10)}</Text>
                  <Text size="tiny">Paypal</Text>
                  <Text size="tiny">
                    {header.completed ? "Finished" : "Ongoing"}
                  </Text>
                  <Text size="tiny">{header.salary}</Text>
                </div>
              ))}
            </section>
          ) : (
            <section className="flex place-self-center mt-5">
              <Text>No data was found</Text>
            </section>
          )}
        </section>
      )}
    </main>
  );
});

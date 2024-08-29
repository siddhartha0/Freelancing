import { useGetProjectByIdQuery } from "@/state-management";
import { Button, Icon, LoaderSpinner, Text } from "@/units";
import React from "react";
import { Briefcase, Mail, MapPin, Phone } from "react-feather";
import { useParams } from "react-router-dom";

export const ProjectDetails = React.memo(() => {
  const { id } = useParams();

  const { data, isLoading } = useGetProjectByIdQuery(id);

  if (isLoading) return <LoaderSpinner />;

  return (
    <main className="flex p-6 gap-10">
      <section className="flex py-5 px-6 flex-col gap-5 bg-white rounded-xl h-fit">
        <Text>Overview</Text>
        <div className="flex place-items-center justify-between">
          <Text size="small">Job Title : </Text>
          <Text size="tiny" usage="primary">
            {data?.details.postTitle}
          </Text>
        </div>

        <div className="flex place-items-center justify-between">
          <Text size="small">Experience : </Text>
          <Text size="tiny" usage="primary">
            Fresher
          </Text>
        </div>
        <div className="flex place-items-center justify-between">
          <Text size="small">Salary : </Text>
          <div className="flex place-items-end">
            <Text size="small" usage="primary">
              Rs. {data?.details.salary} /
            </Text>
            <Text size="tiny">{data?.details.salaryStatus}</Text>
          </div>
        </div>
        <div className="flex place-items-center justify-between gap-4">
          <Text size="small">Posted Date : </Text>
          <Text size="small" usage="primary">
            {data?.details.postedDate.slice(0, 10)}
          </Text>
        </div>
      </section>

      <section className="flex flex-1 py-5 px-6 flex-col gap-5 bg-white rounded-xl">
        <header className="flex flex-col border-b border-border p-2 gap-2">
          <Text>{data?.details.postTitle}</Text>
          <div className="flex place-items-center gap-8">
            <div className="flex place-items-center gap-2">
              <Icon name={Briefcase} iconSize={16} textColor="blue" />
              <Text size="tiny">{data?.details?.ownerId.name}</Text>
            </div>

            <div className="flex place-items-center gap-2">
              <Icon name={MapPin} iconSize={16} textColor="orange" />
              <Text size="tiny">Remote</Text>
            </div>

            <div className="flex place-items-center gap-2">
              <Icon name={Mail} iconSize={16} textColor="red" />
              <Text size="tiny">{data?.details?.ownerId?.email}</Text>
            </div>

            <div className="flex place-items-center gap-2">
              <Icon name={Phone} iconSize={16} textColor="green" />
              <Text size="tiny">{data?.details?.ownerId.contact}</Text>
            </div>
          </div>
        </header>

        <div className="flex flex-col border-b border-border p-2 gap-4">
          <Text>Job Description</Text>
          <div className="flex flex-col gap-1">
            <Text size="tiny" usage="primary">
              {data?.details.postDescription}{" "}
            </Text>
          </div>
        </div>

        <div className="flex flex-col border-b border-border p-2 gap-4">
          <Text>Candidates</Text>
          <section className="flex gap-8 justify-between place-self-center w-full">
            <div className="flex flex-col place-items-center gap-1 bg-text-secondary p-4 w-full">
              <Text usage="primary">Total Applied</Text>
              <Text size="medium" usage="primary">
                {data?.details.clientId.length}
              </Text>
            </div>

            <div className="flex flex-col place-items-center gap-1 bg-text-secondary p-4 w-full">
              <Text usage="primary">Total Rejected</Text>
              <Text size="small" usage="primary">
                25
              </Text>
            </div>
          </section>
        </div>

        <div className="flex p-2 gap-4">
          <Button>View Assesments</Button>
        </div>
      </section>
    </main>
  );
});

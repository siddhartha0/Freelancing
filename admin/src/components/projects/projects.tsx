import { useGetAllProjectQuery } from "@/state-management";
import { Button, Icon, LoaderSpinner, Text } from "@/units";
import { Check, Trash, User, X } from "react-feather";
import { useNavigate } from "react-router-dom";

interface jobTypes {
  postTitle: string;
  _id: string;
  postDescription: string;
  projectTaken: boolean;
  salary: string;
  clientId: [];
}

export const Project = () => {
  const nav = useNavigate();
  const { data, isLoading } = useGetAllProjectQuery({});

  return (
    <main className="flex flex-col gap-6 p-4">
      <header className="flex place-items-center gap-3">
        <Button size="small">All</Button>
        <Button size="small">Recent</Button>
        <Button size="small">Finished</Button>
      </header>

      {isLoading ? (
        <LoaderSpinner />
      ) : (
        <section className="grid grid-cols-3 gap-8">
          {data && data?.JobPost.length > 0 ? (
            data.JobPost.map((job: jobTypes) => (
              <div
                className="flex flex-col gap-5 p-5 bg-white rounded-xl"
                key={job._id}
              >
                <header className="flex justify-between">
                  <div className="flex flex-col">
                    <Text
                      size="medium"
                      classNAME="capitalize cursor-pointer"
                      onClick={() => nav(`/jobs/${job._id}`)}
                    >
                      {job.postTitle}
                    </Text>
                  </div>
                  <div>
                    <Icon name={Trash} />
                  </div>
                </header>
                <Text className="text-complete">Rs. {job.salary}</Text>
                <Text size="small" usage="primary">
                  {job.postDescription
                    ? job.postDescription.slice(0, 50) + "..."
                    : ""}
                </Text>
                <div className="grid grid-cols-2 gap-2 justify-between">
                  <section className="flex place-items-center gap-2">
                    <div className="bg-primary rounded-full">
                      {job.projectTaken ? (
                        <Icon name={Check} iconSize={15} textColor="green" />
                      ) : (
                        <Icon name={X} iconSize={15} textColor="red" />
                      )}
                    </div>
                    <Text size="tiny">Payment Verified</Text>
                  </section>

                  <section className="flex place-items-center gap-2">
                    <div className="bg-primary rounded-full">
                      {job.projectTaken ? (
                        <Icon name={Check} iconSize={15} textColor="green" />
                      ) : (
                        <Icon name={X} iconSize={15} textColor="red" />
                      )}
                    </div>
                    <Text size="tiny">Project Assigned</Text>
                  </section>
                  <section className="flex gap-2 place-items-center">
                    <div className="bg-primary rounded-full">
                      <Icon name={User} iconSize={15} />
                    </div>
                    <Text size="tiny">Applied users</Text>
                    <Text size="tiny">{job?.clientId.length}</Text>
                  </section>
                </div>
              </div>
            ))
          ) : (
            <Text>No data was found</Text>
          )}
        </section>
      )}
    </main>
  );
};

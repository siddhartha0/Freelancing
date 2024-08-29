import { Button, Icon, Text } from "@/units";
import React from "react";
import { Briefcase, MapPin } from "react-feather";

export const ProjectDetails = React.memo(() => {
  return (
    <main className="flex p-6 gap-10">
      <section className="flex py-5 px-6 flex-col gap-5 bg-white rounded-xl h-fit">
        <Text>Overview</Text>
        <div className="flex place-items-center justify-between">
          <Text size="small">Job Title : </Text>
          <Text size="small">React</Text>
        </div>
        <div className="flex place-items-center justify-between">
          <Text size="small">Posted Date : </Text>
          <Text size="small">2024/1/11</Text>
        </div>
        <div className="flex place-items-center justify-between">
          <Text size="small">Experience : </Text>
          <Text size="small">Fresher</Text>
        </div>
        <div className="flex place-items-center justify-between">
          <Text size="small">Salary : </Text>
          <Text size="small">1500</Text>
        </div>
      </section>

      <section className="flex flex-1 py-5 px-6 flex-col gap-5 bg-white rounded-xl">
        <header className="flex flex-col border-b border-border p-2 gap-2">
          <Text>React Developer</Text>
          <div className="flex place-items-center gap-8">
            <div className="flex place-items-center gap-2">
              <Icon name={Briefcase} iconSize={16} />
              <Text size="tiny">Xinu</Text>
            </div>

            <div className="flex place-items-center gap-2">
              <Icon name={MapPin} iconSize={16} />
              <Text size="tiny">Remote</Text>
            </div>
          </div>
        </header>

        <div className="flex flex-col border-b border-border p-2 gap-4">
          <Text>Job Description</Text>
          <div className="flex flex-col gap-1">
            <Text size="tiny" usage="primary">
              Job Description is the testing phase for this area
            </Text>
            <Text size="tiny" usage="primary">
              Job Description is the testing phase for this area
            </Text>
          </div>
        </div>

        <div className="flex flex-col border-b border-border p-2 gap-4">
          <Text>Candidates</Text>
          <section className="flex gap-8 justify-between place-self-center w-full">
            <div className="flex flex-col place-items-center gap-1 bg-text-secondary p-4 w-full">
              <Text usage="primary">Total Applied</Text>
              <Text size="medium" usage="primary">
                70
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

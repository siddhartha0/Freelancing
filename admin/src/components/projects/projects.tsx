import { Button, Icon, Text } from "@/units";
import { Trash, User, X } from "react-feather";
import { useNavigate } from "react-router-dom";

export const Project = () => {
  const nav = useNavigate();
  return (
    <main className="flex flex-col gap-6 p-4">
      <header className="flex place-items-center gap-3">
        <Button size="small">All</Button>
        <Button size="small">Recent</Button>
        <Button size="small">Finished</Button>
      </header>
      <section className="grid grid-cols-3 gap-8">
        <div className="flex flex-col gap-5 p-5 bg-white rounded-xl">
          <header className="flex justify-between">
            <div className="flex flex-col">
              <Text
                size="header"
                classNAME="capitalize cursor-pointer"
                onClick={() => nav("/jobs/id")}
              >
                Job Name
              </Text>
              <Text size="small" usage="primary">
                email@gmail.com
              </Text>
            </div>
            <div>
              <Icon name={Trash} />
            </div>
          </header>
          <Text className="text-complete">Rs. 15000</Text>
          <Text size="small" usage="primary">
            This is the description part of the projects. where it is only for
            testing
          </Text>
          <div className="flex place-items-center justify-between">
            <section className="flex place-items-center gap-2">
              <div className="bg-primary rounded-full">
                <Icon name={X} iconSize={15} textColor="red" />
              </div>
              <Text size="tiny">Payment Verified</Text>
            </section>
            <section className="flex gap-2 place-items-center">
              <div className="bg-primary rounded-full">
                <Icon name={User} iconSize={15} />
              </div>
              <Text size="tiny">Applied users</Text>
              <Text size="tiny">0</Text>
            </section>
          </div>
        </div>
      </section>
    </main>
  );
};

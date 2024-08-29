import { TableHeader, userData } from "@/constant";
import { Button, Pagination, Text } from "@/units";

export const User = () => {
  return (
    <main>
      <section className="flex flex-col gap-4  bg-text-secondary p-4">
        <header className="grid grid-cols-5 place-items-center justify-between border-b border-b-black border-opacity-[.5]   p-2">
          {TableHeader.map((header: string, index: number) => (
            <Text key={header + index} classNAME="capitalize">
              {header}
            </Text>
          ))}
        </header>

        <div className="grid grid-cols-5 place-items-center  p-2 border-b border-b-text-secondary  ">
          {userData.map((header: string, index: number) => (
            <div key={header + index}>
              <Text size="small" classNAME="capitalize">
                {header}
              </Text>
            </div>
          ))}

          <Button usage="danger" size="small">
            Delete
          </Button>
        </div>

        <Pagination
          currentPage={0}
          handleNavigationClick={() => {}}
          totalPages={1}
        />
      </section>
    </main>
  );
};

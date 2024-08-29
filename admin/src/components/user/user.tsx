import { TableHeader } from "@/constant";
import { useGetAllUserQuery } from "@/state-management";
import { Button, Pagination, Text, LoaderSpinner } from "@/units";
import React, { useMemo, useState } from "react";
import { Toaster } from "react-hot-toast";

interface dataTypes {
  email: string;
  name: string;
  address: string;
  contact: string;
}

export const User = React.memo(() => {
  const { data, isLoading } = useGetAllUserQuery({});

  const itemsPerPage = 8;

  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const currentItems = useMemo(() => {
    return data?.slice(indexOfFirstItem, indexOfLastItem);
  }, [data, indexOfFirstItem, indexOfLastItem]);

  const totalPages = Math.ceil(data ? data?.length / itemsPerPage : 0);

  const handleNavigationClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    direction: string
  ) => {
    event.preventDefault();

    const totalPages = Math.ceil(data ? data?.length / itemsPerPage : 0);

    if (direction === "prev" && currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    } else if (direction === "next" && currentPage < totalPages) {
      setCurrentPage((current) => current + 1);
    }
  };

  return (
    <main>
      <Toaster />

      {isLoading ? (
        <LoaderSpinner />
      ) : (
        <section className="flex flex-col gap-4  bg-text-secondary p-4 rounded-lg">
          <header className="grid grid-cols-5 place-items-center justify-between border-b border-b-black border-opacity-[.1]   p-2">
            {TableHeader.map((header: string, index: number) => (
              <Text key={header + index} classNAME="capitalize">
                {header}
              </Text>
            ))}
          </header>

          {data && data?.length > 0 ? (
            <section className="flex flex-col gap-5">
              {currentItems?.map((header: dataTypes, index: number) => (
                <div
                  key={header.name + index}
                  className="grid grid-cols-5 place-items-center  p-2 border-b border-b-text-secondary "
                >
                  <Text size="small">{header.name}</Text>
                  <Text size="small">{header.email}</Text>
                  <Text size="small">{header.contact}</Text>
                  <Text size="small">{header.address}</Text>
                  <Button usage="danger" size="small">
                    Delete
                  </Button>
                </div>
              ))}
            </section>
          ) : (
            <section className="flex place-self-center mt-5">
              <Text>No data was found</Text>
            </section>
          )}
          {data && data.length > 0 && (
            <Pagination
              currentPage={currentPage}
              handleNavigationClick={handleNavigationClick}
              totalPages={totalPages}
            />
          )}
        </section>
      )}
    </main>
  );
});

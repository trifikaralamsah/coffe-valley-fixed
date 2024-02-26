"use client";
import { useRouter } from "next/navigation";
import React from "react";
import useSWR from "swr";
import { fetcher } from "@/services";

const DistributorsPage = () => {
  const push = useRouter();
  const { data, error, isLoading } = useSWR(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/distributor/get`,
    fetcher
  );

  return (
    <div className="px-24 mt-4">
      <table className="table-fixed w-full">
        <thead>
          <tr>
            <th>Distributor Name</th>
            <th>City</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {data?.products.map((distributor: any) => (
            <tr key={distributor.id}>
              <td>{distributor.name}</td>
              <td>{distributor.city}</td>
              <td>
                <button
                  onClick={() =>
                    push.push(`/distributors/editDistributor/${distributor.id}`)
                  }
                  className="bg-green-500 hover:bg-green-700 text-white font-bold px-4 rounded"
                >
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button
        onClick={() => push.push("/distributors/addDistributor")}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold mt-4 py-2 px-4 rounded"
      >
        [Add]
      </button>
    </div>
  );
};

export default DistributorsPage;

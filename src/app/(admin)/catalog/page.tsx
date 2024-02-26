"use client";
import { fetcher } from "@/services";
import React from "react";
import useSWR from "swr";

const CatalogPage = () => {
  const { data, error, isLoading } = useSWR(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/catalog/get`,
    fetcher
  );
  console.log(data);
  return (
    <div className="px-24 mt-4">
      <table className="table-auto w-full">
        <thead>
          <tr>
            <th className="w-1/4">Bean</th>
            <th className="w-1/2">Description</th>
            <th className="w-1/4">Price/Unit</th>
          </tr>
        </thead>
        <tbody>
          {data?.products.map((product: any) => (
            <tr key={product.id}>
              <td className="text-center">{product.bean}</td>
              <td>{product.description}</td>
              <td className="text-center">${product.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CatalogPage;

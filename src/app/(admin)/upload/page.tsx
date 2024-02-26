"use client";
import { fetcher } from "@/services";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import useSWR from "swr";

const UploadPage = () => {
  const push = useRouter();
  const [loading, setLoading] = useState(false);
  const { data, error, isLoading } = useSWR(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/upload/get`,
    fetcher
  );
  return (
    <div className="flex flex-col gap-7 px-24 mt-4">
      <form encType="multipart/form-data" action={"/api/upload"} method="POST">
        {/* <form onSubmit={(e) => handleSubmit(e)}> */}
        <div className="flex flex-row gap-5">
          <div className="flex flex-col gap-4">
            <label htmlFor="">Title</label>
            <label htmlFor="">Document File</label>
            <label htmlFor="">Author</label>
          </div>
          <div className="flex flex-col gap-4">
            <input
              type="text"
              name="title"
              className="border border-slate-600 px-2"
            />
            <input
              type="file"
              name="file"
              className="border border-slate-600"
              multiple
              accept="image/*"
            />
            <input
              type="text"
              name="author"
              className="border border-slate-600 px-2"
            />
            <button
              type="submit"
              className="bg-blue-500 w-1/2 text-white rounded-md ml-auto hover:bg-blue-400 py-1"
            >
              {loading ? "Loading..." : "Upload"}
            </button>
          </div>
        </div>
      </form>
      <div>
        <table className="table-fixed w-full">
          <thead>
            <tr className="text-center">
              <th>Title</th>
              <th>Image</th>
              <th>Author</th>
            </tr>
          </thead>
          <tbody>
            {data?.products.map((value: any) => {
              return (
                <tr key={value.id} className="text-center">
                  <td>{value.title}</td>
                  <td>
                    <Image
                      src={value.file}
                      width={100}
                      height={100}
                      alt="image"
                      className="m-auto"
                    />
                  </td>
                  <td>{value.author}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UploadPage;

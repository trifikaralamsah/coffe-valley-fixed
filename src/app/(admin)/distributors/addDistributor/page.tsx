"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";

const AddDistributor = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { push } = useRouter();
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setIsLoading(true);
    const res = await fetch("/api/distributor/add", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        name: e.target.name.value,
        city: e.target.city.value,
        phone: e.target.phone.value,
        country: e.target.country.value,
        state: e.target.state.value,
        email: e.target.email.value,
        id: Math.random().toString(8).slice(2),
      }),
    });

    if (res.status === 200) {
      e.target.reset();
      setIsLoading(false);
      push("/distributors");
    } else {
      setIsLoading(false);
    }
  };
  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <div className="px-24 mt-4 flex flex-row gap-5">
        <div className="flex flex-col gap-4">
          <label htmlFor="">Distributor Name</label>
          <label htmlFor="">City</label>
          <label htmlFor="">State/Region</label>
          <label htmlFor="">Country</label>
          <label htmlFor="">Phone</label>
          <label htmlFor="">Email</label>
        </div>
        <div className="flex flex-col gap-4">
          <input
            type="text"
            name="name"
            className="border border-slate-600 px-2"
          />
          <input
            type="text"
            name="city"
            className="border border-slate-600 px-2"
          />
          <input
            type="text"
            name="state"
            className="border border-slate-600 px-2"
          />
          <input
            type="text"
            name="country"
            className="border border-slate-600 px-2"
          />
          <input
            type="number"
            name="phone"
            className="border border-slate-600 px-2"
          />
          <input
            type="email"
            name="email"
            className="border border-slate-600 px-2"
          />
          <button
            type="submit"
            className="bg-blue-500 w-1/2 text-white rounded-md ml-auto hover:bg-blue-400"
          >
            {isLoading ? "Loading..." : "Add"}
          </button>
        </div>
      </div>
    </form>
  );
};

export default AddDistributor;

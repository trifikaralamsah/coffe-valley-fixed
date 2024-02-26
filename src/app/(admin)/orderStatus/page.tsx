import React from "react";

const OrderStatusPage = () => {
  return (
    <div className="px-24 mt-4">
      <table className="table-fixed w-full">
        <thead>
          <tr>
            <th>Distributor Name</th>
            <th>City</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>The Sliding Mr. Bones (Next Stop, Pottersville)</td>
            <td>Malcolm Lockyer</td>
            <td className="text-center">Finish</td>
          </tr>
          <tr className="bg-gray-200">
            <td>Witchy Woman</td>
            <td>The Eagles</td>
            <td className="text-center">Finish</td>
          </tr>
          <tr>
            <td>Shining Star</td>
            <td>Earth, Wind, and Fire</td>
            <td className="text-center">Finish</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default OrderStatusPage;

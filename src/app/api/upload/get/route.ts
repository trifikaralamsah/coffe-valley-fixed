import { retrieveData, retrieveDataById } from "@/lib/firebase/services";
import { NextRequest, NextResponse } from "next/server";

const data = [
  {
    id: "1",
    title: "Sepatu Adidas",
    price: 100000,
    image:
      "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/b1bcbca4-e853-4df7-b329-5be3c61ee057/dunk-low-retro-shoe-66RGqF.png",
  },
  {
    id: "2",
    title: "Sepatu Nike",
    price: 200000,
    image:
      "https://static.nike.com/a/images/t_prod_ss/w_640,c_limit,f_auto/2b49243f-1c69-40e1-af12-5f35e37536cb/air-jordan-1-high-og-black-white-dz5485-010-release-date.jpg",
  },
];
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const idParams = searchParams.get("id");
  //   console.log(idParams);

  // old
  // if (idParams) {
  //   const detailProduct = data.find((item) => item.id === idParams);
  //   if (detailProduct) {
  //     return NextResponse.json({
  //       status: 200,
  //       message: "Success",
  //       data: detailProduct,
  //     });
  //   }

  //   return NextResponse.json({
  //     status: 404,
  //     message: "Product not found",
  //     data: {},
  //   });
  // }

  // return NextResponse.json({ status: 200, message: "Success", data });
  // }

  // Firebase
  if (idParams) {
    const detailProduct = await retrieveDataById("uploadBean", idParams);
    console.log(detailProduct);
    if (detailProduct) {
      return NextResponse.json({
        status: 200,
        message: "Success",
        data: detailProduct,
      });
    }

    return NextResponse.json({
      status: 404,
      message: "Product not found",
      data: {},
    });
  }

  const products = await retrieveData("uploadBean");

  return NextResponse.json({ status: 200, message: "Success", products });
}

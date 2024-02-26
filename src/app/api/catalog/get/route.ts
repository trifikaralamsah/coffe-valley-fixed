import { retrieveData, retrieveDataById } from "@/lib/firebase/services";
import { NextRequest, NextResponse } from "next/server";
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const idParams = searchParams.get("id");

  // Firebase
  if (idParams) {
    const detailProduct = await retrieveDataById("dailyBean", idParams);
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

  const products = await retrieveData("dailyBean");

  return NextResponse.json({ status: 200, message: "Success", products });
}

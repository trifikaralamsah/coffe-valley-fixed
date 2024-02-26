import withAuth from "./middlewares/withAuth";
import { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function mainMiddleware(request: NextRequest) {
  const res = NextResponse.next();
  return res;
}

export default withAuth(mainMiddleware, [
  "/dashboard",
  "/register",
  "/",
  "/home",
  "/catalog",
  "/orderStatus",
  "/distributors",
  "/upload",
]);

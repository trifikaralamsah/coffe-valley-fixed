import { NextResponse } from "next/server";
import path from "path";
import { writeFile } from "fs/promises";
import { uploadBean } from "@/lib/firebase/services";

export const POST = async (req: any) => {
  const formData = await req.formData();

  const file = formData.get("file");
  if (!file) {
    return NextResponse.json({ error: "No files received." }, { status: 400 });
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  const filename = Date.now() + file.name.replaceAll(" ", "_");
  console.log(filename);
  try {
    await writeFile(
      path.join(process.cwd(), "public/uploads/" + filename),
      buffer
    );

    // add product new
    await uploadBean({
      title: formData.get("title"),
      file: "/uploads/" + filename,
      author: formData.get("author"),
      id: Math.random().toString(8).slice(2),
    });

    // return NextResponse.json({
    //   Message: "Success",
    //   status: 200,
    //   statusCode: 200,
    // });
    const url = new URL("/upload", "http://localhost:3000");
    url.searchParams.set("success", "true");
    return NextResponse.redirect(url);
    // return NextResponse.redirect("/distributors");
  } catch (error) {
    console.log("Error occured ", error);
    return NextResponse.json({
      Message: "Failed",
      status: 500,
      statsCode: 500,
    });
  }
};

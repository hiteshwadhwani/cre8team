import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import client from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { project_id, applicant_id } = await req.json();
    const supabase = await createServerComponentClient({ cookies });

    const {
      data: { user },
    } = await supabase.auth.getUser();
    // find profile of user
    const profile = await client.user.findUnique({
      where: {
        authId: user?.id,
      },
    });

    if (!profile) {
      return new NextResponse("No user found");
    }

    // find the project
    const project = await client.project.findUnique({
      where: {
        id: project_id,
        userId: profile.id,
      },
    });

    if (!project) {
      return new NextResponse(
        `No able to find project with project_id: ${project_id}`
      );
    }
    // apply user to the project
    const updateApplicant = await client.applicant.update({
      where: {
        id: applicant_id,
        projectId: project_id,
      },
      data: {
        accepted: true,
      },
    });
    // send success response
    return NextResponse.json("user accepted", { status: 200 });
  } catch (error) {
    console.log("ACCEPT-USER POST", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}

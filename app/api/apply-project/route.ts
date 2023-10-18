import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import client from "@/lib/db";
import { NextResponse } from "next/server";
import axios from "axios";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { project_id } = body;

    const supabase = createServerComponentClient({ cookies });
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return new NextResponse("unauthorized", { status: 401 });
    }

    // find user
    const profile = await client.user.findUnique({
      where: {
        authId: user?.id,
      },
    });

    if (!profile) {
      return new NextResponse("No user", { status: 404 });
    }

    // check if the profile is completed
    if (!profile.profileCompleted) {
      return new NextResponse("Profile is not completed", { status: 404 });
    }

    // find project
    const project = await client.project.findUnique({
      where: {
        id: project_id,
      },
      include: {
        techs: true,
      },
    });

    if (!project) {
      return new NextResponse("No project found", { status: 404 });
    }

    //create project_description
    let project_description = project.description + project.title;
    project.techs.forEach((tech) => {
      project_description += tech;
    });

    // create applicant description
    let applicant_description = "";
    if (profile.profession) {
      applicant_description += profile.profession;
    }
    if (profile.about) {
      applicant_description += profile.about;
    }
    if (profile.resume_text) {
      applicant_description += profile.resume_text;
    }

    // get the score of the project
    const {
      data: { score },
    } = await axios.post("https://resparser-main.onrender.com/score", {
      project_description,
      applicant_description,
    });

    // apply for project
    await client.applicant.create({
      data: {
        userId: profile.id,
        projectId: project.id,
        score: score,
      },
    });

    return NextResponse.json({ msg: "success" }, { status: 200 });
  } catch (error) {
    console.log("APPLY PROJECT [POST]", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}

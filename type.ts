import { Applicant, Project, Requirement, Tech, User } from "@prisma/client";

export type ProjectWithApplicantsWithRequirementsWithTech = Project & {
    applicants: Applicant[],
    requirements: Requirement[],
    techs: Tech[]
}

export type ProjectWithUserWithRequirementsWithTech = Project & {
    requirements: Requirement[],
    techs: Tech[],
    user: User
}
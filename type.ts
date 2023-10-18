import { Applicant, Project, Requirement, Tech, User } from "@prisma/client";

export type ProjectWithApplicantsWithRequirementsWithTech = Project & {
    applicants: (Applicant & {user: User})[],
    requirements: Requirement[],
    techs: Tech[]
}

export type ProjectWithUserWithRequirementsWithTechWithApplicants = Project & {
    requirements: Requirement[],
    techs: Tech[],
    user: User
    applicants: Applicant[]
}

export type ApplcicantWithUser = Applicant & {
    user: User
}
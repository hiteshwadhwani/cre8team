import { ProjectWithApplicantsWithRequirementsWithTech, ProjectWithUserWithRequirementsWithTechWithApplicants } from '@/type'
import {create} from 'zustand'

interface useDashboardPageCard{
    isOpen: boolean
    setClose: () => void
    setOpen: (data: ProjectWithApplicantsWithRequirementsWithTech) => void
    data: ProjectWithApplicantsWithRequirementsWithTech | null
}

interface useProjectPageCard{
    isOpen: boolean
    setClose: () => void
    setOpen: (data: ProjectWithUserWithRequirementsWithTechWithApplicants) => void
    data: ProjectWithUserWithRequirementsWithTechWithApplicants | null
}

export const useDashboardPageCard = create<useDashboardPageCard>((set) => ({
    isOpen: false,
    setClose: () => set({isOpen: false,data: null}),
    setOpen: (data) => set({isOpen: true, data: data}),
    data: null,
}))

export const useProjectPageCard = create<useProjectPageCard>((set) => ({
    isOpen: false,
    setClose: () => set({isOpen: false, data: null}),
    setOpen: (data) => set({isOpen: true, data: data}),
    data: null,
}))


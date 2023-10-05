import { create } from 'zustand'

interface useModalStore{
    isOpen: boolean,
    setOpen: (type: modalType) => void
    setClose: () => void
    type: modalType | null
}

type modalType = 'auth-modal' | 'add-post' | 'profile-modal'

const useModal = create<useModalStore>((set) => ({
    isOpen: false,
    type: null,
    setOpen: (type) => set({isOpen: true, type: type}),
    setClose: () => set({isOpen: false, type: null})
}))

export default useModal


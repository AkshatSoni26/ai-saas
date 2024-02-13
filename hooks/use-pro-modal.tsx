import { create } from "zustand"

interface useProMoalStore {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
}


export const useProModal = create<useProMoalStore>(
    (set) => ({
        isOpen:false,
        onOpen: () => set({isOpen: true}),
        onClose: () => set({isOpen: false}),
    })
)
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export const useChange = create(
  persist(
    (set) => ({
      // state
      form: { username: '', password: '' },
      mood: false,
      sidebarOpen: false,
      language: 'en',
      search: '',
      showDelete: false,
      showEidte: false,
      selectedItem: false,
      showAdd: false,
      deleteId: false,
      content: null,
      formData: {},
      selectedIdToDelete: null,

      // actions
      setForm: (event) => {
        const { name, value } = event.target;
        set((state) => ({ form: { ...state.form, [name]: value } }));
      },
      setMood: () => set((state) => ({ mood: !state.mood })),
      setSidebarOpen: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
      setLanguage: (value) => set(() => ({ language: value })),
      setSearch: (value) => set(() => ({ search: value })),
      setShowDelete: (value) => set(() => ({ showDelete: value })),
      setShowEidte: (value) => set(() => ({ showEidte: value })),
      setSelectedItem: (value) => set(() => ({ selectedItem: value })),
      setShowAdd: (value) => set(() => ({ showAdd: value })),
      setDeleteId: (value) => set(() => ({ deleteId: value })),
      setContent: (value) => set(() => ({ content: value })),
      setFormData: (event) => {
        const { name, value, type, files } = event.target;
        set((state) => ({
          formData: {
            ...state.formData,
            [name]: type === 'file' 
              ? (event.target.multiple ? Array.from(files) : files[0]) 
              : value,
          },
        }));
      },
      setFormDataDirect: (data) => set(() => ({ formData: { ...data } })),
resetForm: () => set({ formData: {}}),

setSelectedIdToDelete: (id) => set(() => ({ selectedIdToDelete: id })),
    }),
    {
      name: 'change-store',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ 
        mood: state.mood, 
        language: state.language 
      }),
    }
  )
);
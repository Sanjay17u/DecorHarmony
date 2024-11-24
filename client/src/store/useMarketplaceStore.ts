import axios from "axios";
import { toast } from "sonner";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

const API_END_POINT = "http://localhost:8000/api/v1/marketplace";
axios.defaults.withCredentials = true;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const useMarketplaceStore = create<any>()(
  persist((set) => ({
    loading: false,
    marketplace: null,
    searchedMarketplace: null,
    appliedFilter: [],
    singleMarketplace: null,
    marketplaceOrder: [],

    createMarketplace: async (formData: FormData) => {
      try {
        set({ loading: true });
        const response = await axios.post("http://localhost:8000/api/v1/marketplace/", formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
    
        // Check if the response is successful
        if (response.data.success) {
          toast.success(response.data.message);
        } else {
          // If the response is not successful, show the error message
          toast.error(response.data.message || 'Something went wrong');
        }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        // Log the error and show a toast message
        console.error('Error during marketplace creation:', error);
        toast.error(error.response?.data?.message || "Something went wrong");
      } finally {
        set({ loading: false });
      }
    },
    

    getMarketplace: async () => {
      try {
        set({ loading: true });
        const response = await axios.get("http://localhost:8000/api/v1/marketplace/");
        if (response.data.success) {
          set({ marketplace: response.data.marketplace });
        }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        if (error.response?.status === 404) {
          set({ marketplace: null });
        }
      } finally {
        set({ loading: false });
      }
    },

    updateMarketplace: async (formData: FormData) => {
      try {
        set({ loading: true });
        const response = await axios.put("http://localhost:8000/api/v1/marketplace/", formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        if (response.data.success) {
          toast.success(response.data.message);
        }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        toast.error(error.response?.data?.message || "Something went wrong");
      } finally {
        set({ loading: false });
      }
    },


    setAppliedFilter: (value: string) => {
      set((state) => {
          const isAlreadyApplied = state.appliedFilter.includes(value);
          const updatedFilter = isAlreadyApplied ? state.appliedFilter.filter((item) => item !== value) : [...state.appliedFilter, value];
          return { appliedFilter: updatedFilter }
      })
  },
  resetAppliedFilter: () => {
      set({ appliedFilter: [] })
  },


    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    searchMarketplace: async (searchText: string, searchQuery: string, selectedCategory: any) => {
      try {
        set({ loading: true });

        const params = new URLSearchParams();
        params.set("searchQuery", searchQuery);
        params.set("selectedCategory", selectedCategory.join(","));

        const response = await axios.get(`${API_END_POINT}/search/${searchText}?${params.toString()}`);
        if (response.data.success) {
          set({ searchedMarketplace: response.data });
        }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
        set({ loading: false });
      }
    },

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    addMenuToMarketplace: (menu: any) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      set((state: any) => ({
        marketplace: state.marketplace
          ? { ...state.marketplace, menus: [...state.marketplace.menus, menu] }
          : null,
      }));
    },
  }), {
    name: 'marketplace-name',
    storage: createJSONStorage(() => localStorage),
  })
);

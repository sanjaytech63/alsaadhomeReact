import { create } from "zustand";
import { persist } from "zustand/middleware";
import { wishListApi } from "../utils/services/wishList";
import { showToast } from "../utils/helper";

export const useWishListStore = create(
    persist(
        (set, get) => ({
            wishList: [],
            loading: false,
            error: null,

            setWishList: (data) => set(() => ({ wishList: data })),

            getWishList: async () => {
                set({ loading: true, error: null });
                try {
                    const response = await wishListApi.getWishList();
                    if (response.status === 200) {
                        set({ wishList: response.data });
                    }
                } catch (error) {
                    console.error("Error fetching wishlist:", error);
                    set({ error });
                } finally {
                    set({ loading: false });
                }
            },

            addWishList: async (product_id, product_variant_id) => {
                set({ loading: true, error: null });
                try {
                    const req = {
                        product_id,
                        product_variant_id,
                    };

                    const response = await wishListApi.addToWishList(req);
                    if (response && response.status === 200) {
                        set((state) => ({
                            wishList: [...state.wishList, response.data],
                        }));
                        console.log("Updated wishlist in add to:", get().wishList);
                        showToast("success", response.message, "success");
                    }
                } catch (error) {
                    console.error("Error adding to wishlist:", error);
                    set({ error });
                } finally {
                    set({ loading: false });
                }
            },

            removeWishList: async (id) => {
                set({ loading: true, error: null });
                try {
                    const req = { wishlist_id: id };
                    const response = await wishListApi.removeWishList(req);
                    if (response.status === 200) {
                        set((state) => ({
                            wishList: state.wishList.filter((item) => item.wishlist_id !== id),
                        }));
                        showToast("success", response.message, "success");
                    }
                } catch (error) {
                    console.error("Error removing from wishlist:", error);
                    set({ error });
                } finally {
                    set({ loading: false });
                }
            },
        }),
    )
);

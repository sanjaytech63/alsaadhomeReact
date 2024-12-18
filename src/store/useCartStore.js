import { create } from 'zustand';
import { cardApi } from '../utils/services/cartSevices';
import { getSessionId, showToast } from "../utils/helper";

const useCartStore = create((set, get) => ({
  cartItems: null,
  cartIds: [],
  item_count: 0,
  isLoading: false,

  setCartItems: (items) => set({ cartItems: items }),
  setCartIds: (ids) => set({ cartIds: ids }),
  setLoading: (loading) => set({ isLoading: loading }),

  // Function to create a new cart
  createToCart: async () => {
    const { setCartIds, setLoading } = get();
    const params = {
      sessionID: getSessionId(),
      customer_id: "",
      cart_type: "customer",
    };

    try {
      setLoading(true);
      const res = await cardApi.creteCart(params);
      if (res && res.status === 200) {
        const cartId = res.data.cart_id;
        localStorage.setItem("cart_id", cartId);
        return cartId;
      }
    } catch (e) {
      showToast(
        "warning",
        e.response?.data?.message || "An error occurred",
        "danger"
      );
    } finally {
      setLoading(false);
    }
    return null;
  },

  addToCart: async (id, qty) => {
    const { cartIds, setCartIds, setLoading } = get();
    let cartId = localStorage.getItem("cart_id");

    if (!cartId) {
      cartId = await get().creteToCart();
      if (!cartId) {
        return;
      }
    }

    const params = {
      customer_id: "",
      cart_id: cartId,
      product_variant_id: id,
      qty: qty ? qty : "1",
      type: "online",
      branch_id: "",
    };

    try {
      setLoading(true);
      const res = await cardApi.addToCart(params);
      if (res && res.status === 200) {
        showToast("success", res.message, "success");
        setCartIds([...cartIds, id.toString()]);
        set({ item_count: res.item_count });
      }
      await get().getCart("");
    } catch (e) {
      showToast(
        "warning",
        e.response?.data?.message || "An error occurred",
        "danger"
      );
    } finally {
      setLoading(false);
    }
  },

  fetchCartProductIds: async () => {
    const { setCartIds } = get();
    try {
      const response = await cardApi.getCartProductIds({
        cart_id: localStorage.getItem("cart_id"),
        branch_id: 1,
        type: "branch",
      });
      if (response && response.status === 200) {
        const ids = response.data.map((item) => item.id.toString());
        setCartIds(ids);
        set({ item_count: response.item_count });
      }
    } catch (error) {
      console.error(error);
    }
  },

  getCart: async (id) => {
    const { setLoading, setCartItems, setCartDetails } = get();
    try {
      setLoading(true);
      const data = {
        customer_id: id,
        cart_id: localStorage.getItem("cart_id"),
      };
      const res = await cardApi.getCart(data);
      if (res && res.status === 200) {
        setCartItems(res.data);
        set({ item_count: res.data.item_count });
      }
    } catch (error) {
      console.log("error", error);
    } finally {
      setLoading(false);
    }
  },

  incrementQuantity: async (product_variant_id, maxQuantity, quantity) => {
    if (maxQuantity > quantity) {
      const qty = quantity + 1;
      const params = {
        customer_id: "",
        cart_id: localStorage.getItem("cart_id"),
        product_variant_id,
        qty: qty.toString(),
        type: "online",
        branch_id: "",
      };
      try {
        const response = await cardApi.addToCart(params, true);
        if (response && response.status === 200) {
          showToast("success", response.message, "success");
          get().getCart("");
        }
      } catch (e) {
        showToast(
          "warning",
          e.response?.data?.message || "An error occurred",
          "danger"
        );
      }
    } else {
      showToast("warning", "Maximum quantity reached!", "danger");
    }
  },

  decrementQuantity: async (id, maxQuantity, quantity) => {
    if (quantity > 1) {
      const qty = quantity - 1;
      const params = {
        customer_id: "",
        cart_id: localStorage.getItem("cart_id"),
        product_variant_id: id,
        qty: qty.toString(),
        type: "online",
        branch_id: "",
      };
      try {
        const response = await cardApi.addToCart(params);
        if (response && response.status === 200) {
          showToast("success", response.message, "success");
          await get().getCart("");
        }
      } catch (e) {
        showToast(
          "warning",
          e.response?.data?.message || "An error occurred",
          "danger"
        );
      }
    } else {
      showToast("warning", "Minimum 1 item required", "danger");
    }
  },

  deleteCartItem: async (cartItemId) => {
    const params = {
      cart_id: localStorage.getItem("cart_id"),
      cart_item_id: cartItemId,
    };
    try {
      const response = await cardApi.removeCartItem(params);
      if (response && response.status === 200) {
        showToast("success", response.message, "success");
        await get().getCart("");
      }
    } catch (error) {
      showToast(
        "warning",
        error.response?.data?.message || "An error occurred",
        "danger"
      );
    }
  },

  isItemInCart: (product_variant_id) => {
    const { cartIds } = get();
    return cartIds.includes(product_variant_id.toString());
  },
}));

export default useCartStore;

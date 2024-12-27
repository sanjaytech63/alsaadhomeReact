import { toast } from 'react-toastify';
import { v4 as uuidv4 } from "uuid";
import { cardApi } from './services/cartSevices';

const displayedMessages = new Set();

export const showToast = (type, message) => {
    if (displayedMessages.has(message)) {
      // Prevent duplicate toast
      return;
    }

    // Add the message to the set
    displayedMessages.add(message);

    switch (type) {
        case 'success':
            toast.success(message, {
                autoClose: 3000,
            });
            break;
        case 'error':
            toast.error(message, {
                autoClose: 3000,
            });
            break;
        case 'info':
            toast.info(message, {
                autoClose: 3000,
            });
            break;
        case 'warning':
            toast.warn(message, {
                autoClose: 3000,
            });
            break;
        default:
            toast(message, {
                autoClose: 3000,
            });
            break;
    }

     setTimeout(() => {
       displayedMessages.delete(message);
     }, 3000);

};

export const getSessionId = () => {
  let sessionId = localStorage.getItem("session_id");
  if (!sessionId) {
    sessionId = uuidv4();
    localStorage.setItem("session_id", sessionId);
  }
  return sessionId;
};

export const mergeCartCall = async (id, userId) => {
  const params = {
    cart_id: id,
    customer_id: userId,
  };
  try {
    await cardApi.mergeCart(params);
  } catch (error) {
    console.log(error);
  }
};


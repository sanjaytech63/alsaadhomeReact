import { toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';
export const showToast = (type, message) => {
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
};

function featchSussionId() {
    const sessionId = localStorage.getItem("session_id");
    console.log(sessionId)
    const uuid = uuidv4();
    console.log(uuid)
}

featchSussionId();
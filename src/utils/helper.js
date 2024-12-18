import { toast } from 'react-toastify';
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


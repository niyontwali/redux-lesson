import { notification } from "antd";

// notification
const notificationToast = (message, type, placement, description) => {
  notification[type]({
    message,
    placement,
    description,
  });
};

export default notificationToast;

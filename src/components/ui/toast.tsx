import { Toaster, toast as Toast } from "react-hot-toast";
import { capitalize } from "../../assets/utils";

export function toast({
  variant,
  message,
}: {
  variant: "error" | "success";
  message: string;
}) {
  const configs = {
    success: {
      icon: "✅",
      style: { borderLeft: "4px solid green" },
    },
    error: {
      icon: "❌",
      style: { borderLeft: "4px solid red" },
    },
  };

  Toast(capitalize(message.toString()), configs[variant]);
}

export function ToastBar() {
  return (
    <Toaster
      position="top-right"
      reverseOrder={false}
      gutter={4}
      containerClassName=""
      containerStyle={{}}
      toastOptions={{
        className: "",
        duration: 5000,
        style: {
          background: "#fff",
          color: "#393d45",
          borderRadius: "4px",
        },
      }}
    />
  );
}

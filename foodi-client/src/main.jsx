import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import router from "./router/Router.jsx";
import AuthProvider from "./contexts/AuthProvider.jsx";
// import Kommunicate from "@kommunicate/kommunicate-chatbot-plugin";
// Kommunicate.init("ed8be5ca0558184cf6add5c0ad7345e9", {
//   automaticChatOpenOnNavigation: true,
//   popupWidget: true,
// });
// TanStack Query
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import { ThemeProvider } from "./hooks/ThemeContext.jsx";

const queryClient = new QueryClient();
// Kommunicate.init("ed8be5ca0558184cf6add5c0ad7345e9", {
//   automaticChatOpenOnNavigation: true,
//   popupWidget: true,
// });
ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <RouterProvider router={router} />
      </ThemeProvider>
    </QueryClientProvider>
  </AuthProvider>
);

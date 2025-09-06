import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "react-query";
import { Provider } from "react-redux";
import store, { persistor } from "./redux/store/store";
import { SocketProvider } from "./Shared/socket/SocketContext";
import { PersistGate } from "redux-persist/integration/react";
 
const queryClient = new QueryClient();
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <SocketProvider>
        <QueryClientProvider client={queryClient}>
          <App />
          <Toaster
            toastOptions={{
              className: "",
              style: {
                border: `1px solid `,
                color: "#25D366",
                fontSize: "15px",
                marginTop: "100px",
                borderRadius: "10px",
              },
            }}
            autoClose={1000}
            limit={1}
          />
        </QueryClientProvider>
      </SocketProvider>
    </PersistGate>
  </Provider>
);
 
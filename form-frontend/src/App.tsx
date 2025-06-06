import "@/App.css";
import { Route, Routes } from "react-router";
import FormV1 from "@/pages/v1/form";

export default function App() {
  const NotFound = () => (
    <div className="flex justify-center items-center">
      <h1>404 - Page Not Found</h1>
    </div>
  );
  const ErrorFound = () => (
    <div className="flex justify-center items-center">
      <h1>Error: Something Not Found.</h1>
    </div>
  );

  return (
    <Routes>
      <Route
        errorElement={<ErrorFound />}
        path=":versionId/:formId/preview"
        element={<FormV1 />}
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

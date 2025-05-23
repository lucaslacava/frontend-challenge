import { StatusPage } from "../components/StatusPage";

export const ErrorPage = () => (
  <StatusPage
    type="error"
    title="Error!"
    message="Uh oh, something went wrong. Please try again later."
  />
);

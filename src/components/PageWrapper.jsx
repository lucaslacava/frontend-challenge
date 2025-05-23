import { Button } from "./ui/button";

export const PageWrapper = ({ children }) => {
  return (
    <main className="flex flex-col items-center justify-center gap-y-4 p-4">
      {children}
      <div className="flex justify-between">
        <Button>Back</Button>
        <Button>Next</Button>
      </div>
    </main>
  );
};

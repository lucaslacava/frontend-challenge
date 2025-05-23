import { Button } from "./ui/button";
import { Spinner } from "./ui/spinner";

export const PageWrapper = ({
  children,
  onNext,
  onBack,
  onSubmit,
  isLoading,
}) => {
  return (
    <main className="flex flex-col items-center justify-center gap-y-4 p-4">
      {children}
      <div className="flex space-x-4 mt-4 justify-start w-full">
        {onBack && (
          <Button onClick={onBack} disabled={isLoading}>
            Back
          </Button>
        )}
        {onNext && (
          <Button onClick={onNext} disabled={isLoading}>
            {isLoading ? (
              <>
                <Spinner className="mr-2 h-4 w-4" />
                Loading...
              </>
            ) : (
              "Next"
            )}
          </Button>
        )}
        {onSubmit && (
          <Button onClick={onSubmit} disabled={isLoading}>
            {isLoading ? (
              <>
                <Spinner className="mr-2 h-4 w-4" />
                Submitting...
              </>
            ) : (
              "Submit"
            )}
          </Button>
        )}
      </div>
    </main>
  );
};

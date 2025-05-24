import { ArrowLeft, ArrowRight, Send } from "lucide-react";
import { Button } from "../ui/button";
import { Spinner } from "../ui/spinner";

export const PageWrapper = ({
  children,
  onNext,
  onBack,
  onSubmit,
  isLoading,
  isNextDisabled,
  ...props
}) => {
  return (
    <div
      className="min-h-screen flex items-center justify-center p-4"
      {...props}
    >
      <div className="w-full max-w-md flex flex-col items-center gap-y-4">
        {children}
        <div className="flex space-x-4 mt-4 justify-start w-full">
          {onBack && (
            <Button onClick={onBack} disabled={isLoading} type="button">
              <ArrowLeft className="size-4" />
              Back
            </Button>
          )}
          {onNext && (
            <Button
              type="submit"
              onClick={onNext}
              disabled={isLoading || isNextDisabled}
            >
              {isLoading ? (
                <>
                  <Spinner className="mr-2 h-4 w-4" />
                  Loading...
                </>
              ) : (
                <>
                  Next
                  <ArrowRight className="size-4" />
                </>
              )}
            </Button>
          )}
          {onSubmit && (
            <Button onClick={onSubmit} disabled={isLoading} type="submit">
              {isLoading ? (
                <>
                  <Spinner className="mr-2 h-4 w-4" />
                  Submitting...
                </>
              ) : (
                <>
                  Submit
                  <Send className="size-4" />
                </>
              )}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

import { Button } from "@/components/ui/button";
import { CheckCircle, RotateCcw, XCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useForm } from "../context/FormContext";

export const StatusPage = ({ type, title, message, onButtonClick }) => {
  const navigate = useNavigate();
  const isSuccess = type === "success";
  const Icon = isSuccess ? CheckCircle : XCircle;
  const iconColor = isSuccess ? "text-green-600" : "text-red-600";

  const { resetForm } = useForm();

  const handleButtonClick = () => {
    navigate("/");
    resetForm();
  };

  return (
    <main className="flex flex-col justify-center h-screen p-4 space-y-4">
      <div className="flex items-start space-x-4">
        <Icon className={`${iconColor} w-16 h-16`} />
        <div>
          <h1 className="text-3xl font-bold mb-2">{title}</h1>
          <p className="text-lg">{message}</p>
        </div>
      </div>
      <Button onClick={onButtonClick ?? handleButtonClick} className="mt-8">
        Restart
        <RotateCcw className="size-4" />
      </Button>
    </main>
  );
};

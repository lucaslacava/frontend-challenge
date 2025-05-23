import { Button } from "@/components/ui/button";
import { CheckCircle, XCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const StatusPage = ({
  type,
  title,
  message,
  buttonText,
  onButtonClick,
}) => {
  const navigate = useNavigate();
  const Icon = type === "success" ? CheckCircle : XCircle;
  const iconColor = type === "success" ? "text-green-600" : "text-red-600";

  return (
    <main className="flex flex-col justify-center h-screen p-4 space-y-4">
      <div className="flex items-start space-x-4">
        <Icon className={`${iconColor} w-16 h-16`} />
        <div>
          <h1 className="text-3xl font-bold mb-2">{title}</h1>
          <p className="text-lg">{message}</p>
        </div>
      </div>
      <Button onClick={onButtonClick ?? (() => navigate("/"))}>Restart</Button>
    </main>
  );
};

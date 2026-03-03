import { useQuery } from "@tanstack/react-query";
import { meApi } from "../api/authApi";

export default function DashboardPage() {
  const {
    data: user,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["me"],
    queryFn: meApi,
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Non autorizzata</p>;

  return (
    <h1 className="text-3xl font-bold">
      Benvenuta nella Dashboard {user.email}!
    </h1>
  );
}

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

type Status = "new" | "in_progress" | "delivered" | "paid";

interface CommissionRow {
  id: string;
  name: string;
  email: string;
  brief: string;
  budget: string | null;
  status: Status;
  created_at: string;
}

const statusLabels: Record<Status, string> = {
  new: "Новая",
  in_progress: "В работе",
  delivered: "Сдано",
  paid: "Оплачено",
};

const statusOrder: Status[] = ["new", "in_progress", "delivered", "paid"];

const AdminCommissions = () => {
  const queryClient = useQueryClient();

  const { data: requests, isLoading } = useQuery({
    queryKey: ["admin-commissions"],
    queryFn: async (): Promise<CommissionRow[]> => {
      const { data, error } = await supabase!
        .from("commission_requests")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data as CommissionRow[];
    },
  });

  const updateStatus = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: Status }) => {
      const { error } = await supabase!.from("commission_requests").update({ status }).eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["admin-commissions"] }),
    onError: (err: Error) => toast.error(err.message),
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground mb-1">Заявки на заказ</h1>
        <p className="text-muted-foreground text-sm">
          Сюда падают все заявки с формы «Поддержать или заказать» на сайте.
        </p>
      </div>

      {isLoading && <p className="text-muted-foreground">Загрузка…</p>}
      {!isLoading && requests?.length === 0 && (
        <p className="text-muted-foreground">Заявок пока нет.</p>
      )}

      <div className="space-y-4">
        {requests?.map((req) => (
          <div key={req.id} className="p-5 rounded-xl border border-border bg-card">
            <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
              <div>
                <p className="font-semibold text-foreground">{req.name}</p>
                <a href={`mailto:${req.email}`} className="text-sm text-primary hover:underline">
                  {req.email}
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Badge variant="outline">
                  {new Date(req.created_at).toLocaleDateString("ru-RU")}
                </Badge>
                <Select
                  value={req.status}
                  onValueChange={(v) => updateStatus.mutate({ id: req.id, status: v as Status })}
                >
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {statusOrder.map((s) => (
                      <SelectItem key={s} value={s}>
                        {statusLabels[s]}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <p className="text-sm text-muted-foreground whitespace-pre-wrap">{req.brief}</p>
            {req.budget && (
              <p className="text-sm text-muted-foreground mt-2">Бюджет: {req.budget}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminCommissions;

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { supabase, isSupabaseConfigured } from "@/integrations/supabase/client";
import { profile } from "@/data/profile";
import { toast } from "sonner";

const schema = z.object({
  name: z.string().min(1, "Укажите имя"),
  email: z.string().email("Некорректный email"),
  brief: z.string().min(10, "Опишите задачу чуть подробнее"),
  budget: z.string().optional(),
});

type FormValues = z.infer<typeof schema>;

const CommissionForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  if (!isSupabaseConfigured) {
    return (
      <p className="text-primary-foreground/80">
        Форма заявок скоро появится — пока пишите на{" "}
        <a href={`mailto:${profile.email}`} className="underline">
          {profile.email}
        </a>
        .
      </p>
    );
  }

  const onSubmit = async (values: FormValues) => {
    const { error } = await supabase!.from("commission_requests").insert(values);
    if (error) {
      toast.error("Не получилось отправить, попробуйте ещё раз");
      return;
    }
    toast.success("Заявка отправлена — отвечу в ближайшее время");
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
      <div>
        <Input placeholder="Имя" {...register("name")} className="bg-background/50" />
        {errors.name && <p className="text-sm text-destructive mt-1">{errors.name.message}</p>}
      </div>
      <div>
        <Input
          type="email"
          placeholder="Email"
          {...register("email")}
          className="bg-background/50"
        />
        {errors.email && <p className="text-sm text-destructive mt-1">{errors.email.message}</p>}
      </div>
      <div>
        <Textarea
          placeholder="Что нужно нарисовать?"
          rows={4}
          {...register("brief")}
          className="bg-background/50"
        />
        {errors.brief && <p className="text-sm text-destructive mt-1">{errors.brief.message}</p>}
      </div>
      <Input
        placeholder="Бюджет (необязательно)"
        {...register("budget")}
        className="bg-background/50"
      />
      <Button type="submit" variant="gold" size="lg" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? "Отправляем…" : "Отправить заявку"}
      </Button>
    </form>
  );
};

export default CommissionForm;

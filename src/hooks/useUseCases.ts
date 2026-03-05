import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export type UseCaseStatus = "not_started" | "in_progress" | "completed" | "on_hold";
export type UseCaseRisk = "low" | "medium" | "high";

export interface UseCase {
  id: string;
  organization_id: string;
  name: string;
  description: string | null;
  status: UseCaseStatus;
  progress: number;
  risk_level: UseCaseRisk;
  department: string | null;
  owner_id: string | null;
  owner_name: string | null;
  model_id: string | null;
  vendor_id: string | null;
  business_justification: string | null;
  target_completion_date: string | null;
  created_at: string;
  updated_at: string;
  profiles?: { full_name: string | null } | null;
  models?: { name: string } | null;
  vendors?: { name: string } | null;
}

export interface UseCaseInsert {
  name: string;
  description?: string | null;
  status?: UseCaseStatus;
  progress?: number;
  risk_level?: UseCaseRisk;
  department?: string | null;
  owner_id?: string | null;
  owner_name?: string | null;
  model_id?: string | null;
  vendor_id?: string | null;
  business_justification?: string | null;
  target_completion_date?: string | null;
}

export interface UseCaseUpdate extends Partial<UseCaseInsert> {
  id: string;
}

export function useUseCases() {
  return useQuery({
    queryKey: ["use-cases"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("use_cases")
        .select("*, profiles:owner_id(full_name), models(name), vendors(name)")
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data as UseCase[];
    },
  });
}

export function useCreateUseCase() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (useCase: UseCaseInsert) => {
      const { data: profile } = await supabase
        .from("profiles")
        .select("organization_id")
        .single();

      const { data, error } = await supabase
        .from("use_cases")
        .insert({
          ...useCase,
          organization_id: profile?.organization_id,
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["use-cases"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard-stats"] });
      toast.success("Use case created successfully");
    },
    onError: (error) => {
      toast.error("Failed to create use case: " + error.message);
    },
  });
}

export function useUpdateUseCase() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, ...updates }: UseCaseUpdate) => {
      const { data, error } = await supabase
        .from("use_cases")
        .update(updates)
        .eq("id", id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["use-cases"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard-stats"] });
      toast.success("Use case updated successfully");
    },
    onError: (error) => {
      toast.error("Failed to update use case: " + error.message);
    },
  });
}

export function useDeleteUseCase() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("use_cases").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["use-cases"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard-stats"] });
      toast.success("Use case deleted successfully");
    },
    onError: (error) => {
      toast.error("Failed to delete use case: " + error.message);
    },
  });
}

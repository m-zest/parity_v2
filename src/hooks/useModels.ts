import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { getOrganizationId } from "./useOrganizationId";
import { Tables, TablesInsert, TablesUpdate } from "@/integrations/supabase/types";
import { toast } from "sonner";

export type Model = Tables<"models">;
export type ModelInsert = TablesInsert<"models">;
export type ModelUpdate = TablesUpdate<"models">;

export function useModels() {
  return useQuery({
    queryKey: ["models"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("models")
        .select("*, vendors(name)")
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data;
    },
  });
}

export function useCreateModel() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (model: ModelInsert) => {
      const organizationId = await getOrganizationId();

      const { data, error } = await supabase
        .from("models")
        .insert({ ...model, organization_id: organizationId })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["models"] });
      toast.success("Model created successfully");
    },
    onError: (error) => {
      toast.error("Failed to create model: " + error.message);
    },
  });
}

export function useUpdateModel() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, ...updates }: ModelUpdate & { id: string }) => {
      const { data, error } = await supabase
        .from("models")
        .update(updates)
        .eq("id", id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["models"] });
      toast.success("Model updated successfully");
    },
    onError: (error) => {
      toast.error("Failed to update model: " + error.message);
    },
  });
}

export function useDeleteModel() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("models").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["models"] });
      toast.success("Model deleted successfully");
    },
    onError: (error) => {
      toast.error("Failed to delete model: " + error.message);
    },
  });
}

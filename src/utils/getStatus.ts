export const getStatus = (pipeline: {status: string, updated_at: string} | null): "success" | "processing" | "error" => {
    if(!pipeline) return "success";
    if(pipeline.status === "success") return "success";
    if(pipeline.status === "pending") return "processing";
    return "error";
}
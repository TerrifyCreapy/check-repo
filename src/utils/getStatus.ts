export const getStatus = (pipelines: any[]): "success" | "processing" | "error" => {
    const statuses = pipelines.map(e => e.status);
    if(pipelines.length === 0) return "success";
    const set = new Set(statuses);
    if(set.has("success") && set.size === 1)return "success";
    if(set.has("pending") && !set.has("error")) return "processing";
    return "error";
}
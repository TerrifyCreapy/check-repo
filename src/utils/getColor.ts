export function getStatusColor(status: "success" | "processing" | "error") {

    switch(status) {
        case "success": {
            return "#4caf50";
        }
        case "processing": {
            return "#03a9f4";
        }
        case "error": {
            return "#ef5350";
        }
    }

}

export function getWarningColor(bool: boolean) {
    return bool && "#ff9800" || "#D3D3D3";
}

export function getInfoColor(mr: number, fb: number, same: boolean, pipelines: string) {
    if(pipelines === "error" || mr && fb && !same) return "#d32f2f";
    if((mr && !fb && same) || (!mr && fb && same) || (!mr && !fb && !same)) return "#ff9800";
    if((mr && fb && same) || (mr && !fb && !same) || (!mr && fb && !same)) return "#ed6c02";
    return "rgba(0,0,0,.2)";
}
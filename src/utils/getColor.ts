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
export function uvColor(uvIndex) {
    switch(true) {
        case (uvIndex < 3): return "green";
        case (uvIndex < 6): return "yellow";
        case (uvIndex < 8): return "orange";
        case (uvIndex < 11): return "red";
        default: return "purple";
    }
}
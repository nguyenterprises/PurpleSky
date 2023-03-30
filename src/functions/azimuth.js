export const azimuth = (num) => {
    let dir;
    switch(true) {
        case (num >= 0 && num < 11.25):
            dir = 'North';
            break;
        case (num >= 11.25 && num < 22.50):
            dir = 'North by East';
            break;
        case (num >= 22.50 && num < 33.75):
            dir = 'North-Northeast';
            break;
        case (num >= 33.75 && num < 45):
            dir = 'Northeast by North';
            break;
        case (num >= 45 && num < 56.25):
            dir = 'Northeast';
            break;
        case (num >= 56.25 && num < 67.50):
            dir = 'Northeast by East';
            break;
        case (num >= 67.50 && num < 78.75):
            dir = 'East-Northeast';
            break;
        case (num >= 78.75 && num < 90):
            dir = 'East by North';
            break;
        case (num >= 90 && num < 101.25):
            dir = 'East';
            break;
        case (num >= 101.25 && num < 112.5):
            dir = 'East by South';
            break;
        case (num >= 112.5 && num < 123.75):
            dir = 'East-Southeast';
            break;
        case (num >= 123.75 && num < 135):
            dir = 'Southeast by East';
            break;
        case (num >= 135 && num < 146.25):
            dir = 'Southeast';
            break;
        case (num >= 146.25 && num < 157.50):
            dir = 'Southeast by South';
            break;
        case (num >= 157.50 && num < 168.75):
            dir = 'Southeast-Southeast';
            break;
        case (num >= 168.75 && num < 180):
            dir = 'South by East';
            break;
        case (num >= 180 && num < 191.25):
            dir = 'South';
            break;
        case (num >= 191.25 && num < 202.5):
            dir = 'South by West';
            break;
        case (num >= 202.5 && num < 213.75):
            dir = 'South-Southwest';
            break;
        case (num >= 213.75 && num < 225):
            dir = 'Southwest by South';
            break;
        case (num >= 225 && num < 236.25):
            dir = 'Southwest';
            break;
        case (num >= 236.25 && num < 247.50):
            dir = 'Southwest by West';
            break;
        case (num >= 247.50 && num < 258.75):
            dir = 'West-Southwest';
            break;
        case (num >= 258.75 && num < 270):
            dir = 'West by South';
            break;
        case (num >= 270 && num < 281.25):
            dir = 'West';
            break;
        case (num >= 281.25 && num < 292.50):
            dir = 'West by North';
            break;
        case (num >= 292.50 && num < 303.75):
            dir = 'West-Northwest';
            break;
        case (num >= 303.75 && num < 315):
            dir = 'Northwest by West';
            break;
        case (num >= 315 && num < 326.25):
            dir = 'Northwest';
            break;
        case (num >= 326.25 && num < 337.50):
            dir = 'Northwest by North';
            break;
        case (num >= 337.50 && num < 348.75):
            dir = 'North by West';
            break;
        case (num >= 348.75 && num <= 360):
            dir = 'North';
            break;
        default:
            dir = 'N/A';
    }
    return dir
}
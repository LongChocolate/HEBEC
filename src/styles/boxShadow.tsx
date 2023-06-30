export function boxShadow(color, x = 0, y = 6, blur = 10) {
    return {
        shadowColor: color,
        shadowOffset: {width: x, height: y},
        shadowOpacity: 1,
        shadowRadius: blur,
        elevation: y < 0 ? 1 : y,
    };
}

export function translateDate(date: string, toEn: boolean = false): string {
    const persianDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];

    const dateStr = date?.toString() || "";

    if (toEn) {
        return dateStr
            .replace(/[۰-۹]/g, (w) => persianDigits.indexOf(w).toString())
            .replace(/[٠-٩]/g, (w) => "٠١٢٣٤٥٦٧٨٩".indexOf(w).toString());
    }

    return dateStr
        .split("")
        .map((char) => {
            const num = parseInt(char, 10);
            return isNaN(num) ? char : persianDigits[num];
        })
        .join("");
}

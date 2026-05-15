export function translateNumber(number: number | string, toEn: boolean = false): string {
    const persianDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
    // const englishDigits = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

    const numberStr = number?.toString() || "";

    if (toEn) {
        // Convert Persian/Arabic digits to English
        return numberStr.replace(/[۰-۹]/g, (w) => persianDigits.indexOf(w).toString())
                        .replace(/[٠-٩]/g, (w) => "٠١٢٣٤٥٦٧٨٩".indexOf(w).toString());
    }

    // Convert English digits to Persian
    return numberStr
        .split("")
        .map((digit) => {
            const num = parseInt(digit, 10);
            return isNaN(num) ? digit : persianDigits[num];
        })
        .join("");
}
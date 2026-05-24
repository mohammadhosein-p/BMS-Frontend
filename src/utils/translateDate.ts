export function translateDate(date: string, toEn: boolean = false): string {
    const persianDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
    let dateStr = date?.toString() || "";

    if (!toEn && (dateStr.includes("T") || dateStr.includes("-"))) {
        try {
            const parsedDate = new Date(dateStr);
            if (!isNaN(parsedDate.getTime())) {
                dateStr = new Intl.DateTimeFormat('fa-IR-u-nu-latn', {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit'
                }).format(parsedDate); 
            }
        } catch (e) {
            console.error("خطا در پارس تاریخ:", e);
        }
    }

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
// @ts-ignore
import moment from "moment-jalaali";

export function translateDate(date: string | null | undefined): string {
    let dateStr = date?.toString().trim() || "";
    if (!dateStr) return "";

    try {
        const standardizedDate = dateStr.replace(" ", "T");
        
        const parsedMoment = moment(standardizedDate);

        if (parsedMoment.isValid()) {
            const englishPersianDate = parsedMoment.format("jYYYY/jMM/jDD");
            
            return englishPersianDate.replace(/\d/g, (d: string) => 
                new Intl.NumberFormat('fa-IR', { useGrouping: false }).format(Number(d))
            );
        }
    } catch (e) {
        console.error("Problem in Convert Date in translateDate:", e);
    }

    return dateStr;
}
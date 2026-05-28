export function getPollTimeLeftParts(expiresAt: string | Date) {
    const expiresDate =
        typeof expiresAt === "string" ? new Date(expiresAt) : expiresAt;
    const now = Date.now();

    const diffMs = expiresDate.getTime() - now;

    if (!Number.isFinite(diffMs) || diffMs <= 0) {
        return { days: 0, hours: 0, minutes: 0 };
    }

    const totalMinutes = Math.floor(diffMs / (1000 * 60));
    const days = Math.floor(totalMinutes / (60 * 24));
    const remainingMinutesAfterDays = totalMinutes - days * 60 * 24;

    const hours = Math.floor(remainingMinutesAfterDays / 60);
    const minutes = remainingMinutesAfterDays - hours * 60;

    return { days, hours, minutes };
}

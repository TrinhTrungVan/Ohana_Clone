export const calcDayAgo = (time) => {
    const date = new Date(time);
    const currentDate = new Date();

    const timeDiff = Math.abs(currentDate.getTime() - date.getTime());
    const daysDiff = Math.round(timeDiff / (1000 * 3600 * 24));
    const hoursDiff = Math.round(timeDiff / (1000 * 3600));
    const minutesDiff = Math.round(timeDiff / (1000 * 60));

    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear().toString();

    if (daysDiff != 0) return `${daysDiff} ngày trước - ${day}/${month}/${year}`;
    if (hoursDiff != 0) return `${hoursDiff} giờ trước - ${day}/${month}/${year}`;

    const res = `${minutesDiff} phút trước - ${day}/${month}/${year}`;
    return res;
};

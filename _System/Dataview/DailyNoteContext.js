const DATE_FORMAT = "YYYY年MM月DD日";
const WEEK_DATE_FORMAT = "YYYY年MM月DD日(ddd)";
const today = moment();
const baseDate = moment(dv.current().file.name, DATE_FORMAT);
const createLink = (date, format, text) => dv.fileLink(date.format(format), false, text);
const createRelativeLink = (unit, direction = 1) => {
    const targetDate = moment(baseDate).add(unit, direction);
    return createLink(targetDate, DATE_FORMAT, targetDate.format(WEEK_DATE_FORMAT));
};
const relativeLinks = [
    { unit: "d", text: "日", format: "MM月DD日" },
    { unit: "w", text: "週", format: "YYYY年WW週" },
    { unit: "M", text: "月", format: "YYYY年MM月" },
    { unit: "y", text: "年", format: "YYYY年" }
].map(u => `${createRelativeLink(u.unit, -1)} < ${createLink(baseDate, u.format, u.text)} > ${createRelativeLink(u.unit)}`).join('\n> ');
const message = baseDate.isSame(today, 'day') ? "今日" : createLink(today, DATE_FORMAT, `${Math.abs(baseDate.diff(today, 'days'))}日${baseDate.isBefore(today) ? "前" : "後"}`);
const endOfYear = moment(baseDate).endOf('year');
const daysLeft = endOfYear.diff(baseDate, 'days');
const totalDays = moment(baseDate).endOf('year').dayOfYear();
const percentageLeft = (daysLeft / totalDays) * 100;
const yearLabel = baseDate.isSame(today, 'year') ? "今年" : baseDate.format("YYYY年");
dv.span(`> [!info] ${message}のデイリーノート。
> ${relativeLinks}
> ${yearLabel}はあと${daysLeft}日（残り${percentageLeft.toFixed(1)}%）。`);
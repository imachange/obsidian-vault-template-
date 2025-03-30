/**
 * 日付関連のフォーマット定義
 */
const DATE_FORMAT = "YYYY年MM月DD日";
const WEEK_DATE_FORMAT = "YYYY年MM月DD日(ddd)";

/**
 * 今日の日付と基準日を取得
 */
const today = moment();
const baseDate = moment(dv.current().file.name, DATE_FORMAT);

/**
 * 指定された日付からリンクを生成
 * @param {moment.Moment} date - 日付オブジェクト
 * @param {string} format - 日付フォーマット
 * @param {string} text - リンクのテキスト
 * @returns {string} - Dataviewのリンク文字列
 */
const createLink = (date, format, text) => dv.fileLink(date.format(format), false, text);

/**
 * 基準日から相対的なリンクを生成
 * @param {string} unit - 単位 (日: "d", 週: "w", 月: "M", 年: "y")
 * @param {number} direction - 方向 (1: 未来, -1: 過去)
 * @returns {string} - 相対リンク文字列
 */
const createRelativeLink = (unit, direction = 1) => {
    const targetDate = moment(baseDate).add(unit, direction);
    return createLink(targetDate, DATE_FORMAT, targetDate.format(WEEK_DATE_FORMAT));
};

/**
 * 相対リンクを生成
 */
const relativeLinks = [
    { unit: "d", text: "日", format: "MM月DD日" },
    { unit: "w", text: "週", format: "YYYY年WW週" },
    { unit: "M", text: "月", format: "YYYY年MM月" },
    { unit: "y", text: "年", format: "YYYY年" }
].map(({ unit, text, format }) => 
    `${createRelativeLink(unit, -1)} < ${createLink(baseDate, format, text)} > ${createRelativeLink(unit)}`
).join('\n> ');

/**
 * メッセージを生成
 */
const message = baseDate.isSame(today, 'day')
    ? "今日"
    : createLink(today, DATE_FORMAT, `${Math.abs(baseDate.diff(today, 'days'))}日${baseDate.isBefore(today) ? "前" : "後"}`);

/**
 * 年末までの情報を計算
 */
const endOfYear = moment(baseDate).endOf('year');
const daysLeft = endOfYear.diff(baseDate, 'days');
const totalDays = moment(baseDate).endOf('year').dayOfYear();
const percentageLeft = (daysLeft / totalDays) * 100;
const yearLabel = baseDate.isSame(today, 'year') ? "今年" : baseDate.format("YYYY年");

/**
 * 結果を表示
 */
dv.span(`> [!info] ${message}のデイリーノート。
> ${relativeLinks}
> ${yearLabel}はあと${daysLeft}日（残り${percentageLeft.toFixed(1)}%）。`);
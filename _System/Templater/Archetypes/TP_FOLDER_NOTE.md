<%*
/**
 * 設定ファイルのパス
 * @constant {string}
 */
const CONFIG_FILE_PATH = "_System/_system.md";

/**
 * 設定パラメータを取得
 * @type {Object}
 */
const config = DataviewAPI.page(CONFIG_FILE_PATH).params;

/**
 * 現在のファイル名
 * @type {string}
 */
const fileName = tp.file.title;

let content;

try {
    // 年次テンプレートを適用
    await applyTemplate(config.FORMAT_DATE_YEAR, "TP_YEARLY_NOTE");

    // 月次のテンプレートを適用
    await applyTemplate(config.FORMAT_DATE_MONTH, "TP_MONTHLY_NOTE");

    // 日次のテンプレートを適用
    await applyTemplate(config.FORMAT_DATE_DAY, "TP_DAILY_NOTE");
} catch (e) {
    console.debug("通常のフォルダ・テンプレートを使用", e);
    content = await tp.file.include(tp.file.find_tfile("TP_FOLDER_NOTE_INTERNAL"));
}

tR = content;

/**
 * 指定されたフォーマットでテンプレートを適用
 * @param {string} format - 日付フォーマット
 * @param {string} template - テンプレート名
 */
async function applyTemplate(format, template) {
    const dateFormatted = tp.date.now(format, 0, fileName, format);
    console.log(`${format} フォーマットでの日付: ${dateFormatted}`);
    if (fileName === dateFormatted) {
        content = await tp.file.include(tp.file.find_tfile(template));
    }
}
-%>
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
 * 指定された長さと文字セットでランダムな文字列を生成
 * @param {number} length - 生成する文字列の長さ
 * @param {string} chars - 使用する文字セット
 * @returns {string} - 生成されたランダムな文字列
 */
function generateRandomString(length, chars) {
    let result = '';
    const charsLength = chars.length;
    for (let i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * charsLength));
    }
    return result;
}
-%><% generateRandomString(config.UNIQUE_ID_LENGTH, config.UNIQUE_ID_CHARACTERS) %>
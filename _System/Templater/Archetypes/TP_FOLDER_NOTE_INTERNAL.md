<%*
/**
 * 設定ファイルのパス
 * @constant {string}
 */
const CONFIG_FILE_PATH = "_System/_system.md";

/**
 * frontmatterの区切り文字列
 * @constant {string}
 */
const DELIMITER = "---"

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

let type;
const topLevelDir = getTopLevelDirectory(tp.file.folder(true));
console.log(topLevelDir);
const topLevelFile = tp.file.find_tfile(topLevelDir);
console.log(topLevelFile);
if (topLevelFile !== null) {
	console.log(DataviewAPI.page(topLevelFile.path));
	if (DataviewAPI.page(topLevelFile.path).params.type) {
		type = DataviewAPI.page(topLevelFile.path).params.type
	}
}
if (type === null) {
	type = topLevelDir;
}
const uniqueId = await tp.file.include(tp.file.find_tfile("TP_UNIQUE_ID"));

tR = `${DELIMITER}
title: ${fileName}
params:
  uniqueId: ${uniqueId}
  type: ${type}
  layout: section
  shortTitle: ${config.DEFAULT_SHORT_TITLE}
${DELIMITER}
`

/**
 * 階層を表した文字列から一番上の階層を取り出す
 * @param {string} path - 階層を表した文字列
 * @returns {string} - 一番上の階層
 */
function getTopLevelDirectory(path) {
    if (!path) {
        throw new Error("パスが空です");
    }
    const directories = path.split('/');
    return directories[0];
}
-%>
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

console.log(fileName,config.FORMAT_DATE_DAY);
const fileDate = tp.date.now(config.FORMAT_DATETIME_ISO, 0, fileName, config.FORMAT_DATE_DAY);

// frontmatter
tR += `${DELIMITER}
title: ${fileName}
date: ${fileDate}
${DELIMITER}`

// content body
tR += `
${tp.file.cursor()}
`
/**
 * 指定された時間だけ非同期で待機する関数
 * @param {number} ms - 待機するミリ秒
 * @returns {Promise<void>}
 */
async function asyncSleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * タスクを挿入する関数
 * @returns {Promise<void>}
 */
async function insertTasks() {
  await asyncSleep(50); // waitを入れないとDaily Noteのタイトルから日付を読み込めない
  app.commands.executeCommandById("obsidian-silhouette:insert-tasks");
}

// タスクを挿入
await insertTasks();
-%>

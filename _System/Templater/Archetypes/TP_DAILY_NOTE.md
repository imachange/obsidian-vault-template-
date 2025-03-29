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

const fileDate = tp.date.now(config.FORMAT_DATETIME_ISO, 0, fileName, config.FORMAT_DATE_DAY);

const DAILY_NOTE_CONTEXT = `
\`\`\`dataviewjs {id="DailyNoteContext" class="no-render"}
await dv.view("_System/Dataview/DailyNoteContext");
\`\`\`
`;

const DAILY_TASK_COMMAND_BUTTON = `
\`\`\`dataviewjs {id="DailyTaskCommandButton" class="no-render"}
function createCommandButton(label, commands) {
    const button = dv.el("button", label);
    button.onclick = function() {
        commands.forEach(command => app.commands.executeCommandById(command));
    };
    return button;
}
const startButton = createCommandButton("開始", [
    "obsidian-silhouette:move-to-recording",
    "obsidian-silhouette:insert-current-time",
    "obsidian-silhouette:push-timer"
]);
const measureButton = createCommandButton("計測", [
    "obsidian-silhouette:move-to-recording",
    "obsidian-silhouette:push-timer"
]);
const endButton = createCommandButton("終了", [
    "obsidian-silhouette:move-to-recording",
    "obsidian-silhouette:insert-current-time",
    "obsidian-silhouette:cycle-bullet-checkbox"
]);
const forceStopButton = createCommandButton("強制終了", [
    "obsidian-silhouette:force-stop-recording"
]);
\`\`\`
`;

// frontmatter
tR += `${DELIMITER}
title: ${fileName}
date: ${fileDate}
params:
  uniqueId: ${await tp.file.include(tp.file.find_tfile("TP_UNIQUE_ID"))}
  type: daily
  created: ${tp.date.now(config.FORMAT_DATETIME_ISO)}
  updated: 
  shortTitle: "日次"
${DELIMITER}`

// content body
tR += `
${DAILY_NOTE_CONTEXT}
## 活動
${tp.file.cursor()}
${DAILY_TASK_COMMAND_BUTTON}

## 日記
![[${fileName}()]]
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
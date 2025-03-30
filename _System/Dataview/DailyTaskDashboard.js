/**
 * ボタンを生成する関数
 * @param {string} style - ボタンのスタイル (primary, default, destructive)
 * @param {string} label - ボタンのラベル
 * @param {string} id - ボタンのID
 * @param {boolean} hidden - ボタンの表示/非表示
 * @param {Array<string>} commands - ボタンに紐づくコマンド
 * @returns {string} - ボタンの文字列
 */
function createButton(style, label, id, hidden, commands) {
    const TICKS = "```";
    const actions = commands
        .map(command => `- type: command\n  command: ${command}`)
        .join("\n");
    return `${TICKS}meta-bind-button
style: ${style}
label: ${label}
tooltip: "記録"
icon: circle-play
id: ${id}
hidden: ${hidden}
actions:
${actions}
${TICKS}`;
}

// 現在のファイルが今日の日付かどうかを判定
const isToday = dv.current().file.name === moment().format("YYYY年MM月DD日");

// ボタンを定義
const startButton = createButton("primary", "開始", "start-button", true, [
    "obsidian-silhouette:move-to-recording",
    "obsidian-silhouette:insert-current-time",
    "obsidian-silhouette:push-timer"
]);

const measureButton = createButton("default", "計測", "measure-button", true, [
    "obsidian-silhouette:move-to-recording",
    "obsidian-silhouette:insert-current-time"
]);

const endButton = createButton("primary", "終了", "end-button", true, [
    "obsidian-silhouette:move-to-recording",
    "obsidian-silhouette:insert-current-time",
    "obsidian-silhouette:cycle-bullet-checkbox"
]);

const forceStopButton = createButton("destructive", "強制停止", "force-stop-button", true, [
    "obsidian-silhouette:force-stop-recording"
]);

// ボタンを表示
if (isToday) {
    dv.span("`BUTTON[start-button]` `BUTTON[measure-button]` `BUTTON[end-button]` `BUTTON[force-stop-button]`");
}
dv.span(startButton);
dv.span(measureButton);
dv.span(endButton);
dv.span(forceStopButton);
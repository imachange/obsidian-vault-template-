---
title: 各種設定
params:
  UNIQUE_ID_CHARACTERS: 0123456789abcdefghijklmnopqrstuvwxyz
  UNIQUE_ID_LENGTH: 7
  FORMAT_DATE_YEAR: YYYY年
  FORMAT_DATE_MONTH: YYYY年MM月
  FORMAT_DATE_WEEK: GGGG日WW週
  FORMAT_DATE_DAY: YYYY年MM月DD日
  FORMAT_DATE_TIME: HH時mm分ss秒
  FORMAT_DATE_ISO: YYYY-MM-DD
  FORMAT_TIME: HH時mm分ss秒
  FORMAT_DATETIME: YYYY年MM月DD日HH時mm分ss秒
  FORMAT_DATETIME_ISO: YYYY-MM-DD[T]HH:mm:ss
  DEFAULT_SHORT_TITLE: 一覧
  FORMAT_DATE_DAYFULL: YYYY年MM月DD日(ddd)
---

# 共通
## ユニークID
### UNIQUE_ID_CHARACTORS
`INPUT[text():params.UNIQUE_ID_CHARACTERS]`
ユニークIDで利用する文字の種類

### UNIQUE_ID_LENGTH
`INPUT[number():params.UNIQUE_ID_LENGTH]`
ユニークIDの文字数

## デフォルト値
### DEFAULT_SHORT_TITLE
`INPUT[text():params.DEFAULT_SHORT_TITLE]`
params.shortTitleのデフォルト値。ヘッダーのパンくずリストで現在位置の表記に用いられる値。
## フォーマット
### FORMAT_DATE_YEAR
`INPUT[text():params.FORMAT_DATE_YEAR]`
「年」の日本語表記フォーマット。moment記法で指定。

### FORMAT_DATE_MONTH
`INPUT[text():params.FORMAT_DATE_MONTH]`
「月」の日本語表記フォーマット。moment記法で指定。

### FORMAT_DATE_WEEK
`INPUT[text():params.FORMAT_DATE_WEEK]`
「週」の日本語表記フォーマット。moment記法で指定。

### FORMAT_DATE_DAY
`INPUT[text():params.FORMAT_DATE_DAY]`
「日」の日本語表記フォーマット。moment記法で指定。

### FORMAT_DATE_DAYFULL
`INPUT[text():params.FORMAT_DATE_DAYFULL]`

### FORMAT_DATETIME
`INPUT[text():params.FORMAT_DATETIME]`
「時分秒」の日本語表記フォーマット。moment記法で指定。

### FORMAT_TIME
`INPUT[text():params.FORMAT_TIME]`
「時分秒」の日本語表記フォーマット。moment記法で指定。

### FORMAT_DATE_ISO
`INPUT[text():params.FORMAT_DATE_ISO]`

### FORMAT_DATETIME_ISO
`INPUT[text():params.FORMAT_DATETIME_ISO]`
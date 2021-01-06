# Lidemy-reports-getter

把 Lidemy 系統進度報告存成 markdown 的小工具，會自動附上 YAML 的文章 header

## 使用步驟
1. git clone 
2. npm install
3. 設定 .env(詳見 .env 設定)
4. npm start

## 設定
.env 有五個設定分別是
- `DIR_NAME`
- `JWT_TOKEN`
- `COOKIE`
- `USER_ID`
- `ADD_YAML`

可以直接改 `.env.template`

#### `DIR_NAME`

預設是 `/reports`，可以自己更改資料夾名稱

#### `JWT_TOKEN`
依照以下步驟取得
1. 先進入導師計畫學習系統
2. 打開 `devtool` > `newwork`，然後建議 clear 一下
3. 切換到 `個人檔案` 的頁面
4. 找到 `https://learning-api.lidemy.com/v1/users/[userID]/reports?page=1` 這個 reqeust，到 `Headers` 這個分頁尋找 `Authentication` 這個 header，然後**複製 `bearer ` 以後的內容**

#### `COOKIE`
延續上面的步驟，切換到 `Cookies` 這個分頁，複製 `__cfduid` 的 value 即可

#### `USER_ID`
從上面 request 的 url 找自己的 ID 即可

#### `ADD_YAML_HEADER`
如果你要在前面加上 YAML 的 header 作為文章資訊，可以設定 `ADD_YAML_HEADER=1`。

YAML header 可以讓 hexo 之類的 blog framework 來幫你生成文章資訊。

如果要改 YAML 資訊可直接到 `app.js` > `saveToMD` 這個 function 的 `addYamlHeaderContent` 修改


## 附註
1. 如果一直 error，重新拿一次 `JWT_TOKEN`，因為會過期
2. 如果有 bug，小弟 1/7 要去當兵了，可以自己修改，如果可以把你的成果 PR 上來就更棒了～感謝 Huli、助教還有各位同學們～


# Demonstration

以下展示了如何透過 *papoGen* 來快速生成一個網頁，使用者可以透過 CLI 指令來做產生; 以下會展示如何使用、以及指令參數的意義

* 測試來源腳本放置於 `src/` 底下，並透過不同來源種類做資料夾分類
* 產生的結果放置於 `out/` 底下，一樣透過來源種類做分類

## Get Started

* 安裝 Node.js
    * Linux 可以透過指令安裝:
        ```bash
        $ source <(curl -s https://raw.githubusercontent.com/toolbuddy/ssfw/master/install_nodejs.sh)
        ```
* 透過 npm 安裝 `papogen` 
    ```bash
    $ [sudo] npm install -g papogen
    ```
> Help Manual:
>
> 任何疑惑可以下 `-h` 的參數做察看
> ```bash
> papogen -h
> ```

完成基本需求後，可以進到下面的練習部份囉！

**(注意！ 以下練習都是在這個 `example/` 資料夾中做的演示！)**

### Markdown (Recommended)

* 運行範例指令：
    ```bash
    $ papogen -s src/md -o out/md -g md -m md_doc
    ```
* 解釋
    * `-s` 指定了來源，這邊因為要使用 Markdown 格式，所以使用 `test/md` 底下的所有檔案
    * `-o` 則是指定輸出的位置，這邊會輸出一份靜態網頁（可以透過 `google-chrome-stable out/md/index.html` 或是 `firefox out/md/index.html` 來做開啟 ）
    * `-g` 則是指定我們要用的來源格式，這邊我們要用的是 Markdown 格式，所以給予 `md` 的值
    * `-m` 這邊則是指定網站的版型，目前 Markdown 的支援只有 `md_doc`，也就是 document 的格式 （支援版型可以參考根目錄中 `lib/template/` 裡頭的 `Pug.js`）
* 額外內容
    * `-t` 可以指定產生網頁的標題
    * `--theme` 可以指定 CSS theme template (正在籌備其他 CSS 主題當中)

### JSON

* 運行範例指令
    ```bash
    # 產生 document 版型 - doc
    $ papogen -s src/json -o out/json -m doc
    # 產生 resume 版型 - resume
    $ papogen -s src/json -o out/json -m resume
    ```
* 解釋
    * `-s` 指定了來源，這邊因為要使用 JSON 格式，所以使用 `test/json` 底下的所有檔案
    * `-o` 則是指定輸出的位置，這邊會輸出一份靜態網頁
    * 由於 *papogen* 預設是以 JSON 格式來做輸出，所以如果要產生 JSON 格式，可以不需要指定！
    * `-m` 這邊則是指定網站的版型，JSON 格式目前支援兩種 - `doc`, `resume`，可以依據需求做指定
* 額外內容
    * `-t` 可以指定產生網頁的標題
    * `--theme` 可以指定 CSS theme template (正在籌備其他 CSS 主題當中)

* 如何編輯 JSON 格式可以參考 [這裡](https://github.com/toolbuddy/papoGen/blob/master/test/json/README.md)

### YAML

* 運行範例指令
    ```bash
    # 產生 document 版型 - doc
    $ papogen -s src/yaml -o out/yaml -m doc -g yaml
    # 產生 resume 版型 - resume
    $ papogen -s src/yaml -o out/yaml -m resume -g yaml
    ```
* 解釋
    * `-s` 指定了來源，這邊因為要使用 YAML 格式，所以使用 `test/yaml` 底下的所有檔案
    * `-o` 則是指定輸出的位置，這邊會輸出一份靜態網頁
    * `-g` 由於 *papoGen* 預設是以 YAML 格式來做輸出，所以如果要產生 yaml 格式，就必須透過 `-g yaml` 來做指定
    * `-m` 這邊則是指定網站的版型，YAML 格式目前支援兩種 - `doc`, `resume`，可以依據需求做指定
* 額外內容
    * `-t` 可以指定產生網頁的標題
    * `--theme` 可以指定 CSS theme template (正在籌備其他 css 主題當中)
* 如何編輯 YAML 格式可以參考 [這裡](https://github.com/toolbuddy/papoGen/blob/master/test/json/README.md) （和 JSON 格式寫法相同！）.


## 透過指令產生腳本範本

* 在 `0.0.12` 版開始，可以支援透過 *papoGen* 產生可支援的腳本格式！
* 利用 `papogen -h` 來列出有支援哪些後，便可以利用 `<script>`以及 `<format>`的組合，來產生腳本；
    * 組合方式： `<script>`/`<format>`
    * `<script>` 目前支援 JSON / YAML / Markdown。
    * `<format>` 則有多種，可以透過 `papogen -h` 來做察看。
* 示範指令
    * 產生一個 JSON 格式中 `text` 樣式的腳本到目前的工作目錄
        ```bash
        $ papogen -c json/text -o .
        ```
    * 多個樣式 (生成 `text.json`, `list.json`, 以及 `table.json`)
        ```bash
        $ papogen -c json/text/list/table -o .
        ```
    * 全部範本都做生成
        ```bash
        $ papogen -c json/all -o .
        ```

# Template usage

這邊是說明如何自製 template 

* 首先，在 `template/` 底下的檔案**名稱**就是讓使用者可以呼叫使用的 template！
* 而這些檔案可以把不同的內容分別放在 `body`, `footer`, `header`, `mixins` 做管理
    * `body` 是主要 style 的選擇
        * 像是 paper.css 的 `doc`，其 body 就是選用 papercss 提供的 `tabs` 來做管理
        * 當然，這裡需要的話還是可以在 body 底下開資料夾做管理！
    * `header` 則是 style 的相依性（header, meta 等等的定義）
    * `mixins` 則是所需要的 functions
    * `footer` 則是最底下的聲明、等等的用途

* 而傳入給這些 template 的格式，則都是 json 格式的內容；並且是已經先處理合併過後的內容
    * 舉例來說，原本多個 json 檔案內容都會被 merge 成一個巨大的 json array 來傳入
    * 而原本的一些相依性：程式碼檔案、圖片路徑等等，都會被`前處理`給處理掉；
        * 像是程式碼的部份，原本路徑的地方就會被前處理讀取後存進 json object 內；
        * 而圖片則是會幫使用者做複製後，更改原本的相對路徑，處理成目標最後能夠使用的相對路徑

## 傳入的 json 格式

* 可以看到，每個檔案 object 除了 `filename`, `loc` 欄位之外，其餘 `article`, `article_content` 都跟文件定義的內容一樣
* 所以基本上只要按照你所需要的部份來做編寫、抓取你要的內容、`field` 來做 `pug` 檔案，就可以完成你的 template!
* **注意：傳入 pug 的變數名稱為 namelist**，其格式在下方 code block 中
```js
[
    // 每個檔案都是一個 array object
    {
        filename: 檔案名稱,
        loc: 該檔案所在的絕對路徑,
        article: 該檔案內容 - article,
        article_content: 該檔案內容 - article_content（也是 json array）
    },
    ...
]

```

* 歡迎貢獻！
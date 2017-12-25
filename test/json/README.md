# json 規格的使用

## papoGen 如何使用 json ？

* 在 papoGen 當中，目前支援的 Json 格式
* 而可以在主頁的 README.md 中看到 command 的使用情況，可以指定一個資料夾作為生成來源的依據
* 我們可以指定一個 folder 來做生成；而這時我們就可以把所有 json 檔案放在這裏面！
* 每個 json 都會佔據一個 tab ，並以其`檔案名稱`當作該 tab 的`顯示名稱`(網站中的其中一頁，詳情請參考 repo 首頁上方的 demo 連結)
* 而其內部內容就會轉換成為那一頁的顯示內容
* 依據 command 指定的 template，在生成上會有些微的差異
* 接下來我們就可以進到每個 json 檔內支援什麼格式囉

## Type support 

* 先來看到一個 json 檔案內概況：
    * 每個檔案內都有個欄位 `article` 作為該頁的主題（顯示於內文最上方）
    * 並跟隨一個 json array: `article_content`
```js
{
    article: "Title name",
    article_content: [ ... ]
}
```

* `article_content` 格式：
    * 每個 element 都有以下的欄位： 
        * `title`： Subtitle name
        * `content`： 為 json array，內部會裝載各式各樣支援的格式（以下會詳細介紹），**papoGen** 則會依據你所指定的以下格式來做轉換，成為美美的 document!
```js
{
    title: "Subtitle Name",
    content: [ ... ]
}
```

* 那麼接下來就開始介紹 `content` 內部格式吧！
* 以下每個種類都是放置於 `content` 內的元件！

### Normal Article
* 為一般文字支援
* 每個 `data` 裡頭的 element 都會自成獨立的一行
```js
[
    ... (assume inside `content` array)
    {
        "type": "text",
        "data": [ 
            "sentence 1",
            "sentence 2"
        ]
    },
    ...
]
```

### HyperLinks
* 為超連結支援
* 可與一般文字混用
    * 注意在這個型態使用底下時，換行字元`要自行加在要換行`的字串後面！
    * 容許超連結與文章混合
```js
[
    ... (assume inside `content` array)
    {
        "type": "hyper",
        "data": [ 
            {
                "text": [
                    "sentence1","sentence2",...
                ]
            },
            {
                "hyper":[
                    { "text": "display text", "link":"<url>" } ...
                ]
            }
        ]
    },
    ...
]
```

### Image support 
* 為圖片支援
* 來源位置是為跟該 json 檔案的相對位置

```js
[
    ... (assume inside `content` array)
    {
        "type": "image",
        "data": [ 
            {
                "url": "../path/to/your/img or http://....",
                "size": 300 // px
            }
        ]
    },
    ...
]
```

### Code support
* 為原始碼支援，支援兩種來源
    * `url`: 透過檔案的方式做引入
    * `raw`: 可以直接輸入程式碼
* 來源位置是為跟該 json 檔案的相對位置

```js
[
    ... (assume inside `content` array)
    {
        "type": "code",
        "data": [ 
            {
                "url": "../path/to/your/code"
            },
            {
                "raw": "const var = require('meme')"
            }
        ]
    },
    ...
]
```

### Formula support
* 數學式的支援，支援 `MathJax` 的格式

```js
[
    ... (assume inside `content` array)
    {
        "type": "formula",
        "data": [
            "`x = (-b +- sqrt(b^2-4ac))/(2a) .`"
        ]
    },
    ...
]

```

### Table support 
* 表格的支援
    * 每個 `data` 內的元素，都是一條獨立的 column
    * 而各自都 `items` 的 json array 來裝屬於該 column 的 elements
* 注意！ 每個 `items` 內的欄位數目要相同！否則會有 undefined behavior 發生！

```js
{
    ... (assume inside `content` array)
    {
        "type": "table",
        "data": [
            {
                "name": "column title 1",
                "items": [
                    "var1", "var2" ,...
                ]
            },
            {
                "name": "column title 2",
                "items": [
                    "var1-attr", "var2-attr" ,...
                ]
            }
        ]
    },
    ...
}
```

### Card Support
* 這個支援主要是依照 paper.css 的 card 格式產生
* 產生結果可以參考 demo page，而格式參考下方：

```js
{
    ...
    {
        "type": "card",
        "data":[
            {
                "url": "<img url>",
                "title": "Card example with image",
                "subtitle": "I am subtitle!",
                "text": [
                    "Example sentence 1.",
                    "Example sentence 2."
                ],
                "tag": [
                    "example",
                    "tag"
                ]
            },
    }
}
```
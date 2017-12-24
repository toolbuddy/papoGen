# Example usage

這邊展示了如何透過 papogen 來快速產生一個網站

* 使用者只需要編輯 `src/` 內的 json 即可產生每個頁面
* 之後運行以下 command 就可以產生結果網頁到 `out/` 裏面


## Get Started

* npm 安裝 `papogen` 
```bash
[sudo] npm install -g papogen
```

* 編輯 `src/` 內的 json 格式（每個 json 格式代表一種類型，詳細察看根目錄中 `test/README.md`）

* 運行指令產生！
    * 以下 `-s`,`-o` 為必備之外，其餘的參數指定都有預設值！
```bash
papogen -s src/ -o out/ -t <your title> -m <model you want> -g <support format>
```

* 任何疑惑可以下 `-h` 的參數做察看
```bash
papogen -h
```
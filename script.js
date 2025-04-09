// 後で使いやすくするために <form> を変数に入れる
let form = document.forms.form_address

// <form>内のapi_zipcodeがクリックされた時に発火させる
form.api_zipcode.addEventListener("click", () => {

    // 入力された郵便番号が7文字かつ数値の場合
    if(form.zipcode.value.length == 7 && isFinite(parseInt(form.zipcode.value))) {
        // APIにリクエストを郵便番号をパラメータにのせて送信
        fetch('https://zipcloud.ibsnet.co.jp/api/search?zipcode=' + form.zipcode.value)

        // レスポンスを受け取る、またレスポンスの形式をJSONに指定
        .then(responce => responce.json())
        //受け取ったレスポンスを"data"にする
        .then(data => {
            //レスポンスは返ったが resultsがnull (送信した郵便番号に対応する結果がないなど) の時
            if(data.results == null) {
                // アラートする
                alert("Error")

                // resultがnullでない場合 (送信した郵便番号に対応する結果が返却された場合)
            } else {
                // 要素内に結果を追加 (代入)
                form.adrs1_prefcode.value = data.results[0].prefcode
                form.adrs2_adrs3.value = data.results[0].address2 + data.results[0].address3
                form.adrs2_adrs3_kana.value = data.results[0].kana2 + data.results[0].kana3
            }
        })

        // エラーが発生 送信中などのネットワークエラーやfetch自体のエラー
        .catch(error => {
            // コンソールとアラートにエラー内容を出力
            console.error(error)
        })
    
    // 入力された郵便番号が7文字以外の時
    } else {
        alert("郵便番号を正しく入力してください。")
    }
})

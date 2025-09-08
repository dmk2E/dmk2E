// 定数定義
const GITHUB_PAGE = "https://github.com/dmk2E";

// 関数定義
function navigate(url){
    window.location.href = url;
}

// メイン処理
const myIcon = document.getElementById("MY_ICON");

myIcon.addEventListener(
    "click",
    (evt)=>{
        evt.stopPropagation();
        navigate(GITHUB_PAGE);
    }
);
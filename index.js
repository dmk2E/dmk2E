// 定数定義
const GITHUB_PAGE = "https://github.com/dmk2E";
const EXPLANATION_URL = "./explanation.json";
const EXPLANATION_CONFIG = {};

// 関数定義
function navigate(url){
    window.location.href = url;
}

async function getJson(url,config){
    try{
        const data = await fetch(url,config);
        const json = await data.json();
        return json;
    }catch(err){
        throw new Error("Data installation is failured!");
    }
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

getJson(EXPLANATION_URL,EXPLANATION_CONFIG)
    .then(data =>{
        console.log(data);
        // 説明追加の処理
    })
    .catch(err =>{
        console.log(err);
    });
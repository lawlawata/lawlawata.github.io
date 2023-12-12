// ---- 呼び出し ----

// クリックしたら実行する処理
document.getElementById('returnTopButton').addEventListener('click', resetLoadingTransitionAnime);

// ページ読み込みが全て終わった時に実行する処理
window.onload = function(){
	setPotitionCommon();
	loadingTransitionAnime();
	setTimeout(restoreScrollPositionCommon, 2000);
	cardAnime();
}

// 画面の大きさを変えたら実行する処理
$(window).resize(function () {
	setPotitionCommon();
});

// 画面をスクロールをしたら実行する処理
$(window).scroll(function () {
	smoothTextAnime();
	cardAnime();
});

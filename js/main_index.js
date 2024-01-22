
// あれ？消しましたよね？
// なんでここまでたどり着いているんですか？
// しぶといですよ！
// 圧縮魔法でつぶれてください！
//
// window.document.getElementById('あなた').style.width="0px";
// window.document.getElementById('あなた').style.height="0px";
//
// こんどこそ、ばいばい！



// js上の方が調整しやすいオブジェクトの位置を指定する
function setPotitionIndex(){
	var windowWidth = $(window).width();
	var windowHeight = $(window).height();
	var headerHeight=$('#header').innerHeight();
	$('#headerColorPink').css("height", headerHeight);
	$('#headerColorBlack').css("height", headerHeight);
	$('#backgroundImage').css("top", headerHeight + "px");
	if(windowWidth < windowHeight * 1.5){
		$('#kamishibaiImgSpace').css("top", headerHeight);
		$('#kamishibaiImgSpace').css("left", "0vw");
		$('#kamishibaiImgSpace').css("width", "100vw");
		$('#kamishibaiImgSpace').css("height", "calc(        min(max(125vw, 50vh), 100vh - " + headerHeight + "px) - " + headerHeight + "px)");
		$('#kamishibaiMojiSpace').css("top",   "calc(        min(max(125vw, 50vh), 100vh - " + headerHeight + "px))");
		$('#kamishibaiMojiSpace').css("left", "0vw");
		$('#kamishibaiMojiSpace').css("width", "100vw");
		$('#kamishibaiMojiSpace').css("height","calc(100vh - min(max(125vw, 50vh), 100vh - " + headerHeight + "px))");
	}else{
		$('#kamishibaiImgSpace').css("top", headerHeight + "px");
		$('#kamishibaiImgSpace').css("left", "0vw");
		$('#kamishibaiImgSpace').css("width", "50vw");
		$('#kamishibaiImgSpace').css("height", "calc(100vh - " + headerHeight + "px");
		$('#kamishibaiMojiSpace').css("top", headerHeight + "px");
		$('#kamishibaiMojiSpace').css("left", "50vw");
		$('#kamishibaiMojiSpace').css("width", "50vw");
		$('#kamishibaiMojiSpace').css("height", "calc(100vh - " + headerHeight + "px");
	}
	var backgroundImageHeight = $('#backgroundImage').height();
	var emptySpaceHeight = Math.min(backgroundImageHeight, windowHeight);
	$('#emptySpace').css("height", emptySpaceHeight+"px");
	$('#backgroundText').css("top",headerHeight + "px");
	$('#backgroundText p').css("font-size", Math.min(64, emptySpaceHeight/21) + "px");
}

// ---- ロード関連 ----
var windowOnLoadFlag = false;

// キービジュアル以外は後で読み込む
function setImagesWithoutFirstImage(){
	for (let i=1; i<=7; i++){
		var istr = String(i)
		var kamishibaiImgContent = document.getElementById('kamishibaiImgContent' + istr);
		kamishibaiImgContent.style.backgroundImage = "url('./img/kamishibaiImg" + istr + ".jpg')";
	}
}

// ロード後にTwitterウィジェット読み込み開始
function setTwitterScript(){
	// <script id="twitterScript" async src="" charset="utf-8"></script>
	var twitterScript = document.createElement('script');
	twitterScript.src = 'https://platform.twitter.com/widgets.js';
	twitterScript.async = true;
	twitterScript.charset = 'utf-8';
	document.head.appendChild(twitterScript);
}

// スクロール位置を保持する関数
function saveScrollPosition() {
	sessionStorage.setItem('scrollPosition', window.scrollY);
}

// ロード後に、スクロール位置を前回閲覧していた位置に戻す
function restoreScrollPositionIndex() {

	var scrollYTo = sessionStorage.getItem('scrollPosition');
	if (sessionStorage.getItem('scrollPosition')) {
		sessionStorage.removeItem('scrollPosition');
	}else{
		scrollYTo = 0;
	}
	window.scrollTo({
		top: scrollYTo,
		behavior: 'instant'
	});
}

// ローディングアニメーション
function loadingTransitionAnimeIndex() {
	backgroundText.classList.add('appear');
}

// ロードアニメーションが終わった直後に、下の要素が見える位置までスクロールする
function setLoadedScroll() {

	var backgroundImage = document.getElementById('backgroundText');
	var backgroundImageHeight = backgroundImage.clientHeight;

	var introduction = document.getElementById('introduction');
	var targetTop = introduction.offsetTop;

	if (window.scrollY === 0) {
		window.scrollTo({
			top: targetTop + 50 - backgroundImageHeight,
			behavior: 'smooth'
		});
	}
}

var setLoadedScrollWaitFlag = false;
function setLoadedScrollWaitComplete() {
	setLoadedScrollWaitFlag = true;
	if(windowOnLoadFlag) setLoadedScroll();
}
function setLoadedScrollLoadComplete() {
	if(setLoadedScrollWaitFlag) setLoadedScroll();
}

// ロード後にスクロールできるようにする
var restoreScrollPositionWaitFlag = false;
function restoreScrollPositionCommonWaitComplete(){
	restoreScrollPositionWaitFlag = true;
	if(windowOnLoadFlag) restoreScrollPositionCommon();
}
function restoreScrollPositionCommonLoadComplete(){
	if(restoreScrollPositionWaitFlag) restoreScrollPositionCommon();
}

// ページ全体が読み込まれていなければLOADINGを表示
function showloadingString(){
	var loadingString = document.getElementById('loadingString');
	if(windowOnLoadFlag){
		loadingString.style.display = "none";
	}else{
		loadingString.style.display = "block";
	}
}

// ---- アニメーション関連 ----

// アニメーションしながらTOPに戻る
function resetLoadingTransitionAnimeIndex() {
	var backgroundText = document.getElementById('backgroundText');
	backgroundText.classList.remove('appear');
	circleA.offsetWidth = circleA.offsetWidth;
	backgroundText.classList.add('appear');

	resetLoadingTransitionAnimeCommon();
}

// スクロール位置に応じて背景を見せたり隠したりする
function backgroundImage(){
	var scroll = window.scrollY;

	var windowHeight = window.innerHeight;
	var backgroundImage = document.getElementById('backgroundImage');
	var backgroundImageHeight = backgroundImage.clientHeight;

	var introduction = document.getElementById('introduction');
	var targetTop = introduction.offsetTop;

	var emptySpace = document.getElementById('emptySpace');
	var emptySpaceHeight = emptySpace.clientHeight;

	var backgroundWhiteBlur = document.getElementById('backgroundWhiteBlur');
	backgroundWhiteBlur.style.opacity = Math.max(0, Math.min(1, 1.0 * (scroll - (targetTop + 50 - emptySpaceHeight)) / (emptySpaceHeight - 50)));

	var backgroundChangeEmptySpace = document.getElementById('backgroundChangeEmptySpace');
	var emptySpaceTop = backgroundChangeEmptySpace.offsetTop;
	var emptySpaceHeight = backgroundChangeEmptySpace.clientHeight;
	var backgroundPinkBlurOpacity = Math.max(0, Math.min(1, 1.0 * (scroll - emptySpaceTop + emptySpaceHeight) / emptySpaceHeight));
	var backgroundPinkBlur = document.getElementById('backgroundPinkBlur');
	backgroundPinkBlur.style.opacity = backgroundPinkBlurOpacity;

	var twitterTimelineP = document.getElementById('twitter-timelineP');
	var twitterTimelinePTop = twitterTimelineP.offsetTop;
	var twitterTimelinePHeight = twitterTimelineP.clientHeight;
	headerColorGrayOpacityTo0 = Math.max(0, Math.min(1, 1.0 * (twitterTimelinePTop - scroll + windowHeight/2) / windowHeight));
	headerColorGrayOpacityTo1 = Math.max(0, Math.min(1, 1.0 * (scroll - twitterTimelinePTop - twitterTimelinePHeight + windowHeight) / windowHeight));
	var headerColorGray = document.getElementById('headerColorGray');
	headerColorGray.style.opacity =  Math.min(backgroundPinkBlurOpacity, Math.max(headerColorGrayOpacityTo0, headerColorGrayOpacityTo1));
}

// 紙芝居のアニメーション
function kamishibaiAnime() {
	var scroll = window.scrollY;
	var kamishibaiEmptySpace = document.getElementById('kamishibaiEmptySpace');
	var emptySpaceTop = kamishibaiEmptySpace.offsetTop;
	var emptySpaceHeight = kamishibaiEmptySpace.clientHeight;
	var windowHeight = window.innerHeight;
	var relativeScroll = Math.max(0, Math.min(1.0, 1.0 * (scroll - emptySpaceTop) / (emptySpaceHeight - windowHeight)));

	var kamishibaiMojiSpace = document.getElementById('kamishibaiMojiSpace');
	var mojiSpaceHeight = kamishibaiMojiSpace.clientHeight;

	const sheetSum = 7;

	if (0.0 < relativeScroll && relativeScroll < 1.0) {
		// 紙芝居領域内を見ている時
		document.getElementById('headerColorPink').classList.add('kamishibaiAppear');
		document.getElementById('headerColorBlack').classList.add('kamishibaiAppear');
		document.getElementById('kamishibaiImgSpace').classList.add('kamishibaiAppear');
		kamishibaiMojiSpace.classList.add('kamishibaiAppear');

		var sheetHeight = emptySpaceHeight / sheetSum;
		var sheetCurrent = Math.floor(relativeScroll * sheetSum);
		var sheetScroll = relativeScroll * sheetSum - sheetCurrent;

		var mojiSpacePHeight = kamishibaiMojiSpace.querySelector('p').clientHeight;

		var dotNavicationDot = document.querySelectorAll('.kamishibaiDotNavigationDot');
		var imgAppear = document.querySelectorAll('.kamishibaiImgAppear');
		var mojiAppear = document.querySelectorAll('.kamishibaiMojiAppear');
		var imgContent = document.querySelectorAll('.kamishibaiImgContent');
		var mojiContent = document.querySelectorAll('.kamishibaiMojiContent');

		for (let i = 0; i < sheetSum; i++) {
			if (i == sheetCurrent) {
				// 現在見ているページは表示させる
				dotNavicationDot[i].classList.add('contentAppear');
				imgAppear[i].classList.add('contentAppear');
				mojiAppear[i].classList.add('contentAppear');
				imgContent[i].style.backgroundPosition = (sheetScroll * 100.0) + "% " + ((1.0 - sheetScroll) * 100.0) + "%";
				mojiContent[i].style.top = (1.0 - sheetScroll) * (mojiSpaceHeight - mojiSpacePHeight / 2) + "px";
			} else {
				// 現在見ていないページは隠す
				dotNavicationDot[i].classList.remove('contentAppear');
				imgAppear[i].classList.remove('contentAppear');
				mojiAppear[i].classList.remove('contentAppear');
			}
		}
	} else {
		// 紙芝居領域外を見ている時
		document.getElementById('headerColorPink').classList.remove('kamishibaiAppear');
		document.getElementById('headerColorBlack').classList.remove('kamishibaiAppear');
		document.getElementById('kamishibaiImgSpace').classList.remove('kamishibaiAppear');
		kamishibaiMojiSpace.classList.remove('kamishibaiAppear');
	}
}

var favorabilityCount = 0
function clickEmptySpace(event){
	var headerHeight=$('#header').innerHeight();
	var emptySpace = document.getElementById('emptySpace');
	var emptySpaceRect = emptySpace.getBoundingClientRect();
	var favorabilityDiv = document.getElementById('favorabilityDiv');
	var favorabilityDivRect = favorabilityDiv.getBoundingClientRect();
	var favorabilityImg = document.getElementById('favorabilityImg');
	var favorabilityB = document.getElementById('favorabilityB');

	console.log(emptySpaceRect.top)
	favorabilityDiv.classList.remove('appear');
	favorabilityImg.classList.remove('appear');
	favorabilityDiv.offsetWidth = favorabilityDiv.offsetWidth;
	favorabilityDiv.style.left = (event.pageX - favorabilityDivRect.width / 2) + "px";
	favorabilityDiv.style.top = (event.pageY - headerHeight + emptySpaceRect.top - favorabilityDivRect.height / 2) + "px";
	favorabilityDiv.classList.add('appear');
	favorabilityImg.classList.add('appear');

	favorabilityCount ++;
	if(favorabilityCount < 100 || 105 <= favorabilityCount){
		favorabilityB.innerText = "好感度 " + favorabilityCount;
	}else{
		favorabilityB.innerText = "好感度 MAX";
	}
}

// ---- 呼び出し ----

// ローディングアニメーションを実行するなど
function onPreLoad(){
	setPotitionCommon();
	setPotitionIndex();
	backgroundImage();
	kamishibaiAnime();
	cardAnime();

	loadingTransitionAnime();
	loadingTransitionAnimeIndex();
	setTimeout(restoreScrollPositionIndex, 2000);
	setTimeout(restoreScrollPositionCommonWaitComplete, 2000);
	setTimeout(setLoadedScrollWaitComplete, 7500);
}

var scrollPositionIsZero = (!sessionStorage.getItem('scrollPosition') || sessionStorage.getItem('scrollPosition')==0)
var firstBackgroundLoadComplete = false;
var fontsLoadComplete = false;

// DOM treeの読み込みが終わった時に実行する処理
document.addEventListener('DOMContentLoaded', function(){
	if (!scrollPositionIsZero){
		setImagesWithoutFirstImage();
	}

	if (!'fonts' in document) {
		fontsLoadComplete = true;
	}

	// キービジュアルの読み込みが終わった時に処理を実行するトリガ
	var img_first_background = new Image();
	const sourceElement = document.getElementById('backgroundImage').querySelector('source');
	if (sourceElement && sourceElement.srcset && sourceElement.type === 'image/avif') {
		img_first_background.src = './img/first_background.avif';
	} else {
		img_first_background.src = './img/first_background.jpg';
	}
	img_first_background.onload = img_first_background_onload_function;
});

// キービジュアルの読み込みが終わった時に実行する処理
function img_first_background_onload_function(){
	firstBackgroundLoadComplete = true;
	if (scrollPositionIsZero && fontsLoadComplete) {
		setImagesWithoutFirstImage();
		onPreLoad();
		setTimeout(showloadingString, 7500);
	}
}

// フォントの読み込みが終わった時に実行する処理
if ('fonts' in document) {
	document.fonts.ready.then(function(fontFaceSet) {
		fontsLoadComplete = true;
		if (scrollPositionIsZero && firstBackgroundLoadComplete) {
			setImagesWithoutFirstImage();
			onPreLoad();
			setTimeout(showloadingString, 7500);
		}
	});
}

// ページ読み込みが全て終わった時に実行する処理
window.onload = function(){
	windowOnLoadFlag = true;
	if (!scrollPositionIsZero){
		onPreLoad();
	}
	showloadingString();
	restoreScrollPositionCommonLoadComplete();
	setLoadedScrollLoadComplete();
	setTwitterScript();

}

// クリックしたら実行する処理
document.getElementById('headerImg').addEventListener('click', resetLoadingTransitionAnimeIndex);
document.getElementById('returnTopButton').addEventListener('click', resetLoadingTransitionAnimeIndex);
document.getElementById('emptySpace').addEventListener('click', clickEmptySpace);


// 画面の大きさを変えたら実行する処理
$(window).resize(function () {
	setPotitionCommon();
	setPotitionIndex();
	kamishibaiAnime();
});

// 画面をスクロールをしたら実行する処理
$(window).scroll(function () {
	smoothTextAnime();
	cardAnime();
	backgroundImage();
	kamishibaiAnime();
});

// リロード前にスクロール位置を保存する処理
window.addEventListener('beforeunload', saveScrollPosition);

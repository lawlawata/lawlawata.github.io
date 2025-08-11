
// あれ？消しましたよね？
// なんでここまでたどり着いているんですか？
// しぶといですよ！
// 圧縮魔法でつぶれてください！
//
// window.document.getElementById('あなた').style.width="0px";
// window.document.getElementById('あなた').style.height="0px";
//
// こんどこそ、ばいばい！

const first_video_flag = false;

const transition_anime_length = 2000; // var(--transition-anime-length)
const first_movie_length = first_video_flag ? 11 : 0; // var(--first-movie-length)
const background_text_anime_length = 5000;


// ---- ロード関連 ----
var windowOnLoadFlag = false;

function setVideoSource() {
	if(first_video_flag){
		var firstMovieSource1 = document.getElementById('firstMovieSource1');
		var firstMovieSource2 = document.getElementById('firstMovieSource2');
		var aspectRatio = window.innerWidth / window.innerHeight;

		if (aspectRatio >= 0.76) {
			firstMovieSource1.src = 'video/first_movie_horizonal.mp4';
			firstMovieSource1.type = 'video/mp4';
			firstMovieSource2.src = 'video/first_movie_horizonal.webm';
			firstMovieSource2.type = 'video/webm';
		} else {
			firstMovieSource1.src = 'video/first_movie.webm';
			firstMovieSource1.type = 'video/webm';
			firstMovieSource2.src = 'video/first_movie.mp4';
			firstMovieSource2.type = 'video/mp4';
		}
	}
}

function isAvifSupported() {
	// TODO
	if (!window || !window.HTMLCanvasElement) return false;
	const canvas = document.createElement('canvas');
	if (!canvas || !canvas.getContext) return false;
	const ctx = canvas.getContext('2d');
	if (!ctx || !ctx.getImageData) return false;

	const avifDataUri = globalPrefix + 'img/first_background_h.avif';
	const img = new Image();
	img.src = avifDataUri;
	return img.complete && img.naturalWidth > 0 && img.naturalHeight > 0;
}

// キービジュアル以外は後で読み込む
function setImagesWithoutFirstImage(){
	var img_extension = "";
	if (isAvifSupported()) {
		img_extension = "avif";
	} else {
		img_extension = "jpg";
	}

	for (let i=1; i<=7; i++){
		var istr = String(i)
		var kamishibaiImgContent = document.getElementById('kamishibaiImgContent' + istr);
		kamishibaiImgContent.src = globalPrefix + 'img/kamishibaiImg' + istr + '.' + img_extension;
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


// ---- ローディングアニメーション関連 ----

// 1回目：ローディングアニメーション
function loadingTransitionAnimeIndex() {
	loadingTransitionAnimeCommon();
	setTimeout(loadingTransitionAnimeIndexPlayFirstVideo, transition_anime_length);
	setTimeout(restoreScrollPositionIndex, transition_anime_length);
	setTimeout(restoreScrollPositionCommonWaitComplete, transition_anime_length);
	setTimeout(loadingTransitionAnimeIndexBackgroundTextWaitComplete, transition_anime_length + first_movie_length);
	setTimeout(setLoadedScrollWaitComplete, transition_anime_length + first_movie_length + background_text_anime_length);
}

// 2回目以降：アニメーションしながらTOPに戻る
function resetLoadingTransitionAnimeIndex() {
	resetLoadingTransitionAnimeCommon();
	setTimeout(resetLoadingTransitionAnimeIndexRemoveClass, 1000);
	setTimeout(loadingTransitionAnimeIndexPlayFirstVideo, transition_anime_length);
	setTimeout(loadingTransitionAnimeIndexBackgroundText, transition_anime_length + first_movie_length);
}

function resetLoadingTransitionAnimeIndexRemoveClass(){
	var backgroundText = document.getElementById('backgroundText');
	backgroundText.classList.remove('appear');
	if(first_video_flag){
		var firstMovieDiv = document.getElementById('firstMovieDiv');
		firstMovieDiv.classList.remove('appear');
	}
	backgroundText.offsetWidth = backgroundText.offsetWidth;
}

function loadingTransitionAnimeIndexPlayFirstVideo(){
	if(first_video_flag){
		var firstMovieVideo = document.getElementById('firstMovieVideo');
		firstMovieVideo.classList.remove('appearVideo');
		firstMovieVideo.currentTime = 0;
		firstMovieVideo.offsetWidth = firstMovieVideo.offsetWidth;
		firstMovieVideo.classList.add('appearVideo');
		firstMovieVideo.play();
	}
}

function loadingTransitionAnimeIndexBackgroundText() {
	var backgroundText = document.getElementById('backgroundText');
	backgroundText.classList.add('appear');
	if(first_video_flag){
		var firstMovieDiv = document.getElementById('firstMovieDiv');
		firstMovieDiv.classList.add('appear');
	}
}
var loadingTransitionAnimeIndexBackgroundTextWaitFlag = false;
var loadingTransitionAnimeIndexBackgroundTextLoadFlag = false;
function loadingTransitionAnimeIndexBackgroundTextExecute() {
	if(loadingTransitionAnimeIndexBackgroundTextLoadFlag && loadingTransitionAnimeIndexBackgroundTextWaitFlag)
	loadingTransitionAnimeIndexBackgroundText();
}
function loadingTransitionAnimeIndexBackgroundTextWaitComplete() {
	loadingTransitionAnimeIndexBackgroundTextWaitFlag = true;
	loadingTransitionAnimeIndexBackgroundTextExecute();
}
function loadingTransitionAnimeIndexBackgroundTextLoadComplete() {
	loadingTransitionAnimeIndexBackgroundTextLoadFlag = true;
	loadingTransitionAnimeIndexBackgroundTextExecute();
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

// ロード後にスクロールできるようにする
var restoreScrollPositionCommonWaitFlag = false;
function restoreScrollPositionCommonWaitComplete(){
	restoreScrollPositionCommonWaitFlag = true;
	if(windowOnLoadFlag) restoreScrollPositionCommon();
}
function restoreScrollPositionCommonLoadComplete(){
	if(restoreScrollPositionCommonWaitFlag) restoreScrollPositionCommon();
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

// ---- スクロールアニメーション関連 ----

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

	var twitterTimelineP = document.getElementById('twitter-timelineDiv');
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
				imgContent[i].style.objectPosition = (sheetScroll * 100.0) + "% " + ((1.0 - sheetScroll) * 100.0) + "%";
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

// 好感度
var favorabilityCount = 0;
function clickEmptySpace(event){
	var headerHeight=$('#header').innerHeight();
	var emptySpace = document.getElementById('emptySpace');
	var emptySpaceRect = emptySpace.getBoundingClientRect();
	var favorabilityDiv = document.getElementById('favorabilityDiv');
	var favorabilityDivRect = favorabilityDiv.getBoundingClientRect();
	var favorabilityImg = document.getElementById('favorabilityImg');
	var favorabilityP = document.getElementById('favorabilityP');
	var favorabilityB = document.getElementById('favorabilityB');
	var favorabilitySpan = document.getElementById('favorabilitySpan');

	favorabilityDiv.classList.remove('appear');
	favorabilityImg.classList.remove('appear');
	favorabilityDiv.offsetWidth = favorabilityDiv.offsetWidth;
	favorabilityDiv.style.left = (event.pageX - favorabilityDivRect.width / 2) + "px";
	favorabilityDiv.style.top = (event.pageY - headerHeight + emptySpaceRect.top - favorabilityDivRect.height / 2) + "px";
	favorabilityDiv.classList.add('appear');
	favorabilityImg.classList.add('appear');

	favorabilityCount ++;
	if(favorabilityCount <= 0){
		favorabilityP.style.display = "none";
	}else if(100 <= favorabilityCount && favorabilityCount < 105){
		favorabilityB.innerText = "MAX";
		favorabilitySpan.innerText = "";
	}else{
		favorabilityP.style.display = "block";
		favorabilityB.innerText = "" + favorabilityCount;
		favorabilitySpan.innerText = "%";
	}
}

// YouTube埋め込み用にIFrame Player APIをロード
function initYoutubeApi(){
	var tag = document.createElement('script');
	tag.src = "https://www.youtube.com/iframe_api";
	var firstScriptTag = document.getElementsByTagName('script')[0];
	firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
}

// ---- 呼び出し ----

// ローディングアニメーションを実行するなど、最初に表示する処理
function startTransitionAnimeAndSoOn(){
	setPotitionCommon();
	backgroundImage();
	kamishibaiAnime();
	cardAnime();

	loadingTransitionAnimeIndex();
}

setVideoSource();

// スクロールが一番上であればキービジュアルを先に読み込み、キービジュアルが読み込まれた時点で表示する。
// スクロールが一番上でなければすべての画像を同時に読み込み、すべて読み込まれた時点で表示する。
var agent = window.navigator.userAgent.toLowerCase();
var sequentiallyLoadFlag = false;

// DOM treeの読み込みが終わった時に実行する処理
document.addEventListener('DOMContentLoaded', function(){
	sequentiallyLoadFlag = ((!sessionStorage.getItem('scrollPosition') || sessionStorage.getItem('scrollPosition')==0));
	if (sequentiallyLoadFlag){
		console.log('sequentially load');
	}else{
		console.log('parallel load');
		setImagesWithoutFirstImage();
	}

	if (!('fonts' in document)) {
		fontsLoadComplete = true;
	}

	// 動画を読み込み終わった時に処理を実行するトリガ
	if(first_video_flag){
		var firstMovieVideo = document.getElementById('firstMovieVideo');
		firstMovieVideo.load();
		firstMovieVideo.addEventListener("loadeddata", videoFirstBackgroundOnloadFunction, false);
	}

	// キービジュアルの読み込みが終わった時に処理を実行するトリガ
	var img_first_background = new Image();
	if (isAvifSupported()) {
		img_first_background.src = globalPrefix + 'img/first_background_h.avif';
	} else {
		img_first_background.src = globalPrefix + 'img/first_background_h.jpg';
	}
	if (img_first_background.complete) {
		imgFirstBackgroundOnloadFunction();
	} else {
		img_first_background.onload = imgFirstBackgroundOnloadFunction;
	}
});

// キー動画が読み込み終わった時に実行する処理
function videoFirstBackgroundOnloadFunction(){
	if (sequentiallyLoadFlag) {
		console.log('videoFirstBackgroundOnload');
		startTransitionAnimeAndSoOn();
		setTimeout(showloadingString, transition_anime_length + first_movie_length);
	}
}

var firstBackgroundLoadComplete = false;
var fontsLoadComplete = false;
// キービジュアルの読み込みが終わった時に実行する処理
function imgFirstBackgroundOnloadFunction(){
	firstBackgroundLoadComplete = true;
	imgFirstBackgroundAndFontsOnloadFunction();
}

// フォントの読み込みが終わった時に実行する処理
if ('fonts' in document) {
	document.fonts.ready.then(function(fontFaceSet) {
		fontsLoadComplete = true;
		imgFirstBackgroundAndFontsOnloadFunction();
	});
}

// キービジュアルとフォントの読み込みが終わった時に実行する処理
function imgFirstBackgroundAndFontsOnloadFunction() {
	if(firstBackgroundLoadComplete && fontsLoadComplete) {
		if(!first_video_flag){
			videoFirstBackgroundOnloadFunction();
		}
		if (sequentiallyLoadFlag) {
			console.log('imgFirstBackgroundAndFontsOnload');
			document.getElementById('loadingString').style.display = "none";
			loadingTransitionAnimeIndexBackgroundTextLoadComplete();
			setImagesWithoutFirstImage();
			setTimeout(showloadingString, background_text_anime_length);
		}
	}
}

// ページ読み込みが全て終わった時に実行する処理
window.onload = function(){
	windowOnLoadFlag = true;
	document.getElementById('loadingString').style.display = "none";
	setLoadedScrollLoadComplete();
	restoreScrollPositionCommonLoadComplete();
	if (!sequentiallyLoadFlag){
		loadingTransitionAnimeIndexBackgroundTextLoadComplete();
		startTransitionAnimeAndSoOn();
	}
	if(!firstBackgroundLoadComplete || !fontsLoadComplete){
		// ブラウザによってはimgFirstBackgroundAndFontsOnloadFunctionが実行されていないので、それ用の処理
		firstBackgroundLoadComplete = true;
		fontsLoadComplete = true;
		imgFirstBackgroundAndFontsOnloadFunction();
	}
	setTwitterScript();
	initYoutubeApi();
}

// IFrame Player API
function onYouTubeIframeAPIReady() {
	// Youtubeプレイヤーを埋め込む
	var player = new YT.Player('youtubeContainer', {
		height: '100%',
		width: '100%',
		videoId: 'Jm_JJ3p4HqM',
		playerVars: {
			'rel': 0,
			'start': 13
		},
		events: {
			'onStateChange': onPlayerStateChange
		}
	});
}

// クリックしたら実行する処理
document.getElementById('headerImg').addEventListener('click', resetLoadingTransitionAnimeIndex);
document.getElementById('returnTopButton').addEventListener('click', resetLoadingTransitionAnimeIndex);
document.getElementById('emptySpace').addEventListener('click', clickEmptySpace);


// 再生ボタンが押されたら実行する処理
function onPlayerStateChange(event) {
	if (event.data == YT.PlayerState.PLAYING) {
		var youtubeSquare = document.getElementById('youtubeSquare');
		youtubeSquare.classList.add('playing');

		youtubeContainer = document.getElementById('youtubeContainer');
		var rect = youtubeContainer.getBoundingClientRect();
		var headerHeight=$('#header').innerHeight();
		if(rect.top < headerHeight || rect.bottom - 10 >= (window.innerHeight || document.documentElement.clientHeight) ){
			var offsetTop = youtubeContainer.getBoundingClientRect().top + window.scrollY;
			window.scrollTo({ top: offsetTop - headerHeight, behavior: 'smooth' });
		}
	}
}

// 画面の大きさを変えたら実行する処理
$(window).resize(function () {
	setPotitionCommon();
	kamishibaiAnime();
	setVideoSource();
});

// 画面をスクロールをしたら実行する処理
$(window).scroll(function () {
	smoothTextAnime();
	cardAnime();
	backgroundImage();
	kamishibaiAnime();
});

// リロード前にスクロール位置を保存する処理
window.addEventListener('beforeunload', function () {
	sessionStorage.setItem('scrollPosition', window.scrollY);
});

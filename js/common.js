// MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM
// MMMMMMMB=OO+zZTMMMMMMMMMMMMM97ro+rVMMMMMMMMMMMMMMMB=zrzuWMMMMMMMMMMMMMMMMMB7ro+rCvMMMMMMMMMMMMMMMMMM
// MMMMM#CrwV7TXXwwoJOVMMMMMME1wXV74XwwrzzZTMMMMMMMBCwwVTUXwJdMMMMMMMMMMMMMMZrwV77TXwZMMMMMMMMMMMMMMMMM
// MMMMBXJwr `   _?70XwOJO7M8rwZ>     ?7TXXwzr?uwswwwX\  -(Zwwwww&JdMMM6r+Jr&w0  ` (XowO+OOzZMMMMMMMMMM
// MM#wJwXT3_-  `      ?7XwrjwVT<~_.  `    _?TXwf^````   ` _````?4kldEowXT7777=    (777777TZw/dMMMMMMMM
// MMR(wr    j&---.   `  .ZwZ\   .G&--_-.     (y>.   `        ` _(yZO2zZ> ```      ``````` -ZruMMMMMMMM
// MMROw[   .(0wXXZA+--__(XrZ; ` ~XwwXXX&--_.-JXk+((((.      ` _(ZZXwzrXl----.` ` ........~(ZwwwCdMMMMM
// MMR(w[   -?TTTXXwvX000VCOZ!   _OTT0uXwvX000V1ZCXVXy:        `    ?4krXXXXZ%   _(^          _TXrZMMMM
// MMRjw[   ```    .7uw.wCZOZ:   ```    ?4XoJOC><wwJwf`  `  .....     jko+(wC  ` -[ ```    ``  (ZO(?MMM
// MMRrwI-           .XwvIozZ{-       `   (Zw(c(OJwf'   ` _JuwZZX&-    XkOwV  ` _JZ&-(((((((((Jw0CZ:?MM
// MMNoOXX&uwXuXA,  ` (XwOjJOXG&uwuuXs,`  -wkCIZjX%     ` ~Xkr+JrXr   _dkwwX. ._J0wwXwwZ7vZ7OZC1wC:~(MM
// MMMN7+Jrz1wwXV'   .J0lZ:1CozrvjwwX=` ` _dXzCOrXn--.  ` ~Zk(jwXY   ._d01JwXXwXXX^  .4XwwwwXZXwI1+:dMM
// MMMMR::j1wV!   ` .(ZZul~Je:(vOwC`  `  _J0CJ<?oJZUXy: ` ~ZkOw0` ` ._J0ZO?C+Jr(dn ```   ~`    jXZIMMMM
// MMMMMNgwrXr.  ._(J0ZwC::JMNJwvZ-  .-_(d0CO>:~N?C+wy_  -~XXJdk-___JX0wJ<::~:?OCXk,_.        .(0wz<MMM
// MMMMMMM#xwXGJJdX0Oov>~:+MMMMs(ZX&J+w0VzoC<~:+MNJz?Zk+(Jd0Cz?ZUkwXUOJC:::+NgJJzrOXus----(((Jd0ZJ>:JMM
// MMMMMMMM#IJOZ7uOJ7<:::+MMMMMMPOJOZ7zOv>:~::+MMMMNerCCwZ7rZ<?z&+r&J>::::jMMMMMN(1OZ7OZVXXOCr1JC<::+MM
// MMMMMMMMMp:<<<::::::+gMMMMMMMN,:<<<::::::+MMMMMMMN/<?<<<:~::_::::::::+MMMMMMMMNx::<?+777<<<:::::+MMM
// MMMMMMMMMMNJ<:::++gMMMMMMMMMMMMmJ::::++gMMMMMMMMMMMg-:::::+dMNJ++++gMMMMMMMMMMMMMaJ(:::::::::++dMMMM
// MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMNNNNNMMMMMMMMMM

// js上の方が調整しやすいオブジェクトの位置を指定する
function setPotitionCommon(){
	var windowWidth = $(window).width();
	var windowHeight = $(window).height();
	var headerHeight = $('#header').innerHeight();
	$('#headerColorGray').css("height", headerHeight);
	$('#body').css("padding-top", headerHeight + "px");
	$('footer').css("top", "0px");
	if( $('footer').offset().top + $('footer').innerHeight() < windowHeight){
		$('footer').css("top", (windowHeight - $('footer').offset().top - $('footer').innerHeight()) + "px");
	}
}

// ---- ロード関連 ----

// ロード後にスクロールできるようにする
function restoreScrollPositionCommon() {
	$('body').removeClass('noScroll');
}

// ロード後のトランジションを動かす
function loadingTransitionAnime() {
	var circleA = document.getElementById('circleA');
	var circleB = document.getElementById('circleB');
	var loadingTransition = document.getElementById('loadingTransition');
	var loading = document.getElementById('loading');
	var backgroundText = document.getElementById('backgroundText');

	circleA.classList.add('circleAppear');
	circleB.classList.add('circleAppear');
	loadingTransition.classList.add('loadingAppear');
	loading.classList.add('loaded');
}

// ---- アニメーション関連 ----

// smoothTriggerにsmoothTextAppearというクラス名を付ける
function smoothTextAnime() {
	$('.smoothTextTrigger').each(function(){
		var elemPos = $(this).offset().top - 50;
		var scroll = $(window).scrollTop();
		var windowHeight = $(window).height();
		if (scroll >= elemPos - windowHeight){
			$(this).addClass('smoothTextAppear');
		}else{
			$(this).removeClass('smoothTextAppear');
		}
	});
}

// cardTriggerにcardAppearというクラス名を付ける
function cardAnime() {
	$('.cardTrigger').each(function() {
		var elemPos = $(this).offset().top + 200;
		var elemHeight = $(this).outerHeight();
		var scroll = $(window).scrollTop();
		var windowHeight = $(window).height();

		if (scroll >= elemPos - elemHeight - windowHeight) {
			$(this).addClass('cardAppear');
		} else {
			$(this).removeClass('cardAppear');
		}
	});

	setTimeout(smoothTextAnime, 800);
}

// ---- TOPに戻る関連 ----

// TOPに戻る
function setScrollTop() {
	window.scrollTo({
		top: 0,
		behavior: 'instant'
	});
}

// アニメーションしながらTOPに戻る
function resetLoadingTransitionAnimeCommon() {
	var circleA = document.getElementById('circleA');
	var circleB = document.getElementById('circleB');
	var loadingTransition = document.getElementById('loadingTransition');

	circleA.classList.remove('circleAppear');
	circleB.classList.remove('circleAppear');
	loadingTransition.classList.remove('loadingAppear');

	circleA.offsetWidth = circleA.offsetWidth;

	circleA.classList.add('circleAppear');
	circleB.classList.add('circleAppear');
	loadingTransition.classList.add('loadingAppear');

	setTimeout(setScrollTop, 1000);
}

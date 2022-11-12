/* @author gorogoronyan 2016-2022/05
  MIT License。流用・改造はご自由に。
 */

var ZIndex_max = 1;

class MouseDrag {

	targetElement = null;  //ドラッグしたい要素
	dragElement = null;    //マウスドラッグに反応する要素
	isMouseDown = false;
	x = 0;                 //要素の左上とマウスの位置の差
	y = 0;

	toString(){
		return "[object MouseDrag]";
	}

	/* 初期化
	@param {HTMLElement} targetElement ドラッグしたい要素
	@param {HTMLElement} dragElement   マウスドラッグに反応する要素

	・ノート
	  画像 (img) の場合は、targetElement と dragElement は同じ。
	  div などの枠だと、ドラッグしたい要素本体と、ドラッグに反応する
	  タイトルバーなどの要素が異なる場合がある。
	 */
	init(targetElement, dragElement){
		//console.log("#init: this="+this);
		this.targetElement = targetElement;
		this.dragElement = dragElement;

		//イベントリスナーをセット
		dragElement.addEventListener("mousedown", event => this.onMouseDown(event));
		dragElement.addEventListener("mousemove", event => this.onMouseMove(event));
		dragElement.addEventListener("mouseup", event => this.onMouseUp(event));
		dragElement.addEventListener("mouseout", event => this.onMouseUp(event));
	}

	onMouseDown(ev){
		//デフォルトの動作を禁止
		//これがないと、たとえば img 要素ではドラッグ＆ドロップ
		//する動作になる。
		ev.preventDefault();

		//this が MouseDrag のオブジェトになっていること
		//console.log("#onMouseDown this:"+this);

		const el = this.targetElement;
		this.isMouseDown = true;
		this.x = ev.pageX - el.offsetLeft;
		this.y = ev.pageY - el.offsetTop;

		el.style.zIndex = ZIndex_max++;
	}

	onMouseMove(ev){
		ev.preventDefault();

		//マウスボタンを押している場合は el の座標を更新
		if (this.isMouseDown){
			const el = this.targetElement;
			el.style.left = (ev.pageX - this.x) +"px";
			el.style.top  = (ev.pageY - this.y) +"px";
		}
	}

	onMouseUp(ev){
		this.isMouseDown = false;
		ev.preventDefault();
	}

	onMouseOut(ev){
		//必要な処理があれば、サブクラスで入れる。
	}
}
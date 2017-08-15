	;(function($){
		$.wmCarousel = function(){
			window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
			function setOpacity(element,level){
				if (element.filters) {
					element.style.filter = "alpha(opacity=" + level + ")"
				}else{
					element.style.opacity = level/100;
				}
			}
			function fadeIn(element){
				element.style.display = "";
				setOpacity(element,0);
				// for (var i = 0; i <= 20; i++) {
				// 	setTimeout(function(x){
				// 		return function(){
				// 			setOpacity(element,x * 5);
				// 			console.log(x);
				// 		}	
				// 	}(i), i * 25);
				// }

				//链式调用法
				// var pos = 0;
				// var timeout = setTimeout(function(){
				// 	if (pos == 100) {
				// 		clearTimeout(timeout);
				// 	}
				// 	else{
				// 		pos = pos + 5;
				// 		setOpacity(element,pos);
				// 		setTimeout(arguments.callee, 25);
				// 	}
				// }, 25);


				//requestAnimationFrame:
				var pos = 0;
				var startTime = Date.now();
				step = function(stamp){
					// pos = pos + 5;
					var nowTime = Date.now();
					pos = (nowTime-startTime)/5;
					setOpacity(element,pos);
					if (pos < 100) {
						requestAnimationFrame(step);
					}
				}
				requestAnimationFrame(step);
			}
			function fadeOut(element){
				// for (var i = 0; i <= 20; i++) {
				// 	setTimeout(function(x){
				// 		return function(){
				// 			setOpacity(element,100 - x * 5);
				// 		}	
				// 	}(i), i * 25);
				// }

				//链式调用法
				// var pos = 100;
				// var timeout = setTimeout(function(){
				// 	if (pos == 0) {
				// 		clearTimeout(timeout);
				// 	}
				// 	else{
				// 		pos = pos - 5;
				// 		setOpacity(element,pos);
				// 		setTimeout(arguments.callee, 25);
				// 	}
				// }, 25);


				////requestAnimationFrame:
				var pos = 100;
				var startTime = Date.now();
				step1 = function(stamp){
					// pos = pos - 5;//以默认的浏览器更新频率来进行
					var nowTime = Date.now();
					pos = 100 - (nowTime-startTime)/5;//可控制时间
					setOpacity(element,pos);
					if (pos > 0) {
						requestAnimationFrame(step1);
					}else{
						element.style.display = "none";
						console.log(element.style);
					}
				}
				requestAnimationFrame(step1);
			}
			 return{
			 	scroll : function(num,wmBanner,list){
			 		self = this;
			 		var targetIdx = 0;//目标图片序号，也就是接下来该显示哪个
			 		var curIdx = 0;//当前图片序号;

			 		//初始化
			 		this.img = $('#' + wmBanner + ' a');
			 		this.list = $('#' + list + ' li');
			 		this.list.eq(0).addClass('on');
			 		this.img.each(function(index, el) {
			 			if (index!= 0) {
			 				setOpacity(el,0);
			 				// console.log(el);//DOM
			 				// console.log($(this));//jQuery对象
			 			}
			 		});

			 		this.list.each(function(index, el) {
			 			$(this).click(function(event) {
			 				self.fade(index,curIdx);
			 				targetIdx = index;
			 				curIdx = index;
			 			});
			 		});


			 		//自动轮播效果
			 		var interv = setInterval(function(){
			 			if (targetIdx < num - 1) {
			 				targetIdx++;
			 			}else{
			 				targetIdx = 0;
			 			}
			 			self.fade(targetIdx,curIdx);
			 			curIdx = targetIdx;
			 		}, 2000);

			 		$('#' + wmBanner).mouseover(function(event) {
			 			clearInterval(interv);
			 		});
			 		$('#' + wmBanner).mouseout(function(event) {
			 			interv = setInterval(function(){
				 			if (targetIdx < num - 1) {
				 				targetIdx++;
				 			}else{
				 				targetIdx = 0;
				 			}
				 			self.fade(targetIdx,curIdx);
				 			curIdx = targetIdx;
				 		}, 2000);
			 		});

			 	},

			 	fade : function(targetIdx,curIdx){
			 		if (targetIdx == curIdx) {
			 			return;
			 		}
			 		var self = this;
			 		fadeOut(self.img[curIdx]);
			 		fadeIn(self.img[targetIdx]);
			 		self.list.each(function(index, el) {
			 			if (index != targetIdx) {
			 				$(this).removeClass('on');
			 			}else{
			 				$(this).addClass('on')
			 			}
			 		});
			 	}
			 }
		}
		
	})(jQuery);


$(document).ready(function(){
		var b = document.getElementsByTagName('body');
		var aud = document.getElementById('myAudio');
		$(window).scrollTop = 0;
		aud.autoplay = true;
		const d = new Date();
		aud.muteSlowly = (fun) => {
				var vol = aud.volume;
				var v = setInterval(function(){
					if(vol > 0)
					{
						vol -= 0.01;
						vol = vol.toFixed(2);
						aud.volume = vol;
					}
					else{
						aud.pause();
						aud.volume = 1;
						fun();
						clearInterval(v)
					}
				},10);
		}


		$('.gift-wrap').click(function(){
			if(d.getDate() > 21){
				$(this).addClass('open');
			}else{
				alert("You are not allowed to open this gift now.");
			}
		})		

		var hearts = () => {
			aud.src = "Happy Birthday.mp3";
			aud.play();
			for (var i = 1; i <= 80; i++) {
				$('.loader-overlay').append('<div class="loader-heart" style="--pt'+i+'">&#x2764;</div>');
			}
			$('.loader-heart').each(function(index){
				$(this).css(
				{
					'transform': 'scale('+Math.random()+')',
					'top': Math.floor((Math.random()*$(window).height())+1),
					'left': Math.floor((Math.random()*$(window).width())+1),
					'--pt':index
				})
			});

			$('.loader-heart').each(function(){
				$(this).addClass('active');
			});
		}
		// hearts();

		var sayHi = () => {
			$('.happy-bday').addClass('active');
		}
		// sayHi();
		
		var slideUp = () => {
			$('.loader-overlay').removeClass('show');
			$('.love').addClass('animate');
		}

		var carousel = () => {
			child=0;
			photos = []

			$(".photo").each(function(){
				photos.push($(this));
			})

			// console.log(photos.length);

			const a = setInterval(function(){
				$('.photos-container').animate({
					scrollLeft: "+=307"
				},2200),"easeInSine";
				// console.log(child,photos.length);
				child += 2;
				if(child >= photos.length - 1)
				{
					clearInterval(a);
				}
			},3000)
		}

		var removeStack = () => {
			stack = []
			$(".stack-photo").each(function(){
				stack.push($(this));
			})

			photo = stack.length;
			var p = setInterval(function(){
				$('.stack-photo:nth-child('+photo+')').addClass('remove');
				if(photo >= 1)
				{
					photo -= 1;
				}else{
					clearInterval(p)
				}
			},5000);
		}
		
		
		var start = () => {
			$('.ball').addClass('animate');
			setTimeout(function(){
				$('.start-btn').css({'visibility':'hidden'});
				setTimeout(function(){
					$('.start-btn,.ball').addClass('d-none');
					hearts();
					setTimeout(function(){
						sayHi();
						setTimeout(function(){
							slideUp();
							aud.src = "02 Dil Diyan Gallan - Tiger Zinda Hai (Atif) 320Kbps.mp3";
							aud.play();
							setTimeout(function(){
								$('.loader-overlay').addClass('d-none');	
								$('.wish').addClass('start');
								setTimeout(function(){
									carousel();
								},3000)
							},1300)
						},4200)
					},16000)
				},3500)
			},1400)
		}

		$('.start-btn').click(function(){
			start();

			var flag = 0;
			$(window).scroll(function(e){
				var scrollTop = $(this).scrollTop() + ($(window).height() / 2);
				if(scrollTop > $('.photo-stack').offset().top && flag == 0){
					removeStack();
					aud.muteSlowly(function(){
						var Vol = aud.volume;
						var p = setInterval(function(){
							if(Vol < 1)
							{
								Vol += 0.01;
								Vol = Vol.toFixed(2);
								aud.volume = Vol;
							}
							else{
								aud.src = "Tu Mileya - Darshan Raval.mp3";
								aud.currentTime = 10;
								aud.volume = 1;
								aud.play();
								clearInterval(p)
							}
						},10);
					});
					flag = 1;
				}else if (scrollTop < $('.photo-stack').offset().top && flag == 1) {
					$(".stack-photo").removeClass('remove');
					aud.muteSlowly(function(){
						var Vol = aud.volume;
						var p = setInterval(function(){
							if(Vol < 1)
							{
								Vol += 0.01;
								Vol = Vol.toFixed(2);
								aud.volume = Vol;
							}
							else{
								aud.src = "02 Dil Diyan Gallan - Tiger Zinda Hai (Atif) 320Kbps.mp3";
								aud.volume = 1;
								aud.play();
								clearInterval(p)
							}
						},10);
					});
					flag = 0;
				}
			})

		})

		
	})
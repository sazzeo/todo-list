


	//배경 받아오기
	let getBackgroundImg = async function() {
		
		let preBackground = JSON.parse(localStorage.getItem('bg-log'));
		let nowDate = new Date();
		
		if(preBackground && Date.parse(preBackground.expireOn) > Date.parse(nowDate)) {
			console.dir("동작");
			console.dir(preBackground.imgInfo);
			return preBackground.imgInfo;
			
		}
		
	
		
		let placeImg = await photoApi(); //await안 붙이면 에러나는 이유-> await는 함수실행이 끝날 때까지 멈추지만
										//안붙이면 멈추지 않음 
										//그래서 바로 밑줄로 내려가버려서 실행 에러나는 것.
		
		//background정보를 로컬 스토리지에 담는 함수
		insertBackgroundLog(placeImg);
		
		
		return placeImg;
	 	
	
		 
	}
	
	
	let photoApi = async ()=> {
		
		
		let url = "https://api.unsplash.com/photos/random?orientation=landscape&query=landscape";
		let response = await fetch(encodeURI(url) , {
		
		method : 'GET',
		headers: {
			'Authorization' : 'Client-ID ssxmMGpHZ_CoZnhTjUPGkx375rfCod3KMjbodQZ25VA'
		}
		
	 	})  //await: 프로미스 객체를 실행(then시킴)해서 반환값으로 resolve값 담아줌.
			
	 	let result = await response.json();  //받은 json객체를 읽을 수 있도록 만들어줌

		let placeImg = {
				url : result.urls.raw,
				place: result.user.location
				
		};
		
		return placeImg;
		
		
	}
	
	
	
	
	
	
	
	//날짜 구해서 로컬 스토리지에 저장하기
	let insertBackgroundLog = (placeImg) => {
		
		//오늘 날짜 구하기
		let expirationDate = new Date();
		expirationDate.setMinutes(expirationDate.getMinutes()+1);
		
		
		const backgroundLog = {
				expireOn: expirationDate,
				imgInfo : placeImg	
				
		}
		
		
		
		localStorage.setItem('bg-log' , JSON.stringify(backgroundLog));
		
		
	}

	
	
	
	
	//현재 좌표 추출 해주는 프로미스 객체
	let getCoords = function() {
		

		let Position = new Promise(function(resolve, reject ) {
			
			navigator.geolocation.getCurrentPosition(e=>{
				resolve(e.coords);

			});
			
			
		});
		
		

		
		return Position;
			
		

	}
	
	
	
	//날씨 정보 받아오는 async함수
	let setCurrentPositionInfo = async function() {
		
		let coords = await getCoords();		
		
		const apiKey = "90ad8fb29a1dfcdd49a5116d93cab3a0";
		let url = `https://api.openweathermap.org/data/2.5/weather?lat=${coords.latitude}&lon=${coords.longitude}&appid=${apiKey}&units=metric&lang=kr`;
		let response = await fetch(url);
		
		let res = await response.json();
		
		let weatherInfo = {
				
				temp : res.main.temp,
				name : res.name,
				weather: res.weather[0].description
				
		}
		
		return weatherInfo;
		
		
		
	}
	

	
	
	//로드되면 실행할거 최종 합치기 
	  // -어싱크랑 어싱크 합치기 가능함.
	let load = async function() {
	
		
		//배경 바꾸기
		let backImage = await getBackgroundImg();   //어싱크 함수
		console.dir(backImage.url);
		document.querySelector('.wrap').style.backgroundImage = `url(${backImage.url})`;
		document.querySelector('.foot>div').innerHTML = backImage.place;
		
		//날씨 불러오기
		let weather = await setCurrentPositionInfo(); //어싱크함수
		document.querySelector('.location > div').innerHTML = weather.name+" "+ Math.floor(weather.temp) +"°C " + weather.weather;
	 
	}
	
	
	load();
	
	
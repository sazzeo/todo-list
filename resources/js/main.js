/**
 * 
 */


//todo-list의 메인 함수


let renderCurrentTime = () => {
	
	
	let now = new Date();
	
	let hours = now.getHours();
	let minutes = now.getMinutes();
	let seconds = now.getSeconds();
	
	if(seconds <10 ){
		seconds = "0"+seconds;
		
	}
	minutes = minutes <10 ? "0"+ minutes: minutes;
	hours = hours <10 ? "0"+ hours: hours;
	
	document.querySelector('#date').innerHTML = `${hours}시 ${minutes}분 ${seconds}초`;
	
	
};



let convertUserName = function(name) {
	
	let frm_todo = document.querySelector('.frm_todo');
	let impName = document.querySelector('#name_box');
	let userName = name;
	
	document.querySelector('#userName').innerHTML =name;
	
	
	impName.value = "";
	impName.placeholder = '할일을 입력하세요.';
	frm_todo.className = "todo";
	impName.id ="todo_box";
	

	document.querySelector('.list_box').style.display = "block";
	let schedule = JSON.parse(localStorage.getItem('todolist'));
	console.dir(schedule);
	if(schedule) {
		
		renderSchedule(schedule);	
		
	}
	
	document.querySelector('.todo').addEventListener('submit' , addTodo );
	
};



let renderUser = (e) => {
	
	e.preventDefault(); //기본 이벤트 중지 
	//현재 폼태그에는 기본적으로 새로고침 이벤트가 있음 이를 막으려고 쓰는 것.
	
	let userName = document.querySelector('#name_box').value;
	convertUserName(userName);

	 localStorage.setItem('username' , userName);
	 //유저네임 로컬스토리지에 저장
	

	
};


let todoList =[] 
if(JSON.parse(localStorage.getItem('todolist'))) {
	
	todoList = 
		JSON.parse(localStorage.getItem('todolist'));
}


//엔터치면 todolist 추가되는 함수
let addTodo = (e) => {

	e.preventDefault();
	
	console.dir("이거 실행");
	let todoBox = document.querySelector('#todo_box');
	//-----------------------------------확장: 언제 추가했는지 시간 남기는 기능
	todoBoxValue = todoBox.value;
	todoBox.value = "";
	
	
	
	let schedule = JSON.parse(localStorage.getItem('todolist'));

	todoList.push(todoBoxValue);
	
	localStorage.setItem('todolist' , JSON.stringify(todoList)); //배열이므로 stringify 써줘야 함. 
	
	madeDiv(todoBoxValue);
	document.querySelector('.list_box').scrollTop = document.querySelector('.list_box').scrollHeight;
	console.dir(document.querySelector('.list_box').scrollHeight); //현재 높이값
	console.dir(document.querySelector('.list_box').scrollTop); //현재 스크롤 위치
	
	
}


//스토리지 정보 받아와서 스케쥴 디브 만드는 함수
let renderSchedule = function (schedule) {
	
	console.dir(schedule);
	
	
	schedule.forEach(function(e) {
		
		madeDiv(e);
		
		
	});
	
	
	
};


//스케쥴 디브 만들기
let madeDiv = function(todo) {
	
	let todoDiv = document.createElement('div');
	todoDiv.innerHTML = todo;
	

	let deleteDiv = document.createElement('div');
	deleteDiv.setAttribute('class','delete');
	deleteDiv.setAttribute('onclick','deleteSchedule(this)');
	deleteDiv.innerHTML = `<i class="fas fa-trash-alt"></i>`;
	todoDiv.append(deleteDiv);
	
	
	document.querySelector('.list_box').append(todoDiv);

	
	
};



let deleteSchedule = function (e) {

	
	document.querySelectorAll('.list_box>div').forEach(function(ee,i) {
		
		if(ee == e.parentElement) {
	

			let schedule = JSON.parse(localStorage.getItem('todolist'));
			schedule.pop();
			localStorage.setItem('todolist',JSON.stringify(schedule));

		}	
		
		
	});
	
	e.parentElement.remove();


};



//즉시 실행함수
(()=>{
	
	console.dir("즉시 실행함수");
	let timer = setInterval( renderCurrentTime, 1000);

	
	//만약 스토리지에 이름이있으면?
	let userNameStorage = localStorage.getItem('username');
	if(userNameStorage) {

		convertUserName(userNameStorage);  //원래 스토리지에 저장되어있는 이름 가져오기
		document.querySelector('.todo').addEventListener('submit' , addTodo );  //바뀐 클래스로 이벤트 걸기
		
	//스토리지에 이름이 없으면?	
	}else {
	//폼태그가 submit시 일어나는 이벤트
	document.querySelector('.frm_todo').addEventListener('submit' , renderUser );
	
	
	}
	
	
})();







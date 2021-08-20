/**
 * 
 */


let $ = (tag, con , style) => {
	
	
	let e = document.querySelector(tag);
	
	
	if(con) {
	e.innerHTML += `${con}<br>`; 
	}
	
	
	if(style) {
		style(e);
		
	}
	
	return e;
	
}





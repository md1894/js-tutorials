function fetch_data(){
	return new Promise((resolve, reject)=>{
		console.log('sending!!!');
		setTimeout(()=>{
			console.log('response came from server after some time');
			// if this function is called , callback function passed in 'then' gets called			
			//resolve(); 
			reject('server error 404'); // if this function is called , callback function passed in 'catch' gets called
		},5000);
	});
}

console.log('regular line 1');
console.log('regular line 2');
fetch_data().then(()=>{
	console.log('promise fullfilled');
}).catch((error)=>{
	console.log('promise failed :: error :: '+error);
});

console.log('regular line 3');
console.log('regular line 4');
console.log('regular line 5');
console.log('regular line 6');
console.log('regular line 7');

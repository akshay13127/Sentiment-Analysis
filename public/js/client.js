try{
	particlesJS.load('particles-js', 'assets/particles.json', function() {
	  console.log('callback - particles.js config loaded');
	});
}
catch(e){
	console.log("error loading particles-js");
}

const btn1 = document.querySelector('.button1');
const btn2 = document.querySelector('.button2');

btn1.addEventListener("click",sAnalyze );
btn2.addEventListener("click",tAnalyze);

function sAnalyze(){
	document.querySelector('#category').value="";
	document.querySelector('#count').value="";

	let query = document.querySelector('#string');
	reqBody={
		query: query.value,
	}

	if(query.value!="")
	{
		fetch("/home",{
			method:"POST",  //put,,get,post,delete
			headers: {
	                "Content-Type": "application/json; charset=utf-8"
	        },
	        body: JSON.stringify(reqBody)
		})
		.then(res=> res.json()) //parses response to json
    	.then(data=>{console.log(data); displayOutput([data]) })
    	.catch(err=>console.log(err))
    }
	
}

function tAnalyze(){
	document.querySelector('#string').value="";

	let category = document.querySelector('#category');
	let count = document.querySelector('#count');
	
	if(category.value =="") category.value= "OMG" ;
	if(count.value=="") count.value = 1;
	if(count.value>=10) count.value = 10;
	if(count.value<=0) count.value = 1;

	reqBody={
		category:category.value,
		count: count.value
	}

	fetch("/home",{
			method:"POST",  //put,,get,post,delete
			headers: {
	                "Content-Type": "application/json",
	                "Access-Control-Allow-Origin":"*",
	                "Access-Control-Allow-Credentials":true
	        },
	        body: JSON.stringify(reqBody)
		})
		.then(res=> res.json()) //parses response to json
    	.then(data=>{ console.log(data) ; displayOutput(data);})
    	.catch(err=> console.log(err))


}

function displayOutput(data){
	var out = document.querySelector('.output');
	out.innerHTML = "";
	var div = document.createElement('div');
	var a = `
			<table class="table table-bordered table-hover">
			<tr>
				<th>#</th>
				<th>Sentence</th>
				<th>Result</th>
				<th>Score</th>
				<th>Comparitive</th>
			</tr>`

	var b = '';var i=1;
	data.forEach(data=>{
		let r='';
		if(data.score > 0) r= 'Positive';
		if(data.score < 0) r= 'Negative';
		if(data.score == 0) r= 'Neutral';
		b+=`<tr>
				<td>${i}</td>
				<td>${data.tokens.join(" ")}</td>
				<td>${r}</td>
				<td>${data.score}</td>
				<td>${data.comparative.toFixed(4)}</td>
			</tr>`;
		i++;
	})	
	 c=`</table>`
	 div.innerHTML = a + b + c
	
	out.appendChild(div);

}
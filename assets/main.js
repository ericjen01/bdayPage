let url = "https://script.google.com/macros/s/AKfycbxDAQIcfmUSAqKTJcKsyNKQZKyiyIWx_yWxP-uVPBQfYIcw8KIge2Lri-nqlxHPicQU8Q/exec"; //end-point url that we can send text requests to, using the GET request
const myForm = document.querySelector(".form");
const myEmail = document.querySelector("#email");
const myMessage = document.querySelector("#message");
const subBtn = document.querySelector(".subBtn");

myForm.addEventListener("submit", submitter);

function submitter(e) {
	console.log("submitted");
	e.preventDefault(); //stop the form from actually submitting, so we can select the contents in the form
	subBtn.disabled = true; //allows the end user submit once and the button is disabled when submit is clicked.
	subBtn.style.color = "grey";
	subBtn.style.boxShadow = "inset 2px 2px 10px 3px grey";
	subBtn.style.cursor = "default";

	let message = ""; // "" = undefined

	if (myEmail.value.length < 5 || myEmail.value == "your email *required") {
		myEmail.style.borderColor = "yellow";
		message += `<br> Please enter a valid email.`;
	}
	if (myMessage.value.length < 5 || myMessage.value == "your message *required") {
		myMessage.style.borderColor = "yellow";
		message += `<br> Please enter a valid code.`;
	}
	if (message) {
		//if there's an error message,
		const div = document.createElement("div");
		div.innerHTML = message;
		div.style.color = "yellow";
		myForm.append(div);
		setTimeout(() => {
			div.remove();
			myEmail.style.borderColor = "";
		}, 1500);
		setTimeout(() => {
			subBtn.disabled = false;
			subBtn.style.color = "white";
			subBtn.style.boxShadow = "";
			subBtn.style.cursor = "";
		}, 1500);
	} else {
		//if there's no error message, then we can submit the content
		const myObj = {
			email: myEmail.value,
			message: myMessage.value,
		};
		// myForm.style.display = "none"; // the form gets hidden once it's send
		addSendMail(myObj); //function handles request to the end point, sends over the object data
	}
}

//create a function that send over the object data, send the email object of the data.

//function (below) handles request to the end point, sends over the object data
//fetch request to the url. by default it's gonna be a GET request
//once we retreat back the response as an object within the fetch request we covert it to the json format
//then we output the result as the data response in json format
function addSendMail(data) {
	const repDiv = document.createElement("div");
	repDiv.className = "res";
	repDiv.textContent = "Your input is being submitted....";
	myForm.append(repDiv);
	fetch(url, {
		//by default it's going to make a GET request, we gonna make it a post request =>
		method: "POST",
		body: JSON.stringify(data), //Within the post we want to send the body of content, which is coming from the data, JSON.stringify(data)
	})
		.then((res) => res.json()) //once we retrieve the data response, it's going to come back as an object
		.then((json) => {
			//we going to convert the object content to the json format
			console.log(json); //then we going output it to console
			if (json.rowval) {
				//if the email gone through (new row created) we throw a response
				repDiv.innerHTML = "&#128155 Hi Pacco I'll send the gift to you soon! Love ya! &#128155";
			} else {
				repDiv.remove();
				subBtn.disabled = false;
				myForm.style.display = "block";
			}
		});
}

function addSendMailGET(data) {
	const url1 = url + "?id=100";
	fetch(url1)
		.then((res) => res.json())
		.then((json) => {
			console.log(json);
			if (json.rowVal) {
				//if the email gone through (new row created) we throw a response
				repDiv.textContent = `Your message has been sent. Thank you.`;
			} else {
				repDiv.remove();
				subBtn.disabled = false;
				myForm.style.display = "block";
			}
		});
}

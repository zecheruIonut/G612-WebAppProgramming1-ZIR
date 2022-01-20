const endpoint = "http://localhost:3013/api/sign-in"
const homePageUrl = './user_home_signin.html'

function success(response) {
    if (!response.ok) {
        throw response;
    }
    return response;
}

function onSuccess(response) {
    localStorage.setItem('user_email',document.getElementsByName("user_email")[0].value);
    window.location.href = homePageUrl;
}

function onFailure(response) {
    return response.json().then(error);
}

function error(response) {
    const errorParagraph = document.getElementsByName("errorParagraph")[0];

    if (!errorParagraph) {
        const body = document.getElementsByTagName("body")[0];
        const errorDiv = document.createElement("div");
        const errorPar = document.createElement("p");
        errorPar.innerText = response.error;
        errorPar.setAttribute("name", "errorParagraph");
        errorDiv.appendChild(errorPar);
        body.appendChild(errorDiv);
    } else {
        errorParagraph.innerText = response.error;
    }
}

function signin() {
    // preluam informatiile din formular 
    const payload = {
        "user_email": document.getElementsByName("user_email")[0].value,
        "user_password": document.getElementsByName("user_password")[0].value
    }

    // initializam parametrii pt un request POST 
    const params = {
        body: JSON.stringify(payload),
        method: "POST",
        mode: "cors",
        headers: {
            "Content-Type": "application/json"
        }
    };

    // efectual requestul 
    fetch(endpoint, params)
        .then(success)
        .then(onSuccess, onFailure)
        .catch(error);


}




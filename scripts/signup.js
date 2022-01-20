const endpoint = "http://localhost:3013/api/sign-up"
const homePageUrl = './user_home_signup.html'

function success(response) {
    if (!response.ok) {
        throw response;
    }
    return response;
}

function onSuccess(response) {
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

function signup() {
    // preluam informatiile din formular
    const payload = {
        "user_name": document.getElementsByName("user_name")[0].value,
        "user_email": document.getElementsByName("user_email")[0].value,
        "user_password": document.getElementsByName("user_password")[0].value,
        "user_age": document.getElementsByName("user_age")[0].value,
        "user_gender": document.getElementsByName("user_gender")[0].value,
        "user_phone_number": document.getElementsByName("user_phone_number")[0].value,
        "user_weight": document.getElementsByName("user_weight")[0].value,
        "user_activity_level": document.getElementsByName("user_activity_level")[0].value
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
    localStorage.setItem("user_email",document.getElementsByName("user_email")[0].value)
    localStorage.setItem("user_name",document.getElementsByName("user_name")[0].value);
    localStorage.setItem("user_age",document.getElementsByName("user_age")[0].value);
    localStorage.setItem("user_gender",document.getElementsByName("user_gender")[0].value);
    localStorage.setItem("user_weight",document.getElementsByName("user_weight")[0].value);
    localStorage.setItem("user_activity_level",document.getElementsByName("user_activity_level")[0].value);
}
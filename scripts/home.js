
function showData() {
    endpoint = "http://localhost:3013/user-data"
    params = {
        method: "GET",
        mode: "cors",
        headers: {
            "Content-Type": "application/json",
        }
    }
    fetch(endpoint, params)
        .then(success)
        .then(onSuccess, onFailure)
        .catch(error);
}


function success(response){
    if(!response.ok)
    {
        throw response;
    }
    return response;
}

function onSuccess(response){
    return response.json().then(displaySuccessResponse);
}

function onFailure(response){

}

function error(response){

}

function displaySuccessResponse(response){
    console.log(displaySuccessResponse);
}

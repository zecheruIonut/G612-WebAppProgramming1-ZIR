// atm it enters in an infinite loop so it's not working
// properly atm
//document.location.reload();

function getUserData() {
    endpoint = "http://localhost:3013/user-data"
    const payload = {
        "user_email": localStorage.user_email
    }
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
function onSuccessDel(){

}

function onSuccess(response){
    return response.json().then(initializeLocal);
}

function onFailure(response){
    console.log(response);
}

function error(response){
    console.log(response);
}

function initializeLocal(response){
    localStorage.setItem("user_name",response.user_name);
    localStorage.setItem("user_age",response.user_age);
    localStorage.setItem("user_gender",response.user_gender);
    localStorage.setItem("user_weight",response.user_weight);
    localStorage.setItem("user_activity_level",response.user_activity_level);
    localStorage.setItem("user_height",response.user_height);
}


// sets in local storage the amount of calories based on user goal
// if said goal is to maintain your current body weight
// the app should show you the maintain_cal value
function calories(){
    //tee stands for total energy expenditure
    //if said energy expenditure level is equal to the
    //intake one, the individual will maintain his current body weight
    var tee_male = 0;
    var tee_female = 0;

    if(localStorage.user_gender=="Male" || localStorage.user_gender=="male"){
        tee_male = 864-9.72*localStorage.user_age+localStorage.user_activity_level*(14,2*localStorage.user_weight+503*localStorage.user_height);
        var cal = parseInt(tee_male/100);
        localStorage.setItem("tee",cal);
        localStorage.setItem("bulk_cal",cal+300);
        localStorage.setItem("deficit_cal",cal-200);
    }
    if(localStorage.user_gender=="Female" || localStorage.user_gender=="female"){
        tee_female = 387-7.31*localStorage.user_age+localStorage.user_activity_level*(10.9*localStorage.user_weight+660*localStorage.user_height);
        var cal = parseInt(tee_female/100);
        localStorage.setItem("tee",cal);
        localStorage.setItem("bulk_cal",cal+300);
        localStorage.setItem("deficit_cal",cal-200);
    }
}

function deleteUser(){
    endpoint = "http://localhost:3013/delete"
    const payload = { "user_name" : localStorage.user_name
    }
    params = {
        body: JSON.stringify(payload),
        method: "POST",
        mode: "cors",
        headers: {
            "Content-Type": "application/json",
        }
    }
    fetch(endpoint, params)
        .then(success)
        .then(onSuccessDel, onFailure)
        .catch(error);
}

try{
    // for the moment it is better imo to let this autoexecute rather than
    // creating another script file just for the sign in -> home page transition
    getUserData();
    calories();
}catch(error){
    calories();
    console.log(error);
}
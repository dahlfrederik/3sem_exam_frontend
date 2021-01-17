import SERVER_URL from "../util/Settings";

function addDog(dog) {
    const options = makeOptions("POST",dog)
    return fetch(SERVER_URL + "/api/dogs", options)
    .then(handleHttpErrors)
    .catch(err =>{
        if(err.status){
          err.fullError.then(e=>
            console.log(e.message),
            
            )
        }
        else{ console.log("Network error"); }
     })
    }
function getAllUsersDogs(userName){
    return fetch(SERVER_URL + "/api/dogs/" + userName)
    .then(handleHttpErrors)
    .catch((err) => {
      if (err.status) {
        err.fullError.then((e) => console.log(e.message));
      } else {
        console.log("Network error");
      }
    });
}

function getAllDogBreeds(){
    return fetch(SERVER_URL + "/api/breed")
    .then(handleHttpErrors)
    .catch((err) => {
      if (err.status) {
        err.fullError.then((e) => console.log(e.message));
      } else {
        console.log("Network error");
      }
    });
}

function getFactsAboutDog(dogbreed){
    return fetch(SERVER_URL + "/api/breed/" + dogbreed)
    .then(handleHttpErrors)
    .catch((err) => {
      if (err.status) {
        err.fullError.then((e) => console.log(e.message));
      } else {
        console.log("Network error");
      }
    });
}

function getSearchesForSpecificBreed(dogbreed){
    return fetch(SERVER_URL + "/api/breed/searches/" + dogbreed)
    .then(handleHttpErrors)
    .catch((err) => {
      if (err.status) {
        err.fullError.then((e) => console.log(e.message));
      } else {
        console.log("Network error");
      }
    });
}

function getAllSearches(){
    return fetch(SERVER_URL + "/api/breed/searches")
    .then(handleHttpErrors)
    .catch((err) => {
      if (err.status) {
        err.fullError.then((e) => console.log(e.message));
      } else {
        console.log("Network error");
      }
    });
}



    const dogFacade = {
        addDog,
        getAllUsersDogs,
        getAllDogBreeds,
        getFactsAboutDog,
        getAllSearches,
        getSearchesForSpecificBreed
    }    

    function makeOptions(method, body) {
        var opts =  {
          method: method,
          headers: {
            "Content-type": "application/json",
            "Accept": "application/json"
          }
        }
        if(body){
          opts.body = JSON.stringify(body);
        }
        return opts;
       }
       
       function handleHttpErrors(res){
        if(!res.ok){
          return Promise.reject({status: res.status, fullError: res.json() })
        }
        return res.json();
       }
       
    
    export default dogFacade;
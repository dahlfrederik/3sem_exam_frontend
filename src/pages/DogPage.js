import dogFacade from "../api/dogFacade";
import React, { useState, useEffect } from "react";

export default function Dogs({ isLoggedIn, user }) {
  const init = {
    dogName: "",
    age: "",
    breed: "",
    info: "",
    userName: user.username,
  };

  const [dogInfo, setDogInfo] = useState(init);

  const onChange = (evt) => {
    setDogInfo({
      ...dogInfo,
      [evt.target.id]: evt.target.value,
    });
    console.log(dogInfo);
  };

  const addDog = (e) => {
    e.preventDefault();
    dogFacade.addDog(dogInfo);
    console.log("I ADD DOG METODEN HER");
  };

  return (
    <div className="container-fluid padding">
      <div className="row">
        <div className="col-3"></div>
        <div className="col-6 text-center">
          <h2 className="text-center mt-5 mb-2">Your own dog page</h2>
          <h3 className="text-center mt-5 mb-2">
            Here you can add your own dogs to your account{" "}
          </h3>
          {isLoggedIn && (
            <div className="mt-5">
              <p>*******************</p>
              <h4>Add a dog to your own personal doglist</h4>
              <div>
                <form onChange={onChange}>
                  <input className="mb-2" placeholder="Name" id="dogName" />
                  <input className="mb-2" placeholder="Age" id="age" />
                  <input className="mb-2" placeholder="Breed" id="breed" />
                  <input className="mb-2" placeholder="Info" id="info" />
                  <button onClick={addDog}>Add dog to your dog list</button>
                </form>
              </div>
              <p>*******************</p>
            </div>
          )}
          <div className="col-3"></div>
        </div>
      </div>
    </div>
  );
}

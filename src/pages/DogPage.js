import dogFacade from "../api/dogFacade";
import React, { useState, useEffect } from "react";

export default function Dogs({ isLoggedIn, user }) {
  let username = isLoggedIn ? `${user.username}` : "";
  const init = {
    dogName: "",
    age: "",
    breed: "",
    info: "",
    userName: username,
  };

  const [dogInfo, setDogInfo] = useState(init);
  const [myDogs, setMyDogs] = useState([init]);

  const fetchData = () => {
    dogFacade.getAllUsersDogs(username).then((data) => setMyDogs(data));
  };

  const onChange = (evt) => {
    setDogInfo({
      ...dogInfo,
      [evt.target.id]: evt.target.value,
    });
  };

  const addDog = (e) => {
    e.preventDefault();
    dogFacade.addDog(dogInfo);
  };

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div className="container-fluid padding">
      <div className="row">
        <div className="col-3"></div>
        <div className="col-6 text-center">
          <h2 className="text-center mt-5 mb-2">Your own dog page</h2>
          <h3 className="text-center mt-5 mb-2">
            If you are loggedin there will be an overview of your dogs:
          </h3>
          {isLoggedIn && (
            <div className="mt-5">
              <p>Overview of all your dogs</p>
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">Dog name</th>
                    <th scope="col">Age</th>
                    <th scope="col">Breed </th>
                    <th scope="col">Info </th>
                    <th scope="col">Owner </th>
                  </tr>
                </thead>
                <tbody>
                  {myDogs.map((m) => (
                    <tr key={m.dogName}>
                      <td>{m.dogName}</td>
                      <td>{m.age}</td>
                      <td>{m.breed}</td>
                      <td>{m.info}</td>
                      <td>{m.userName}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

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
            </div>
          )}
          <div className="col-3"></div>
        </div>
      </div>
    </div>
  );
}

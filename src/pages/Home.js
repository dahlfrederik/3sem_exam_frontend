import dogFacade from "../api/dogFacade";
import React, { useState, useEffect } from "react";
import Select from "react-select";

export default function Home() {
  const init = [{ breed: "" }];
  const [breedName, setBreedName] = useState("boxer");

  const [dogInfo, setDogInfo] = useState(init);
  const [selectedDog, setSelectedDog] = useState({
    breed: "",
    info: "",
    wikipedia: "",
    image: "",
    facts: [""],
  });

  const fetchData = () => {
    dogFacade.getAllDogBreeds().then((data) => setDogInfo(data.dogs));
  };

  useEffect(() => {
    fetchData();
  }, []);

  const options = dogInfo.map((item) => {
    return {
      value: item.breed,
      label: item.breed,
    };
  });

  const fetchDataAboutDogBreed = (breedName) => {
    dogFacade.getFactsAboutDog(breedName).then((data) => setSelectedDog(data));
  };

  const onChange = (evt) => {
    setBreedName(evt.value);
    console.log(selectedDog);
    console.log(breedName);
  };

  useEffect(() => {
    fetchDataAboutDogBreed(breedName);
  }, [breedName]);

  return (
    <div className="container-fluid padding">
      <div className="row">
        <div className="col-2"></div>
        <div className="col-6 text-center">
          <h2 className="mt-5">DOG WEBPAGE</h2>
          <p>This page will contain a lot of information about dogs</p>
          <p>You can even add your own dogs if you are logged in!</p>
          <h3>Use the toogle to see all dog breeds</h3>
          <Select options={options} onChange={onChange} />
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Breed</th>
                <th scope="col">Info</th>
                <th scope="col">Wiki </th>
                <th scope="col">Image </th>
                <th scope="col">Facts </th>
              </tr>
            </thead>
            <tbody>
              <tr key={selectedDog.breed}>
                <td>{selectedDog.breed}</td>
                <td>{selectedDog.info}</td>
                <td>{selectedDog.wikipedia}</td>
                <td>
                  <img src={selectedDog.image} alt={selectedDog.breed}></img>
                </td>
                <td>{selectedDog.facts}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="col-2"></div>
      </div>
    </div>
  );
}

import dogFacade from "../api/dogFacade";
import React, { useState, useEffect, Component, Fragment } from "react";
import Select from "react-select";

export default function Home() {
  const init = [{ breed: "" }];

  const [dogInfo, setDogInfo] = useState(init);
  const [dogInfoForSelect, setDogInfoForSelect] = useState(init);

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

  return (
    <div className="container-fluid padding">
      <div className="row">
        <div className="col-3"></div>
        <div className="col-6 text-center">
          <h2 className="mt-5">DOG WEBPAGE</h2>
          <p>This page will contain a lot of information about dogs</p>
          <p>You can even add your own dogs if you are logged in!</p>
          <h3>Use the toogle to see all dog breeds</h3>
          <Select options={options} />

          <div className="col-3"></div>
        </div>
      </div>
    </div>
  );
}

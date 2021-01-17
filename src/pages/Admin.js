import dogFacade from "../api/dogFacade";
import React, { useState, useEffect } from "react";

export default function Admin() {
  const init = [{ timeStampForSearch: "", breedName: "" }];
  const [breed, setBreed] = useState("");
  const [searchForAll, setSearchForAll] = useState(init);

  const [searchForSpecificBreed, setSearchForSpecificBreed] = useState(init);

  const fetchDataForAll = () => {
    dogFacade.getAllSearches().then((data) => setSearchForAll(data));
  };

  const fetchDataForSpecificBreed = (e) => {
    e.preventDefault();
    dogFacade
      .getSearchesForSpecificBreed(breed)
      .then((data) => setSearchForSpecificBreed(data));
    console.log(breed);
    console.log(searchForSpecificBreed);
  };

  useEffect(() => {
    fetchDataForAll();
  }, []);

  const onChange = (evt) => {
    setBreed(evt.target.value);
  };

  return (
    <div className="container-fluid padding">
      <div className="row">
        <div className="col-3"></div>
        <div className="col-6 text-center">
          <h2 className="mt-5">Secure page</h2>
          <h4>
            Since you are seeing this you are an admin, on this page there will
            be some statistics from searches on the webpage
          </h4>
          <h3> Data from all searches:</h3>
          <p>There is {searchForAll.length} searches in the entire database</p>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Dog breed</th>
                <th scope="col">Timestamp</th>
              </tr>
            </thead>
            <tbody>
              {searchForAll.map((m) => (
                <tr key={m.timeStampForSearch}>
                  <td>{m.breedName}</td>
                  <td>{m.timeStampForSearch}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <h3>Find specific search data here</h3>
          <h4>Insert breed name of the breed you wanna find more info about</h4>
          <form onChange={onChange}>
            <input className="mb-2" placeholder="Breed" id="breed" />
            <button onClick={fetchDataForSpecificBreed}>Find searchdata</button>
          </form>
          <h3> Data for din søgning vil fremgå her: </h3>

          <table className="table">
            <thead>
              <tr>
                <th scope="col">Dog breed</th>
                <th scope="col">Timestamp</th>
                <th scope="col">Amount of searches</th>
              </tr>
            </thead>
            <tbody>
              {searchForSpecificBreed.map((m) => (
                <tr key={m.timeStampForSearch}>
                  <td>{m.breedName}</td>
                  <td>{m.timeStampForSearch}</td>
                  <td>{searchForSpecificBreed.length}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="col-3"></div>
        </div>
      </div>
    </div>
  );
}

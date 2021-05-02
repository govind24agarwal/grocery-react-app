import { useState, useEffect } from "react";
import List from "./List";
function App() {
  const [name, setName] = useState("");
  const [list, setList] = useState([]);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name) {
      //code here
    } else {
      const newItem = { id: new Date().getTime().toString(), label: name };
      setList((oldList) => {
        return [...oldList, newItem];
      });
      setName("");
    }
  };
  return (
    <section className="section-center">
      <form className="grocery-form" onSubmit={handleSubmit}>
        <h3>Grocery list</h3>
        <div className="form-control">
          <input
            className="grocery"
            type="text"
            name=""
            placeholder="eg: milk"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button className="submit-btn" type="subit">
            add item
          </button>
        </div>
      </form>
      <List data={list} />
    </section>
  );
}

export default App;

import { useState, useEffect } from "react";
import List from "./List";
function App() {
  const [name, setName] = useState("");
  const [list, setList] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  //add items
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name) {
      //code here
    } else if (isEditing) {
      setList((oldList) =>
        list.map((item) => {
          const { id } = item;
          if (id === editId) return { id: editId, label: name };
          return item;
        })
      );
      setName("");
      setEditId(null);
      setIsEditing(false);
    } else {
      const newItem = { id: new Date().getTime().toString(), label: name };
      setList((oldList) => {
        return [...oldList, newItem];
      });
      setName("");
    }
  };
  //remove items
  const removeItem = (id) => {
    setList((oldList) => oldList.filter((item) => item.id !== id));
  };

  //edit item
  const editItem = (id) => {
    const ourItem = list.find((item) => item.id === id);
    setIsEditing(true);
    setEditId(id);
    setName(ourItem.label);
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
            {isEditing ? "edit item" : "add item"}
          </button>
        </div>
      </form>
      <List data={list} removeItem={removeItem} editItem={editItem} />
    </section>
  );
}

export default App;

import { useState, useEffect } from "react";
import List from "./List";
import Alert from "./Alert";

const getLocalStorage = () => {
  let list = localStorage.getItem("list");
  if (list) return JSON.parse(list);
  return [];
};

function App() {
  const [name, setName] = useState("");
  const [list, setList] = useState(getLocalStorage());
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [alert, setAlert] = useState({ show: false, type: "", msg: "" });
  //add items
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name) {
      showAlert(true, "danger", "please enter name of your grocery to enter");
    } else if (isEditing) {
      setList((oldList) =>
        list.map((item) => {
          const { id } = item;
          if (id === editId) return { id: editId, label: name };
          return item;
        })
      );
      showAlert(true, "success", "Item editted");
      setName("");
      setEditId(null);
      setIsEditing(false);
    } else {
      const newItem = { id: new Date().getTime().toString(), label: name };
      setList((oldList) => {
        return [...oldList, newItem];
      });
      showAlert(true, "success", "item added");
      setName("");
    }
  };
  //remove items
  const removeItem = (id) => {
    setList((oldList) => oldList.filter((item) => item.id !== id));
    showAlert(true, "danger", "item removed");
  };

  //edit item
  const editItem = (id) => {
    const ourItem = list.find((item) => item.id === id);
    setIsEditing(true);
    setEditId(id);
    setName(ourItem.label);
  };

  //show alert
  const showAlert = (show = false, type = "", msg = "") => {
    setAlert({ show, type, msg });
  };

  //saving data to local storage
  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(list));
  }, [list]);
  return (
    <section className="section-center">
      {alert.show && <Alert alert={alert} showAlert={showAlert} list={list} />}
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

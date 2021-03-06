import React from "react";

function List({ data, removeItem, editItem }) {
  return (
    <section className="list">
      {data.map((item) => {
        const { id, label } = item;
        return (
          <article key={id} className="list-item">
            <p>{label}</p>
            <div className="btn-container">
              <button className="edit-btn" onClick={() => editItem(id)}>
                edit
              </button>
              <button className="remove-btn" onClick={() => removeItem(id)}>
                remove
              </button>
            </div>
          </article>
        );
      })}
    </section>
  );
}

export default List;

import React from "react";

function List({ data }) {
  return (
    <section className="list">
      {data.map((item) => {
        return <p>{item.label}</p>;
      })}
    </section>
  );
}

export default List;

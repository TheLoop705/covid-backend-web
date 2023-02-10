import React from "react";
import { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import app from "../base";
import "firebase/firestore";
import "./Restaurents.css";

const Restaurants = () => {
  const url =
    "https://t4.ftcdn.net/jpg/02/07/87/79/240_F_207877921_BtG6ZKAVvtLyc5GWpBNEIlIxsffTtWkv.jpg";
  const [data, setData] = useState([]);
  useEffect(() => {
    const db = app.firestore();
    console.log("effect");
    const unsub = db.collection("Restaurants").onSnapshot((snapshot) => {
      console.log(snapshot);
      const allBooks = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setData(allBooks);
    });
    return () => {
      console.log("cleanup");
      unsub();
    };
  }, []);

  //   const deleteBook = (id) => {
  //     const db = app.firestore();
  //     db.collection("Restaurents").doc(id).delete();
  //   };

  const style = {
    display: "flex",
    justifyContent: "center",
  };

  const color = {
    color: "white",
  };

  return (
    <div className="section section-books">
      <div className="container">
        <div style={style}>
          <h2 style={color}>Restaurants</h2>
          <div style={{ marginTop: "20px" }}></div>
        </div>
        <ul style={{ listStyle: "none" }}>
          {data.map((book) => (
            <li key={book.id}>
              <div className="card book">
                <div className="book-image">
                  <img
                    src={book.image === "" ? url : book.image}
                    width="100px"
                    alt=""
                    height="50px"
                  />
                </div>
                <div className="book-details">
                  <div className="book-title">{book.name}</div>
                  <div className="book-author">{book.location}</div>
                </div>
                {/* <div
                  onClick={() => deleteBook(book.id)}
                  className="book-delete"
                  style={{ cursor: "pointer" }} // add
                >
                  <i className="material-icons">delete</i>
                </div> */}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default withRouter(Restaurants);

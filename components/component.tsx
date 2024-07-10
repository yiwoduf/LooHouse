"use client";

import "../app/globals.css";

import React, { useEffect, useState } from "react";

function Component() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch(`${process.env.NEXT_API_URL}/`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.text();
      })
      .then((data) => {
        setMessage(data);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
        setMessage("Error fetching data");
      });
  }, []);

  return (
    <div>
      <p>SERVER STATUS CHECK</p>
      <div dangerouslySetInnerHTML={{ __html: message }}></div>
    </div>
  );
}

export default Component;

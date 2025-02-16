// This Page is just to test the animations and understand them before using them
import React, { useState } from "react";
import { easePolyOut } from "d3-ease";
import { Animate } from "react-move";
// Because Animate receives some props, it should return a function that returns a component in which we should pass these props so that when the props change, also the component does
// For the animation to work, we should put the values we want to change in the enter props into an array to make the transition (500 -> 100)
// In order for animate to do the animations one after the other, we should put the objects with the animations into an array and once each one is done, the next one will start (see the leave one)
// Also we can use callbacks as the events property where we can specify the started, ended and interrupted states of the animation

const Test = () => {
  const [show, setShow] = useState(true);
  const [bck, setBck] = useState("#ffffff");

  return (
    <>
      <button onClick={() => setBck("#f44336")}>Update</button>
      <button onClick={() => setShow(false)}>Remove</button>
      <button onClick={() => setShow(true)}>Show</button>

      <Animate
        show={show}
        start={{ backgroundColor: bck, width: 500, height: 500, opacity: 0 }}
        enter={{
          width: [100],
          height: [100],
          opacity: [1],
          timing: { duration: 1000, delay: 1000, ease: easePolyOut },
        }}
        update={{
          backgroundColor: bck,
          opacity: [0.5],
          timing: {
            duration: 2000,
            ease: easePolyOut,
          },
          events: {
            start: () => {
              console.log("STARTED");
            },
            end: () => {
              console.log("ENDED");
            },
            interrupt: () => {
              ////
            },
          },
        }}
        leave={[
          {
            width: [1000],
            timing: {
              duration: 500,
              ease: easePolyOut,
            },
          },
          {
            opacity: [0],
            timing: {
              delay: 2000,
              duration: 3000,
              ease: easePolyOut,
            },
          },
        ]}
      >
        {({ width, height, opacity, backgroundColor }) => (
          <div style={{ backgroundColor, opacity, width, height }}>hello</div>
        )}
      </Animate>
    </>
  );
};

export default Test;

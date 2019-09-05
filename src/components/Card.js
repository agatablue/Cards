import React from "react";
import { animated, interpolate } from "react-spring/hooks";

function Card(props) {
    const { i, x, y, rot, scale, trans, cards, bind, objs } = props;

    // const { name, age, distance, text, pics } = objs[i];
    const {quest} = objs[i];

    return (
      <animated.div
        key={i}
        style={{
          transform: interpolate(
            [x, y],
            (x, y) => `translate3d(${x}px,${y}px,0)`
          )
        }}
      >
        <animated.div
          {...bind(i)}
          style={{
            transform: interpolate([rot, scale], trans)
          }}
        >
          <div className="card">
            <span>Pytanie {i}</span>
            <h2>{quest}</h2>
          </div>
        </animated.div>
      </animated.div>
    );
}

export default Card;

import React, { useState, useEffect } from "react";
import { useSprings } from "react-spring/hooks";
import { useGesture } from "react-with-gesture";
import Card from "./Card";

import "../sass/Deck.css";


function Deck(props) {
  const {cards, to, from, trans, objs, changeBoard} = props;
  console.log("w  Deck", cards)

  let [gone] = useState(() => new Set());
  const [animatedCards, set] = useSprings(cards.length, i => ({
    ...to(i),
    from: from(i)
  }));

  useEffect(()=> {
    // component.forceUpdate()
  })

  let bind = useGesture(
    ({
      args: [index],
      down,
      delta: [xDelta],
      distance,
      direction: [xDir],
      velocity
    }) => {
      const trigger = velocity > 0.2;

      const dir = xDir < 0 ? -1 : 1;

      if (!down && trigger) gone.add(index);

      set(i => {
        if (index !== i) return;
        const isGone = gone.has(index);

        const x = isGone ? (200 + window.innerWidth) * dir : down ? xDelta : 0;

        const rot = xDelta / 100 + (isGone ? dir * 10 * velocity : 0);

        const scale = down ? 1.1 : 1;
        return {
          x,
          rot,
          scale,
          delay: undefined,
          config: { friction: 50, tension: down ? 800 : isGone ? 200 : 500 }
        };
      });

      if (!down && gone.size === cards.length)
        setTimeout(() => gone.clear() || set(i => to(i)), 600);
    }
  );
 


  const cardsElements = animatedCards.map(({ x, y, rot, scale }, i) => (
    <Card
      key={i}
      i={i}
      x={x}
      y={y}
      rot={rot}
      scale={scale}
      trans={trans}
      cards={cards}
      objs={objs}
      bind={bind}
    />
  ));

  return <section className="board">
    <button onClick={changeBoard}>More</button>
    <article className="board__cards">
      {cardsElements}
    </article>
  </section>
}

export default Deck;

import React, { useState } from "react";
import dayjs from "dayjs";

const App = () => {
  const [start, setStart] = useState("");
  const [month, setMonth] = useState("");
  const [end, setEnd] = useState("");
  const [total, setTotal] = useState("");
  const [trackHistory, setTrack] = useState([]);

  const setnewTrack = () => {
    setTrack([...trackHistory, { start, end }]);

    const parsedStart = dayjs(`${month}${start}`).valueOf();

    console.log(parsedStart);
  };

  return (
    <div>
      <h1>Trackery</h1>
      <input
        onInput={(e) => setMonth(e.target.value)}
        type="date"
        id="month"
        required
      />
      <input
        onInput={(e) => setStart(e.target.value)}
        type="time"
        id="start"
        required
      />
      <input
        onInput={(e) => setEnd(e.target.value)}
        type="time"
        id="end"
        required
      />
      <button onClick={setnewTrack}>Ok</button>
      <ul>
        {trackHistory.map(({ start, end }) => (
          <li>
            <p>{start}</p>
            <p>{end}</p>
          </li>
        ))}
      </ul>
      <strong>Total:</strong> {total}
    </div>
  );
};
export default App;

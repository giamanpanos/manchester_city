import React, { useState, useEffect } from "react";
import { Slide } from "react-awesome-reveal";
import { db } from "../../../firebase";
import MatchesBlock from "../../Utils/matches_block";
const { collection, getDocs } = require("firebase/firestore");

const Blocks = () => {
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    if (!matches.length > 0) {
      async function getMatches() {
        let matchesApi = [];
        const querySnapshot = await getDocs(collection(db, "matches"));
        querySnapshot.forEach((doc) => {
          matchesApi.push({ id: doc.id, ...doc.data() });
        });
        setMatches(matchesApi);
      }
      getMatches();
    }
  }, [matches]);

  const showMatches = (matches) =>
    matches
      ? matches.map((match) => (
          <Slide bottom key={match.id} className="item" triggerOnce>
            <div>
              <div className="wrapper">
                <MatchesBlock match={match} />
              </div>
            </div>
          </Slide>
        ))
      : null;

  return <div className="home_matches">{showMatches(matches)}</div>;
};

export default Blocks;

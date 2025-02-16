import React, { useEffect, useReducer, useState } from "react";

import LeagueTable from "./tables";
import MatchesList from "./matchesList";

import { showErrorToast } from "../Utils/tools";

import { CircularProgress } from "@material-ui/core";

import { db } from "../../firebase";
const { collection, getDocs } = require("firebase/firestore");

const TheMatches = () => {
  const [matches, setMatches] = useState(null);
  const [state, dispatch] = useReducer(
    (prevState, nextState) => {
      return { ...prevState, ...nextState };
    },
    {
      filterMatches: null,
      playedFilter: "All",
      resultFilter: "All",
    }
  );

  useEffect(() => {
    if (!matches) {
      async function getMatches() {
        await getDocs(collection(db, "matches"))
          .then((snapshot) => {
            const matchesApi = snapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }));
            setMatches(matchesApi);
            dispatch({ ...state, filterMatches: matchesApi });
          })
          .catch((error) => {
            showErrorToast(error);
          });
      }
      getMatches();
    }
  }, [matches, state]);

  const showPlayed = (played) => {
    // All, Yes, No
    const list = matches.filter((match) => {
      return match.final === played;
    });

    dispatch({
      ...state,
      filterMatches: played === "All" ? matches : list,
      playedFilter: played,
      resultFilter: "All",
    });
  };

  const showResult = (result) => {
    const list = matches.filter((match) => {
      return match.result === result;
    });

    dispatch({
      ...state,
      filterMatches: result === "All" ? matches : list,
      playedFilter: "All",
      resultFilter: "result",
    });
  };

  return (
    <>
      {matches ? (
        <div className="the_matches_container">
          <div className="the_matches_wrapper">
            <div className="left">
              <div className="match_filters">
                <div className="match_filters_box">
                  <div className="tag">Show match</div>
                  <div className="cont">
                    <div
                      className={`option ${
                        state.playedFilter === "All" ? "active" : ""
                      }`}
                      onClick={() => showPlayed("All")}
                    >
                      All
                    </div>
                    <div
                      className={`option ${
                        state.playedFilter === "Yes" ? "active" : ""
                      }`}
                      onClick={() => showPlayed("Yes")}
                    >
                      Played
                    </div>
                    <div
                      className={`option ${
                        state.playedFilter === "No" ? "active" : ""
                      }`}
                      onClick={() => showPlayed("No")}
                    >
                      Not Played
                    </div>
                  </div>
                </div>
                <div className="match_filters_box">
                  <div className="tag">Result games</div>
                  <div className="cont">
                    <div
                      className={`option ${
                        state.resultFilter === "All" ? "active" : ""
                      }`}
                      onClick={() => showResult("All")}
                    >
                      All
                    </div>
                    <div
                      className={`option ${
                        state.resultFilter === "W" ? "active" : ""
                      }`}
                      onClick={() => showResult("W")}
                    >
                      W
                    </div>
                    <div
                      className={`option ${
                        state.resultFilter === "D" ? "active" : ""
                      }`}
                      onClick={() => showResult("D")}
                    >
                      D
                    </div>
                    <div
                      className={`option ${
                        state.resultFilter === "L" ? "active" : ""
                      }`}
                      onClick={() => showResult("L")}
                    >
                      L
                    </div>
                  </div>
                </div>
              </div>
              <MatchesList matches={state.filterMatches} />
            </div>
            <div className="right">
              <LeagueTable />
            </div>
          </div>
        </div>
      ) : (
        <div className="progress">
          <CircularProgress />
        </div>
      )}
    </>
  );
};

export default TheMatches;

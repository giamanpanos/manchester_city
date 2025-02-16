import React, { useState, useEffect } from "react";

import PlayerCard from "../Utils/playerCard";
import { Slide } from "react-awesome-reveal";
import { showErrorToast } from "../Utils/tools";

import { db } from "../../firebase";
import { CircularProgress } from "@material-ui/core";
import { Defence, Keeper, Midfield, Striker } from "../Utils/ImageNamesMine";
const { collection, getDocs } = require("firebase/firestore");

const TheTeam = () => {
  const [loading, setLoading] = useState(true);
  const [players, setPlayers] = useState(null);

  useEffect(() => {
    if (!players) {
      async function getPlayer() {
        await getDocs(collection(db, "players"))
          .then((snapshot) => {
            const playersApi = snapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }));
            setPlayers(playersApi); // this and the next line should be commented out and the commented code below, uncommented once we can use the storage of firebase
          })

          //   let promises = [];
          //   playersApi.forEach((player, index) => {
          //     promises.push(
          //       new promises((resolve, reject) => {
          //         getDownloadURL(ref(getStorage(), "players"))
          //           .then((url) => {
          //             playersApi[index].url = url;
          //             resolve();
          //           })
          //           .catch((error) => {
          //             reject();
          //           });
          //       })
          //     );
          //   });
          //   Promise.all(promises).then(() => {
          //     setPlayers(playersApi);
          //   });
          // })
          .catch((error) => showErrorToast("Sorry try again later"))
          .finally(() => {
            setLoading(false);
          });
      }
      getPlayer();
    }
  }, [players]);

  //   const showPlayerByCategory = (category) =>
  //     players
  //       ? players.map((player) => {
  //           return player.position === category ? (
  //             <Slide left key={player.id} triggerOnce>
  //               <div className="item">
  //                 <PlayerCard
  //                   number={player.number}
  //                   name={player.name}
  //                   lastname={player.lastname}
  //                   bck={player.url}
  //                 />
  //               </div>
  //             </Slide>
  //           ) : null;
  //         })
  //       : null;

  const showPlayerByCategorMine = (imagesArray, playerPosition) => {
    return players
      ? players.map((player) => {
          return player.position === playerPosition ? (
            <Slide left key={player.id} triggerOnce>
              <div className="item">
                <PlayerCard
                  number={player.number}
                  name={player.name}
                  lastname={player.lastname}
                  bck={
                    imagesArray[
                      player.lastname.includes(" ")
                        ? player.lastname.replace(" ", "_")
                        : player.lastname
                    ]
                  }
                />
              </div>
            </Slide>
          ) : null;
        })
      : null;
  };
  return (
    <div className="the_team_container">
      {loading ? (
        <div className="progress">
          <CircularProgress />
        </div>
      ) : (
        <div>
          <div className="team_category_wrapper">
            <div className="title">Keepers</div>
            <div className="team_cards">
              {showPlayerByCategorMine(Keeper, "Keeper")}
            </div>
          </div>

          <div className="team_category_wrapper">
            <div className="title">Defence</div>
            <div className="team_cards">
              {showPlayerByCategorMine(Defence, "Defence")}
            </div>
          </div>

          <div className="team_category_wrapper">
            <div className="title">Midfield</div>
            <div className="team_cards">
              {showPlayerByCategorMine(Midfield, "Midfield")}
            </div>
          </div>

          <div className="team_category_wrapper">
            <div className="title">Strikers</div>
            <div className="team_cards">
              {showPlayerByCategorMine(Striker, "Striker")}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TheTeam;

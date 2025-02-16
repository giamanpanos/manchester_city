import React, { useEffect, useState } from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@material-ui/core";

import { showErrorToast } from "../Utils/tools";

import { db } from "../../firebase";
const { collection, getDocs } = require("firebase/firestore");

const LeagueTable = () => {
  const [positions, setPositions] = useState(null);

  useEffect(() => {
    if (!positions) {
      async function getPositions() {
        await getDocs(collection(db, "positions"))
          .then((snapshot) => {
            const positionsApi = snapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }));
            setPositions(positionsApi);
          })
          .catch((error) => {
            showErrorToast(error);
          });
      }
      getPositions();
    }
  }, [positions]);

  const showTeamPositions = () => {
    return positions
      ? positions.map((pos, index) => {
          return (
            <TableRow key={index}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{pos.team}</TableCell>
              <TableCell>{pos.w}</TableCell>
              <TableCell>{pos.d}</TableCell>
              <TableCell>{pos.l}</TableCell>
              <TableCell>{pos.pts}</TableCell>
            </TableRow>
          );
        })
      : null;
  };

  return (
    <div className="league_table_wrapper">
      <div className="title">League Table</div>
      <div>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Pos</TableCell>
              <TableCell>Team</TableCell>
              <TableCell>W</TableCell>
              <TableCell>D</TableCell>
              <TableCell>L</TableCell>
              <TableCell>Pts</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>{showTeamPositions()}</TableBody>
        </Table>
      </div>
    </div>
  );
};

export default LeagueTable;

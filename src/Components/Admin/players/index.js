import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AdminLayout from "../../../Hoc/AdminLayout";
import { db } from "../../../firebase";
import {
  collection,
  where,
  getDocs,
  query,
  orderBy,
  limit,
} from "firebase/firestore";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
} from "@material-ui/core";
import { showErrorToast } from "../../Utils/tools";

const AdminPlayers = () => {
  const [playersNumber, setPlayersNumber] = useState([]);
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalPlayers, setTotalPlayers] = useState([]);

  useEffect(() => {
    async function getTotalPlayers() {
      try {
        let totalPlayersApi = [];
        const querySnapshot = await getDocs(query(collection(db, "players")));
        querySnapshot.forEach((doc) => {
          totalPlayersApi.push(doc.id);
        });
        setTotalPlayers(totalPlayersApi);
      } catch (error) {
        showErrorToast(error);
      }
    }
    getTotalPlayers();
  }, []);

  useEffect(() => {
    if (players.length === 0) {
      setLoading(true);
      async function getPlayers() {
        try {
          let playersApi = [];
          let numbers = [];
          const querySnapshot = await getDocs(
            query(collection(db, "players"), orderBy("number", "asc"), limit(2))
          );
          querySnapshot.forEach((doc) => {
            playersApi.push({ id: doc.id, ...doc.data() });
            numbers.push(doc.data().number);
          });
          setPlayersNumber(numbers);
          setPlayers(playersApi);
        } catch (error) {
          showErrorToast(error);
        } finally {
          setLoading(false);
        }
      }
      getPlayers();
    }
  }, [players, playersNumber]);

  const loadMorePlayers = () => {
    if (playersNumber.length > 0) {
      setLoading(true);
      async function getPlayers() {
        let playersApi = [];
        let numbers = [];
        try {
          const querySnapshot = await getDocs(
            query(
              collection(db, "players"),
              where("number", ">", playersNumber.at(-1)),
              orderBy("number", "asc"),
              limit(2)
            )
          );
          querySnapshot.forEach((doc) => {
            playersApi.push({ id: doc.id, ...doc.data() });
            numbers.push(doc.data().number);
          });
          setPlayersNumber([...playersNumber, ...numbers]);
          setPlayers([...players, ...playersApi]);
        } catch (error) {
          showErrorToast(error);
        } finally {
          setLoading(false);
        }
      }
      getPlayers();
    }
    if (players.length === totalPlayers.length) {
      showErrorToast("Nothing to load");
    }
  };

  return (
    <AdminLayout title="The players">
      <div className="mb-5">
        <Button
          disableElevation
          variant="outline"
          component={Link}
          to={"/admin_players/add_player"}
        >
          Add player
        </Button>
      </div>

      <Paper className="mb-5">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>First name</TableCell>
              <TableCell>Last name</TableCell>
              <TableCell>Number</TableCell>
              <TableCell>Position</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {players
              ? players.map((player) => (
                  <TableRow key={player.id}>
                    <TableCell>
                      <Link to={`/admin_players/edit_player/${player.id}`}>
                        {player.name}
                      </Link>
                    </TableCell>
                    <TableCell>
                      <Link to={`/admin_players/edit_player/${player.id}`}>
                        {player.lastname}
                      </Link>
                    </TableCell>
                    <TableCell>{player.number}</TableCell>
                    <TableCell>{player.position}</TableCell>
                  </TableRow>
                ))
              : null}
          </TableBody>
        </Table>
      </Paper>

      <Button
        variant="contained"
        color="primary"
        onClick={() => loadMorePlayers()}
        disabled={loading}
      >
        Load more
      </Button>

      <div className="admin_progress">
        {loading ? (
          <CircularProgress thickness={7} style={{ color: "#98c5e9" }} />
        ) : null}
      </div>
    </AdminLayout>
  );
};

export default AdminPlayers;

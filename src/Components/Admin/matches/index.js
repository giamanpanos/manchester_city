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

const AdminMatches = () => {
  const [matchesNumber, setMatchesNumber] = useState([]);
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalMatches, setTotalMatches] = useState([]);

  useEffect(() => {
    async function getTotalMatches() {
      try {
        let totalMatchesApi = [];
        const querySnapshot = await getDocs(query(collection(db, "matches")));
        querySnapshot.forEach((doc) => {
          totalMatchesApi.push(doc.id);
        });
        setTotalMatches(totalMatchesApi);
      } catch (error) {
        showErrorToast(error);
      }
    }
    getTotalMatches();
  }, []);

  useEffect(() => {
    if (matches.length === 0) {
      setLoading(true);
      async function getMatches() {
        try {
          let matchesApi = [];
          let numbers = [];
          const querySnapshot = await getDocs(
            query(collection(db, "matches"), orderBy("date", "asc"), limit(2))
          );
          querySnapshot.forEach((doc) => {
            matchesApi.push({ id: doc.id, ...doc.data() });
            numbers.push(doc.data().date);
          });
          setMatchesNumber(numbers);
          setMatches(matchesApi);
        } catch (error) {
          showErrorToast(error);
        } finally {
          setLoading(false);
        }
      }
      getMatches();
    }
  }, [matches, matchesNumber]);

  const loadMoreMatches = () => {
    if (matchesNumber.length > 0) {
      setLoading(true);
      async function getMatches() {
        let matchesApi = [];
        let numbers = [];
        try {
          const querySnapshot = await getDocs(
            query(
              collection(db, "matches"),
              where("date", ">", matchesNumber.at(-1)),
              orderBy("date", "asc"),
              limit(2)
            )
          );
          querySnapshot.forEach((doc) => {
            matchesApi.push({ id: doc.id, ...doc.data() });
            numbers.push(doc.data().date);
          });
          setMatchesNumber([...matchesNumber, ...numbers]);
          setMatches([...matches, ...matchesApi]);
        } catch (error) {
          showErrorToast(error);
        } finally {
          setLoading(false);
        }
      }
      getMatches();
    }
    if (matches.length === totalMatches.length) {
      showErrorToast("Nothing to load");
    }
  };

  return (
    <AdminLayout title="The matches">
      <div className="mb-5">
        <Button
          disableElevation
          variant="outline"
          component={Link}
          to={"/admin_matches/add_match"}
        >
          Add match
        </Button>
      </div>

      <Paper className="mb-5">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>Match</TableCell>
              <TableCell>Result</TableCell>
              <TableCell>Final</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {matches
              ? matches.map((match) => (
                  <TableRow key={match.id}>
                    <TableCell>{match.date}</TableCell>
                    <TableCell>
                      <Link to={`/admin_matches/edit_match/${match.id}`}>
                        {match.away} <strong>-</strong> {match.local}
                      </Link>
                    </TableCell>
                    <TableCell>
                      {match.resultAway} <strong>-</strong> {match.resultLocal}
                    </TableCell>
                    <TableCell>
                      {match.final === "Yes" ? (
                        <span className="matches_tag_red">Final</span>
                      ) : (
                        <span className="matches_tag_green">
                          Not played yet
                        </span>
                      )}
                    </TableCell>
                  </TableRow>
                ))
              : null}
          </TableBody>
        </Table>
      </Paper>

      <Button
        variant="contained"
        color="primary"
        onClick={() => loadMoreMatches()}
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

export default AdminMatches;

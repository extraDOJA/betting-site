import { fetchUserBets } from "@/services/sportsService";
import { useCallback, useEffect, useState } from "react";
import { useErrorHandler } from "./useErrorHandler";

/**
 * Custom hook for managing user bets with filtering and pagination
 * @param {object|null} initialFilter - Initial filter value for the bets
 * @param {number} initialPage - Starting page number for pagination
 * @param {number} pageSize - Number of bets to display per page
 * @returns {object} - States and functions to manage user bets
 */

const useUserBets = (initialFilter = null, initialPage = 1, pageSize = 5) => {
  const [bets, setBets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeFilter, setActiveFilter] = useState(initialFilter);
  const [page, setPage] = useState(initialPage);
  const [totalPages, setTotalPages] = useState(1);
  const [totalBets, setTotalBets] = useState(0);
  const {handleError} = useErrorHandler();

  const fetchBets = useCallback(
    async (filter = activeFilter, currentPage = page) => {
      try {
        setLoading(true);
        setError(null);
        const filterToUse = filter || "open";
        const response = await fetchUserBets(filterToUse, currentPage, pageSize);

        // Handle paginated response format (results + count)
        if (response.results && Array.isArray(response.results)) {
          setBets(response.results);
          setTotalPages(Math.ceil(response.count / pageSize));
          setTotalBets(response.count);
        }
        // Handle array response format (no pagination from API)
        else if (Array.isArray(response)) {
          setBets(response);
          const totalItems = response.length;
          setTotalBets(totalItems);
          setTotalPages(Math.ceil(totalItems / pageSize));
        }
        // Handle unexpected response format
        else {
          console.error("Unexpected API response format:", response);
          setBets([]);
          setTotalPages(1);
          setTotalBets(0);
        }
      } catch (err) {
        handleError(err);
      } finally {
        setLoading(false);
      }
    },
    [activeFilter, page, pageSize, handleError]
  );

  const changePage = useCallback(
    (newPage) => {
      if (newPage >= 1 && newPage <= totalPages) {
        setPage(newPage);
        fetchBets(activeFilter, newPage);
      }
    },
    [activeFilter, fetchBets, totalPages]
  );

  const changeFilter = useCallback(
    (newFilter) => {
      setActiveFilter(newFilter);
      setPage(1);
      fetchBets(newFilter, 1);
    },
    [fetchBets]
  );

  useEffect(() => {
    fetchBets();
  }, [fetchBets]);

  const groupedBets = {
    open: Array.isArray(bets) ? bets.filter((bet) => ["pending", "active"].includes(bet.status)) : [],
    finished: Array.isArray(bets) ? bets.filter((bet) => ["lost", "canceled"].includes(bet.status)) : [],
    won: Array.isArray(bets) ? bets.filter((bet) => bet.status === "won") : [],
  };

  return {
    bets,
    loading,
    error,
    activeFilter,
    page,
    totalPages,
    totalBets,
    changeFilter,
    changePage,
    fetchBets,
    groupedBets,
  };
};

export default useUserBets;

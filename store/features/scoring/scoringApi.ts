import { baseQuery } from "@/services/api";
import { createApi } from "@reduxjs/toolkit/query/react";

export const scoringApi = createApi({
  reducerPath: "scoringApi",
  baseQuery,
  tagTypes: [
    "Ball",
    "Over",
    "Inning",
    "Wicket",
    "PlayerScore",
    "BowlerStats",
    "KeeperStats",
  ],
  endpoints: (builder) => ({
    // 🏏 Create Ball Record
    createBall: builder.mutation<any, { data: any }>({
      query: (newBall) => ({
        url: "balls",
        method: "POST",
        body: newBall,
        params: { populate: '*' },
      }),
      invalidatesTags: ["Ball", "Over", "Inning"],
    }),

    // ✍️ Update Ball Record
    updateBall: builder.mutation<any, { id: string; data: any }>({
      query: ({ id, data }) => ({
        url: `balls/${id}`,
        method: "PUT",
        body: { data },
        params: { populate: '*' },
      }),
      invalidatesTags: ["Ball"],
    }),

    // 💥 Create Wicket Record
    createWicket: builder.mutation<any, { data: any }>({
      query: (newWicket) => ({
        url: "wickets",
        method: "POST",
        body: newWicket,
        params: { populate: '*' },
      }),
      invalidatesTags: ["Wicket", "Inning"],
    }),

     // 🔁 Update Player Score
    updateWicket: builder.mutation<any, { id: string; data: any }>({
      query: ({ id, data }) => ({
        url: `wickets/${id}`,
        method: "PUT",
        body: { data },
        params: { populate: '*' },
      }),
       invalidatesTags: ["Wicket", "Inning"],
    }),

    // 🧮 Create Player Score
    createPlayerScore: builder.mutation<any, { data: any }>({
      query: (newScore) => ({
        url: "player-scores",
        method: "POST",
        body: newScore,
      }),
      invalidatesTags: ["PlayerScore"],
    }),

    // 🔁 Update Player Score
    updatePlayerScore: builder.mutation<any, { id: string; data: any }>({
      query: ({ id, data }) => ({
        url: `player-scores/${id}`,
        method: "PUT",
        body: { data },
      }),
      invalidatesTags: ["PlayerScore"],
    }),

    // 🏹 Update Bowler Stats
    updateBowlerStats: builder.mutation<any, { id: string; data: any }>({
      query: ({ id, data }) => ({
        url: `bowler-stats/${id}`,
        method: "PUT",
        body: { data },
      }),
      invalidatesTags: ["BowlerStats"],
    }),

    // 🧤 Update Keeper Stats
    updateKeeperStats: builder.mutation<any, { id: string; data: any }>({
      query: ({ id, data }) => ({
        url: `keeper-stats/${id}`,
        method: "PUT",
        body: { data },
      }),
      invalidatesTags: ["KeeperStats"],
    }),
  }),
});

// ✅ Export Hooks
export const {
  useCreateBallMutation,
  useUpdateBallMutation,
  useCreateWicketMutation,
  useUpdateWicketMutation,
  useCreatePlayerScoreMutation,
  useUpdatePlayerScoreMutation,
  useUpdateBowlerStatsMutation,
  useUpdateKeeperStatsMutation,
} = scoringApi;

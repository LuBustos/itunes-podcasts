import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

const initialState = {
  lastFechtTime: null,
  loading: false,
  summary: "",
  podcast_title: "",
  podcast_description: "",
  song: "",
  podcast_detail: "",
  podcasts: null,
};

export const useStore = create(
  persist(
    (set, get) => ({
      ...initialState,
      set_summary: (summary) => set(() => ({ summary: summary })),
      set_loading: (loading) => set(() => ({ loading: loading })),
      addLastFechTime: (last_fetch_time, podcasts) =>
        set(() => ({ lastFechtTime: last_fetch_time, podcasts: podcasts })),
      addPodcasts: (podcasts) => set(() => ({ podcasts: podcasts })),
      addEpisode: (episode) =>
        set(() => ({
          song: episode.song,
          podcast_description: episode.description,
          podcast_detail: episode.detail,
          podcast_title: episode.title,
        })),
      clear: () => {
        set(initialState);
      },
    }),
    {
      name: "podcast-storage", // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
    }
  )
);

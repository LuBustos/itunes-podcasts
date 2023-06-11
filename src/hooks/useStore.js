import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

const initialState = {
  podcastId: null,
  lastFechtTimePodcast: null,
  loading: false,
  summary: "",
  podcast_title: "",
  podcast_description: "",
  song: "",
  podcast_detail: "",
  podcast: null,
  podcasts: null,
  lastFechtTimePodcasts: null,
};

export const useStore = create(
  persist(
    (set, get) => ({
      ...initialState,
      set_summary: (summary,podcastId) => set(() => ({ summary: summary, podcastId: podcastId })),
      set_loading: (loading) => set(() => ({ loading: loading })),
      addLastFechTimePodcast: (last_fetch_time, podcast) =>
        set(() => ({
          lastFechtTimePodcast: last_fetch_time,
          podcast: podcast,
        })),
      addLastFechTimePodcasts: (last_fetch_time, podcasts) =>
        set(() => ({
          lastFechtTimePodcasts: last_fetch_time,
          podcasts: podcasts,
        })),
      addEpisode: (episode) =>
        set(() => ({
          song: episode.song,
          podcast_description: episode.description,
          podcast_detail: episode.detail,
          podcast_title: episode.title,
        })),
      clear: () => {
        set({
          lastFechtTimePodcast: null,
          loading: false,
          summary: "",
          podcast_title: "",
          podcast_description: "",
          song: "",
          podcast_detail: "",
          podcast: null,
        });
      },
    }),
    {
      name: "podcast-storage", // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
    }
  )
);

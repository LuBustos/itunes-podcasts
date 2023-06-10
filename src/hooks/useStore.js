import { create } from "zustand";

export const useStore = create((set) => ({
  podcastId: 0,
  loading: false,
  summary: "",
  podcast_title: "",
  podcast_description: "",
  song: "",
  podcast_detail: "",
  set_podcastId: (podcastId) => set(() => ({ podcastId: podcastId })),
  set_summary: (summary) => set(() => ({ summary: summary })),
  set_podcast_title: (podcast_title) =>
    set(() => ({ podcast_title: podcast_title })),
  set_podcast_description: (podcast_description) =>
    set(() => ({ podcast_description: podcast_description })),
  set_song: (song) => set(() => ({ song: song })),
  set_podcast_detail: (podcast_detail) =>
    set(() => ({ podcast_detail: podcast_detail })),
  set_loading: (loading) => set(() => ({ loading: loading })),
}));

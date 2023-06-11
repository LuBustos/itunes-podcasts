import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PodcastCard } from "../../components";
import { useStore } from "../../hooks/useStore";
import { getData } from "../../utils/getData";
import styles from "./style.module.css";
import { isTimeElapsed } from "../../utils/isTime";

function Podcasts() {
  const state = useStore((state) => state);
  const {
    set_summary,
    set_loading,
    clear,
    addLastFechTimePodcasts,
    lastFechtTimePodcasts,
    podcasts,
  } = state;
  const [allPodcast, setAllPodcast] = useState(podcasts);
  const navigate = useNavigate();

  const getPodcasts = async (currentTimestamp) => {
    const data = await getData(
      "https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json"
    );
    setAllPodcast(data);
    addLastFechTimePodcasts(currentTimestamp, data);
  };

  useEffect(() => {
    if (
      !lastFechtTimePodcasts ||
      isTimeElapsed(lastFechtTimePodcasts, 2 * 60 * 60 * 1000)
    ) {
      set_loading(true);
      setTimeout(() => {
        const currentTimestamp = new Date().getTime();
        getPodcasts(currentTimestamp);
        set_loading(false);
      }, 300);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const goToDetail = (podcastId, summary) => {
    if (state.podcastId === podcastId) {
      navigate(`/podcast/${podcastId}`);
    } else {
      clear();
      set_summary(summary, podcastId);
      navigate(`/podcast/${podcastId}`);
    }
  };

  return (
    <div>
      {allPodcast ? (
        <>
          <div className={styles.searchContainer}>
            <p data-testid="total-podcasts" className={styles.count}>
              {allPodcast.feed.entry.length}
            </p>
            <input className={styles.search} placeholder="Filter podcasts" />
          </div>
          <div
            key={`list-podcasts ${allPodcast.feed.entry.length}`}
            className={styles.container}
          >
            {allPodcast.feed.entry.map((pod, index) => {
              return (
                <div key={`list-podcasts id-${index}`}>
                  <PodcastCard
                    image={pod["im:image"][0].label}
                    title={pod["im:name"].label}
                    subtitle={pod["im:artist"].label}
                    index={index}
                    podcastId={pod["id"].attributes["im:id"]}
                    summary={pod.summary.label}
                    onClick={goToDetail}
                  />
                </div>
              );
            })}
          </div>
        </>
      ) : null}
    </div>
  );
}

export default Podcasts;

import { useEffect, useState } from "react";
import { PodcastCard } from "../../components";
import { getData } from "../../utils/getData";
import styles from "./style.module.css";
import { useStore } from "../../hooks/useStore";
import { useNavigate } from "react-router-dom";

function Podcasts() {
  const { set_summary, set_loading } = useStore((state) => state);
  const [podcasts, setPodcasts] = useState(null);
  const navigate = useNavigate();

  const getPodcasts = async () => {
    const data = await getData(
      "https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json"
    );
    setPodcasts(data);
  };

  useEffect(() => {
    set_loading(true);
    setTimeout(() => {
      getPodcasts();
      set_loading(false);
    }, 300);
  }, []);

  const goToDetail = (podcastId, summary) => {
    set_summary(summary);
    navigate(`/podcast/${podcastId}`)
  };

  return (
    <div>
      {podcasts ? (
        <>
          <div className={styles.searchContainer}>
            <p className={styles.count}>{podcasts.feed.entry.length}</p>
            <input className={styles.search} placeholder="Filter podcasts" />
          </div>
          <div className={styles.container}>
            {podcasts.feed.entry.map((pod, index) => {
              return (
                <PodcastCard
                  image={pod["im:image"][0].label}
                  title={pod["im:name"].label}
                  subtitle={pod["im:artist"].label}
                  index={index}
                  podcastId={pod["id"].attributes["im:id"]}
                  summary={pod.summary.label}
                  onClick={goToDetail}
                />
              );
            })}
          </div>
        </>
      ) : null}
    </div>
  );
}

export default Podcasts;

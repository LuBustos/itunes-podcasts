import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { Card, PodcastDetail } from "../../components";
import { useStore } from "../../hooks/useStore";
import { getData } from "../../utils/getData";
import { millisToMinutesAndSeconds } from "../../utils/milisToMins";
import styles from "./styles.module.css";
import { isTimeElapsed } from "../../utils/isTime";
const columns = [
  {
    id: 1,
    name: "Title",
  },
  {
    id: 2,
    name: "Date",
  },
  {
    id: 3,
    name: "Duration",
  },
];

function AboutPodcast() {
  const state = useStore((state) => state);
  const params = useParams();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [podcastDetail, setPodcastDetail] = useState(state.podcast);

  const getPodcastAbout = async (currentTimestamp) => {
    const data = await getData(
      `https://api.allorigins.win/raw?url=${encodeURIComponent(
        `https://itunes.apple.com/lookup?id=${params.id}&media=podcast&entity=podcastEpisode&limit=20`
      )}`
    );
    setPodcastDetail(data);
    state.addLastFechTimePodcast(currentTimestamp, data);
  };

  useEffect(() => {
    const { set_loading, summary, lastFechtTimePodcast } = state;
    if (summary.length === 0) {
      navigate("/");
    }

    if (
      !lastFechtTimePodcast ||
      isTimeElapsed(lastFechtTimePodcast, 2 * 60 * 60 * 1000)
    ) {
      set_loading(true);
      setTimeout(() => {
        const currentTimestamp = new Date().getTime();
        getPodcastAbout(currentTimestamp);
        set_loading(false);
      }, 150);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.lastFechtTimePodcast]);

  const goToEpisode = (trackName, description, episodeUrl) => {
    state.addEpisode({
      song: episodeUrl,
      description: description,
      title: trackName,
      detail: podcastDetail?.results[0],
    });
  };

  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      {podcastDetail ? (
        <>
          <div style={{ width: "22%" }}>
            <PodcastDetail
              podcast={podcastDetail.results[0]}
              summary={state.summary}
            />
          </div>
          <div style={{ width: "78%" }}>
            <Card>
              <p className={styles.total}>
                Episodes: {podcastDetail.resultCount}
              </p>
            </Card>
            <Card>
              <table className={styles.grid}>
                <thead>
                  <tr key={`id ${columns.length} - columns`}>
                    {columns.map((col, index) => {
                      return (
                        <th key={`${col.name}-${index}`}>
                          <div>
                            <span>{col.name}</span>
                          </div>
                        </th>
                      );
                    })}
                  </tr>
                </thead>
                <tbody>
                  {podcastDetail.results.map((det, index) => {
                    const releaseDate = new Date(
                      det.releaseDate
                    ).toLocaleDateString("es");
                    const minutes = millisToMinutesAndSeconds(
                      det.trackTimeMillis
                    );
                    return index > 0 ? (
                      <tr key={index}>
                        <td>
                          <Link
                            key={index + 1}
                            onClick={() =>
                              goToEpisode(
                                det.trackName,
                                det.description,
                                det.episodeUrl
                              )
                            }
                            to={`${pathname}/episode/${det.trackId}`}
                          >
                            {det.trackName}
                          </Link>
                        </td>
                        <td>{releaseDate}</td>
                        <td>{minutes}</td>
                      </tr>
                    ) : null;
                  })}
                </tbody>
              </table>
            </Card>
          </div>
        </>
      ) : null}
    </div>
  );
}

export default AboutPodcast;

import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { Card, PodcastDetail } from "../../components";
import { useStore } from "../../hooks/useStore";
import { getData } from "../../utils/getData";
import { millisToMinutesAndSeconds } from "../../utils/milisToMins";
import styles from "./styles.module.css";
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

/**
 Una vez obtenido el detalle de un podcast desde el servicio externo por primera
vez, se deberá almacenar en cliente de manera que solo se vuelva a solicitar si ha
pasado un día desde la última vez que se solicitó.
 */

function PodcastId() {
  const state = useStore((state) => state);
  const params = useParams();
  const { pathname } = useLocation();
  const navigate = useNavigate()
  const [podcastDetail, setPodcastDetail] = useState(null);

  const getPodcastAbout = async () => {
    const data = await getData(
      `https://itunes.apple.com/lookup?id=${params.id}&media=podcast&entity=podcastEpisode&limit=20`
    );
    setPodcastDetail(data);
  };

  useEffect(() => {
    const { set_loading, summary } = state;
    if (summary.length === 0) {
      navigate("/");
    }
    set_loading(true);
    setTimeout(() => {
      getPodcastAbout();
      set_loading(false);
    }, 300);
  }, []);

  const goToEpisode = (trackName, description, episodeUrl) => {
    state.set_podcast_title(trackName);
    state.set_podcast_description(description);
    state.set_song(episodeUrl);
    state.set_podcast_detail(podcastDetail?.results[0]);
  };

  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      {podcastDetail ? (
        <>
          <div style={{ width: "20%" }}>
            <PodcastDetail
              podcast={podcastDetail.results[0]}
              summary={state.summary}
            />
          </div>
          <div style={{ width: "80%" }}>
            <Card>
              <p className={styles.total}>
                Episodes: {podcastDetail.resultCount}
              </p>
            </Card>
            <Card>
              <table className={styles.grid}>
                <thead>
                  <tr>
                    {columns.map((col, index) => {
                      return (
                        <>
                          <th key={`${col.name}-${index}`}>
                            <div>
                              <span>{col.name}</span>
                            </div>
                          </th>
                        </>
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
                          <td>{det.trackName}</td>
                        </Link>
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

export default PodcastId;

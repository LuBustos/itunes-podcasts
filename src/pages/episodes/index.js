import styles from "./styles.module.css";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useStore } from "../../hooks/useStore";
import { Card, PodcastDetail } from "../../components";

const EpisodeId = () => {
  const navigate = useNavigate();
  const state = useStore((state) => state);
  const { podcast_detail, summary, podcast_description, song, podcast_title } =
    state;

  useEffect(() => {
    if (
      summary.length === 0 ||
      podcast_detail.length === 0 ||
      podcast_title.length === 0
    ) {
        navigate("/");
    }
  }, []);

  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      <div style={{ width: "20%" }}>
        <PodcastDetail podcast={podcast_detail} summary={summary} />
      </div>
      <div style={{ width: "80%" }}>
        <Card>
          <div className={styles.container}>
            <h3 className={styles.title}>{podcast_title}</h3>
            <span
              className={styles.description}
              dangerouslySetInnerHTML={{ __html: podcast_description }}
            />
            <hr />
            <div style={{ marginTop: "10px" }}>
              <audio src={song} controls className={styles.audio} />
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default EpisodeId;

import Card from "../card";
import styles from "./styles.module.css";

function Detail({ podcast, summary, back = null }) {
  return (
    <Card className={styles.about}>
      <span className={styles.containerImage}>
        <img
          src={podcast.artworkUrl30}
          className={styles.image}
          onClick={back}
        />
      </span>
      <div className={styles.containerText}>
        <hr />
        <div style={{ padding: "3px" }} onClick={back}>
          <p className={styles.title}>{podcast.trackName}</p>
          <p className={styles.by}>by {podcast.artistName}</p>
        </div>
        <hr />
        <p className={styles.title}>Description: </p>
        <p className={styles.description}>{summary}</p>
      </div>
    </Card>
  );
}

export default Detail;

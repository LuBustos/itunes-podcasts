import Card from "../card";
import styles from "./styles.module.css";

function Detail({ podcast, summary }) {
  return (
    <Card className={styles.about}>
      <span className={styles.containerImage}>
        <img src={podcast.artworkUrl30} className={styles.image} />
      </span>
      <div className={styles.containerText}>
        <hr />
        <div style={{ padding: "3px" }}>
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

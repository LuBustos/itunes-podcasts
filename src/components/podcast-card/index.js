import styles from "./styles.module.css";

function PodcastCard({
  image,
  title,
  subtitle,
  summary,
  podcastId,
  index,
  onClick,
}) {
  return (
    <div
      id={`${title}-${index}`}
      className={styles.card}
      onClick={() => onClick(podcastId, summary)}
    >
      <div className={styles.imageContainer}>
        <img className={styles.image} src={image} />
      </div>
      <div className={styles.content}>
        <p className={styles.title}>{title}</p>
        <p className={styles.subtitle}>Author: {subtitle}</p>
      </div>
    </div>
  );
}

export default PodcastCard;

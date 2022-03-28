export default function MovieStack({ section_id, frame_id, caption, content }) {
  return (
    <section className="movieTroll" id={section_id}>
      <div className="movieCaption">{caption}</div>
      <div className="frame" id={frame_id}>
        <div id="default">
          {content && "There are currently no movies to display."}
        </div>
      </div>
    </section>
  );
}

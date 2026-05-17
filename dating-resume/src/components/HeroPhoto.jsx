export default function HeroPhoto({ profile }) {
  const { name, photoUrl } = profile;

  return (
    <div className="hero-photo-wrap">
      <div className="hero-photo">
        {photoUrl ? (
          <img src={photoUrl} alt={name} />
        ) : (
          <div className="hero-photo-placeholder">
            [ photo
            <br />
            here ]
          </div>
        )}
      </div>
    </div>
  );
}

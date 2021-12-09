const Cover = ({ children, src, alt, className }) => {
  return (
    <figure className={className}>
      <img className="cover" src={src} alt={alt} />
      <figcaption className="copyright right white">{children}</figcaption>
    </figure>
  );
};

export default Cover;

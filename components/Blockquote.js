const Blockquote = ({ children, caption, className, ...otherProps }) => {
  return (
    <figure className={className} {...otherProps}>
      <blockquote>
        <p>{children}</p>
      </blockquote>
      <figcaption>{caption}</figcaption>
    </figure>
  );
};

export default Blockquote;

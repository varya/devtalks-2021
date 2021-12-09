const Stamp = ({ children, title, ...otherProps }) => {
  return (
    <div className="space-label">
      <div className="top">
        <div className="ring"></div>
        <div className="ring"></div>
        <div className="ring"></div>
      </div>
      <div className="text">{title}</div>
      <div className="bottom">
        <div className="ring"></div>
        <div className="ring"></div>
        <div className="ring"></div>
      </div>
    </div>
  );
};

export default Stamp;
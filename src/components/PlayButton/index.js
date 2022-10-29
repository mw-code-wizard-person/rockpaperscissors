import "./PlayButton.css";

const PlayButton = props => {
    const { onClick, children, disabled } = props;

    if (disabled){
        return (
            <button className="play-button play-button-disabled">
              {children}
            </button>
        )
    } else {
        return (
            <button className="play-button play-button-enabled" onClick={onClick}>
              {children}
            </button>
        )
    }
};

export default PlayButton;
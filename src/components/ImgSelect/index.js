import './ImgSelect.css'

const ImgSelect = props => {
    const {image,label,onClick,selected,notClickable,dark} = props;

    const getImageClassName = () => {
        if (notClickable) {
            if (selected) {
                return "img-select-img-container-not-clickable-selected";
            }
            if (dark){
                return "img-select-img-container-not-clickable-dark";
            }
            return "img-select-img-container-not-clickable";
        }
        if (selected) {
            return "img-select-img-container img-select-img-container-selected";
        }
        return "img-select-img-container"
    }

    return <div className="img-select-main" onClick={onClick}>
        <img className={getImageClassName()} 
        src={image} width="96" height="96"/>
        <h2 className="img-select-label">{label}</h2>
    </div>
}

export default ImgSelect;
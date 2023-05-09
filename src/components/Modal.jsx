const Modal = ({image, onclickmodal}) => {

    if (image === null) {
        return 
    } else {
        return (            
            <div className={`Overlay`} onClick={onclickmodal}>
                <div className='Modal'>
                    <img src={image.image.largeImageURL} alt={image.image.tags}/>
                </div>
            </div>
        )
    }
}

export default Modal
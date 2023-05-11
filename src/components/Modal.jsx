import { useEffect } from "react";
import PropTypes from "prop-types";

const Modal = ({image, onclickmodal}) => {
    
    useEffect(()=> {
        window.addEventListener('keydown', handleEscapeModal);
        return () => {
            window.removeEventListener('keydown', handleEscapeModal)
        }
    })

    const handleEscapeModal = evt => {
        if (evt.key === 'Escape') {
            onclickmodal();
        } 
    }

    const onclickOverlay = evt => {
        if (evt.currentTarget === evt.target) {
            onclickmodal();
        }
    }

    if (image === null) {
        return 
    } else {
        return (            
            <div className={'Overlay'} onClick={onclickOverlay}>
                <div className='Modal'>
                    <img src={image.image.largeImageURL} alt={image.image.tags}/>
                </div>
            </div>
        )
    }
}

Modal.propTypes = {
    image: PropTypes.object,
    onclickmodal: PropTypes.func
  }
  

export default Modal

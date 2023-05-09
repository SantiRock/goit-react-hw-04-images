import React, { useState, useEffect } from "react";
import Searchbar from "./Searchbar";
import Gallery from "./ImageGallery";
import Button from "./Button";
import Modal from "./Modal";
import Loader from "./Loader";
import Notification from "./Notification";
import search from './services/api'

let page = 1
const perPage = 12

const App = () => {
  const [images, setImages] = useState([]);
  const [modalImage, setModalImage] = useState(null)
  const [keyword, setKeyword] = useState('');
  const [message, setMessage] = useState('');
  const [showLoadMore, setLoadMore] = useState(false);
  const [showLoader, setShowLoader] = useState(false);
  const [showModal, setShowModal] = useState(false);
  
  const onChangeSearchbar = ({target}) => setKeyword(target.value)

  const onSubmit = evt => {
    evt.preventDefault()
    page = 1
    setShowLoader(true)
    setImages([])
    setLoadMore(false)
    try{
      search(keyword, page)
       .then(response => {
        if (response.hits.length === 0) {
          setMessage('No results found')
          setImages([])
          setShowLoader(false) 
          //setLoadMore(false)
        } else if (response.totalHits > 12) {
          setMessage('')
          setLoadMore(true)
          setImages(response.hits)
          setShowLoader(false) 
        } else {
          setImages(response.hits)
          setShowLoader(false) 
          //setLoadMore(false)
          setMessage('')
        }
       })
    } catch (error) {
      setMessage(`Woops, something went worng; ${error.message}`)
    }
  }

  const loadMore = () => {
    page +=1
    setShowLoader(true)
    try {
      search(keyword, page)
      .then(response => {
        let totalHits = response.totalHits;
        let totalPages = totalHits/perPage
        if(page < totalPages) {
          setImages(images.concat(response.hits))
          setShowLoader(false)
        } else {
          setImages(images.concat(response.hits))
          setLoadMore(false)
          setShowLoader(false)
        }
      })
    } catch (error) {
      this.setState({message: `Whoops, something went wrong: ${error.message}`})
      this.setState({visible: false})
    } 
  }

  const escape = () => {
    document.addEventListener('keydown', event => {
        if (event.key === 'Escape') {
          setShowModal(false)
        }
      });   
  }

  const onclickmodal = (e) => {
    if (e.currentTarget === e.target) {
      setShowModal(false)
    }
  }

  const onclickImage = (image) => {
    setModalImage(image)
    setShowModal(true)
    escape()
  }

  useEffect(() => {
    setMessage('')
  }, [keyword])

  useEffect(() => {
    if (page > 1) {
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [images])

  return (
    <div className="App">
      <Searchbar onChange={onChangeSearchbar} onSubmit={onSubmit}/>
      <Notification message={message}/>
      <Gallery images={images} onclickImage={onclickImage} />
      <Loader visible={showLoader}/>
      {showLoadMore && <Button onclick={loadMore}/>}
      {showModal && <Modal image={modalImage} onclickmodal={onclickmodal}/> }
    </div>
  )
}

export default App
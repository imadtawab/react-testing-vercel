import './CategoriesSection.scss'
import {NavLink, useNavigate} from "react-router-dom"
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BiChevronLeft, BiChevronRight } from 'react-icons/bi'
import default_category from '../../../Assets/default_category.png'
import ClientSectionStructure from '../ClientSectionStructure/ClientSectionStructure'
import { getCategories } from '../../../Store/Client/categorySlice'
export default function CategoriesSection() {
  const { isLoadingPage } = useSelector(s => s.client_category)
  const [categories , setCategories] = useState([])

  // const [isDragging, setIsDragging] = useState(false);

  // const [validingWidth , setValidingWidth] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(getCategories()).unwrap()
    .then(docs => {
      setCategories(docs.data);
    }).catch(err => console.log(err))
  }, [])
  


  let coursel = document.getElementById("coursel")

  // dragging
  let mouseDown = false
  let startX, startScrollLeft

  window.onresize = () => {
    let widthItem = coursel.querySelector(".categorie").offsetWidth
    let widthCoursel = coursel.offsetWidth
    
    coursel.style.gridAutoColumns = `${100 / Math.floor(widthCoursel / 160)}%`
   
  }
  useEffect(() => {
    if(coursel) {
      coursel.style.gridAutoColumns = `${100 / Math.floor(coursel.offsetWidth / 160)}%`
    }
  }, [coursel])
  
  function startScrollFunc(pageX) {   
    mouseDown = true
    startX = pageX
    // setIsDragging(false);  // Reset the dragging flag
    // startScrollLeft = coursel.scrollLeft
    startScrollLeft = +coursel.dataset.scrollx
    coursel.style.transition = "transform 0s"
  }
  const mouseDownHandle = (e) => {
    coursel.style.cursor = "grab"
    startScrollFunc(e.pageX)
  }
  const touchStartHandle = (e) => {
    startScrollFunc(e.touches[0].pageX)
  }
  function endScrollFunc(pageX) {
    mouseDown = false
    coursel.style.transition = null
    let widthItem = coursel.querySelector(".categorie").offsetWidth
    let widthCoursel = coursel.offsetWidth
    let widthAllItems  = widthItem * coursel.children.length


        // let widthItem = 180
        // let widthAllItems  = widthItem * 8
        // let widthCoursel = widthItem * 5
    let newScroll = (startScrollLeft - (pageX - startX))

    let newScrollRound = Math.round(newScroll / widthItem) * widthItem

    if(-newScrollRound <= 0 && newScrollRound + widthCoursel <= widthAllItems){
      coursel.setAttribute("data-scrollx" , newScrollRound)
      coursel.style.transform = `translateX(${-newScrollRound}px)`
    } 
    // handle overflow scroll
    if(newScroll < 0) {
      coursel.setAttribute("data-scrollx" , 0)
      coursel.style.transform = `translateX(${0}px)`
      return
    }
    if (newScroll + widthCoursel > widthAllItems) {
      coursel.setAttribute("data-scrollx" , widthAllItems - widthCoursel)
      coursel.style.transform = `translateX(${-(widthAllItems - widthCoursel)}px)`
      return
    }
    
  }
  const mouseUpHandle = (e) => {
    coursel.style.cursor = "default"
    endScrollFunc(e.pageX)

  }
  const touchEndHandle = (e) => {
    endScrollFunc(e.changedTouches[0].pageX)
  }
  function moveScrollFunc(pageX) {

    // if (!isDragging) setIsDragging(true);  // Set dragging to true when the user moves

    // let widthItem = coursel.querySelector(".categorie").offsetWidth
    // let widthCoursel = coursel.offsetWidth
    // let widthAllItems  = widthItem * coursel.children.length
    
    if(mouseDown) {
      
      let widthItem = coursel.querySelector(".categorie").offsetWidth
      let widthAllItems  = widthItem * coursel.children.length
      let widthCoursel = coursel.offsetWidth
      let newScroll = (startScrollLeft - (pageX - startX))
    if(newScroll < 0) {
      coursel.setAttribute("data-scrollx" , newScroll * .25)
      coursel.style.transform = `translateX(${-(newScroll * .25)}px)`
      return
    }
    if (newScroll + widthCoursel > widthAllItems) {
      coursel.setAttribute("data-scrollx" , (widthAllItems - widthCoursel + ((widthAllItems - widthCoursel - newScroll) * -.25)))
      coursel.style.transform = `translateX(${-(widthAllItems - widthCoursel + ((widthAllItems - widthCoursel - newScroll) * -.25))}px)`
      return
    }
        coursel.setAttribute("data-scrollx" , newScroll)
        coursel.style.transform = `translateX(${-newScroll}px)`
    coursel.style.cursor = "grabbing"
    }
  }
  const mouseMoveHandle = (e) => {
    moveScrollFunc(e.pageX)
  }
  const touchMoveHandle = (e) => {
    moveScrollFunc(e.touches[0].pageX)
  }
  const blurHandle = (e) => {
  mouseDown && mouseUpHandle(e)
  }
  const scrollToLeftBtnHandle = () => {
    startScrollLeft = +coursel.dataset.scrollx
    let widthCoursel = coursel.offsetWidth
    let newScroll = startScrollLeft - widthCoursel
    if(-newScroll >= 0) {
        coursel.setAttribute("data-scrollx" , 0)
        coursel.style.transform = `translateX(${0}px)`
    }else {
             coursel.setAttribute("data-scrollx" , newScroll)
        coursel.style.transform = `translateX(${-newScroll}px)`
    } 
  }
  const scrollToRightBtnHandle = () => {

    startScrollLeft = +coursel.dataset.scrollx
    let widthItem = coursel.querySelector(".categorie").offsetWidth
    let widthAllItems  = widthItem * coursel.children.length
    let widthCoursel = coursel.offsetWidth
    let newScroll = startScrollLeft + widthCoursel
    if(widthAllItems <= widthCoursel) return
    if(-newScroll <= 0) {
      if(newScroll + widthCoursel >= widthAllItems) {
        coursel.setAttribute("data-scrollx" , widthAllItems - widthCoursel)
        coursel.style.transform = `translateX(${-(widthAllItems - widthCoursel)}px)`
      }else{
        coursel.setAttribute("data-scrollx" , newScroll)
        coursel.style.transform = `translateX(${-newScroll}px)`
      }
    } 
  }

  const courselClickHandler = (e, _id) => {
    e.preventDefault()
    if(startX === e.pageX) navigate(`/products?categories=${_id}`)
  }
  return (
    <>
        <ClientSectionStructure loading={isLoadingPage} length={categories.length} subTitle="Categories" title="Our Popular Categories">
            <div className="CategoriesSection">
              <div className="coursel-container">
                <div onClick={scrollToLeftBtnHandle} className="left-arrow"><BiChevronLeft/></div>
                <div className="coursel-hidden">
                  <div data-scrollx="0" onMouseLeave={blurHandle} onMouseMove={mouseMoveHandle} onTouchMove={touchMoveHandle} onMouseDown={mouseDownHandle} onTouchStart={touchStartHandle} onMouseUp={mouseUpHandle} onTouchEnd={touchEndHandle} id='coursel' className={"coursel"}>
                    {categories.map(catg => (
                        <NavLink onClick={(e) => courselClickHandler(e, catg._id)} to={`/products?categories=${catg._id}`} draggable="false" key={catg._id} className="categorie">
                        <div className="categorie-image">
                          {catg.image ? (
                            <>
                            {/* <img loading='lazy' src={`${catg.image}`} alt="" draggable="false"/> */}
                            <img loading='lazy' src={`${process.env.REACT_APP_SERVER_DOMAINE}/media/${catg.image}`} alt="" draggable="false"/>
                            </>
                            ) : (
                              <img loading='lazy' src={default_category} alt="" draggable="false"/>
                              )}
                        </div>
                        <div className="categorie-info">
                          <h2>{catg.name}</h2>
                          <p>{catg.number} product{catg.number > 1 ? "s" : ""}</p>
                        </div>
                      </NavLink>
                    ))}
                  </div>
                </div>
                <div onClick={scrollToRightBtnHandle} className="right-arrow"><BiChevronRight/></div>
              </div>
            </div>
        </ClientSectionStructure>
    </>
  )
}

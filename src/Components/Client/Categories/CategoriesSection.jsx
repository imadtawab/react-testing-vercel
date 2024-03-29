import './CategoriesSection.scss'
import ClientSectionStructure from '../ClientSectionStructure/ClientSectionStructure'
import {NavLink} from "react-router-dom"
import {FaArrowRight} from 'react-icons/fa'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { client_getCategories } from '../../../store/client_productsSlice'
import { BiChevronLeft, BiChevronRight } from 'react-icons/bi'
import Loading from '../../Loading/Loading'
import default_category from '../../../assets/default_category.png'
export default function CategoriesSection() {
  const {client_getCategories_Status} = useSelector(s => s.client_products)
  const [categories , setCategories] = useState([])
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(client_getCategories()).then(docs => {
      if (docs.type === "client_getCategories/fulfilled") {
        // console.log(docs);
        if(docs.payload?.data) setCategories(docs.payload?.data)
      }
    })
  }, [])
  let categoriess = [
    {id:1 , name: "smartphones" ,   slug: "smartphones" ,   number: 1 ,   image:"https://www.ramzystore.com/wp-content/uploads/2023/10/smartphones-categories-220x220-1.png"},
    {id:2 , name: "smartwatches" ,  slug: "smartwatches" ,  number: 28 ,  image:"https://www.ramzystore.com/wp-content/uploads/2023/10/Smart-watches-and-bands-categorie-220x220-1.png"},
    {id:3 , name: "gadgets" ,       slug: "gadgets" ,       number: 5 ,   image:"https://www.ramzystore.com/wp-content/uploads/2023/11/gadgets-categories.jpg"},
    {id:4 , name: "audio" ,         slug: "audio" ,         number: 10 ,  image:"https://www.ramzystore.com/wp-content/uploads/2023/10/audio-categories-220x220-1.png"},
    {id:5 , name: "chargeurs" ,     slug: "chargeurs" ,     number: 9 ,   image:"https://www.ramzystore.com/wp-content/uploads/2023/10/chargeurs-categories-220x220-1.png"},
    {id:6 , name: "câble" ,         slug: "câble" ,         number: 3 ,   image:"https://www.ramzystore.com/wp-content/uploads/2022/09/wood-accessories-category-3-2.jpg"},
    {id:7 , name: "pochettes" ,     slug: "pochettes" ,     number: 14 ,  image:"https://www.ramzystore.com/wp-content/uploads/2023/10/pochettes-categories-220x220-1.png"},
    {id:8 , name: "power banks" ,   slug: "power_banks" ,   number: 3 ,   image:"https://www.ramzystore.com/wp-content/uploads/2022/09/wood-accessories-category-6-1.jpg"},
  ]
  let coursel = document.getElementById("coursel")


  // dragging
  let mouseDown = false
  let startX, startScrollLeft

  window.onresize = () => {
    console.log(Math.floor(coursel.offsetWidth / 160));
    coursel.style.gridAutoColumns = `${100 / Math.floor(coursel.offsetWidth / 160)}%`
  }
  useEffect(() => {
    if(coursel) {
      coursel.style.gridAutoColumns = `${100 / Math.floor(coursel.offsetWidth / 160)}%`
    }
  }, [coursel])
  
  function startScrollFunc(pageX) {
        // console.log(e.pageX , "down")
    // coursel.scrollLeft = e.pageX
    mouseDown = true
    startX = pageX
    // startScrollLeft = coursel.scrollLeft
    startScrollLeft = +coursel.dataset.scrollx
    coursel.style.transition = "transform 0s"
    console.log(pageX , "start scroll");
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
    let widthAllItems  = widthItem * coursel.children.length
    let widthCoursel = coursel.offsetWidth

    if(widthAllItems <= widthCoursel) return
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
    if(mouseDown) {
      // let widthItem = 180
      // let widthAllItems  = widthItem * 8
      // let widthCoursel = widthItem * 5
      let widthItem = coursel.querySelector(".categorie").offsetWidth
      let widthAllItems  = widthItem * coursel.children.length
      let widthCoursel = coursel.offsetWidth
      let newScroll = (startScrollLeft - (pageX - startX))
      // console.log(newScroll , "widthAllItems");
      // if(widthAllItems <= widthCoursel) return
      // console.log(e.pageX , "move")
      // coursel.scrollLeft = startScrollLeft - (e.pageX - startX)
      // if(-newScroll <= 0 && newScroll + widthCoursel <= widthAllItems){
            // handle overflow scroll
    if(newScroll < 0) {
      coursel.setAttribute("data-scrollx" , newScroll * .25)
      coursel.style.transform = `translateX(${-(newScroll * .25)}px)`
      // coursel.style.transition = null
      return
    }
    if (newScroll + widthCoursel > widthAllItems) {
      // coursel.setAttribute("data-scrollx" , widthAllItems - widthCoursel)
      // coursel.style.transform = `translateX(${-(widthAllItems - widthCoursel)}px)`
      coursel.setAttribute("data-scrollx" , (newScroll + widthCoursel) * .25)
      coursel.style.transform = `translateX(${-(newScroll + widthCoursel) * .25}px)`
      // coursel.style.transition = null
      return
    }
        coursel.setAttribute("data-scrollx" , newScroll)
        coursel.style.transform = `translateX(${-newScroll}px)`
        // coursel.style.transition = "transform 0"
      // } 
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
  //   mouseDown = false
  mouseDown && mouseUpHandle(e)
  }
  const scrollToLeftBtnHandle = () => {
    startScrollLeft = +coursel.dataset.scrollx
    let widthItem = coursel.querySelector(".categorie").offsetWidth
    let widthAllItems  = widthItem * coursel.children.length
    let widthCoursel = coursel.offsetWidth
    let newScroll = startScrollLeft - widthCoursel
    // console.log(e.pageX , "move")
    // coursel.scrollLeft = startScrollLeft - (e.pageX - startX)
    if(-newScroll >= 0) {
      console.log(newScroll);
      // if(newScroll - widthCoursel <= 0) {
      //   coursel.setAttribute("data-scrollx" , 0)
      //   coursel.style.transform = `translateX(${0}px)`
      // }else{
        coursel.setAttribute("data-scrollx" , 0)
        coursel.style.transform = `translateX(${0}px)`
      // }
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
    // console.log(e.pageX , "move")
    // coursel.scrollLeft = startScrollLeft - (e.pageX - startX)
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
  return (
    <>
        <ClientSectionStructure subTitle="Categories" title="Our Popular Categories">
    <Loading status={client_getCategories_Status}>
            <div className="CategoriesSection">
              <div className="coursel-container">
                <div onClick={scrollToLeftBtnHandle} className="left-arrow"><BiChevronLeft/></div>
                <div className="coursel-hidden">
                  <div data-scrollx="0" onMouseLeave={blurHandle} onMouseMove={mouseMoveHandle} onTouchMove={touchMoveHandle} onMouseDown={mouseDownHandle} onTouchStart={touchStartHandle} onMouseUp={mouseUpHandle} onTouchEnd={touchEndHandle} id='coursel' className="coursel">
                    {categories.map(catg => (
                        <NavLink onClick={e => e.preventDefault()} draggable="false" to={`/collection/${catg.slug}`} key={catg._id} className="categorie">
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
    </Loading>
        </ClientSectionStructure>
    </>
  )
}

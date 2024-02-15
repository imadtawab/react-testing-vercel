import { NavLink } from 'react-router-dom'
import CheckBox from '../../Components/CheckBox/CheckBox'
import PageStructure from '../../Components/PageStructure/PageStructure'
import SectionStructure from '../../Components/SectionStructure/SectionStructure'
import './Categories.scss'
import CercleLoading from '../../Components/CercleLoading/CercleLoading'
import { BsTrash } from 'react-icons/bs'
import { BiCloset, BiEdit, BiX } from 'react-icons/bi'
import ShadowLoading from '../../Components/ShadowLoading/ShadowLoading'
import Loading from '../../Components/Loading/Loading'
import { useEffect, useState } from 'react'
import InputBox, { SelectBox, TextAreaBox } from '../../Components/InputBox/InputBox'
import Btn from '../../Components/Btn/Btn'
import { v4 as uuidv4 } from 'uuid';
import { useDispatch, useSelector } from 'react-redux'
import { changeCategorieVisibility, checkCategorySlug, createCategories, deleteCategorie, deleteManyStatus_categories, getCategories, updateCategorie, updateManyStatus_categories } from '../../store/categoriesSlice'
import Alert from '../../Components/Alert/Alert'
import EmptyErrorSection from '../../Components/EmptyErrorSection/EmptyErrorSection'
import default_product_img from "../../assets/product-default.png"
import ModalValidation from '../../Components/ModalValidation/ModalValidation'

export default function Categories() {
  const {categories,createCategoriesStatus,getCategoriesStatus,deleteCategorieStatus,changeCategorieVisibilityStatus,updateCategorieStatus , updateManyStatus_categories_Status , deleteManyStatus_categories_Status} = useSelector(s => s.categories)
    const [addNewProductSection, setAddNewProductSection] = useState(false)
    const dispatch = useDispatch()
    const [itemDeletedId, setItemDeletedId] = useState([])
    const [oldCategorie, setOldCategorie] = useState(false)
    const [itemChecked, setItemChecked] = useState(null)
    const [itemsSelected , setItemsSelected] = useState([])
  useEffect(() => {
    dispatch(getCategories())
    dispatch({type: "categories/states" , payload: ["createCategoriesStatus","getCategoriesStatus","deleteCategorieStatus","changeCategorieVisibilityStatus","updateCategorieStatus" , "updateManyStatus_categories_Status" , "deleteManyStatus_categories_Status"]}) 

  }, [])
  const publishedHandle = (eo ,id, visibility) => {
    // console.log(eo.target.className);
        console.log(eo.target,id,visibility,9);
    dispatch(changeCategorieVisibility({id,visibility}))
    setItemChecked(id)
  };
  const deleteProductHandle = (catg) => {
    console.log(catg);
    dispatch(deleteCategorie(catg)).then(docs => {
        console.log(docs.payload);
        // setItemDeletedId(itemDeletedId.filter(id => id !== docs.payload.id))
        // dispatch(getCategories())
      })
    setItemDeletedId([...itemDeletedId , catg._id])
  }
  const selectItemHandle = (selectType) => {
    let selectInputs = document.querySelectorAll(".CheckBox input[type='checkbox'][name='selectOne']")
    let selectAllInput = document.getElementById("selectAll")
    if (selectType === "selectAll") {
      console.log(selectAllInput.checked);
      selectInputs.forEach(ipt => {
        ipt.checked = selectAllInput.checked
      })
    }
    let selectInputsChecked = document.querySelectorAll(".CheckBox input[type='checkbox'][name='selectOne']:checked")
    // if(selectInputsChecked.length){
    //   setBtnDisabled(true)
    // }else{
    //   setBtnDisabled(false)
    // }
    let result = []
    selectInputsChecked.forEach(i => {
      result.push(i.id)
    })
    console.log(selectInputsChecked);
    setItemsSelected(result)
    console.log(itemsSelected);
  }
  const UpdateManyHandle = (e) => {
    dispatch(updateManyStatus_categories({items: itemsSelected, status: e.target.value})).then((docs) => {
      console.log(docs);
      if(docs.type === "updateManyStatus_categories/fulfilled"){
        let selectInputs = document.querySelectorAll(".CheckBox input[type='checkbox'][name='selectOne']")
        let selectAllInput = document.getElementById("selectAll")

          selectAllInput.checked = false
          selectInputs.forEach(ipt => {
            ipt.checked = false
          })
          document.getElementById("selectManyBtn").value = ""
          setItemsSelected([])
      }
    })
  }
  const deleteManyHandle = () => {
    dispatch(deleteManyStatus_categories(itemsSelected)).then((docs) => {
      console.log(docs);
      if(docs.type === "deleteManyStatus_categories/fulfilled"){
        let selectInputs = document.querySelectorAll(".CheckBox input[type='checkbox'][name='selectOne']")
        let selectAllInput = document.getElementById("selectAll")

          selectAllInput.checked = false
          selectInputs.forEach(ipt => {
            ipt.checked = false
          })
          setItemsSelected([])
      }
    })
  }
  const showModal = (show , nextFunc,modalInfo) => {
    const action = {
      type : "modal/show" ,
      payload : {
          showModal: show,
          nextFunc: nextFunc,
          modalInfo
        }
      }
      dispatch(action)
  }
  const allStatusModal = [
    createCategoriesStatus,
    deleteCategorieStatus,
    changeCategorieVisibilityStatus,
    updateCategorieStatus ,
    updateManyStatus_categories_Status ,
    deleteManyStatus_categories_Status
  ]
  return (
    <>
     <ModalValidation status={{
      success: allStatusModal.filter(a => a.success)[0] ? true : false,
      error: allStatusModal.filter(a => a.error)[0] ? true : false,
      isLoading: allStatusModal.filter(a => a.isLoading)[0] ? true : false
      }}/>
    {/* {changeCategorieVisibilityStatus.isLoading && (
      <ShadowLoading/>
    )} */}
            {createCategoriesStatus.success && (
      <Alert type="success">{createCategoriesStatus.success}</Alert>
    )}
    {deleteCategorieStatus.success && (
      <Alert type="success">{deleteCategorieStatus.success}</Alert>
    )}
        {deleteCategorieStatus.error && (
      <Alert type="danger">{deleteCategorieStatus.error}</Alert>
    )}
        {changeCategorieVisibilityStatus.success && (
      <Alert type="success">{changeCategorieVisibilityStatus.success}</Alert>
    )}
        {changeCategorieVisibilityStatus.error && (
      <Alert type="danger">{changeCategorieVisibilityStatus.error}</Alert>
    )}
            {updateCategorieStatus.success && (
      <Alert type="success">{updateCategorieStatus.success}</Alert>
    )}
        {updateCategorieStatus.error && (
      <Alert type="danger">{updateCategorieStatus.error}</Alert>
    )}
                    {updateManyStatus_categories_Status.success && (
        <Alert type="success">{updateManyStatus_categories_Status.success}</Alert>
      )}
                      {updateManyStatus_categories_Status.error && (
        <Alert type="danger">{updateManyStatus_categories_Status.error}</Alert>
      )}
                            {updateManyStatus_categories_Status.isLoading && (
        <ShadowLoading/>
      )}
                      {deleteManyStatus_categories_Status.success && (
        <Alert type="success">{deleteManyStatus_categories_Status.success}</Alert>
      )}
                      {deleteManyStatus_categories_Status.error && (
        <Alert type="danger">{deleteManyStatus_categories_Status.error}</Alert>
      )}
                            {deleteManyStatus_categories_Status.isLoading && (
        <ShadowLoading/>
      )}
    <PageStructure title={"Categories"} button={!addNewProductSection && {onClick:()=>{
      setOldCategorie(false)
      setAddNewProductSection(true)
      },type:"button",name:"Add New Categorie"}}>
        <div className='Categories'>
        {addNewProductSection ? (
        <AddNewCategories setAddNewProductSection={setAddNewProductSection} oldCategorie={oldCategorie} setOldCategorie={setOldCategorie}/>
    ) : (
      <>
        <Loading status={getCategoriesStatus}>
        {(getCategoriesStatus.success || []).length ? (
        <>
        <div className="actions-head">
        <Btn disabled={!itemsSelected.length} style={{position:"relative"}} element="button" btnStyle="bg" color="primary">
        <div className="icon"><BiEdit /></div> Update Many
                <select onChange={(e) => showModal(true,() => UpdateManyHandle(e), {
      title: "Update Many Categories",
      message: "Vous voulez vraiment modifier les categories selectionés ?",
      type: "info"
    })} disabled={!itemsSelected.length} name="selectManyBtn" id="selectManyBtn">
                    <option selected disabled value="">Status :</option>
                    <option value="true">Publish</option>
                    <option value="false">Private</option>
                </select>
        </Btn>
        <Btn onClick={() => showModal(true,deleteManyHandle, {
      title: "Delete Many Categories",
      message: "Vous voulez vraiment supprimer les categories selectionés ?",
      type: "info"
    })} disabled={!itemsSelected.length} element="button" btnStyle="bg" color="danger"><div className="icon"><BsTrash/></div> Delete Many</Btn>
        </div>
        <SectionStructure pd="none">
        
        <div className="products-table">
          <table>
            <thead>
              <tr>
                <td>
                  <CheckBox onChange={() => selectItemHandle("selectAll")} name={"selectAll"} id="selectAll"/>
                </td>
                <td>image/icon</td>
                <td>name</td>
                <td>published</td>
                <td>actions</td>
              </tr>
            </thead>
            <tbody>
              {console.log(getCategoriesStatus.success)}
              {(getCategoriesStatus.success || []).map((catg, ind) => (
                  <tr key={catg._id}>
                    <td>
                      <CheckBox
                              onChange={() => selectItemHandle("selectOne")}
                              name={"selectOne"}
                              id={`${catg._id}`}
                            />
                    </td>
                    <td>
                      <div style={{justifyContent: "center"}} className="product-name">
                        <div className="img">
                          <img src={catg.image ?`http://localhost:3500/media/${catg.image}` : default_product_img} alt="" />
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="categorie">{catg.name}</div>
                    </td>
                    <td>
                      <div
                        onClick={(eo) => showModal(true,() => publishedHandle(eo ,catg._id, `${catg.publish}`), {
                          title: "Change Visibility",
                          message: "Vous voulez vraiment modifier le visibility ?",
                          type: "info"
                        })}
                        className={`published ${catg.publish === "true" ? "checked" : "notChecked"}`}
                      >
                        {/* {changeCategorieVisibilityStatus.isLoading ? (
                          <div className={"btnForClick loading"}></div>
                        ): (
                          <div className={"btnForClick"}></div>
                        )} */}
                        <div className={"btnForClick" + ((changeCategorieVisibilityStatus.isLoading && itemChecked === catg._id) ? " loading" : "")}></div>
                      </div>
                    </td>
                    <td>
                      <div className="actions">
                        <dev onClick={() => {
                          setOldCategorie(catg)
                          setAddNewProductSection(true)
                        }} className="edit">
                          <BiEdit />
                        </dev>
                        <div className="delete">
                          {deleteCategorieStatus.isLoading && itemDeletedId.indexOf(catg._id) !== -1 ? <CercleLoading size="l"/> : <BsTrash onClick={() => showModal(true,() => deleteProductHandle(catg), {
      title: "Delete Category",
      message: "Vous voulez vraiment supprimer ce categorie ?",
      type: "info"
    })} /> }
                          
                          {/* <BsTrash onClick={() => deleteProductHandle(prod._id)} /> */}
                        </div>
                      </div>
                    </td>
                  </tr>
              ))}
            </tbody>
          </table>
          {/* {(getCategoriesStatus.success || []).length ? (false
        ) : (
            <EmptyErrorSection/>
        )} */}
        </div>
      </SectionStructure>
      </> ) : (
            <EmptyErrorSection/>
        )}
        </Loading>
      </>
    )}

        </div>
    </PageStructure>
    </>
  )
}


export function AddNewCategories({setAddNewProductSection , oldCategorie,setOldCategorie}) {
  const {createCategoriesStatus,updateCategorieStatus , checkCategorySlug_Status} = useSelector(s => s.categories)
    const dispatch = useDispatch()
    const types = ["dropDown", "colorSpans", "checkBox"]
    const [description , setDescription] = useState({
      value: "",
      error: false
    })
    const [name , setName] = useState({
      value: "",
      error: false
    })
    const [slug , setSlug] = useState({
      value: "",
      error: false
    })
    const [publish , setPublish] = useState("true")
    const [imageShow,setImageShow] = useState({src: "" , post: ""})
    const setImageHandle = (eo) => {
      console.log(eo);
      const file = eo.target.files[0];
      const reader = new FileReader();
      reader.onload = function (e) {
        setImageShow(prev => {
          return {
            ...prev,
            src: e.target.result
          }
        })
      };
      // you have to declare the file loading
      reader.readAsDataURL(file);
      setImageShow(prev => {
        return {
          ...prev,
          post: file
        }
      })
    };
    const addCategoriesHandle = () => {
      if(name.value === ""){
        setName(prev => ({...prev,error:"Please Enter Name"}))
        return
      }
      let form = {
        description: description.value,
        name: name.value,
        slug: slug.value,
        publish,
        image: imageShow.post,
        delete: !imageShow.src && !imageShow.post ? true : ""
      }
      function createFormData() {
        const formData = new FormData();
  
        Object.keys(form).forEach((key) => {
          formData.append(key, form[key]);
        });
        return formData;
      }
      console.log(Categories);
      if(!oldCategorie){
        dispatch(createCategories({form: createFormData()})).then(
          (docs) => {
            if(docs.type === "createCategories/fulfilled"){
              setAddNewProductSection(false)
              setOldCategorie(false)
              dispatch(getCategories())
            }
          }
        )
      }else{
        dispatch(updateCategorie({form:createFormData(),_id:oldCategorie._id,image:oldCategorie.image})).then(
          (docs) => {
            if(docs.type === "updateCategorie/fulfilled"){
              setAddNewProductSection(false)
              setOldCategorie(false)
              dispatch(getCategories())
            }
          }
        )
      }
    }
    useEffect(()=>{
      if(oldCategorie !== false){
        setDescription({value: oldCategorie.description,error: false})
        setName({value: oldCategorie.name,error: false})
        setSlug({value: oldCategorie.slug,error: false})
        setPublish(oldCategorie.publish)
        setImageShow({src: oldCategorie.image , post: false})
      }
    },[oldCategorie])
    const showModal = (show , nextFunc,modalInfo) => {
      const action = {
        type : "modal/show" ,
        payload : {
            showModal: show,
            nextFunc: nextFunc,
            modalInfo
          }
        }
        dispatch(action)
    }
    const [activeCheckUrlKey , setActiveCheckUrlKey] = useState(true)
    const checkUrlKeyHandle = (eo) => {
      setSlug({value:eo.target.value, error:false})
      if(activeCheckUrlKey){
        setActiveCheckUrlKey(false)
        setTimeout(() => {
          // console.log(eo.target.value , activeCheckUrlKey)
          setActiveCheckUrlKey(true)
          if(oldCategorie?._id){
            dispatch(checkCategorySlug({slug: eo.target.value , _id: oldCategorie?._id}))
          }else {
            dispatch(checkCategorySlug({slug: eo.target.value}))
          }
        }, 2000);
      }
    }
    useEffect(() => {
      // createCategoriesStatus,updateCategorieStatus
      dispatch({type: "categories/states" , payload: ["checkCategorySlug_Status"]}) 
    }, [])
  return (
    <>
    {createCategoriesStatus.error && (
      <Alert type="danger">{createCategoriesStatus.error}</Alert>
    )}
        {updateCategorieStatus.error && (
      <Alert type="danger">{updateCategorieStatus.error}</Alert>
    )}
    {(createCategoriesStatus.isLoading || updateCategorieStatus.isLoading) && (
      <ShadowLoading/>
    )}
    <div className="AddNewCategories">
            <div className="parent">
            <SectionStructure title="New Categorie">
            <div className="form">
                <InputBox error={name.error} onChange={(e) => setName({value:e.target.value, error:false})} value={name.value} required type="text" name="name" id="name" placeholder="Name" label="Name" />
                <InputBox
                      value={slug.value}
                      // onChange={checkUrlKeyHandle}
                      onChange={checkUrlKeyHandle}
                      type="text"
                      name="Slug"
                      id="categorySlug"
                      placeholder="Slug"
                      label="Slug"
                      leftSlug="http://localhost:3000/categories/"
                      slugWrap={true}
                      required
                      checkValueInDB={{
                        ...checkCategorySlug_Status.success ,
                        isLoading:checkCategorySlug_Status.isLoading,
                        pauseCheckingDuration:  !activeCheckUrlKey
                      }}
                    />
                <TextAreaBox error={description.error} onChange={(e) => setDescription({value:e.target.value, error:false})} value={description.value} required type="text" name="description" id="description" placeholder="Description" label="Description" />

                {/* <SelectBox onChange={(e) => {
                  setType(e.target.value)
                  setArrayValues([])
                  setCreateValue({value: "",error: false})
                  setColorValue({value: "",error: false})
                  }} required name="type" id="type" label="Type :">
                    {types.map((opt) => (
                        <option selected={opt === type} value={opt}>
                          {opt}
                        </option>
                    ))}
                </SelectBox> */}
                <SelectBox onChange={(e) => setPublish(e.target.value)} required name="publish" id="publish" label="Visbility">
                    {["true","false"].map(opt => (
                        <option selected={opt === publish} value={opt}>
                        {opt === "true" ? "Publish" : "Private"}
                      </option>
                    ))}
                </SelectBox>
            </div>
            </SectionStructure>
            <SectionStructure title={"Image & Icon"}>
              <div className="image-and-icon">
                <div className={"image_show" + (imageShow.src ? " no-border" : "")}>
                      <img src={(imageShow.post ? imageShow.src : imageShow.src ? `http://localhost:3500/media/${imageShow.src}` : default_product_img)} alt=""/>
                </div>
                <div className="controlles">
                    <>
                    {imageShow.src ? (
                      <>
                     <label onClick={() => {
                      setImageShow({src: false , post: false})
                      document.getElementById("addImage").value = ""
                     }}>
                    <Btn width="full" btnStyle="bg" color="danger" element="button">
                      Delete
                      </Btn>
              </label> 
              </>
                    ) : false}
                <label>
                        <input onChange={(e) => setImageHandle(e)} type="file" id='addImage'/>
                        <Btn htmlFor="addImage" width="full" btnStyle="bg" color="success" element="label">
                    {/* <label htmlFor="addImage"> */}
                      {imageShow.src ? "Update" : "Add Image"}
                          
                      {/* </label> */}
                          </Btn>
                  </label>
                    </>
                
                </div>
              </div>
            </SectionStructure>
            </div>
            <div className="footer-buttons">
            <Btn onClick={() => {
              setAddNewProductSection(false)
              setOldCategorie(false)
              }} btnStyle="outline" color="danger" element="button">Cancel</Btn>
            <Btn loading={createCategoriesStatus.isLoading || updateCategorieStatus.isLoading} onClick={() => showModal(true,addCategoriesHandle, {
      title: oldCategorie ? "Edit category" : "Create category",
      message: oldCategorie ? "Vous voulez vraiment modifier ce categorie ?" : "Vous voulez vraiment create ce categorie ?",
      type: "info"
    })} btnStyle="bg" color="success" element="button">{oldCategorie ? "Edit Categorie" : "Add Categorie"}</Btn>
            </div>
        </div>
    </>
  )
}
import PageStructure from "../../Components/PageStructure/PageStructure";
import SectionStructure from "../../Components/SectionStructure/SectionStructure";
import "./NewProduct.scss";
import React, { useState, useRef, useEffect } from "react";
import JoditEditor from "jodit-react";
import { BiRefresh, BiSolidCamera } from "react-icons/bi";
import { GrRefresh } from "react-icons/gr";
import Btn from "../../Components/Btn/Btn";
import AddVariants from "../AddVariants/AddVariants";
import InputBox, {
  SelectBox,
  TextAreaBox,
} from "../../Components/InputBox/InputBox";
import GridSections from "../../Components/GridSections/GridSections";
import { useDispatch, useSelector } from "react-redux";
import { checkProductUrlKey, newProduct, updateProduct } from "../../store/productsSlice";
import Alert from "../../Components/Alert/Alert";
import ShadowLoading from "../../Components/ShadowLoading/ShadowLoading";
import { useNavigate } from "react-router";
import { getCategories } from "../../store/categoriesSlice";
import Loading from "../../Components/Loading/Loading";
import CercleLoading from "../../Components/CercleLoading/CercleLoading";
import ModalValidation from '../../Components/ModalValidation/ModalValidation'

export default function NewProduct({ editProduct, productData }) {
  const { newProductStatus, updateProductStatus , checkProductUrlKey_Status} = useSelector(
    (state) => state.products
  );
  const {getCategoriesStatus} = useSelector(s => s.categories)
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const editor = useRef(null);
  const [content, setContent] = useState("");
  const [srcImages, setSrcImages] = useState([]);
  const [srcImagesPost, setSrcImagesPost] = useState([]);
  const [AddVariantsSection, setAddVariantsSection] = useState(false);
  const [btnIsAddVariants, setBtnIsAddVariants] = useState(false);
  const [productForVariants, setProductForVariants] = useState(null);
  const [form, setForm] = useState({
    name: "",
    sku: "",
    categorie: "",
    originalPrice: "",
    salePrice: "",
    discount: "",
    urlKey: "",
    metaTitle: "",
    metaKeywords: "",
    metaDescription: "",
    status: true,
    visibility: true,
    quantite: "",
  });
  const [categories,setCategories] = useState([])
  const changeFormHandle = (eo) => {
    setForm({ ...form, [eo.target.name]: eo.target.value });
    // setForm(null)
    // console.log(form , srcImages , "aaaaaaa \n" , srcImagesPost);
  };
  const config = {
    readonly: false, // all options from https://xdsoft.net/jodit/docs/,
    placeholder: "Start typings...",
    minHeight: 250,
  };
  const setImageHandle = (eo) => {
    console.log(eo);
    const file = eo.target.files[0];
    const reader = new FileReader();
    // it's onload event and you forgot (parameters)
    reader.onload = function (e) {
      // var image = document.createElement("img");
      // the result image data
      setSrcImages([
        ...srcImages,
        {
          src: e.target.result,
          id: Math.random() * 50 + "_" + eo.target.value,
        },
      ]);
      console.log(srcImages, 88);
      // eo.target.value = "";
      // image.src = e.target.result;
      // document.body.appendChild(image);
    };
    // you have to declare the file loading
    reader.readAsDataURL(file);
    //  setSrcImagesPost(file)
    setSrcImagesPost([...srcImagesPost, file]);

    //  console.log(srcImagesPost,88);
  };
  const deleteImgHandle = (eo, span) => {
    let id = eo.target.id;
    if (span) id = eo.target.parentElement.id;
    setSrcImages((prev) => {
      return prev.filter((el) => el.id !== id);
    });
    setSrcImagesPost((prev) => {
      return prev.filter(
        (el, index) => index !== srcImages.map((el) => el.id).indexOf(id)
      );
    });
  };
  const showAddVariants = () => {
    setAddVariantsSection(!AddVariantsSection);
  };

  useEffect(() => {
    if (editProduct) {
      const prod = {
        name: productData.product.name,
        sku: productData.product.sku,
        categorie: JSON.stringify(productData.product.categorie),
        originalPrice: productData.product.prices.originalPrice,
        salePrice: productData.product.prices.salePrice,
        discount: productData.product.prices.discount,
        urlKey: productData.product.searchEngineOptimize.urlKey,
        metaTitle: productData.product.searchEngineOptimize.metaTitle,
        metaKeywords: productData.product.searchEngineOptimize.metaKeywords,
        metaDescription: productData.product.searchEngineOptimize.metaDescription,
        status: productData.product.productStatus.status,
        visibility: productData.product.productStatus.visibility,
        quantite: productData.product.quantite,
        userId: productData.product.userId
      };
      setForm(prod);
      setContent(productData.product.description);
      setSrcImages((prev) =>
        productData.product.media.images.map((img) => {
          return {
            src: `${process.env.REACT_APP_SERVER_DOMAINE}/media/${img}`,
            srcApi: img,
            id: Math.random() * 50 + "_" + img,
          };
        })
      );
      setSrcImagesPost((prev) => productData.product.media.images.map((img) => img));
    }
    dispatch(getCategories())
  }, [editProduct, productData]);
  useEffect(() => {
    let allCatgs = getCategoriesStatus.success.filter(c => c.publish === "true")
    console.log(allCatgs,2111);
    setCategories(allCatgs)
  }, [getCategoriesStatus])
  useEffect(() => {
    dispatch({type: "products/states" , payload: ["newProductStatus", "updateProductStatus" , "checkProductUrlKey_Status"]}) 
    dispatch({type: "categories/states" , payload: "getCategoriesStatus"}) 
  }, [])
  
  // api
  const showVariantsPageHandle = () => {
    setBtnIsAddVariants(true);
  };
  const submitHandle = async (e) => {
    e.preventDefault();
    // if(!activeCheckUrlKey || !checkProductUrlKey_Status.success || checkProductUrlKey_Status.isLoading || checkProductUrlKey_Status.error){
    //   return false
    // }
    function createFormData() {
      const formData = new FormData();

      Object.keys(form).forEach((key) => {
        formData.append(key, form[key]);
      });

      formData.append("description", content);

      srcImagesPost.forEach((img) => {
        formData.append("images", img);
      });
      return formData;
    }
    if (!editProduct) {
      showModal(true, () => {
        dispatch(newProduct(createFormData())).then((docs) => {
          if (btnIsAddVariants) {
            setAddVariantsSection(true);
            setProductForVariants(docs.payload.data)
          } else {
            if (docs.type === "newProduct/fulfilled") {
              navigate("/admin/products");
            }
          }
        });
      } , {
        title: "Create your product",
        message: "Vous voulez vraiment ajouter votre produit ?",
        type: "info"
      })
      
    } else {
      const myId = productData.product._id,
            data = createFormData(),
            oldImages = srcImages.map((img) => img.srcApi && img.srcApi),
            allImagesForDelete = productData.product.media.images;

            showModal(true, () => {
              dispatch(
                updateProduct({ myId, data, oldImages, allImagesForDelete })
              ).then((docs) => {
                if (btnIsAddVariants) {
                  setAddVariantsSection(true);
                  setProductForVariants(docs.payload.docs.data)
                } else {
                  if (docs.type === "updateProduct/fulfilled") {
                    navigate("/admin/products");
                  }
                }
              });
            } , {
              title: "Update your product",
              message: "Vous voulez vraiment modifier votre produit ?",
              type: "info"
            })
    }
  };
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
    newProductStatus,
    updateProductStatus,
  ]
  const [activeCheckUrlKey , setActiveCheckUrlKey] = useState(true)
  const checkUrlKeyHandle = (eo) => {
    changeFormHandle(eo)
    // && eo.target.value.trim() !== productData?.product?.searchEngineOptimize?.urlKey.trim()
    if(activeCheckUrlKey){
      setActiveCheckUrlKey(false)
      setTimeout(() => {
        // console.log(eo.target.value , activeCheckUrlKey)
        setActiveCheckUrlKey(true)
        if(productData?.product?._id){
          dispatch(checkProductUrlKey({urlKey: eo.target.value , _id: productData?.product?._id}))
        }else {
          dispatch(checkProductUrlKey({urlKey: eo.target.value}))
        }
      }, 2000);
    }
  }
  return (
      <>
               <ModalValidation status={{
      success: allStatusModal.filter(a => a.success)[0] ? true : false,
      error: allStatusModal.filter(a => a.error)[0] ? true : false,
      isLoading: allStatusModal.filter(a => a.isLoading)[0] ? true : false
      }}/>
      {newProductStatus.error && (
        <Alert type="danger">{newProductStatus.error}</Alert>
      )}
      {updateProductStatus.error && (
        <Alert type="danger">{updateProductStatus.error}</Alert>
      )}
      {(newProductStatus.isLoading || updateProductStatus.isLoading) && (
        <ShadowLoading />
      )}
      {!AddVariantsSection && (
        <PageStructure
          title={editProduct ? "edit product" : "create a new product"}
        >
          <form onSubmit={submitHandle} className="NewProduct">
            <div className="left-sections-parent">
              <div className="left-sections">
                <SectionStructure title="general">
                  <div className="general">
                    <InputBox
                      value={form.name}
                      required
                      onChange={changeFormHandle}
                      type="text"
                      name="name"
                      id="name"
                      placeholder="Name"
                      label="Name"
                    />
                    <InputBox
                      value={form.sku}
                      onChange={changeFormHandle}
                      type="text"
                      name="sku"
                      id="sku"
                      placeholder="SKU"
                      label="SKU"
                    />
                    {getCategoriesStatus.isLoading ? (
                      <CercleLoading size="l"/>
                    ) : !getCategoriesStatus.error ? (
<>
                      {/* {JSON.stringify(getCategoriesStatus)} */}
                      <SelectBox
                      required
                      onChange={changeFormHandle}
                      name="categorie"
                      id="categorie"
                      placeholder="Categorie"
                      label="Categorie"
                      subLabel={
                        <div onClick={()=> dispatch(getCategories())} className="refresh-categories"><GrRefresh /></div>
                      }
                    >
    <option value="">None</option>
    
    {categories.map((opt) => (
                        //                                                     opt?._id
                        // opt.publish === "true" && (
                          <option selected={opt?._id === (editProduct? JSON.parse(form.categorie)._id : form.categorie)} value={JSON.stringify(opt)}>
                            {opt?.name}
                          </option>
                        // )
                      ))}
                    </SelectBox>
                    {/* {categories.length === 0 && ( */}
                      <a target="_blank" className="add-categories" href={`${process.env.REACT_APP_SERVER_DOMAINE}/admin/categories`} rel="noreferrer">+ Add Categories</a>
                    {/* )} */}
                   
                      </>
                    ) : (
                      <>
                      try again
                      </>
                    )}

                    <InputBox
                      value={content}
                      required
                      label="Description"
                      personelInput={
                        <JoditEditor
                          required={true}
                          ref={editor}
                          value={content}
                          config={config}
                          tabIndex={1} // tabIndex of textarea
                          onBlur={(newContent) => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
                          onChange={(newContent) => {}}
                        />
                      }
                    />
                  </div>
                </SectionStructure>
                <SectionStructure title="prices">
                  <div className="prices">
                    <GridSections style={{ rowGap: "0px", margin: "0px" }}>
                      <InputBox
                        value={form.originalPrice}
                        onChange={changeFormHandle}
                        type="number"
                        name="originalPrice"
                        id="originalPrice"
                        placeholder="Original Price"
                        label="Original Price"
                        rightSlug="Mad"
                        borderSlug="none"
                      />
                      <InputBox
                        value={form.salePrice}
                        required
                        onChange={changeFormHandle}
                        type="number"
                        name="salePrice"
                        id="salePrice"
                        placeholder="Sale Price"
                        label="Sale Price"
                        rightSlug="Mad"
                        borderSlug="none"
                      />
                      <InputBox
                        value={form.discount}
                        onChange={changeFormHandle}
                        type="number"
                        name="discount"
                        id="discount"
                        placeholder="Discount"
                        label="Discount"
                        rightSlug="%"
                        borderSlug="none"
                      />
                    </GridSections>
                  </div>
                </SectionStructure>
                <SectionStructure title="media">
                  <div className="media">
                    <label className="image-manager">
                      <input
                        required={!editProduct}
                        onChange={setImageHandle}
                        type="file"
                        name="image"
                        id="image"
                      />
                      <div className="icon">
                        <BiSolidCamera />
                      </div>
                      <p>Click or drag your image here</p>
                    </label>
                    <div className="catalogue">
                      {srcImages.map((img, ind) => (
                        <div key={ind} className="img">
                          <div
                            onClick={deleteImgHandle}
                            id={img.id}
                            className="delete"
                          >
                            <span onClick={(eo) => deleteImgHandle(eo, true)}>
                              x
                            </span>
                          </div>
                          <img loading='lazy' src={img.src} alt="product img" />
                        </div>
                      ))}
                    </div>
                  </div>
                </SectionStructure>
                <SectionStructure title="Search engine optimize">
                  <div className="serch-engine-optimize">
                    <InputBox
                      value={form.urlKey}
                      onChange={checkUrlKeyHandle}
                      // onChange={changeFormHandle}
                      type="text"
                      name="urlKey"
                      id="urlKey"
                      placeholder="Url key"
                      label="Url key"
                      leftSlug={`${process.env.REACT_APP_SERVER_DOMAINE}/products/`}
                      slugWrap={true}
                      required
                      checkValueInDB={{
                        ...checkProductUrlKey_Status.success ,
                        isLoading:checkProductUrlKey_Status.isLoading,
                        pauseCheckingDuration: !activeCheckUrlKey
                      }}
                    />
                    <InputBox
                      value={form.metaTitle}
                      onChange={changeFormHandle}
                      type="text"
                      name="metaTitle"
                      id="metaTitle"
                      placeholder="Meta title"
                      label="Meta title"
                    />
                    <InputBox
                      value={form.metaKeywords}
                      onChange={changeFormHandle}
                      type="text"
                      name="metaKeywords"
                      id="metaKeywords"
                      placeholder="Meta keywords"
                      label="Meta keywords"
                    />
                    <TextAreaBox
                      value={form.metaDescription}
                      onChange={changeFormHandle}
                      type="text"
                      name="metaDescription"
                      id="metaDescription"
                      placeholder="Meta description"
                      label="Meta description"
                    />
                  </div>
                </SectionStructure>
              </div>
              <div className="right-sections">
                <SectionStructure bg="grey" title="Product status">
                  <div className="product-status right-styles">
                    <div className="min-section">
                      {/* <h6>Status</h6> */}
                      <SelectBox
                        onChange={changeFormHandle}
                        name="status"
                        id="statusProduct"
                        label="Status"
                        required
                      >
                        {/* {["kids" , "women" , "men"].map((opt ,ind) => <option selected={`${ind}` === form.status} value={`${ind}`}>{opt}</option>)} */}
                        <option selected={form.status === "true"} value="true">
                          In Stock
                        </option>
                        <option
                          selected={form.status === "false"}
                          value="false"
                        >
                          Out Stock
                        </option>
                      </SelectBox>

                      {/* <div className="box">
                            <input checked={form.status === "true" && form.status === "false"} onChange={(eo) => {
                              // console.log(document.querySelectorAll("input[name='status']"),66);
                              setForm({...form, status: true})
                            }} type="radio" name="status" value={1} id='Enabled'/>
                            <label htmlFor="Enabled">In Stock</label>
                          </div>
                          <div className="box">
                            <input checked={!(form.status)} onChange={(eo) => {
                              // console.log(document.querySelectorAll("input[name='status']"),66);
                              setForm({...form, status: false})
                            }} type="radio" name="status" value={0} id='Disabled' /> {/*checked */}
                      {/* <label htmlFor="Disabled">Out Stock</label> */}
                      {/* </div> */}
                    </div>
                    <div className="min-section">
                      {/* <h6>Visibility</h6>
                          <div className="box">
                            <input checked={form.visibility} onChange={(eo) => {
                              // console.log(document.querySelectorAll("input[name='status']"),66);
                              setForm({...form, visibility: true})
                            }} type="radio" name="visibility" value={1} id='Visible'/>
                            <label htmlFor="Visible">Publish</label>
                          </div>
                          <div className="box">
                            <input checked={!(form.visibility)} onChange={(eo) => {
                              // console.log(document.querySelectorAll("input[name='status']"),66);
                              setForm({...form, visibility: false})
                            }} type="radio" name="visibility" value={0} id='NotVisible'/>
                            <label htmlFor="NotVisible">Private</label>
                          </div> */}
                      <SelectBox
                        onChange={changeFormHandle}
                        name="visibility"
                        id="visibilityProduct"
                        label="Visibility"
                        required
                      >
                        {/* {["kids" , "women" , "men"].map((opt ,ind) => <option selected={`${ind}` === form.status} value={`${ind}`}>{opt}</option>)} */}
                        <option
                          selected={form.visibility === "true"}
                          value="true"
                        >
                          Publish
                        </option>
                        <option
                          selected={form.visibility === "false"}
                          value="false"
                        >
                          Private
                        </option>
                      </SelectBox>
                    </div>
                  </div>
                </SectionStructure>
                <SectionStructure bg="grey" title="Inventory">
                  <div className="inventory  right-styles">
                    <div className="min-section">
                      <h6>Manage stock?</h6>
                      <div className="box">
                        <input
                          type="radio"
                          name="manageStock"
                          value="manageStock_yes"
                          id="manageStock_yes"
                          checked
                        />
                        <label htmlFor="manageStock_yes">Yes</label>
                      </div>
                      <div className="box">
                        <input
                          type="radio"
                          name="manageStock"
                          value="manageStock_no"
                          id="manageStock_no"
                        />
                        <label htmlFor="manageStock_no">No</label>
                      </div>
                    </div>
                    <div className="min-section">
                      <h6>Stock availability</h6>
                      <div className="box">
                        <input
                          type="radio"
                          name="stockAvailability"
                          value="stockAvailability_yes"
                          id="stockAvailability_yes"
                          checked
                        />
                        <label htmlFor="stockAvailability_yes">Yes</label>
                      </div>
                      <div className="box">
                        <input
                          type="radio"
                          name="stockAvailability"
                          value="stockAvailability_no"
                          id="stockAvailability_no"
                        />
                        <label htmlFor="stockAvailability_no">No</label>
                      </div>
                    </div>
                    <div className="min-section">
                      <InputBox
                        required
                        value={form.quantite}
                        onChange={changeFormHandle}
                        type="number"
                        name="quantite"
                        id="quantite"
                        placeholder="Quantite"
                        label="Quantite"
                      />
                    </div>
                  </div>
                </SectionStructure>
              </div>
            </div>
            <div className="footer-buttons">
              <div className="box">
                <Btn
                  btnStyle="outline"
                  color="danger"
                  element="a"
                  to={"/admin/products"}
                >
                  Cancel
                </Btn>
              </div>
              <div className="box">
                <Btn
                  onClick={showVariantsPageHandle}
                  btnStyle="bg"
                  color="primary"
                  element="button"
                  // disabled={!activeCheckUrlKey || checkProductUrlKey_Status.isLoading || checkProductUrlKey_Status.error}
                >
                  {editProduct ? "Edit Variants" : "Add Variants"}
                </Btn>
                <Btn
                  onClick={() => setBtnIsAddVariants(false)}
                  loading={
                    newProductStatus.isLoading || updateProductStatus.isLoading
                  }
                  btnStyle="bg"
                  color="success"
                  element="button"
                  type="submit"
                  // disabled={!activeCheckUrlKey || checkProductUrlKey_Status.isLoading || checkProductUrlKey_Status.error}
                >
                  {editProduct ? "Edit product" : "Save"}
                </Btn>
              </div>
            </div>
          </form>
        </PageStructure>
      )}
      {AddVariantsSection && (
        <AddVariants
          productForVariants={productForVariants}
          showAddVariants={showAddVariants}
          btnIsAddVariants={btnIsAddVariants}
        />
      )}
    </>
    )
}

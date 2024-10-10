import "./ProductVariants.scss";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { GrRefresh } from "react-icons/gr";
import { BsX } from "react-icons/bs";
import PageStructure from "../../../Components/PageStructure/PageStructure";
import Btnx from "../../../Components/Btnx/Btnx";
import SectionStructure from "../../../Components/SectionStructure/SectionStructure";
import BtnsFooter from "../../../Components/BtnsFooter/BtnsFooter";
import { useParams } from "react-router-dom";
import { SelectBox } from "../../../../MainComponent/InputBox/InputBox";
import CheckBox from "../../../Components/CheckBox/CheckBox";
import { BiEdit } from "react-icons/bi";
import { BsTrash } from "react-icons/bs";
import { getAttributesForVariants, saveVariants } from "../../../../Store/Admin/productSlice";
import PageNotFound from "../../../Components/PageNotFound/PageNotFound";
import { toast } from "react-toastify";
import Loading from "../../../../MainComponent/Loading/Loading";
import { Modal } from "../../../Utils/modalUtils"

export default function AddVariants() {
  const { isLoadingPage, isLoadingSlug: attributesLoading } = useSelector(
    (s) => s.product
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const [error, setError] = useState(false);
  const [product, setProduct] = useState(null);
  const [attributes, setAttributes] = useState([]);
  const [currentAttribute, setCurrentAttribute] = useState(null);
  const [options, setOptions] = useState([]);
  const [variants, setVariants] = useState([]);
  const [valuesSelected, setValuesSelect] = useState([]);

  const [activeCatalogue, setActiveCatalogue] = useState(null);

  const selectOptionHandler = (e) => {
    setValuesSelect([]);
    setCurrentAttribute(attributes.find((attr) => attr._id === e.target.value));
  };
  const valuesSelectedHandle = (e) => {
    setValuesSelect((prev) =>
      e.target.checked
        ? [...prev, e.target.id]
        : prev.filter((i) => i !== e.target.id)
      );
  };
  const addOptionHandler = () => {
    if (!valuesSelected.length)
      return toast.error("Please select a one value minimum.");
    let { _id, unique_name, public_name, valuesOwner } = currentAttribute;
    // if(options.find(v => v._id === _id)) return toast.error("The attribute has already been selected.")
    let option = {
      _id,
      unique_name,
      public_name,
      values: valuesOwner.filter((v) => valuesSelected.indexOf(v._id) !== -1),
    };
    if (options.find((v) => v._id === _id)) {
      setOptions((prev) => {
        let newOptions = prev.map((v) => {
          if (v._id === _id) return option;
          return v;
        });
        generateHandler(newOptions);
        return newOptions;
      });
    } else {
      setOptions((prev) => {
        let newOptions = [...prev, option];
        generateHandler(newOptions);
        return newOptions;
      });
    }
    // selectOne Checkbox Handle
    let selectOneCheckboxs = document.querySelectorAll("[name=values]");
    selectOneCheckboxs.forEach((i) => (i.checked = false));
    setValuesSelect([]);
  };
  const deleteOptionHandler = (_id) => {
    setOptions((prev) => {
      let newOptions = prev.filter((v) => v._id !== _id);
      generateHandler(newOptions);
      return newOptions;
    });
  };


  const generateHandler = (options) => {
    if (!options.length) return setVariants([]);
    // if(!options.length) return toast.error("Please select at least one options");
    // data modifier - to modify the data for the reducer method (will return array of array which contains value for each attribute)
    function modifier(data) {
      return data.map((a) =>
        a.values.map((b) => {
          return { ...b, attribute_id: a._id };
        })
      );
    }

    // reducer - to convert the data into desired format
    function reducer(data) {
      return data
        .reduce((a, b) =>
          a.reduce((r, v) => r.concat(b.map((w) => [].concat(v, w))), [])
        )
        .map((i) => {
          return {
            _id: i?._id ? i?._id : i.map((a) => a._id).join(""),
            option_array: i?.attribute_id
              ? [[i.attribute_id, i._id ]]
              : i.map((a) => {
                  return [ a.attribute_id, a._id ];
                }),
            name: i?.name ? i?.name : i.map((a) => a.name).join(" - "),
            sku: product.sku,
            image: product.media.images[0],
            quantity: 0,
            prices: product.prices,
          };
        });
    }

    // output - resultant data
    const output = reducer(modifier(options));
    setVariants(output);
  };
  const changeVariantsValuesHandler = (e, _id) => {
    let { name, value } = e.target;
console.log(name, value, _id)

    setVariants((prev) =>
      prev.map((v) => {
        if (v._id === _id) {
          if (name === "salePrice" || name === "originalPrice") {
            return { ...v, prices: { ...v.prices, [name]: value } };
          } else {
            return { ...v, [name]: value };
          }
        }
        return v;
      })
    );
  };

  const changeImageHandler = (image) => {
    setVariants((prev) =>
      prev.map((v) => {
        if (activeCatalogue.indexOf(v._id) !== -1) {
          return {
            ...v,
            image,
          };
        }
        return v;
      })
    );
    setActiveCatalogue(null);
  };
  const changeManyImagesHandler = () => {
    setActiveCatalogue(itemsSelected);
    // selectOne Checkbox Handle
    let selectOneCheckboxs = document.querySelectorAll("[name=selectOne]");
    selectOneCheckboxs.forEach((i) => (i.checked = false));
    setItemsSelected([]);
  };
  const saveVariantsHandler = () => {
    let finalyOptions = options.map(opt => {
      return {
        attributeOwner: opt._id,
        values: opt.values.map(v => v._id)
      }
    })
    let finalyVariants = variants.map(({_id, image, option_array, prices, quantity, sku}) => {
      return {_id, image, option_array, prices, quantity, sku, productOwner: product._id}
    })
    let dispatchUpdateManyProducts = () => 
      dispatch(saveVariants({id, body: {variants: finalyVariants, options: finalyOptions}})).unwrap()
    .then(docs => {
      toast.success(docs.message)
      Modal(false, null)
      navigate("/admin/products")
      // navigate("/admin/products/edit/" + id)
    })
    .catch(err => toast.error(err.message))
    Modal(true, dispatchUpdateManyProducts, {
      title: "Save Variants",
      message: "You want to save this variants ?",
      type: "info"
    })
  }
  const getAttributesHandle = () => {
    dispatch(getAttributesForVariants(id))
      .unwrap()
      .then((docs) => {
        let {product, attributes} = docs.data
        setProduct(product);
        setOptions(product.options)
        setVariants(product.variantsOwner)
        setAttributes(attributes);
        setCurrentAttribute(attributes[0]);
        setValuesSelect([]);
      })
      .catch((err) => setError(true));
  };
  useEffect(() => {
    getAttributesHandle();
  }, []);
  const [itemsSelected, setItemsSelected] = useState([]);

  const selectAllItemsHandler = (e) => {
    setItemsSelected((prev) =>
      e.target.checked ? variants.map((a) => a._id) : []
    );
    let selectOneCheckboxs = document.querySelectorAll("[name=selectOne]");
    // selectOne Checkbox Handle
    selectOneCheckboxs.forEach((i) => {
      i.checked = e.target.checked;
    });
  };
  const itemsSelectedHandler = (e, id) => {
    setItemsSelected((prev) =>
      e.target.checked ? [...prev, id] : prev.filter((i) => i !== id)
    );
  };
  useEffect(() => {
    let selectAllCheckbox = document.querySelector("[name=selectAll]");
    if (!selectAllCheckbox) return;
    // selectAll Checkbox Handle
    if (itemsSelected.length === variants.length) {
      selectAllCheckbox.checked = true;
    } else {
      selectAllCheckbox.checked = false;
    }
  }, [itemsSelected]);
  if (error) return <PageNotFound to="/admin/products" />;
  return (
    <>
      <PageStructure title={"Add Options: " + product?.name} loading={isLoadingPage}>
        <div className="ProductVariants">
          <div className="options-section">
            <Loading loading={attributesLoading}>
              <div className="options-input">
              {/* <Btnx
                    style={{ marginBottom: "15px" }}
                    onClick={getAttributesHandle}
                    btnStyle="bg"
                    color="primary"
                    element="button"
                  >
                    refrech
                  </Btnx> */}
                <div className="parent-select">
                  <SelectBox
                    onChange={selectOptionHandler}
                    name="option"
                    id="option"
                  >
                    {attributes.map((att) => (
                      <option key={att._id} value={att._id}>
                        {att.unique_name} -- {att.public_name}
                      </option>
                    ))}
                  </SelectBox>
                  <div className="reload-attributes">
                    <a
                      target="_blank"
                      className="link"
                      href={`${window.location.origin}/admin/attributes`}
                      rel="noreferrer"
                    >
                      + Add Attributes
                    </a>
                    <div
                      onClick={getAttributesHandle}
                      style={{ cursor: "pointer" }}
                      className="refresh-categories"
                    >
                      <GrRefresh />
                    </div>
                  </div>
                  <Btnx
                    style={{ marginBottom: "15px" }}
                    onClick={addOptionHandler}
                    btnStyle="bg"
                    color="primary"
                    element="button"
                  >
                    Add option
                  </Btnx>
                </div>
                <div className="values">
                  {currentAttribute?.valuesOwner.map((v) => (
                    <CheckBox
                      onChange={valuesSelectedHandle}
                      name="values"
                      id={v._id}
                      label={v.name}
                      key={v._id}
                    />
                  ))}
                </div>
              </div>
            </Loading>
            {options.length !== 0 && (
              <div className="options-output">
                {options.map((variant, i) => (
                  <div key={variant._id} className="option">
                    <div className="name">
                      {variant.unique_name} ({variant.public_name})
                      <div className="actions">
                        {/* <span><BiEdit /></span> */}
                        <span>
                          <BsTrash
                            onClick={() =>
                              deleteOptionHandler(variant._id)
                            }
                          />
                        </span>
                      </div>
                    </div>
                    <div className="values">
                      {variant.values.map((v) => (
                        <span>{v.name}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          {variants.length !== 0 && (
            <>
              <div className="generate-section">
                <div className="title">
                  <h2>Generate Variants</h2>
                  {/* <Btnx onClick={() => generateHandler(options)} btnStyle="bg" color="primary" element="button">Generate Variants</Btnx> */}
                </div>
                <div className="actions-head">
                  <Btnx
                    disabled={!itemsSelected.length}
                    onClick={changeManyImagesHandler}
                    element="button"
                    btnStyle="bg"
                    color="primary"
                  >
                    <div className="icon">
                      <BiEdit />
                    </div>{" "}
                    Change Images
                  </Btnx>
                </div>

                <SectionStructure pd="none">
                  <div className="table-container">
                    <table>
                      <thead>
                        <tr>
                          <td>
                            <CheckBox
                              onChange={selectAllItemsHandler}
                              name={"selectAll"}
                              id="selectAll"
                            />
                          </td>
                          <td>image</td>
                          <td>combination</td>
                          <td>sku</td>
                          <td>price</td>
                          <td>sale price</td>
                          <td>quantity</td>
                          {/* <td>action</td> */}
                        </tr>
                      </thead>
                      <tbody>
                        {variants.map((variant, ind) => (
                          <tr key={ind}>
                            <td>
                              <CheckBox
                                onChange={(e) =>
                                  itemsSelectedHandler(e, variant._id)
                                }
                                name={"selectOne"}
                                id={`${variant._id}-${ind * 2}`}
                              />
                            </td>
                            <td>
                              <div className="product-name">
                                <div className="img">
                                  <img
                                    loading="lazy"
                                    src={`${process.env.REACT_APP_SERVER_DOMAINE}/media/${variant.image}`}
                                    alt=""
                                  />
                                </div>
                                <div className="actions">
                                  <BiEdit
                                    onClick={() =>
                                      setActiveCatalogue([variant._id])
                                    }
                                  />
                                </div>
                              </div>
                            </td>
                            <td>
                              <div className="ftw-n">{variant.name}</div>
                            </td>
                            <td>
                              <div className="input">
                                <input
                                  onChange={(e) =>{
                                    changeVariantsValuesHandler(e, variant._id)
                                    console.log(variant)
                                  }}
                                  placeholder="SKU"
                                  value={variant.sku}
                                  type="text"
                                  name="sku"
                                  id=""
                                />
                              </div>
                            </td>
                            <td>
                              <div className="input">
                                <input
                                  disabled
                                  value={variant.prices.originalPrice}
                                  placeholder="Price"
                                  type="text"
                                  name="originalPrice"
                                  id=""
                                />
                              </div>
                            </td>
                            <td>
                              <div className="input">
                                <input
                                  onChange={(e) =>
                                    changeVariantsValuesHandler(e, variant._id)
                                  }
                                  value={variant.prices.salePrice}
                                  placeholder="Sale price"
                                  type="text"
                                  name="salePrice"
                                  id=""
                                />
                              </div>
                            </td>
                            <td>
                              <div className="input">
                                <input
                                  onChange={(e) =>
                                    changeVariantsValuesHandler(e, variant._id)
                                  }
                                  value={variant.quantity}
                                  placeholder="Quantity"
                                  type="text"
                                  name="quantity"
                                  id=""
                                />
                              </div>
                            </td>
                            {/* <td>
                                    <div className="actions">
                                                <BsTrash/>
                                            </div>
                                    </td> */}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </SectionStructure>
              </div>
              {activeCatalogue && (
                <div className="catalogue-container">
                  <div className="catalogue">
                    <div className="title">
                      <h3>Images</h3>
                      <span onClick={() => setActiveCatalogue(null)}>
                        <BsX />
                      </span>
                    </div>
                    <div className="images">
                      {product.media.images.map((img) => (
                        <div
                          onClick={() => changeImageHandler(img)}
                          className="img"
                        >
                          <img
                            loading="lazy"
                            src={`${process.env.REACT_APP_SERVER_DOMAINE}/media/${img}`}
                            alt=""
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
          <BtnsFooter>
            <div className="box">
              <Btnx
                btnStyle="outline"
                color="danger"
                element="a"
                to={"/admin/products/edit/" + id}
              >
                Cancel
              </Btnx>
            </div>
            <div className="box">
              <Btnx
                onClick={saveVariantsHandler}
                btnStyle="bg"
                color="success"
                element="button"
                type="submit"
              >
                Save Variants
              </Btnx>
            </div>
          </BtnsFooter>
        </div>
      </PageStructure>
    </>
  );
}

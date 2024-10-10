import "./New_Edit_Attribute.scss";
import { BiEdit, BiX } from "react-icons/bi";
import { useState } from "react";
import { BsTrash } from 'react-icons/bs'
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import PageStructure from "../../../Components/PageStructure/PageStructure";
import SectionStructure from "../../../Components/SectionStructure/SectionStructure";
import InputBox, { SelectBox } from "../../../../MainComponent/InputBox/InputBox";
import Btnx from "../../../Components/Btnx/Btnx";
import BtnsFooter from "../../../Components/BtnsFooter/BtnsFooter";
import { Modal } from "../../../Utils/modalUtils";
import { editAttribute, getAttribute, newAttrbiuteValue, newAttribute } from "../../../../Store/Admin/attributeSlice";
import { toast } from "react-toastify";
import {BsCheckLg} from 'react-icons/bs'
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import PageNotFound from "../../../Components/PageNotFound/PageNotFound";
import moment from 'moment'

export default function AddNewAttributes() {
  const colorType = "colorSpans"
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {id} = useParams()
  const {isLoadingPage} = useSelector(s => s.attribute)
  const [error, setError] = useState(false)
  const types = ["dropDown", "colorSpans", "checkBox"];
  const [unique_name, setUnique_name] = useState({
    value: "",
    error: false,
  });
  const [public_name, setPublic_name] = useState({
    value: "",
    error: false,
  });
  const [type, setType] = useState(types[0]);
  const [newValue, setNewValue] = useState("");
  const [newColor, setNewColor] = useState("#000000");
  const [publish, setPublish] = useState(1);
  const [values, setValues] = useState([]);
  const [updateValue, setUpdateValue] = useState(false);
  const [afterUpdateValue, setAfterUpdateValue] = useState(false);
  const [attribute, setAttrbiute] = useState(null)
  const EditAttributeHandler = () => {
    if(unique_name.value === "") return setUnique_name(prev => ({...prev,error:"Please Enter Unique Name"}))
      if(public_name.value === "") return setPublic_name(prev => ({...prev,error:"Please Enter Name"}))
      if(values.length === 0) return toast.error("Please Enter Value")

    let body = {typeForJoi: type}
    if(attribute.unique_name !== unique_name.value) body.unique_name = unique_name.value
    if(attribute.public_name !== public_name.value) body.public_name = public_name.value

    if(attribute.publish !== Boolean(+publish)) body.publish = Boolean(+publish)

    let valuesCreated = []
    let valuesDeleted = []
    let valuesEdited = []
    // Check values deleted
    let allIds = values.map(a => a._id)
    attribute.valuesOwner.forEach(v => {
      if(allIds.indexOf(v._id) === -1) return valuesDeleted.push(v._id)
    })
  // check values created
    values.forEach(v => {
      if(!v._id) return valuesCreated.push(v)
        // check values edited
        let item =  attribute.valuesOwner.find(a => a._id === v._id)
        if(item.name !== v.name || item.color !== v.color) return valuesEdited.push(v)
    })

    if(valuesCreated.length) body.valuesCreated = valuesCreated
    if(valuesDeleted.length) body.valuesDeleted = valuesDeleted
    if(valuesEdited.length) body.valuesEdited = valuesEdited
    if(valuesEdited.length || valuesCreated.length) body.values = [...valuesEdited, ...valuesCreated]


    let dispatchEditAttribute = () => {
      dispatch(editAttribute({id,body}))
        .unwrap()
        .then((docs) => {
          toast.success(docs.message);
          Modal(false, null);
          navigate("/admin/attributes");
          navigate("");
        })
        .catch((err) => {
          toast.error(err.message);
          Modal(false, null);
        });
    };
    Modal(true, dispatchEditAttribute, {
      title: "Edit Attributes",
      message: "You want to update this attribute ?",
      type: "info",
    });
  };
  useEffect(() => {
    dispatch(getAttribute(id)).unwrap()
    .then((docs) => {
        let {unique_name, public_name, type, publish, valuesOwner} = docs.data
        setUnique_name({value: unique_name,error: false})
        setPublic_name({value: public_name,error: false})
        setType(type)
        setPublish(publish)
        setValues(valuesOwner)
        setAttrbiute(docs.data)
    }).catch(err => setError(true))
  },[])

  const addValueHandler = () => {
    if(!newValue) return toast.error("Please enter a value")
    if(values.find(v => v.name === newValue))  return toast.error("The value is already used")
      // let dispatchFunction = (body) => {
      //   dispatch(newAttrbiuteValue({id, body})).unwrap().then((docs) => {
      //     toast.success(docs.message)
      //     setValues(prev => [...prev, docs.data.value])
      //     setNewValue("")
      //     if(colorType === type) setNewColor("#000000")
      //   }).catch(err => toast.error(err.message))
      // }
      // if(colorType === type) {
      //   dispatchFunction({name: newValue, color: newColor})
      // }else{
      //   dispatchFunction({name: newValue})
      // }
      colorType === type ? setValues(prev => [...prev, {name: newValue, color: newColor}]) : setValues(prev => [...prev, {name: newValue}])
      setNewValue("")
      if(colorType === type) setNewColor("#000000")
      document.querySelector("[name=value_name]").focus()
  }
  const deleteValue = (name) => {
    setValues(prev => prev.filter(v => v.name !== name))
  }
  const editValue = (name) => {
    setValues(prev => prev.map(v => v.name === name ? afterUpdateValue : v))
    setAfterUpdateValue(null)
    setUpdateValue(null)
  }
  if(error){
    return <PageNotFound to="/admin/attributes"/>
  }
  return (
    <>
      <PageStructure loading={isLoadingPage}
        personelButton={
          attribute?.createdAt && <div>Created at: {moment(attribute?.createdAt).format('DD-MM-YYYY')}</div>
        }
        >
        <section className="NewAttributes">
          <div className="parent">
            <SectionStructure title="Edit Attribute">
              <div className="form">
                <InputBox
                  error={unique_name.error}
                  onChange={(e) =>
                    setUnique_name({ value: e.target.value, error: false })
                  }
                  value={unique_name.value}
                  required
                  type="text"
                  name="unique_name"
                  id="unique_name"
                  placeholder="Unique Name"
                  label="Unique Name"
                />
                <InputBox
                  error={public_name.error}
                  onChange={(e) =>
                    setPublic_name({ value: e.target.value, error: false })
                  }
                  value={public_name.value}
                  required
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Name"
                  label="Name"
                />
                <SelectBox
                disabled
                  // onChange={(e) => {
                  //   dispatch(editAttribute({id,type})).unwrap().then(() => {
                  //     setType(e.target.value);
                  //     setValues([])
                  //     setNewValue("");
                  //     setNewColor("");
                  //     setUpdateValue(null);
                  //   })
                  // }}
                  required
                  name="type"
                  id="type"
                  label="Type :"
                >
                  {/* {types.map((opt) => ( */}
                    <option selected={type} value={type}>
                      {type}
                    </option>
                  {/* ))} */}
                </SelectBox>
                <SelectBox
                  onChange={(e) => setPublish(e.target.value)}
                  required
                  name="publish"
                  id="publish"
                  label="Visbility"
                >
                    <option selected={Boolean(+publish) === true} value="1">Publish</option>
                    <option selected={Boolean(+publish) === false} value="0">Private</option>
                </SelectBox>
              </div>
            </SectionStructure>
            <SectionStructure bg="grey" title="Values">
              <div className="table-container table-values">
              <table>
            <thead>
              <tr>
                <td>#</td>
                {colorType === type && <td>color</td>}
                <td>name</td>
                <td>actions</td>
              </tr>
            </thead>
            <tbody>
                  {values.map((value, ind) => 
                    updateValue === value.name ? (
                      <tr key={ind}>
                      <td>{ind + 1}</td>
                      {colorType === type && (
                      <td>
                        <input value={afterUpdateValue.color} onChange={e => setAfterUpdateValue(prev => {return {...prev , color:e.target.value}})} type="color" name="color" id="" className="color-input"/>
                      </td>
                      )}
                      <td>
                        <input value={afterUpdateValue.name} onChange={e => setAfterUpdateValue(prev => {return {...prev , name:e.target.value}})} type="text" name="value_name" id="" placeholder="Name" className="name-input"/>
                      </td>
                      <td>
                      <div style={{gap: "8px"}} className="actions">
                        <Btnx
                        key="BsCheckLg"
                        onClick={() => editValue(value.name)}
                       size="icon"
                       btnStyle="bg"
                       color="success"
                       element="button"
                     ><BsCheckLg/>
                     </Btnx>
                       <Btnx
                       key="BiX"
                        onClick={() => {
                          setUpdateValue(null)
                          setAfterUpdateValue(null)
                        }}
                       size="icon"
                       btnStyle="bg"
                       color="danger"
                       element="button"
                     ><BiX/>
                     </Btnx>
                        </div>
                      </td>
                    </tr>
                    ) : (
                      <tr key={ind}>
                      <td>{ind + 1}</td>
                      {colorType === type && (
                        <td>
                          <div style={{backgroundColor: value.color}} className="color-box"></div>
                        </td>
                      )}
                      <td>
                          <h4>{value.name}</h4>
                      </td>
                      <td>
                        <div className="actions">
                        <div onClick={() => {
                          setUpdateValue(value.name)
                          setAfterUpdateValue(value)
                        }} className="edit">
                            <BiEdit />
                          </div>
                          <div onClick={() => deleteValue(value.name)} className="delete">
                            <BsTrash/>
                          </div>
                        </div>
                      </td>
                    </tr>
                    )
                  )}
                  {!updateValue && (
                       <tr key="newValue">
                       <td></td>
                       {colorType === type && (
                       <td>
                         <input value={newColor} onChange={e => setNewColor(e.target.value)} type="color" name="color" id="" className="color-input"/>
                       </td>
                       )}
                       <td>
                         <input value={newValue} onChange={e => setNewValue(e.target.value)} type="text" name="value_name" id="" placeholder="Name" className="name-input"/>
                       </td>
                       <td>
                       <Btnx
                       onClick={addValueHandler}
                       size="sm"
                       btnStyle="bg"
                       color="primary"
                       element="button"
                     >Add Value
                     </Btnx>
                       </td>
                     </tr>
                  )}
            </tbody>
          </table>
              </div>
              
              {/* <form
                onSubmit={(e) =>
                  addValueHandle(
                    e,
                    newValue,
                    setNewValue,
                    type,
                    newColor,
                    setNewColor,
                    updateValue,
                    values,
                    setValues,
                    setUpdateValue
                  )
                }
                method="get"
                className="add-parent"
              >
                <InputBox
                  error={newValue.error}
                  onChange={(e) =>
                    setNewValue({ value: e.target.value, error: false })
                  }
                  value={newValue.value}
                  required
                  type="text"
                  name="addValue"
                  id="addValue"
                  placeholder="Add value ..."
                />

                {type === "colorSpans" && (
                  <div className="color-select">
                    <InputBox
                      error={newColor.error}
                      onChange={(e) =>
                        setNewColor({ value: e.target.value, error: false })
                      }
                      value={newColor.value}
                      required
                      type="text"
                      name="color"
                      id="color"
                      placeholder="Add color ..."
                    />
                    <input
                      onChange={(e) =>
                        setNewColor({ value: e.target.value, error: false })
                      }
                      value={newColor.value}
                      required
                      type="color"
                      name="colorSelect"
                      id="colorSelect"
                    />
                  </div>
                )}

                <div
                  style={{ display: "flex", alignItems: "center", gap: "10px" }}
                >
                  {updateValue && (
                    <Btnx
                      onClick={() => {
                        setNewValue({ value: "", error: false });
                        setNewColor({ value: "", error: false });
                        setUpdateValue(null);
                      }}
                      btnStyle="outline"
                      color="danger"
                      element="div"
                    >
                      Cancel
                    </Btnx>
                  )}
                  <Btnx
                    btnStyle="bg"
                    color="primary"
                    element="button"
                    type="submit"
                  >
                    {updateValue ? "Edit Value" : "Add Value"}
                  </Btnx>
                </div>
              </form>
              {values.length ? (
                <ul className="values">
                  {values.map((v, idx) => (
                    <li id={v.name}>
                      {v.name}
                      <BiEdit
                        onClick={() => setUpdateValue(v)}
                        className="delete"
                      />
                      <BiX
                        onClick={() =>
                          setValues((prev) =>
                            prev.filter((e) => e.name !== v.name)
                          )
                        }
                        className="delete"
                      />
                    </li>
                  ))}
                </ul>
              ) : (
                false
              )} */}
            </SectionStructure>
          </div>
          <BtnsFooter>
            <Btnx
              btnStyle="outline"
              color="danger"
              element="a"
              to="/admin/attributes"
            >
              Cancel
            </Btnx>
            <Btnx
              onClick={EditAttributeHandler}
              btnStyle="bg"
              color="success"
              element="button"
            >
              Edit Attribute
            </Btnx>
          </BtnsFooter>
        </section>
      </PageStructure>
    </>
  );
}

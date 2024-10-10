import './NewShippingMethod.scss'
import SectionStructure from '../../../Components/SectionStructure/SectionStructure'
import BtnsFooter from '../../../Components/BtnsFooter/BtnsFooter'
import Btnx from '../../../Components/Btnx/Btnx'
import { FaRegSave } from "react-icons/fa";
import Switcher from '../../../Components/Switcher/Switcher';
import GridSections from '../../../Components/GridSections/GridSections';
import InputBox, { SelectBox } from '../../../../MainComponent/InputBox/InputBox';
import { BsTrash } from 'react-icons/bs'
import { useEffect, useState } from 'react';
import { shippingMethodsObject } from '../../../Utils/shippingUtils';
import { useDispatch, useSelector } from 'react-redux'
import { newShippingMethod } from '../../../../Store/Admin/shippingSlice';
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom';
import { Modal } from '../../../Utils/modalUtils';


export default function NewShippingMethod() {
  let arrayMehodsKeys = Object.keys(shippingMethodsObject)
  const {isLoading} = useSelector(s => s.shipping)
  const [name, setName] = useState(null)
  // const [display_name, setDisplay_name] = useState(null)
  const [type, setType] = useState(arrayMehodsKeys[0])
  const [rangeAmount, setRangeAmount] = useState({
    min_amount: null,
    cost: null,
  })
  const [cost, setCost] = useState(null)
  const [estimated_delivery, setEstimated_delivery] = useState(null)
  const [publish, setPublish] = useState(1)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const submitHandler = (e) => {
    e.preventDefault()
    if(cost < 0) return toast.error("The cost has been positive number")
      if(rangeAmount.cost < 0) return toast.error("The cost has been positive number")
        if(rangeAmount.min_amount < 0) return toast.error("The min amount has been positive number")
    if(rangeAmount.cost >= cost && type === "range") return toast.error("The cost (Min amount) hes less than orgin cost")
    let body = {name, type, rangeAmount, cost, estimated_delivery, publish}

    let dispatchFunc = () => dispatch(newShippingMethod(body)).unwrap()
    .then(docs => {
      toast.success(docs.message)
      navigate("/admin/settings/shipping")
      Modal(false, null)
    })
    .catch(err => toast.error(err.message))
    Modal(true, dispatchFunc, {
      title: "New method",
      message: "You want to create this method ?",
      type: "info"
    })
  }
  

  return (
    <form onSubmit={submitHandler} className='NewShippingMethod'>
        <SectionStructure title="Create new method">
        {/* <div className="new-method-container"> */}
            <SectionStructure>
            <GridSections style={{ rowGap: "0px", margin: "0px" }}>
                <InputBox required value={name} onChange={e => setName(e.target.value)} type="text" name="name" id="name" placeholder="Name" label="Name" />
                <SelectBox required value={publish} onChange={e => setPublish(e.target.value)} name="publish" id="publish" label="Publish">
                        <option value="1">Publish</option>
                        <option value="0">Private</option>
                      </SelectBox>
                {/* <InputBox required value={display_name} onChange={e => setDisplay_name(e.target.value)} type="text" name="display_name" id="display_name" placeholder="Display name" label="Display name" /> */}
              </GridSections>
              <GridSections style={{ rowGap: "0px", margin: "0px" }}>
                <SelectBox required value={type} onChange={e => setType(e.target.value)}  name="type" id="type" label="Type">
                  {arrayMehodsKeys.map(t => (
                    <option value={t}>{shippingMethodsObject[t]}</option>
                  ))}
                      </SelectBox>
                <InputBox required value={cost} onChange={e => setCost(e.target.value)} type="number" name="cost" id="cost" placeholder="Cost" label="Cost" />
              </GridSections>
              {type === "range" && (
              <GridSections style={{ rowGap: "0px", margin: "0px" }}>
                  <InputBox value={rangeAmount.min_amount} onChange={e => setRangeAmount(prev => {return {...prev, min_amount: e.target.value}})} type="number" name="min_amount" id="min_amount" placeholder="Min amount" label="Min amount" />
                  <InputBox value={rangeAmount.cost} onChange={e => setRangeAmount(prev => {return {...prev, cost: e.target.value}})} type="number" name="cost_min_amount" id="cost_min_amount" placeholder="Cost (Min amount)" label="Cost (Min amount)" />
                </GridSections>
                )}
              {/* <GridSections style={{ rowGap: "0px", margin: "0px" }}> */}
                <InputBox required value={estimated_delivery} onChange={e => setEstimated_delivery(e.target.value)} type="text" name="estimated_delivery" id="estimated_delivery" placeholder="Estimated delivery" label="Estimated delivery" />
              {/* </GridSections> */}
            </SectionStructure>
        {/* </div> */}
        </SectionStructure>
        <BtnsFooter>
            <div className="box">
            <Btnx
                to="/admin/settings/shipping/methods"
                btnStyle="outline"
                color="danger"
                element="a"
              >
               Cancel
              </Btnx>
            </div>
            <div className="box">
              <Btnx
              loading={isLoading}
                btnStyle="bg"
                color="success"
                element="button"
                type="submit"
              >
               <FaRegSave/> Save
              </Btnx>
            </div>
          </BtnsFooter>
    </form>
  )
}

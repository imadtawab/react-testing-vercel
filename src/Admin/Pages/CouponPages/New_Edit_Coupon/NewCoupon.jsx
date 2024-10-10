import { BiEdit, BiX } from "react-icons/bi";
import { useState } from "react";
import { BsTrash } from 'react-icons/bs'
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import PageStructure from "../../../Components/PageStructure/PageStructure";
import SectionStructure from "../../../Components/SectionStructure/SectionStructure";
import InputBox, { SelectBox, TextAreaBox } from "../../../../MainComponent/InputBox/InputBox";
import Btnx from "../../../Components/Btnx/Btnx";
import BtnsFooter from "../../../Components/BtnsFooter/BtnsFooter";
import { Modal } from "../../../Utils/modalUtils";
import { newCoupon } from "../../../../Store/Admin/couponSlice";
import { toast } from "react-toastify";
import {BsCheckLg} from 'react-icons/bs'
import GridSections from "../../../Components/GridSections/GridSections";

export default function NewCoupon() {
  const couponTypes = ["percentage","fixed"]
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [code, setCode] = useState("");
  const [expirationDate, SetExpirationDate] = useState(null);
  const [type, setType] = useState(couponTypes[0]);
  const [discount, setDiscount] = useState("");
  const [publish, setPublish] = useState(1);
  const [description, setDescription] = useState("");

  const addCouponsHandle = (e) => {
    e.preventDefault()
    if(code.length < 5) return toast("The coupon code has been 5 or greater caracters.")
    if(discount < 0)  return toast("The discount has been a value greater than zero")
    if(type === "percentage" && discount > 90) return toast("The discount has been a value less than 90");

    let body = {
      code,
      type,
      discount,
      expirationDate,
      publish,
      description
    };
    let dispatchNewCoupon = () => {
      dispatch(newCoupon(body))
        .unwrap()
        .then((docs) => {
          toast.success(docs.message);
          Modal(false, null);
          navigate("/admin/coupons");
        })
        .catch((err) => {
          toast.error(err.message);
          Modal(false, null);
        });
    };
    Modal(true, dispatchNewCoupon, {
      title: "Create Coupons",
      message: "Vous voulez vraiment ajouter ce coupon ?",
      type: "info",
    });
  };
  return (
    <>
      <PageStructure>
        <form onSubmit={addCouponsHandle} className="NewCoupon">
          <div className="parent">
            <SectionStructure title="New Coupon">
              <div className="form">
                <GridSections>
                  <InputBox onChange={e => setCode(e.target.value.toUpperCase())} value={code} required type="text" name="code" id="code" placeholder="Code" label="Code"/>
                  <InputBox onChange={e => SetExpirationDate(e.target.value)} value={expirationDate} required type="date" name="expiration_date" id="expiration_date" placeholder="Expiration date" label="Expiration date"/>
                </GridSections>
                <GridSections>
                  <SelectBox onChange={e => setType(e.target.value)} value={type} required name="type" id="type" label="Type" >
                    {couponTypes.map((opt) => (
                      <option selected={opt === type} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </SelectBox>
                  <InputBox borderSlug="none" rightSlug={type === "fixed" ? "MAD" : "%"} onChange={e => setDiscount(e.target.value)} value={discount} required type="text" name="discount" id="discount" placeholder="Discount" label="Discount"/>
                </GridSections>
                <GridSections>
                  <SelectBox onChange={e => setPublish(e.target.value)} value={publish} required name="publish" id="publish" label="Visbility" >
                      <option selected={Boolean(+publish)} value="1">Publish</option>
                      <option selected={!Boolean(+publish)} value="0">Private</option>
                  </SelectBox>
                <TextAreaBox required onChange={e => setDescription(e.target.value)} value={description} type="text" name="description" id="description" placeholder="Description" label="Description" />
                </GridSections>
                </div>
            </SectionStructure>
          </div>
          <BtnsFooter>
            <Btnx
              btnStyle="outline"
              color="danger"
              element="a"
              to="/admin/coupons"
            >
              Cancel
            </Btnx>
            <Btnx
              btnStyle="bg"
              color="success"
              element="button"
              type="submit"
            >
              Add Coupon
            </Btnx>
          </BtnsFooter>
        </form>
      </PageStructure>
    </>
  );
}

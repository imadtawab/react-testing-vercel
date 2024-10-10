import React from 'react'
import SectionStructure from '../../../Components/SectionStructure/SectionStructure'
import GridSections from '../../../Components/GridSections/GridSections'
import InputBox, { TextAreaBox } from '../../../../MainComponent/InputBox/InputBox'
import BtnsFooter from '../../../Components/BtnsFooter/BtnsFooter'
import Btnx from '../../../Components/Btnx/Btnx'
import { FaRegSave } from "react-icons/fa";


export default function StoreDetails() {
  return (
    <div className='StoreDetails'>
        <SectionStructure title="Informations">
            <GridSections style={{ rowGap: "0px", margin: "0px" }}>
            <InputBox value={""} onChange={(e) => "setUserName"(e.target.value)} type="text" name="store_name" id="store_name" placeholder="Store name" label="Store name" />
            <InputBox value={""} onChange={(e) => "setUserName"(e.target.value)} type="text" name="store_title" id="store_title" placeholder="Store title" label="Store title" />
            <InputBox value={""} onChange={(e) => "setUserName"(e.target.value)} type="email" name="store_email" id="store_email" placeholder="Store email" label="Store email" />
            </GridSections>
            <TextAreaBox value={""} onChange={(e) => "setUserName"(e.target.value)} name="store_description" id="store_description" placeholder="Store description" label="Store description" />
        </SectionStructure>
        <SectionStructure title="Logo & Favicon">
            Logo & Favicon
        </SectionStructure>
        <SectionStructure title="Language">
            Language
        </SectionStructure>
        <SectionStructure title="Currency">
            Currency
        </SectionStructure>
        <BtnsFooter>
            <div></div>
            <div className="box">
              <Btnx
                btnStyle="bg"
                color="success"
                element="button"
                type="submit"
              >
               <FaRegSave/> Save
              </Btnx>
            </div>
          </BtnsFooter>
    </div>
  )
}

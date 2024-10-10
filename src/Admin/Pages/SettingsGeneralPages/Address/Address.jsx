import React from 'react'
import SectionStructure from '../../../Components/SectionStructure/SectionStructure'
import GridSections from '../../../Components/GridSections/GridSections'
import InputBox, { SelectBox, TextAreaBox } from '../../../../MainComponent/InputBox/InputBox'
import BtnsFooter from '../../../Components/BtnsFooter/BtnsFooter'
import Btnx from '../../../Components/Btnx/Btnx'
import { FaRegSave } from "react-icons/fa";
import { FaFacebookF, FaInstagram, FaTwitter, FaTiktok } from "react-icons/fa6";



export default function Address() {
  return (
    <div className='Address'>
        <SectionStructure title="Address will appear on your invoices">
            <SelectBox name="country" id="country" label="Country">
                {["Morocco", "Algeria", "Tunis", "Egypt"].map(country => (
                    <option value={country}>{country}</option>
                ))}
            </SelectBox>
            <GridSections style={{ rowGap: "0px", margin: "0px" }}>
            <InputBox type="text" name="city" id="city" placeholder="City" label="City" />
            <InputBox type="text" name="zip_code" id="zip_code" placeholder="Zip code" label="Zip code" />
            </GridSections>
            <InputBox type="text" name="address1" id="address1" placeholder="Address line 1" label="Address line 1" />
            <InputBox type="text" name="address2" id="address2" placeholder="Address line 2" label="Address line 2" />
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

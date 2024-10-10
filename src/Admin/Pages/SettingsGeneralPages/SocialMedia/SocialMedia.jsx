import React from 'react'
import SectionStructure from '../../../Components/SectionStructure/SectionStructure'
import GridSections from '../../../Components/GridSections/GridSections'
import InputBox, { TextAreaBox } from '../../../../MainComponent/InputBox/InputBox'
import BtnsFooter from '../../../Components/BtnsFooter/BtnsFooter'
import Btnx from '../../../Components/Btnx/Btnx'
import { FaRegSave } from "react-icons/fa";
import { FaFacebookF, FaInstagram, FaTwitter, FaTiktok } from "react-icons/fa6";



export default function SocialMedia() {
  return (
    <div className='SocialMedia'>
        <SectionStructure title="Social media URL's">
        <GridSections style={{ rowGap: "0px", margin: "0px" }}>
            <InputBox leftSlug={<FaFacebookF/>} slugColor="#fff" slugBg={"#1877F2"} borderSlug="none" value={""} onChange={(e) => "setUserName"(e.target.value)} type="url" name="facebook_url" id="facebook_url" placeholder="Facebook URL" label="Facebook URL" />
            <InputBox leftSlug={<FaInstagram/>} slugColor="#fff" slugBg={"#E4405F"} borderSlug="none" value={""} onChange={(e) => "setUserName"(e.target.value)} type="url" name="instagram_url" id="instagram_url" placeholder="Instagram URL" label="Instagram URL" />
            </GridSections>
            <GridSections style={{ rowGap: "0px", margin: "0px" }}>
            <InputBox leftSlug={<FaTiktok/>} slugColor="#fff" slugBg={"#000000"} borderSlug="none" value={""} onChange={(e) => "setUserName"(e.target.value)} type="url" name="tiktok_url" id="tiktok_url" placeholder="Tiktok URL" label="Tiktok URL" />
            <InputBox leftSlug={<FaTwitter/>} slugColor="#fff" slugBg={"#1DA1F2"} borderSlug="none" value={""} onChange={(e) => "setUserName"(e.target.value)} type="url" name="twitter_url" id="twitter_url" placeholder="Twitter URL" label="Twitter URL" />
            </GridSections>
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

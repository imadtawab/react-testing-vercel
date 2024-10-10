import "./Profile.scss";
import { BsPlus, BsX } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import undefined_avatar from "../../../../Assets/undefined_avatar.png";
import InputBox from "../../../../MainComponent/InputBox/InputBox";
import BtnsFooter from "../../../Components/BtnsFooter/BtnsFooter";
import Btnx from "../../../Components/Btnx/Btnx";
import SectionStructure from "../../../Components/SectionStructure/SectionStructure";
import { toast } from "react-toastify";
import { Modal } from "../../../Utils/modalUtils";
import { updateProfile } from "../../../../Store/Admin/accountSlice";

export default function Profile() {
  const { user } = useSelector((s) => s.account);
  const [avatarImg, setAvatarImg] = useState(undefined_avatar);
  const [avatarImgPost, setAvatarImgPost] = useState(undefined);
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const addFileInput = useRef();
  const dispatch = useDispatch();

  useEffect(() => {
    setAvatarImg(user?.avatar);
    setUserName(user?.userName);
    setEmail(user?.email);
    setPhone(user?.phone);
  }, [user]);
  const resetHandle = () => {
    setAvatarImg(user?.avatar);
    setUserName(user?.userName);
    setEmail(user?.email);
    setPhone(user?.phone);
    setAvatarImgPost(undefined);
  };
  const updateProfileHandle = () => {
    let newProfile = {};
    if (avatarImg !== user?.avatar && avatarImgPost !== "empty") {
      newProfile.avatar = avatarImgPost;
      newProfile.oldAvatar = user?.avatar;
    }
    if (avatarImgPost === "empty" && user?.avatar !== undefined_avatar) {
      newProfile.emptyAvatar = true;
      newProfile.oldAvatar = user?.avatar;
    }
    if (userName !== user?.userName) newProfile.userName = userName;
    // if (email !== user?.email) newProfile.email = email;
    if (phone !== user?.phone) newProfile.phone = phone;

    if (!Object.keys(newProfile).length) {
      toast.error("Change your profile information")
      return;
    }

    function createFormData() {
      const formData = new FormData();

      Object.keys(newProfile).forEach((key) => {
        formData.append(key, newProfile[key]);
      });
      return formData;
    }
    let dispatchFunc = () => dispatch(updateProfile(createFormData())).unwrap()
    .then(docs => {
      toast.success(docs.message)
      Modal(false, null)
    }).catch(err => toast.error(err.message))

    Modal(true, dispatchFunc, {
      title: "Update Profile",
      message: "You want to update profile ?",
      type: "info"
    })
  };

  const addAvatar = (eo) => {
    const file = eo.target.files[0];
    const reader = new FileReader();
    // it's onload event and you forgot (parameters)
    reader.onload = function (e) {
      // the result image data
      setAvatarImg(e.target.result);
    };
    // you have to declare the file loading
    reader.readAsDataURL(file);
    setAvatarImgPost(file);
    addFileInput.current.value = "";
  };

  useEffect(() => {
    dispatch({
      type: "users/states",
      payload: "updateProfile_settings_Status",
    });
  }, []);

  return (
    <div className="Profile">
        <SectionStructure title="Profile Informations">
          <div className="profile-container">
          <div className="profile-section">
          <InputBox
          mx_width
          personelInput={
            <div className="avatar">
              <div
                style={{
                  backgroundImage: `url(${
                    avatarImg ? avatarImg : undefined_avatar
                  })`,
                }}
                className="avatar-container"
              ></div>
              <label htmlFor="addAvatar" className="add-avatar">
                <input
                  ref={addFileInput}
                  onChange={addAvatar}
                  type="file"
                  name="addAvatar"
                  id="addAvatar"
                />
                <BsPlus />
              </label>
              <div
                onClick={() => {
                  if (avatarImg !== undefined_avatar) {
                    setAvatarImg(undefined_avatar);
                    setAvatarImgPost("empty");
                  }
                }}
                className="delete-avatar"
              >
                <BsX />
              </div>
            </div>
          }
        />
          </div>
          <div className="profile-section">
          <InputBox
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          mx_width
          type="text"
          name="name"
          id="name"
          placeholder="Name"
          label="Name"
        />
        <InputBox
          disabled={true}
          value={email}
          // onChange={(e) => setEmail(e.target.value)}
          mx_width
          type="email"
          name="email"
          id="email"
          placeholder="Email"
          label="Email"
        />
        <InputBox
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          mx_width
          type="phone"
          name="phone"
          id="phone"
          placeholder="Phone"
          label="Phone"
        />
          </div>
          </div>
          <BtnsFooter>
            <div className="box"></div>
            <div className="box">
              <Btnx
                onClick={resetHandle}
                btnStyle="outline"
                color="danger"
                element="button"
              >
                Reset
              </Btnx>
              <Btnx
                onClick={updateProfileHandle}
                btnStyle="bg"
                color="success"
                element="button"
                type="submit"
              >
                Update Profile
              </Btnx>
            </div>
          </BtnsFooter>
    </SectionStructure>
      </div>
  );
}

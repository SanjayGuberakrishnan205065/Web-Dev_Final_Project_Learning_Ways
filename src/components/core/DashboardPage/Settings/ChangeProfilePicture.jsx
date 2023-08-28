import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import IconBtn from "../../../comman/IconBtn";
import { FiUpload } from "react-icons/fi";
import { updateProfilePicture } from "../../../../services/operations/settingsAPI";

export default function ChangeProfilePicture() {
  const { user } = useSelector((state) => state.profile);
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  // to preview the image file in file format
  const [previewSource, setPreviewSource] = useState(null);

  // to access the html element that in file input field
  const fileInputRef = useRef(null);

  // on click select button then by using the useRef triger that button
  const handleClick = () => {
    fileInputRef.current.click();
  };

  // when  change in file that time set the imageFile and previewFile to selected file

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      // set the user selected file
      setImageFile(file);
      previewFile(file);
    }
  };

  //preview the image file to upload
  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
    };
  };

  // on click the upload button convert the file into form date and call te servise function
  // that update th eprofile picture
  const handleFileUploade = () => {
    try {
      console.log("uploading....");
      setLoading(true);

      const formData = new FormData();
      formData.append("displayPicture", imageFile);

      dispatch(updateProfilePicture(token, formData)).then(() => {
        setLoading(false);
      });
    } catch (error) {
      console.log("PROFILE UPDATE ERROR ", error.message);
    }
  };

  // on every image change event preview thw image file to uploade
  useEffect(() => {
    if (imageFile) {
      previewFile(imageFile);
    }
  }, [imageFile]);

  return (
    <div className="flex items-center justify-between rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 px-12 text-richblack-50">
      <div className="flex flex-col md:flex-row gap-y-4 items-center gap-x-4">
        <img
          src={previewSource || user?.image}
          alt={`${user.firstName}`}
          className="aspect-square w-[78px] rounded-full object-cover"
        />

        <div className="flex flex-col items-center md:items-start space-y-4">
          <p>Change Profile Picture</p>

          <div className="flex flex-row gap-3">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              className=" hidden"
              accept="image/png, image/gif, image/jpeg"
            />

            <button
              onClick={handleClick}
              disabled={loading}
              className="cursor-pointer rounded-md bg-richblack-700 py-2 px-5 font-semibold text-richblack-50"
            >
              Select
            </button>

            <IconBtn
              text={loading ? "Uploading.." : "Uploade"}
              onclick={handleFileUploade}
            >
              {!loading && <FiUpload className="text-lg text-richblack-900" />}
            </IconBtn>
          </div>
        </div>

      </div>
    </div>
  );
}

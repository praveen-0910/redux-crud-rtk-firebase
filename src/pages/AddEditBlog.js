import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBTextArea,
  MDBValidation,
  MDBValidationItem,
} from "mdb-react-ui-kit";
import React, { Profiler, useEffect, useState } from "react";
import { storage } from "../firebase";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { toast } from "react-toastify";
import {
  useAddbBlogMutation,
  useGetSingleBlogQuery,
  useUpdateBlogMutation,
} from "../services/BlogsApi";
import { useNavigate, useParams } from "react-router-dom";
import { skipToken } from "@reduxjs/toolkit/dist/query";
const AddEditBlog = () => {
  const initialState = {
    title: "",
    description: "",
  };
  const [data, setData] = useState(initialState);
  const { title, description } = data;
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(null);
  const [addBlog] = useAddbBlogMutation();
  const navigate = useNavigate();
  const { id } = useParams();
  const { data: blog } = useGetSingleBlogQuery(id ? id : skipToken);
  const [updateBlog] = useUpdateBlogMutation();
  console.log(blog);
  useEffect(() => {
    if (id && blog) {
      setData({ ...data });
    }
  }, [id, blog]);
  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (title && description) {
      if (!id) {
        await addBlog(data);
        toast("🦄 blog created", {
          position: "top-center",
          autoClose: 5000,
        });
        navigate("/");
      } else {
        await updateBlog({ id, data });
        toast("🦄 blog updated", {
          position: "top-center",
          autoClose: 5000,
        });
        navigate("/");
      }
    }
  };
  useEffect(() => {
    const uploadFile = () => {
      const storageRef = ref(storage, file.name);
      const upoladTask = uploadBytesResumable(storageRef, file);
      upoladTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("upload is " + progress + "% done");
          setProgress(progress);
          switch (snapshot.state) {
            case "paused":
              console.log("upload is paused");
              break;
            case "running":
              console.log("upload is running");
              break;
            default:
              break;
          }
        },
        (error) => {
          console.log(error);
        },
        () => {
          getDownloadURL(upoladTask.snapshot.ref).then((downloadURL) => {
            toast("🦄 image uploaded", {
              position: "top-center",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
            setData((prev) => ({ ...prev, img: downloadURL }));
          });
        }
      );
    };
    file && uploadFile();
  }, [file]);

  return (
    <div
      style={{
        margin: "auto",
        padding: "15px",
        maxWidth: "450px",
        alignContent: "cente",
        marginTop: "120px",
      }}
      className="container"
    >
      <MDBCard alignment="center">
        <h4 className="fw-bold">{id ? "update blog" : "Create Blog"}</h4>
        <MDBCardBody>
          <MDBValidation className="row g-3">
            <MDBValidationItem
              className="col-md-12"
              feedback="please provide title"
              invalid
            >
              <input
                className="form-control"
                label="Title"
                type="text"
                name="title"
                defaultValue={id ? blog?.title : "fdfd"}
                onChange={handleChange}
                required
              />
            </MDBValidationItem>
            <MDBValidationItem
              className="col-md-12"
              feedback="please provide description"
              invalid
            >
              <MDBTextArea
                rows={5}
                className="form-control"
                label="Description"
                type="text"
                defaultValue={id ? blog?.description : ""}
                name="description"
                onChange={handleChange}
                required
              />
            </MDBValidationItem>
            <div className="col-md-12">
              <MDBInput
                disabled={id ? true : false}
                type="file"
                onChange={(e) => setFile(e.target.files[0])}
              />
            </div>
            <div className="col-md-12">
              <MDBBtn
                type="button"
                onClick={handleSubmit}
                style={{ width: "100%" }}
                disabled={id ? false : Profiler !== null && progress < 100}
              >
                {id ? "Update" : "Submit"}
              </MDBBtn>
            </div>
          </MDBValidation>
        </MDBCardBody>
      </MDBCard>
    </div>
  );
};

export default AddEditBlog;

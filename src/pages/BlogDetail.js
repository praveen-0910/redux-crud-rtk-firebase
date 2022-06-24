import { skipToken } from "@reduxjs/toolkit/dist/query";
import {
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBCardText,
  MDBCardTitle,
  MDBTypography,
} from "mdb-react-ui-kit";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useGetSingleBlogQuery } from "../services/BlogsApi";

const BlogDetail = () => {
  const { id } = useParams();
  const { data, isError, error } = useGetSingleBlogQuery(id ? id : skipToken);
  useEffect(() => {
    isError &&
      toast(error, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
  }, [isError]);
  return (
    <>
      <MDBCard className="mb-3">
        <MDBCardImage
          position="top"
          src={data?.img}
          alt={data?.title}
          style={{ height: "600px", width: "100%", objectFit: "cover" }}
        />
        <MDBCardBody>
          <MDBCardTitle className="h3 fw-bold">{data?.title}</MDBCardTitle>
          <MDBCardText className="text-start">
            <span className="fw-bold">
              {" "}
              created At - {data?.timestamp.toDate().toLocaleString()}
            </span>
          </MDBCardText>
          <MDBTypography className="text-start mb-0">
            {data?.description}
          </MDBTypography>
        </MDBCardBody>
      </MDBCard>
    </>
  );
};

export default BlogDetail;

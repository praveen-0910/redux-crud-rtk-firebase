import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBCardText,
  MDBCardTitle,
  MDBCol,
  MDBIcon,
  MDBRow,
} from "mdb-react-ui-kit";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Spinner from "../components/Spinner";
import { useDeleteBlogMutation, useGetBlogsQuery } from "../services/BlogsApi";

const Home = () => {
  const { data, isLoading, isError, error } = useGetBlogsQuery();
  const [deleteBlog] = useDeleteBlogMutation();
  useEffect(() => {
    isError &&
      toast(error, {
        position: "top-center",
        autoClose: 5000,
      });
  }, [isError]);
  const handlDelete = async (id) => {
    if (window.confirm("Mn hai dekh le wapis nhi milega")) {
      await deleteBlog(id);
      toast("🦄 delete kr diya na bechare ko", {
        position: "top-center",
        autoClose: 5000,
      });
    }
  };
  const excerpt = (str, count) => {
    if (str.length > count) {
      str = str.sunstring(0, count) + "....";
    }
    return str;
  };
  if (isLoading) {
    return <Spinner />;
  }
  return (
    <div
      style={{
        margin: "auto",
        padding: "15px",
        maxWidth: "1200px",
        alignContent: "center",
      }}
    >
      <MDBRow className="row-cols-1 row-cols-md-3 g-4">
        {data?.map((item) => (
          <MDBCol key={item.id}>
            <MDBCard className="h-100">
              <MDBCardImage
                src={item.img}
                alt={item.title}
                position="top"
                style={{ height: "200px", objectFit: "cover" }}
              />
              <MDBCardBody>
                <MDBCardTitle className="text-start">{item.title}</MDBCardTitle>
                <MDBCardText className="text-start">
                  {excerpt(item.description, 80)}
                  <div>
                    <Link to={`/detail/${item.id}`}>Read More</Link>
                  </div>
                </MDBCardText>
                <div style={{ marginLeft: "5px", float: "right" }}>
                  <MDBBtn className="mt-1" tag="a" color="none">
                    <MDBIcon
                      fas
                      size="lg"
                      icon="trash"
                      style={{ color: "#dd4b39" }}
                      onClick={() => handlDelete(item.id)}
                    />
                    <Link to={`/update/${item.id}`}>
                      <MDBIcon
                        fas
                        size="lg"
                        icon="edit"
                        style={{ color: "#55acee", marginLeft: "10px" }}
                      />
                    </Link>
                  </MDBBtn>
                </div>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        ))}
      </MDBRow>
    </div>
  );
};

export default Home;

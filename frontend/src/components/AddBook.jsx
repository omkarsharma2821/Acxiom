import { useFormik } from "formik";
import toast from "react-hot-toast";
import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import * as Yup from "yup";

const BookSchema = Yup.object().shape({
  brand: Yup.string().min(2, "Too Short!").required("Required"),
  material: Yup.string().min(2, "Too Short!").required("Required"),
  price: Yup.string().required("Required"),
});


const AddBook = () => {
  const [selFile, setSelFile] = useState("");

  const uploadFile = (e) => {
    const file = e.target.files[0];
    const fd = new FormData();
    setSelFile(file.name);
    fd.append("myfile", file);
    fetch("http://localhost:5000/util/uploadfile", {
      method: "POST",
      body: fd,
    }).then((res) => {
      if (res.status === 200) {
        console.log("file uploaded");
        toast.success("File Uploaded");
      }
    });
  };

  const BookForm = useFormik({

    initialValues: {
      publication: "",
      author: "",
      title: "",
      price: "",
      yearsold: 0,
      image: "",
    },
    onSubmit: async (values, { resetForm }) => {
      values.image = selFile;
      console.log(values);

      const res = await fetch("http://localhost:5000/book/add", {
        method: "POST",
        body: JSON.stringify(values), //here all the things are case senstive in fetch.
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(res.status);
      if (res.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Item Added Successfully",
          text: "Our Team will contact you soon",
        });
        values.image = "";
        resetForm();
        // navigate("/");
      }
    },
    validationSchema: BookSchema,
  });

  return (
    <div className="vh-100 p-4">
      <div className="d-flex justify-content-center">
        <header className="bg-dark w-50 card d-flex justify-content-center shadow-lg">
          <div className="p-3">
            <h1 className="text-center mb-2 display-4 text-white fw-bold">
              Add Book to Sell
            </h1>
          </div>
        </header>
      </div>
      <div className=" d-flex justify-content-center">
        <div className="w-50 card col-6 col-md-6 shadow-lg">
          <div className="p-5 ">
            <form onSubmit={BookForm.handleSubmit}>
              <span
                style={{ fontSize: 10, marginLeft: "10px", color: "red" }}
              >
                {BookForm.touched.brand && BookForm.errors.brand}
              </span>
              <div className="form-floating">
                <input
                  id="brand"
                  onChange={BookForm.handleChange}
                  value={BookForm.values.brand}
                  type="text"
                  className="form-control"
                  placeholder="authorname"
                />
                <label>Author Name</label>

              </div>
              <span
                style={{ fontSize: 10, marginLeft: "10px", color: "red" }}
              >
                {BookForm.touched.brand && BookForm.errors.brand}
              </span>
              <div className="form-floating">
                <input
                  id="title"
                  onChange={BookForm.handleChange}
                  value={BookForm.values.title}
                  type="text"
                  className="form-control"
                  placeholder="titlename"
                />
                <label>Title</label>

              </div>
              <span
                style={{ fontSize: 10, marginLeft: "10px", color: "red" }}
              >
                {BookForm.touched.material &&
                  BookForm.errors.material}
              </span>
              <div className="form-floating">
                <input
                  id="material"
                  onChange={BookForm.handleChange}
                  value={BookForm.values.material}
                  type="text"
                  className="form-control"
                  placeholder="material"
                />
                <label>Material</label>

              </div>
              <span
                style={{ fontSize: 10, marginLeft: "10px", color: "red" }}
              >
                {BookForm.touched.price && BookForm.errors.price}
              </span>
              <div className="form-floating mb-3">
                <input
                  id="price"
                  onChange={BookForm.handleChange}
                  value={BookForm.values.price}
                  type="number"
                  className="form-control"
                  placeholder="price"
                />
                <label>Set Price</label>

              </div>
              <div class="form-check">
                <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                  <label class="form-check-label" for="flexCheckDefault">
                    Comic Book
                  </label>
              </div>
              <div class="form-check">
                <input class="form-check-input" type="checkbox" value="" id="flexCheckChecked" checked /> 
                  <label class="form-check-label" for="flexCheckChecked">
                    Fictional Book
                  </label>
              </div>
              <div class="form-check">
                <input class="form-check-input" type="checkbox" value="" id="flexCheckChecked" checked /> 
                  <label class="form-check-label" for="flexCheckChecked">
                    Science Book
                  </label>
              </div>
              <div class="input-group mb-3">
                <input type="file" class="form-control" onChange={uploadFile} />
              </div>
              <button
                type="submit"
                className="col-6 btn btn-success w-100 mx-auto mt-4 p-2 d-flex button justify-content-center"
              >
                <h5>Add Book</h5>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddBook;
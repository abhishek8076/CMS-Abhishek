import React, { useState, useEffect } from "react";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import classNames from "classnames";
// import AxiosApi, { headers } from "../../../../AxiosApi";
import { css } from "@emotion/react";
import axios from "axios";
export const WhatsNewValidation = yup.object({
    whatsNewText: yup.string().required("Enter what's new text"),
  });
  
const Whats_New = () => {
  const [state, setstate] = useState([]);
  const [states, setstates] = useState([]);
  const [loadingButton, setLoadingButton] = useState(false);
  const [messageShow, setMessageShow] = useState(false);
  const [messageText, setMessageText] = useState("");
  const [messageActive, setMessageActive] = useState(false);
  const [whatsNewData, setWhatsNewData] = useState([]);
  const [loadData, setLoadData] = useState(false);
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
    resolver: yupResolver(WhatsNewValidation),
  });
  const inputEvent = (event) => {
    const { name, value } = event.target;
    setstate((preValue) => {
      return {
        ...preValue,
        [name]: value,
      };
    });
  };
  useEffect(() => {
    async function fetchData() {
      // Get REGISTRATION DETAILS ====================>
      const WhatsNewResult = await axios.get(`/Department/WhatsnewList`, {
        // headers: headers(),
      });
      const WhatsNewResp = WhatsNewResult?.data;
      console.log("cvgja", WhatsNewResp);
      setWhatsNewData(WhatsNewResp);
      setLoadData(false);
    }
    fetchData();
  }, [loadData === true]);

  const onSubmit = () => {
    const jsonPost = {
      text: state.whatsNewText,
    };
    if (state.whatsNewText !== "") {
      const confirmationButton = window.confirm(
        `Do you really want to Add What's New ?`
      );
      if (confirmationButton === true) {
        //setLoadingButton(true);
        async function ApiPostfetchData() {
          const result = axios.post(`/Department/InsertWhatsnew`, jsonPost, {
            // headers: headers(),
          }).then(function (result) {
            const resp = result?.data;
            if (resp === "success") {
              setMessageShow(true);
              setMessageActive(true);
              setMessageText(
                `"${state.whatsNewText}" has been Added Successfully.`
              );
              setstate({ whatsNewText: "" });
              setstates({ ...state });
              reset();
              setLoadingButton(false);
              setLoadData(true);
            }
          });
        }
        ApiPostfetchData();
      }
    }
  };
  const onReset = () => {
    reset();
    setMessageShow(false);
  };
  const Deactive = (id, text) => {
    const confirmationButton = window.confirm(
      `Do you really want to Deactive "${text}"   ?`
    );
    if (confirmationButton === true) {
      async function ApiPostfetchData() {
        const result = axios.get(
          `/Department/DeactiveWhatsnew?Id=${id}`,
          null,
          {
            // headers: headers(),
          }
        ).then(function (result) {
          const resp = result?.data;
          // alert(resp);
          if (resp === "success") {
            setMessageText(`"${text}" has been Deactivated Successfully.`);
            //alert(`"${text}" has been Deactivated Successfully.`);
            setLoadData(true);
            setMessageShow(true);
            setMessageActive(false);
          }
        });
      }
      ApiPostfetchData();
    }
  };

  const Active = (id, text) => {
    const confirmationButton = window.confirm(
      `Do you really want to Active "${text}"  ?`
    );
    if (confirmationButton === true) {
      //setLoadingButton(true);
      async function ApiPostfetchData() {
        const result = axios.get(
          `/Department/ActiveWhatsnew?Id=${id}`,
          null,
          {
            // headers: headers(),
          }
        ).then(function (result) {
          const resp = result?.data;

          if (resp === "success") {
            //alert(`"${text}" has been Activated Successfully.`);
            setLoadData(true);
            setMessageShow(true);
            setMessageActive(true);
            setMessageText(`"${text}" has been Activated Successfully.`);
          }
        });
      }
      ApiPostfetchData();
    }
  };
  const Delete = (id, text) => {
    const confirmationButton = window.confirm(
      `Do you really want to Delete "${text}"?`
    );
    if (confirmationButton === true) {
      //setLoadingButton(true);
      async function ApiPostfetchData() {
        const result = axios.get(
          `/Department/DeleteWhatsnew?Id=${id}`,
          null,
          {
            // headers: headers(),
          }
        ).then(function (result) {
          const resp = result?.data;

          if (resp === "success") {
            //alert(`"${text}" has been Deleted Successfully.`);
            setMessageText(`"${text}" has been Deleted Successfully.`);
            setLoadData(true);
            setMessageShow(true);
            setMessageActive(false);
          }
        });
      }
      ApiPostfetchData();
    }
  };
  return (
    <>
      <body>
        <div className="container-scroller">
       
          <div className="container-fluid page-body-wrapper">
         
            <div className="main-panel">
              <div className="content-wrapper">
                <div className="page-header">
                  <h3 className="page-title">
                    <span className="page-title-icon bg-gradient-primary text-white mr-2">
                      <i className="mdi mdi-earth"></i>
                    </span>
                    What's New
                  </h3>
                </div>

                <>
             
                  <div className="row">
                    <div className="col-12 grid-margin">
                      <div className="card">
                        <div
                          className="card-body"
                          style={{ background: "#ffffff" }}
                        >
                          <form
                            className="pt-2 forms-sample"
                            onSubmit={handleSubmit(onSubmit)}
                            autoComplete="off"
                          >
                            <div className="form-group row">
                              <label className="col-sm-2 col-form-label">
                                Enter Text :
                                <span style={{ color: "#FF0000" }}>
                                  <b>*</b>
                                </span>
                              </label>
                              <div className="col-sm-3">
                                <textarea
                                  className={classNames("form-control", {
                                    "is-invalid": errors.whatsNewText,
                                  })}
                                  {...register("whatsNewText")}
                                  onChange={inputEvent}
                                  placeholder="Enter What's New Text"
                                  name="whatsNewText"
                                  maxLength={100}
                                />

                                <small className="invalid-feedback">
                                  {errors.whatsNewText?.message}
                                </small>
                              </div>
                            </div>

                            <div className="form-group row">
                              <div className="col-sm-2"></div>
                              <div className="col-sm-10">
                                {loadingButton === false ? (
                                  <button
                                    type="submit"
                                    className="btn btn-outline-success btn-icon-text btn-sm"
                                  >
                                    <i className="mdi mdi-file-check btn-icon-prepend"></i>
                                    Submit
                                  </button>
                                ) : (
                                  <button
                                    type="button"
                                    className="btn btn-outline-success btn-sm  buttonload"
                                  >
                                    <i class="fa fa-refresh fa-spin mr-2"></i>
                                    Loading
                                  </button>
                                )}

                                <button
                                  type="button"
                                  className="btn btn-outline-danger btn-sm"
                                  style={{ marginLeft: "10px" }}
                                  onClick={onReset}
                                >
                                  <i className="mdi mdi-refresh"></i>
                                  Reset
                                </button>
                              </div>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* <div className="row">
                    <div className="col-12 grid-margin">
                      <div className="card">
                        <div
                          className="card-body"
                          style={{ background: "#ffffff" }}
                        >
                          <h4 className="card-title text-info ">
                            What's New Details
                          </h4>
                          <div className="table-responsive">
                            <table className="table table-bordered">
                              <thead>
                                <tr>
                                  <th> Sr No. </th>
                                  <th> What's New </th>
                                  <th>Create Date</th>
                                  <th> Status </th>
                                  <th> Action </th>
                                </tr>
                              </thead>
                              <tbody>
                                {whatsNewData?.map((value, index) => {
                                  const [month, day, year] =
                                    value?.cdate.split("/");
                                  const yr = year.split(" ")[0];
                                  const DD = `${day}/${month}/${yr}`;
                                  return (
                                    <tr key={index}>
                                      <td> {index + 1}</td>
                                      <td style={{ textAlign: "left" }}>
                                        {value.text}
                                      </td>
                                      <td> {DD} </td>
                                      <td>
                                        {value.active === "1" ? (
                                          <button
                                            type="submit"
                                            className="btn btn-outline-danger btn-icon-text btn-sm"
                                            onClick={() =>
                                              Deactive(value.id, value.text)
                                            }
                                          >
                                            Deactive
                                          </button>
                                        ) : (
                                          <button
                                            type="submit"
                                            className="btn btn-outline-success btn-icon-text btn-sm"
                                            onClick={() =>
                                              Active(value.id, value.text)
                                            }
                                          >
                                            Active
                                          </button>
                                        )}
                                      </td>
                                      <td>
                                        <button
                                          type="submit"
                                          className="btn btn-danger btn-icon-text btn-sm"
                                          onClick={() =>
                                            Delete(value.id, value.text)
                                          }
                                        >
                                          Delete
                                        </button>
                                      </td>
                                    </tr>
                                  );
                                })}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div> */}
                </>
          
              </div>
            </div>
          </div>
        </div>
      </body>
    </>
  );
};

export default Whats_New;

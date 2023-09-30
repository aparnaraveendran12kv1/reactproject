import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { PencilSquare } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";
import { FiSave } from "react-icons/fi";

const FileUpload = () => {
  const navigate = useNavigate();

  const [file, setFile] = useState(null);
  const [fileURL, setFileURL] = useState(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState(""); // Added phoneNumber state
  const [formErrors, setFormErrors] = useState({});
  const [step, setStep] = useState(1);
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [acknowledged, setAcknowledged] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      if (
        selectedFile.type === "application/vnd.ms-excel" ||
        selectedFile.type ===
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
        selectedFile.type === "text/csv"
      ) {
        setFile(selectedFile);
        setFileURL(URL.createObjectURL(selectedFile));
      } else {
        setFormErrors({
          ...formErrors,
          file: "Please select a valid CSV or Excel file.",
        });
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Form validation
    const errors = {};
    if (!firstName) {
      errors.firstName = "First name is required";
    } 
    if (!lastName) {
      errors.lastName = "Last name is required";
    } 
    if (!email) {
      errors.email = "Email is required";
    } else if (!isValidEmail(email)) {
      errors.email = "Invalid email format";
    }
    if (!phoneNumber) {
      errors.phoneNumber = "Phone number is required";
    } else if (!/^\d{10}$/.test(phoneNumber)) {
      errors.phoneNumber = "Phone number should be exactly 10 digits";
    }

    if (Object.keys(errors).length === 0) {
      if (step === 1) {
        setStep(2);
      } else if (step === 2) {
        setShowPreviewModal(true);
      }
    } else {
      setFormErrors(errors);
    }
  };

  const handleAcknowledge = () => {
    setAcknowledged(true);
    setShowPreviewModal(false);
    setSubmitted(true);

    navigate("/success");
  };

  const handleEdit = () => {
    setEditMode(true);
  };

  const handleFileEdit = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      if (
        selectedFile.type === "application/vnd.ms-excel" ||
        selectedFile.type ===
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
        selectedFile.type === "text/csv"
      ) {
        setFile(selectedFile);
        setFileURL(URL.createObjectURL(selectedFile));
      } else {
        setFormErrors({
          ...formErrors,
          file: "Please select a valid CSV or Excel file.",
        });
      }
    }
  };

  const isValidEmail = (value) => {
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    return emailRegex.test(value);
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card shadow">
            <div className="card-body">
              <h2 className="card-title text-center">
                {step === 1 ? "Employee Task" : "Employee Task"}
              </h2>
              <form onSubmit={handleSubmit}>
                {step === 1 && (
                  <div>
                    <div className="form-group">
                      <label>First Name</label>
                      <input
                        type="text"
                        className={`form-control ${
                          formErrors.firstName ? "is-invalid" : ""
                        }`}
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                      />
                      {formErrors.firstName && (
                        <div className="invalid-feedback">
                          {formErrors.firstName}
                        </div>
                      )}
                    </div>
                    <div className="form-group">
                      <label>Last Name</label>
                      <input
                        type="text"
                        className={`form-control ${
                          formErrors.lastName ? "is-invalid" : ""
                        }`}
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                      />
                      {formErrors.lastName && (
                        <div className="invalid-feedback">
                          {formErrors.lastName}
                        </div>
                      )}
                    </div>
                    <div className="form-group">
                      <label>Email</label>
                      <input
                        type="email"
                        className={`form-control ${
                          formErrors.email ? "is-invalid" : ""
                        }`}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                      {formErrors.email && (
                        <div className="invalid-feedback">
                          {formErrors.email}
                        </div>
                      )}
                    </div>
                    <div className="form-group">
                      <label>Phone Number</label>
                      <input
                        type="tel"
                        className={`form-control ${
                          formErrors.phoneNumber ? "is-invalid" : ""
                        }`}
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                      />
                      {formErrors.phoneNumber && (
                        <div className="invalid-feedback">
                          {formErrors.phoneNumber}
                        </div>
                      )}
                    </div>
                    <div className="form-group">
                      <label>Data Upload (.csv/Excel file)</label>
                      <input
                        type="file"
                        accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                        onChange={handleFileChange}
                      />
                      {file && (
                        <p className="mt-3">
                          File uploaded successfully: {file.name}
                          <br />
                          <a
                            href={fileURL}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            View Uploaded File
                          </a>
                        </p>
                      )}
                      {formErrors.file && (
                        <div className="invalid-feedback">{formErrors.file}</div>
                      )}
                    </div>
                  </div>
                )}
                {step === 2 && (
                  <div>
                    <div className="alert alert-info">
                      Please review the entered data before proceeding.
                    </div>
                    {editMode ? (
                      <div>
                        <div className="form-group">
                          <label>First Name</label>
                          <input
                            type="text"
                            className="form-control"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                          />
                        </div>
                        <div className="form-group">
                          <label>Last Name</label>
                          <input
                            type="text"
                            className="form-control"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                          />
                        </div>
                        <div className="form-group">
                          <label>Email</label>
                          <input
                            type="email"
                            className="form-control"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                          />
                        </div>
                        <div className="form-group">
                          <label>Phone Number</label>
                          <input
                            type="tel"
                            className="form-control"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                          />
                        </div>
                        <div className="form-group">
                          <label>Edit Data Upload (.csv)</label>
                          <input
                            type="file"
                            accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                            onChange={handleFileEdit}
                          />
                          {file && (
                            <p className="mt-3">
                              File uploaded successfully: {file.name}
                              <br />
                              <a
                                href={fileURL}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                View Uploaded File
                              </a>
                            </p>
                          )}
                        </div>
                      </div>
                    ) : (
                      <div>
                        <p><strong>First Name:</strong> {firstName}</p>
                        <p><strong>Last Name:</strong> {lastName}</p>
                        <p><strong>Email:</strong> {email}</p>
                        <p><strong>Phone Number:</strong> {phoneNumber}</p>
                        {file && (
                          <p><strong>File Uploaded:</strong> {file.name}</p>
                        )}
                      </div>
                    )}
                    <div className="text-center">
                      {editMode ? (
                        <button
                        type="button"
                        className="btn btn-success"
                        onClick={() => setEditMode(false)}
                      >
                        <FiSave /> Save
                      </button>
                      ) : (
                        <button
                          type="button"
                          className="btn btn-success"
                          onClick={handleEdit}
                        >
                          <PencilSquare /> Edit
                        </button>
                      )}
                      <button
                        type="submit"
                        className="btn btn-success"
                      >
                        Preview
                      </button>
                    </div>
                  </div>
                )}

                <div className="text-center">
                  {step === 1 && (
                    <button type="submit" className="btn btn-success">
                      Next
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      <Modal
        show={showPreviewModal}
        onHide={() => setShowPreviewModal(false)}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Preview Data</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {step === 2 && !editMode ? (
            <div>
              <p><strong>First Name:</strong> {firstName}</p>
              <p><strong>Last Name:</strong> {lastName}</p>
              <p><strong>Email:</strong> {email}</p>
              <p><strong>Phone Number:</strong> {phoneNumber}</p>
              {file && (
                <p><strong>File Uploaded:</strong> {file.name}</p>
              )}
            </div>
          ) : null}

          {step === 2 && editMode ? (
            <div>
              <div className="form-group">
                <label>First Name</label>
                <input
                  type="text"
                  className="form-control"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Last Name</label>
                <input
                  type="text"
                  className="form-control"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  className="form-control"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Phone Number</label>
                <input
                  type="tel"
                  className="form-control"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Edit Data Upload (.csv)</label>
                <input
                  type="file"
                  accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                  onChange={handleFileEdit}
                />
                {file && (
                  <p className="mt-3">
                    File uploaded successfully: {file.name}
                    <br />
                    <a
                      href={fileURL}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View Uploaded File
                    </a>
                  </p>
                )}
              </div>
            </div>
          ) : null}
        </Modal.Body>
        <Modal.Footer>
          {!acknowledged ? (
            <Button variant="success" onClick={handleAcknowledge}>
              Submit
            </Button>
          ) : (
            <Button variant="success" disabled>
              Submit
            </Button>
          )}
        </Modal.Footer>
      </Modal>

      {submitted && (
        <div className="row justify-content-center mt-3">
          <div className="col-md-6">
            <div className="alert alert-success text-center">
              Form submitted successfully!
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FileUpload;

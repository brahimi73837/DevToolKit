"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import Link from "next/link";

interface FormElement {
  type: string;
  label: string;
  id: string;
}

export default function FormBuilder() {
  const [formElements, setFormElements] = useState<FormElement[]>([]);
  const [formCode, setFormCode] = useState<string>("");
  const [previewCode, setPreviewCode] = useState<string>("");

  // Function to add form elements of different types
  const addElement = (type: string) => {
    const newElement: FormElement = {
      type,
      label: "",
      id: `input-${formElements.length}`,
    };
    setFormElements([...formElements, newElement]);
  };

  // Handle label changes for each form element
  const handleLabelChange = (id: string, label: string) => {
    const updatedElements = formElements.map((el) =>
      el.id === id ? { ...el, label } : el
    );
    setFormElements(updatedElements);
  };

  // Generate HTML code for the form elements with added CSS
  const generateCode = () => {
    const code = `
      <div class="container">
        <div class="title">Generated Form</div>
        <div class="content">
          <form action="#">
            <div class="user-details">
              ${formElements
                .map((el) => {
                  switch (el.type) {
                    case "input":
                      return `
                        <div class="input-box">
                          <span class="details">${el.label}</span>
                          <input type="text" placeholder="Enter ${el.label}" required />
                        </div>`;
                    case "password":
                      return `
                        <div class="input-box">
                          <span class="details">${el.label}</span>
                          <input type="password" placeholder="Enter ${el.label}" required />
                        </div>`;
                    case "email":
                      return `
                        <div class="input-box">
                          <span class="details">${el.label}</span>
                          <input type="email" placeholder="Enter ${el.label}" required />
                        </div>`;
                    case "checkbox":
                      return `
                        <div class="input-box">
                          <label for="${el.id}">
                            <input type="checkbox" id="${el.id}" /> ${el.label}
                          </label>
                        </div>`;
                    case "radio":
                      return `
                        <div class="gender-details">
                          <span class="gender-title">${el.label}</span>
                          <div class="category">
                            <label for="${el.id}-1">
                              <span class="dot one"></span>
                              <span class="gender">Male</span>
                            </label>
                            <label for="${el.id}-2">
                              <span class="dot two"></span>
                              <span class="gender">Female</span>
                            </label>
                            <label for="${el.id}-3">
                              <span class="dot three"></span>
                              <span class="gender">Prefer not to say</span>
                            </label>
                          </div>
                        </div>`;
                    case "button":
                      return `
                        <div class="button">
                          <input type="submit" value="${el.label}" />
                        </div>`;
                    default:
                      return "";
                  }
                })
                .join("\n")}
          </form>
        </div>
      </div>

      <style>
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@200;300;400;500;600;700&display=swap');
        *{
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          font-family: 'Poppins',sans-serif;
        }
        body{
          height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 10px;
          background: linear-gradient(135deg, #71b7e6, #9b59b6);
        }
        .container{
          max-width: 700px;
          width: 100%;
          background-color: #fff;
          padding: 25px 30px;
          border-radius: 5px;
          box-shadow: 0 5px 10px rgba(0,0,0,0.15);
        }
        .container .title{
          font-size: 25px;
          font-weight: 500;
          position: relative;
        }
        .container .title::before{
          content: "";
          position: absolute;
          left: 0;
          bottom: 0;
          height: 3px;
          width: 30px;
          border-radius: 5px;
          background: linear-gradient(135deg, #71b7e6, #9b59b6);
        }
        .content form .user-details{
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
          margin: 20px 0 12px 0;
        }
        form .user-details .input-box{
          margin-bottom: 15px;
          width: calc(100% / 2 - 20px);
        }
        form .input-box span.details{
          display: block;
          font-weight: 500;
          margin-bottom: 5px;
        }
        .user-details .input-box input{
          height: 45px;
          width: 100%;
          outline: none;
          font-size: 16px;
          border-radius: 5px;
          padding-left: 15px;
          border: 1px solid #ccc;
          border-bottom-width: 2px;
          transition: all 0.3s ease;
        }
        .user-details .input-box input:focus,
        .user-details .input-box input:valid{
          border-color: #9b59b6;
        }
        form .gender-details .gender-title{
          font-size: 20px;
          font-weight: 500;
        }
        form .category{
          display: flex;
          width: 80%;
          margin: 14px 0;
          justify-content: space-between;
        }
        form .category label{
          display: flex;
          align-items: center;
          cursor: pointer;
        }
        form .category label .dot{
          height: 18px;
          width: 18px;
          border-radius: 50%;
          margin-right: 10px;
          background: #d9d9d9;
          border: 5px solid transparent;
          transition: all 0.3s ease;
        }
        #dot-1:checked ~ .category label .one,
        #dot-2:checked ~ .category label .two,
        #dot-3:checked ~ .category label .three{
          background: #9b59b6;
          border-color: #d9d9d9;
        }
        form input[type="radio"]{
          display: none;
        }
        form .button{
          height: 45px;
          margin: 35px 0
        }
        form .button input{
          height: 100%;
          width: 100%;
          border-radius: 5px;
          border: none;
          color: #fff;
          font-size: 18px;
          font-weight: 500;
          letter-spacing: 1px;
          cursor: pointer;
          transition: all 0.3s ease;
          background: linear-gradient(135deg, #71b7e6, #9b59b6);
        }
        form .button input:hover{
          background: linear-gradient(-135deg, #71b7e6, #9b59b6);
        }
      </style>
    `;

    setFormCode(code);
    setPreviewCode(code); // Update the preview area with generated code
  };

  // Copy code to clipboard
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <Link href="/" className="absolute top-4 left-4">
        <Button variant="outline">Back to Home</Button>
      </Link>
      <Card className="w-full max-w-4xl">
        <CardHeader>
          <CardTitle className="flex justify-between items-center">
            <span>Form Builder</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex space-x-2 flex-wrap">
              <Button onClick={() => addElement("input")}>
                Add Text Input
              </Button>
              <Button onClick={() => addElement("password")}>
                Add Password
              </Button>
              <Button onClick={() => addElement("email")}>Add Email</Button>
              <Button onClick={() => addElement("checkbox")}>
                Add Checkbox
              </Button>
              <Button onClick={() => addElement("radio")}>Add Gender</Button>
              <Button onClick={() => addElement("button")}>Add Button</Button>
            </div>
            <div className="flex flex-col space-y-2">
              {formElements.map((el) => (
                <div key={el.id} className="flex items-center space-x-2">
                  <input
                    type="text"
                    placeholder="Label"
                    value={el.label}
                    onChange={(e) => handleLabelChange(el.id, e.target.value)}
                    className="border rounded p-2 w-60"
                  />
                  <span>{el.type}</span>
                </div>
              ))}
            </div>
            <Button onClick={generateCode}>Generate Code</Button>

            {/* Form Preview */}
            <div className="border rounded p-4 min-h-[200px] bg-background">
              <h3 className="font-semibold mb-2">Form Preview</h3>
              {/* Use an iframe to display the live preview */}
              <iframe
                srcDoc={previewCode}
                title="Form Preview"
                width="100%"
                height="600px"
                frameBorder="0"
                sandbox="allow-scripts allow-same-origin"
              />
            </div>

            {/* Generated HTML Code */}
            <Textarea
              value={formCode}
              readOnly
              placeholder="Generated code will appear here..."
              className="min-h-[200px] font-mono"
            />
            <Button onClick={() => copyToClipboard(formCode)}>Copy Code</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

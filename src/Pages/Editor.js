import React, { useContext, useState } from "react";
import ReactQuill from "react-quill";
import { create } from "ipfs-http-client";
import "react-quill/dist/quill.snow.css";
import { Context } from "../Store";
import Button from "react-bootstrap/Button";

const Editor = () => {
  const [text, setText] = useState("Type your contract here...");
  // const [deployed, setDeployed] = useState(false);
  // const [ipfsURL, setipfsURL] = useState('');
  const [isDeployed, setIsDeployed] = useState(false);
  const [state, actions] = useContext(Context);
  console.log(state);

  const ipfs = create({
    host: "ipfs.infura.io",
    port: 5001,
    protocol: "https",
  });

  const addtoIPFS = async () => {
    const result = await ipfs.add(text);
    const ipfsURL = `https://gateway.ipfs.io/ipfs/${result.path}`;
    console.log("ipfsURL", ipfsURL);
    const addresses = getAddresses();
    const addressArray = Object.assign(
      addresses.map((v) => ({ address: v, signed: false }))
    );

    actions.addContract(result.path, addressArray);
    setIsDeployed(true);
  };

  let modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { align: "" },
        { align: "center" },
        { align: "right" },
        { align: "justify" },
      ],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      //   ['link', 'image', 'video'],
      ["clean"],
    ],
  };

  let formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "align",
    "list",
    "bullet",
    "indent",
    // 'link', 'image', 'video'
  ];

  const getAddresses = () => {
    let n = text.match(/0x[a-fA-F0-9]{40}/g);
    return n;

    // const addressArray = Object.assign(
    //   n.map((v) => ({ name: v, signed: false }))
    // );

    // return addressArray;
  };

  const formatAddresses = () => {
    const contractList = getAddresses();
    return contractList ? contractList.join(" ") : null;
  };

  const getContracts = () => {
    const contracts = localStorage.getItem("contracts");
    console.log("contracts:", contracts);
    return contracts;
  };
  return (
    <div>
      <ReactQuill
        theme="snow"
        className="quill_editor"
        modules={modules}
        formats={formats}
        value={text}
        onChange={setText}
      ></ReactQuill>
      <center>
        <Button onClick={addtoIPFS}>Deploy Contract!</Button>
      </center>

      <div>
        <h2>Wallet Addresses in Document:</h2>
        <p>{formatAddresses()}</p>
      </div>

      <div>
        {isDeployed && (
          <div>
            {/* <h2>Deployed!</h2> */}
            {/* <h3>Yoo</h3>
            <p>{getContracts()}</p> */}
            <div className="alert alert-success" role="alert">
              Success! Your contract is stored and ready to sign in the{" "}
              <a href="/explorer" class="alert-link">
                Explorer
              </a>
            </div>
          </div>
        )}
      </div>
      {/* {deployed ? ipfsPath : null}  */}
    </div>
  );
};

export default Editor;

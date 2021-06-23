import React, {useState} from "react"
import ReactQuill from "react-quill"
import { create } from 'ipfs-http-client'
import 'react-quill/dist/quill.snow.css'

const Editor = () => {
    const [value, setValue] = useState('Type your contract here...')
    // const [deployed, setDeployed] = useState(false);
    // const [ipfsURL, setipfsURL] = useState('');

    const ipfs = create({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' });

    const addtoIPFS = async () => {
        const result = await ipfs.add(value);
        const ipfsURL = `https://gateway.ipfs.io/ipfs/${result.path}`;
        // deployed = true;
        //console.log(ipfsURL);
    }

    let modules = {
        toolbar: [
          [{ 'header': [1, 2, false] }],
          ['bold', 'italic', 'underline','strike', 'blockquote'],
          [{align: ''}, {align: 'center'}, {align: 'right'}, {align: 'justify'}],
          [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
        //   ['link', 'image', 'video'],
          ['clean']
        ],
      }

      let formats = [
        'header',
        'bold', 'italic', 'underline', 'strike', 'blockquote',
        'align',
        'list', 'bullet', 'indent'
        // 'link', 'image', 'video'
      ]

    return (
        <div>
        <ReactQuill theme="snow" 
                    className="quill_editor"
                    modules={modules}
                    formats={formats}
                    value={value}
                    onChange={setValue}>
        </ReactQuill>
        <button onClick={addtoIPFS}>Deploy to IPFS</button>
        {/* {deployed ? ipfsPath : null} */}
    </div>
    )
}

export default Editor;
import React, {useState, useEffect, useRef } from "react";
import * as esbuild from 'esbuild-wasm';

function EsTest() {
    const ref = useRef<any>()
    const [input, setInput] = useState('')
    const [code, setCode] = useState('')
  
    const startService = async () => {
      ref.current = await esbuild.startService({
        worker: true,
        wasmURL: 'esbuild.wasm',
      });
    };
  
    useEffect(() => {
      startService()
      console.log('inside useEffect')
    },[])
  
    const onClick = async () => {
      console.log("onclics")
      console.log(ref.current)
      if (!ref.current) {
        return
      }
      console.log("hereee1")
      const result =   ref.current.serve(input, {
        loader: 'jsx',
        target: 'es2015'
      })
      console.log(result)
      result
      .then((value: any) => { console.log("here value") })
      .catch((err: any)=> { console.log("here error") });
   
    }
  
    return (
      <div>
        <textarea value={input} onChange={(e) => setInput(e.target.value)}></textarea>
        <div>
          <button onClick= {onClick}>Submit</button>
        </div>
        <pre></pre>
      </div>
    );
  }
  
  export default EsTest;
  
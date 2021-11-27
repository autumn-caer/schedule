import React from "react";
import * as esbuild from "esbuild-wasm";
import { useState, useEffect, useRef } from "react";
import { unpkgPathPlugin } from "./practise03/plugin/unpkg-path-plugin";
import { fetchPlugin } from "./practise03/plugin/fetch-plugin";

function App() {
  const ref = useRef<any>();
  const iFrame = useRef<any>();
  const [input, setInput] = useState("");
  const [code, setCode] = useState("");

  const startService = async () => {
    ref.current = await esbuild.startService({
      worker: true,
      wasmURL: "/esbuild.wasm",
    });
  };
  useEffect(() => {
    startService();
  }, []);

  const onClick = async () => {
    if (!ref.current) {
      return;
    }

    iFrame.current.srcdoc = html;

    const result = await ref.current.build({
      entryPoints: ["index.js"],
      bundle: true,
      write: false,
      plugins: [unpkgPathPlugin(), fetchPlugin(input)],
      define: {
        "process.env.NODE_ENV": `"production"`,
        global: "window",
      },
    });

    iFrame.current.contentWindow.postMessage(result.outputFiles[0].text, "*");
  };

  const html = `
    <html>
      <head></head>
      <body>
        <div id="root"></div>
        <script>
          window.addEventListener('message', (event) => {
            try {
              eval(event.data)
            } catch(err) {
              const root = document.querySelector('#root')
              root.innerHTML = '<div style="color: red;"> <h4>Runtime Error </h4>' + err + '</div>'
              console.error(err)
            }
          }, false)
        </script>
      </body>
    </html>
    `;
  return (
    <div>
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
      ></textarea>
      <div>
        <button onClick={onClick}>Submit</button>
      </div>
      <iframe
        title="preview"
        ref={iFrame}
        sandbox="allow-scripts"
        srcDoc={html}
      />
    </div>
  );
}

export default App;

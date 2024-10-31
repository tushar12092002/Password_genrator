import { useState ,useCallback, useEffect ,useRef } from 'react'
import './App.css'

function App() {
  const [length, setlength] = useState(8);
  const [number, setnumber] = useState(false);
  const [char, setchar] = useState(false);
  const [Password, setpassword] = useState("");
  // ref hook
  const passwordRef = useRef(null);

  const Password_generator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIZKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (number) {
      str += "0123456789";
    }

    if (char) {
      str += "!@#$%^&*()";
    }

    for (let i = 1; i <= length; i++) {
      let a = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(a);
    }

    setpassword(pass);
  }, [length, number, char, setpassword]);

  useEffect(() => {
    Password_generator();
  }, [length, number, char, setpassword, Password_generator]);

  // function copypasswordToClip(){
  //   window.navigator.clipboard.writeText(Password);
  // }

  function copypasswordToClip(){
    passwordRef.current?.select();
    // passwordRef.current?.setSelectionRange(0 ,3) 
    window.navigator.clipboard.writeText(Password);
  }

  return (
    <>
      <div className="w-full h-screen	 bg-black flex justify-center items-center ">
        <div className="p-20 bg-orange-700 overflow-hidden ">
          <h1 className="text-white text-center my-4">Password generator</h1>
          <input
            type="text"
            placeholder="password"
            value={Password}
            className="outline-none w-full py-1 px-3"
            readOnly
            ref={passwordRef}
          ></input>
          <button
            className="p-2 text-pink-600 bg-white my-4 rounded-lg"
            onClick={copypasswordToClip}
          >
            copy
          </button>
          <div className="">
            <div className="">
              <input
                type="range"
                min={6}
                max={10}
                value={length}
                className="cursor-pointer"
                onChange={(e) => {
                  setlength(e.target.value);
                }}
              ></input>
              <label className=" text-white">length : {length}</label>
            </div>

            <div className="flex items-center gap-x-1 text-white">
              <input
                type="checkbox"
                defaultChecked={number}
                onChange={() => {
                  setnumber((prev) => !prev);
                }}
              ></input>
              <label>Number</label>

              <input
                className="px-5 text-white"
                type="checkbox"
                defaultChecked={char}
                onChange={() => {
                  setchar((prev) => !prev);
                }}
              ></input>
              <label>Characters</label>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App

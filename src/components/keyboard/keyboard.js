import React, { useState, useRef, useEffect } from 'react';

const Keyboard = () => {

    const [cursor, setCursor] = useState(1);
    const [InputedText, setInputedText] = useState("مرحبا");
    const inputReference = useRef(null);
  
    const [selection, setSelection] = useState()
  
    useEffect(() => {
      if (!selection) return;  // prevent running on start
      const { start, end } = selection;
      inputReference.current.focus();
      inputReference.current.setSelectionRange(start, end);
    }, [selection])

    return ( <React.Fragment>
        <button

onClick={(e) => {
  // console.log("hi");
  setInputedText('done');
  var txt2 = InputedText.slice(0, cursor) + "َ" + InputedText.slice(cursor);
  setInputedText(txt2);
  inputReference.current.focus();
  const start = inputReference.current.selectionStart;
  const end = inputReference.current.selectionEnd;

  setSelection({ start: start + 2, end: end + 2 });
  setCursor(cursor+2)


  // console.log(inputReference.current.setSelectionRange(2, 4));


}}


style={{ fontSize: 100, width: 300 }}>َ</button>
<br />
<input type="text"
ref={inputReference}
value={InputedText}


style={{ textAlign: 'right' }}


onClick={(e) => {
  console.log(e.target.selectionStart)
  setCursor(e.target.selectionStart);
  // this.focus();

}}

onChange={
  (e) => {
    setInputedText(e.target.value);
    console.log("changed");
  }
}
/>
<br />
مرحبا

    </React.Fragment>);
}
 
export default Keyboard;
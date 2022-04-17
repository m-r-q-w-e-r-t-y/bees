import { useState, useEffect, useCallback } from 'react'
// import { highlight, languages } from 'prismjs/components/prism-core';
// import 'prismjs/components/prism-clike';
// import 'prismjs/components/prism-javascript';
import CodeMirror from '@uiw/react-codemirror';
import Comment from '../comment/Comment.jsx';
import { handleSubmit } from '../comment/Comment.jsx'
import { python } from '@codemirror/legacy-modes/mode/python';   // npm i @codemirror/legacy-modes
import { swift } from '@codemirror/legacy-modes/mode/swift';   // npm i @codemirror/legacy-modes
import { javascript } from '@codemirror/legacy-modes/mode/javascript';   // npm i @codemirror/legacy-modes
import { go } from '@codemirror/legacy-modes/mode/go';   // npm i @codemirror/legacy-modes
import { c } from '@codemirror/legacy-modes/mode/clike';   // npm i @codemirror/legacy-modes
import { StreamLanguage } from '@codemirror/stream-parser';    // npm i @codemirror/stream-parser
import "./note.css"

const Note = () => {

  // Variables for highlighting page
  const [commentButtonPoint, setCommentButtonPoint] = useState({ x: 0, y: 0 });           // Tells Comment button where to position
  const [commentHover, setCommentHover] = useState(false);                            // Shows Comment button on true. Removes in false
  const [commentsList, setCommentsList] = useState([]);                               // Comment list that shows on the left
  const [visibleComments, setVisibleComments] = useState(true);                       // Hides or unhides the comments for viewing
  const [codefield, setCodeField] = useState("");
  const [savedComments, setSavedComments ] = useState([]);
  const [commentHeight, setCommentHeight ] = useState(0);
  const [commentAmount, setCommentAmount ] = useState();
  const [language, setLanguage] = useState(javascript)                                // Used for syntax highlighting
  const [count, setCount] = useState(0);
  // Code that is shown on the CodeMirror editor. Can use MongoDB to make dynamic
  var code = codefield;
  var i = 200;

  const lang = {
    "py": python,
    "swift": swift,
    "js": javascript,
    "go": go,
    "c": c
  }

  // Handles what to do when the an HTML element comes into view (https://codepen.io/ryanfinni/pen/VwZeGxN) (https://codepen.io/ryanfinni/pen/jONBEdX)
  const handleIntersection = (entries) => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        entry.target.classList.add('fadeIn');
      }
      else {
        entry.target.classList.remove('fadeIn');
      }
    }
  }

  //Store code in database
  const handleSave = (event) => {
    console.log(code)
    event.preventDefault()
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: "4231243@gmail.com", filename: "test", code: code })
    };
    fetch(process.env.REACT_APP_API + "/note", requestOptions)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Something went wrong');
      })
      .catch((error) => console.log(error))
  }

  //Get code from database
  useEffect(() => {
    const requestOptions = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    };
    fetch(process.env.REACT_APP_API + "/note", requestOptions)
      .then(res => res.json())
      .then(
        result => {
          if(result[0].comments.length > 0){
            setSavedComments(result[0].comments);
            console.log("getComments"+savedComments);
            setCommentHeight(result[0].comments[0].height);
          }
          setCodeField(result[0].code);
          setCount(count+1);
        },
      )
  }, []);

  useEffect(() => {
    if(savedComments !== undefined && savedComments.length !== 0){
      console.log(savedComments);
      loadComment(savedComments[count-1].height, savedComments);
      console.log(savedComments[count-1].height);
      if(count < savedComments.length){
        setCount(count+1);
      }
    } 
  }, [count]);

  // Provides options for when to show an HTML element (https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API)
  const handleOptions = {
    threshold: 1                                                                      // Show element when you scrolled its entire height
  }

  // Creates new Intersection Oberserver object. We are using this for the scrolling feature (https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API)
  const observer = new IntersectionObserver(handleIntersection, handleOptions);


  // Provides the x and y coordinates where the comment button should be. It is not the exact x and y position but the position relative to the div that has the className "code".
  // Disallows highlighting feature for 1. Highlighting blanks, 2. Highlighting '\n', 3. Highlighting anywhere outside the code section
  const handleHover = useCallback((event) => {
    const validSections = ["cm-content", "cm-line", "cm-gutterElement", "cm-gutter cm-foldGutter"];
    const selection = window.getSelection();

    if (selection.toString().length >= 1 && selection.toString() !== "\n" && (validSections.includes(event.target.className))) {
      const boxOutline = selection.getRangeAt(0).getBoundingClientRect();

      const codeBlock = document.getElementsByClassName("cm-gutter cm-lineNumbers")[0].getBoundingClientRect()
      const x = codeBlock.width - 75                                                     // 75 is about the width of the grey number bar. This pushes the button to the left outside the codebox
      let y = boxOutline.y - codeBlock.top;                                              // Subtracking codeBlock.top because the code section makes selection.y be too big. 


      /* Ignore this snippet. Don't delete
       let y;
       Use this section if you want to statically set the size of the codeblock
       if (window.pageYOffset === 0) {
         y = selection.y-codeBlock.top;
       }
       else {
         y = selection.y;
       }
      */

      setCommentButtonPoint({ x: x, y: y });
      setCommentHover(true);
    }
  }, [setCommentButtonPoint, setCommentHover]);


  // Removes the comment button after clicking anywhere that is not the button itself
  const handleClick = useCallback((event) => {
    const id = event.target.id;
    if (id !== "comment") {
      setCommentHover(false);
    }
  }, [setCommentHover]);


  // Handles highlighting and clicking for commenting feature
  useEffect(() => {
    window.addEventListener("mouseup", handleHover);      // This is for highlighting
    window.addEventListener("mousedown", handleClick);    // This is for clicking
    return () => {
      window.removeEventListener("mouseup", handleHover);
      window.removeEventListener("mousedown", handleClick);
    }
  });



  const addComment = (savedComments) => {
    setCommentsList(commentsList.concat(
      // This is a hack :/

      <div className='commentsArray' key={commentsList.length} id={commentsList.length} style={{ position: 'absolute', top: commentButtonPoint.y, left: '50%', transform: 'translate(-50%)' }}>
        <Comment length={commentsList.length+1} newCommentHeight={commentButtonPoint.y} allComments={savedComments}/>
      </div>
    ));
    i += 100;
    setCommentHover(false);
  }

  const loadComment = (commentHeight, savedComments) => {

    setCommentsList(commentsList.concat(
      // This is a hack :/

      <div className='commentsArray' key={commentsList.length} id={commentsList.length} style={{ position: 'absolute', top: commentHeight, left: '50%', transform: 'translate(-50%)' }}>
        <Comment length={commentsList.length+1} allComments={savedComments}/>
      </div>
    ));

    i += 100;
    setCommentHover(false);
  }


  const handleViewButton = () => {
    if (visibleComments === true) {
      console.log("Listening for intersections (don't add new comments)");
      setVisibleComments(false);
      for (const element of commentsList) {
        const id = element.props.id;
        const comment = document.getElementById(`${id}`);
        comment.classList.add('original');
        observer.observe(comment);
      }
    }

    if (visibleComments === false) {
      setVisibleComments(true)
      console.log("Not listening for intersections (you can add comments)");
      for (const element of commentsList) {
        const id = element.props.id;
        const comment = document.getElementById(`${id}`);
        comment.classList.remove('original');
        observer.unobserve(comment)
      }
    }
  }


  const handleSelectLanguage = (event) => {
    setLanguage(lang[event.target.value])
  }

  return (

    <div className="App">
      <header className="App-header">
        <div>
          <h1>This is title</h1>
          <p>This is the description</p>
        </div>

        <div className="viewButton" onClick={handleViewButton}>
          <div className="viewButtonChildren"></div>
          <div className="viewButtonLine1"></div>
          <div className="viewButtonLine2"></div>
        </div>

        {/* This is diving into two sections. This is for dividing one section left and the other right */}
        <div className="row">
          <div className="comments">
            {commentsList}
          </div>
          <div className="code">

            <div className="codeEditor">
              <div className='selectLanguage'>
                <select name="" id="" onChange={handleSelectLanguage}>
                  <option value="py">Python</option>
                  <option value="swift">Swift</option>
                  <option value="js">Javascript</option>
                  <option value="go">Go</option>
                  <option value="c">C</option>
                </select>
              </div>
              {commentHover ? <button id="comment" style={{ position: 'absolute', display: 'inline-block', left: commentButtonPoint.x, top: commentButtonPoint.y }} onClick={addComment}>Click</button> : <></>}
              <CodeMirror
                value={code}
                height="auto"
                // height="100vh"
                width="55vw"
                extensions={StreamLanguage.define(language)}
                onChange={(value, viewUpdate) => {
                  console.log('value:', value);
                  setCodeField(value);
                }}
              />
              <button onClick={handleSave} style = {{color:'white'}}>SAVE</button>
            </div>

          </div>
        </div>

      </header>
    </div>
  );
}

export default Note;
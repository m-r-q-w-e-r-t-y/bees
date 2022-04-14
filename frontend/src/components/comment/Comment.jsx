import { useState, useEffect } from "react";
import "./comment.css";

const Comment = ({length}) => {
  const [text, setText] = useState("");
  const [titleError, setTitleError] = useState(false);
  const [inputError, setInputError] = useState(false);
  const [type, setType] = useState("Comment");
  console.log(length);
  // @desc
  // This makes the text area increase height automatically
  // https://stackoverflow.com/a/53426195/18401461
  const calculateHeight = (e) => {
    e.target.style.height = "inherit";
    e.target.style.height = `${e.target.scrollHeight}px`;
  };

  // @desc
  // Make placeholder dynamic
  // const placeHolderText = () => {
  //   const text = [
  //     "What do you want to your reader to take away?",
  //     "How would you explain it to yourself when you first started coding?"
  //   ];

  //   const index = Math.floor(Math.random() * text.length);
  //   setText(text[index])
  // }

  // Disabling textarea https://developer.mozilla.org/en-US/docs/Web/HTML/Element/textarea

  // @desc
  // Handles submitting a comment, editing, and setting errors for fields that are not filled
  const handleSubmit = () => {
    const title = document.getElementById("titleInput"+length);
    const input = document.getElementById("input"+length);
    

    // If clicking on Edit button, make the Comment component editable
    if (type === "Edit") {
      title.removeAttribute("readonly");
      input.removeAttribute("readonly");
      setType("Comment");
    }
    // If clicking on Comment button, make the Comment submit
    else {
      if (title.value === "" || input.value === "") {
        if (title.value === "") {
          setTitleError(true);
        }
        if (input.value === "") {
          setInputError(true);
        }
      } else {
        title.setAttribute("readonly", true);
        input.setAttribute("readonly", true);

        setTitleError(false);
        setInputError(false);
        setType("Edit");
        console.log(title.value);
        console.log(input.value);
      }
    }
  };

  const handleDelete = () => {
    console.log("You have clicked the delete button");

    // implement functionality
    // The following video gives an idea https://youtu.be/sjAeLwuezxo
    // The will not delete comments but use 'filter' to remove from a database.
    // In his implementation the comments show up after a call to the database
  };

    //Get code from database
    useEffect(() => {
      const title = document.getElementById("titleInput"+length);
      const input = document.getElementById("input"+length);
      title.value = "Title"+length;
      input.value = "Input"+length;

  
      // If clicking on Edit button, make the Comment component editable
      if (type === "Edit") {
        title.removeAttribute("readonly");
        input.removeAttribute("readonly");
        setType("Comment");
      }
      // If clicking on Comment button, make the Comment submit
      else {
        if (title.value === "" || input.value === "") {
          if (title.value === "") {
            setTitleError(true);
          }
          if (input.value === "") {
            setInputError(true);
          }
        } else {
          title.setAttribute("readonly", true);
          input.setAttribute("readonly", true);
  
          setTitleError(false);
          setInputError(false);
          setType("Edit");
        }
      }
    }, []);

  return (
    <div className="App">
      <header className="App-header">
        <div className="comment">
          <div className="closeButton" onClick={handleDelete}>
            <div className="closeButtonChildren"></div>
            <div className="closeButtonLine1"></div>
            <div className="closeButtonLine2"></div>
          </div>
          {titleError ? (
            <>
              <span className="error">Please populate this field</span>
            </>
          ) : (
            <></>
          )}
          <div className="flexTitle">
            <textarea
              id={"titleInput"+length}
              type="text"
              className="titleInput textareaInput"
              onChange={calculateHeight}
              placeholder="Title..."
            />
          </div>
          {inputError ? (
            <span className="error">Please populate this field</span>
          ) : (
            <></>
          )}
          <div className="flexInput">
            <textarea
              id={"input"+length}
              type="text"
              className="input textareaInput"
              onChange={calculateHeight}
              placeholder="Comment..."
            />
          </div>
          <button onClick={handleSubmit}>{type}</button>
        </div>
      </header>
    </div>
  );
};

export default Comment;

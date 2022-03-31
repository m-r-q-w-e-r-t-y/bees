import { useState, useEffect, useCallback } from 'react'
// import { highlight, languages } from 'prismjs/components/prism-core';
// import 'prismjs/components/prism-clike';
// import 'prismjs/components/prism-javascript';
import CodeMirror from '@uiw/react-codemirror';
// import Comment from '../comment/Comment.jsx'
import "./note.css"

const Note = () => {  

  // Variables for highlighting page
  const [commentButtonPoint, setCommentButtonPoint] = useState({x:0, y:0});           // Tells Comment button where to position
  const [commentHover, setCommentHover] = useState(false);                            // Shows Comment button on true. Removes in false
  const [commentsList, setCommentsList] = useState([]);                               // Comment list that shows on the left
  const [visibleComments, setVisibleComments] = useState(true);                       // Hides or unhides the comments for viewing
  
  // Code that is shown on the CodeMirror editor. Can use MongoDB to make dynamic
  const code = `//
  //  ViewController.swift
  //  Yelpy
  //
  //  Created by Memo on 5/21/20.
  //  Copyright © 2020 memo. All rights reserved.
  //
  
  import UIKit
  import AlamofireImage
  import Lottie
  import SkeletonView
  
  class RestaurantsViewController: UIViewController {
          
      // Outlets
      @IBOutlet weak var tableView: UITableView!
      var restaurantsArray: [Restaurant] = []
      
      @IBOutlet weak var searchBar: UISearchBar!
      var filteredRestaurants: [Restaurant] = []
      
      // Variable inits
      var animationView: AnimationView?
      var refresh = true
      
      let yelpRefresh = UIRefreshControl()
      
  
      override func viewDidLoad() {
          super.viewDidLoad()
          
          startAnimations()
          // Table View
          tableView.visibleCells.forEach { $0.showSkeleton() }
          tableView.delegate = self
          tableView.dataSource = self
          
          // Search Bar delegate
          searchBar.delegate = self
      
      
          // Get Data from API
          getAPIData()
          
          yelpRefresh.addTarget(self, action: #selector(getAPIData), for: .valueChanged)
          tableView.refreshControl = yelpRefresh
      }
      
      
      @objc func getAPIData() {
         
          API.getRestaurants() { (restaurants) in
              guard let restaurants = restaurants else {
                  return
              }
              
              self.restaurantsArray = restaurants
              self.filteredRestaurants = restaurants
              self.tableView.reloadData()
              
              // MARK: LAB6 Checking for coordinates
  //            for rest in self.restaurantsArray {
  //                 print("COORDINATES", rest.coordinates)
  //             }
              
              Timer.scheduledTimer(timeInterval: 2.0, target: self, selector: #selector(self.stopAnimations), userInfo: nil, repeats: false)
          
              self.yelpRefresh.endRefreshing()
              
          }
      }
      
      
  
  }
  
  extension RestaurantsViewController: SkeletonTableViewDataSource {
      
      
      func startAnimations() {
          // Start Skeleton
          view.isSkeletonable = true
          
          animationView = .init(name: "4762-food-carousel")
          // Set the size to the frame
          //animationView!.frame = view.bounds
          animationView!.frame = CGRect(x: view.frame.width / 3 , y: 156, width: 100, height: 100)
  
          // fit the
          animationView!.contentMode = .scaleAspectFit
          view.addSubview(animationView!)
          
          // 4. Set animation loop mode
          animationView!.loopMode = .loop
  
          // Animation speed - Larger number = faste
          animationView!.animationSpeed = 5
  
          //  Play animation
          animationView!.play()
          
      }
      
  
      @objc func stopAnimations() {
          // ----- Stop Animation
          animationView?.stop()
          // ------ Change the subview to last and remove the current subview
          view.subviews.last?.removeFromSuperview()
          view.hideSkeleton()
          refresh = false
      }
      
  
      func collectionSkeletonView(_ skeletonView: UITableView, cellIdentifierForRowAt indexPath: IndexPath) -> ReusableCellIdentifier {
          return "RestaurantCell"
      }
      
  }
  
  // ––––– TableView Functionality –––––
  extension RestaurantsViewController: UITableViewDelegate, UITableViewDataSource {
      
      
      
      func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
          return filteredRestaurants.count
      }
      
      func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
          // Create Restaurant Cell
          let cell = tableView.dequeueReusableCell(withIdentifier: "RestaurantCell") as! RestaurantCell
          // Set cell's restaurant
          cell.r = filteredRestaurants[indexPath.row]
          
          // Initialize skeleton view every time cell gets initialized
          cell.showSkeleton()
          
          // Stop animation after like .5 seconds
          Timer.scheduledTimer(withTimeInterval: 0.5, repeats: false) { (timer) in
              cell.stopSkeletonAnimation()
              cell.hideSkeleton()
          }
          
          
          return cell
      }
      
      
      // ––––– TODO: Send restaurant object to DetailViewController
      override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
          let cell = sender as! UITableViewCell
          if let indexPath = tableView.indexPath(for: cell) {
              let r = filteredRestaurants[indexPath.row]
              let detailViewController = segue.destination as! RestaurantDetailViewController
              detailViewController.r = r
          }
          
      }
      
  }
  
  
  // ––––– UI SearchBar Functionality –––––
  extension RestaurantsViewController: UISearchBarDelegate {
      
      // Search bar functionality
      func searchBar(_ searchBar: UISearchBar, textDidChange searchText: String) {
          if searchText != "" {
              filteredRestaurants = restaurantsArray.filter { (r: Restaurant) -> Bool in
                return r.name.lowercased().contains(searchText.lowercased())
              }
          }
          else {
              filteredRestaurants = restaurantsArray
          }
          tableView.reloadData()
      }
  
      
      // Show Cancel button when typing
      func searchBarTextDidBeginEditing(_ searchBar: UISearchBar) {
         self.searchBar.showsCancelButton = true
      }
         
      // Logic for searchBar cancel button
      func searchBarCancelButtonClicked(_ searchBar: UISearchBar) {
         searchBar.showsCancelButton = false // remove cancel button
         searchBar.text = "" // reset search text
         searchBar.resignFirstResponder() // remove keyboard
         filteredRestaurants = restaurantsArray // reset results to display
         tableView.reloadData()
      }
  }`;

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
      const x = codeBlock.width-75                                                     // 75 is about the width of the grey number bar. This pushes the button to the left outside the codebox
      let y = boxOutline.y-codeBlock.top;                                              // Subtracking codeBlock.top because the code section makes selection.y be too big. 
      
      
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

      setCommentButtonPoint({x:x, y:y});
      setCommentHover(true);
    }
  }, [setCommentButtonPoint, setCommentHover]);


  // Removes the comment button after clicking anywhere that is not the button itself
  const handleClick = useCallback((event) => {
    const id = event.target.id;
    if (id !== "comment"){
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



  const addComment = () => {
    // setCommentsList(commentsList.concat(
    //   // This is a hack :/
    //   <div className='commentsArray' key={commentsList.length} id={commentsList.length} style={{position: 'absolute', top: commentButtonPoint.y, left: '50%', transform: 'translate(-50%)'}}>
    //     <Comment/>
    //   </div>
    // ));
    // setCommentHover(false);
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
            { commentsList }
          </div>
          <div className="code">
            {/* { commentHover ? <button id="comment" style={{ position: 'absolute', display: 'inline-block', left: commentButtonPoint.x, top: commentButtonPoint.y}} onClick={addComment}>Click</button> : <></>} */}
            <CodeMirror
              value={code}
              height="auto"
              // height="100vh"
              width="55vw"
              // extensions={[javascript({ jsx: true })]}
              onChange={(value, viewUpdate) => {
                console.log('value:', value);
              }}
            />
            
          </div>
        </div>

      </header>
    </div>
  );
}

export default Note;
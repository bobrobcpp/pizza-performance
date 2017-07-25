# **Website Performance Optimization portfolio project**
This project was  created by Udacity as part for the Front End Developer Nanodegree.  It had severe, intentionally built in  performance problems and it was the students job to optimize the website.
### Running the project
Optimized final files are in the dist folder of grunt-project.  
Please download the grunt-project folder and open the following in your browser to view the optimized pages:
  - dist/index.html
  - dist/views/pizza.html
### Use of task runner
The dist folder has been populated with optimized content with the aid of the task runner - grunt.  See <https://gruntjs.com/>

Running the command 'grunt' will perform a 'watch' task.  This task will monitor the HTML, CSS and JS files in the src folder and update the dist folder with minified content.  Other grunt tasks, 'grunt-responsive-images' and 'critical' can be run independently to respectively compress images or to inline critical CSS into an HTML file.  'grunt-responsive images' should be configured before use to set the compression level required for each image. 

The project was in two parts:
## Part One
The first task was to make index.html acheive a Pagespeed score of at least 90 for Mobile and Desktop.
### Optimizations made:
 * All images were compressed using grunt-responsive-images
* Google analytics code was made to run asynchronously by using ```async``` within     ```<script>```
* A large amount of CSS was inlined into the html using the grunt plugin             "Critical": <https://github.com/addyosmani/critical>
* Non-critical JS and media query controlled CSS was loaded at the bottom of         ```<body>```
* External CSS and JS was minified.
    
## Part two
The second part of the project was to optimize the JS in views/main.js optimize the browser rendering of views/pizza.html to make the frame rate 60fps while scrolling up and down and reduce the time to resize pizza using pizza size slider to less than 5ms.
### Optimizations made:
* Initialise the scrollTop to a variable ```scrollPos``` outside ```updatePositions``` or ```DOMContentLoaded``` event, recalculate its value outside of for loop within ```updatePositions```.
* Move variables ```item``` and ```scroll``` out of the for loop in the ```updatePositions```  function.
* Refactor ```updatePositions``` using the ```requestAnimationFrame``` function which       reduces the amount of recalculate styles required.
* Refactor ```updatePositions``` to use ```transform:translateX``` rather than left so that     geometry changes and repainting are not a neccesary when moving pizzas horizontally while scrolling. 
* CSS for transform was marked with a ```will-change``` property.  Analysis of layers within dev tools shows that this creates a separate layer in the page.
* Moved variables dx and new width outside of the for-loop in the ```changePizzaSizes``` function.  This reduced the number of times the layout of the page was forced to change.

##  **Contribute**
You can report bugs or contribute by using this Github repository: [Github repo ](https://github.com/bobrobcpp/grunt-project)

## **Licensing**
This project was part of the Udacity Front End Developer Nanodegree.  All files were provided by Udacity and optimized for performance.  All images used were provided by Udacity.



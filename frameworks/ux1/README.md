## Menu-Based Page Loader
=====================================
### Overview
------------
#### This project demonstrates a menu-based page loader that loads different pages based on the menu item clicked.
Features
------------
Menu-based page loader
Dynamic page loading using JavaScript and the Fetch API
Bootstrap styling and layout
Tooltips, popovers, toasts, and overlays on each page
Code Structure
------------------
index.html: The main HTML file that contains the menu and page loader
subs/page1.html, subs/page2.html: The individual pages that are loaded dynamically
page3.html: Another individual page that is loaded dynamically
assets/css/page1/styles.css, assets/css/page2/styles.css, assets/css/page3/styles.css: The CSS files that style each page
assets/js/page1/script.js, assets/js/page2/script.js, assets/js/page3/script.js: The JavaScript files that add interactivity to each page

index.html
``` html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Menu-Based Page Loader</title>
  <style>
    /* Add some basic styling to the menu */
    #menu {
      list-style: none;
      margin: 0;
      padding: 0;
    }
    
    #menu li {
      display: inline-block;
      margin-right: 20px;
    }
    
    #menu a {
      text-decoration: none;
      color: #337ab7;
    }
    
    #menu a:hover {
      color: #23527c;
    }
  </style>
</head>
<body>
  <!-- Menu -->
  <ul id="menu">
    <li><a href="subs/page1.html" data-page="subs/page1.html">Page 1</a></li>
    <li><a href="subs/page2.html" data-page="subs/page2.html">Page 2</a></li>
    <li><a href="page3.html" data-page="page3.html">Page 3</a></li>
  </ul>

  <!-- Page loader -->
  <div id="container"></div>

  <!-- JavaScript code to load pages dynamically -->
  <script>
    // Get all menu links
    const menuLinks = document.querySelectorAll('#menu a');
    
    // Add event listener to each menu link
    menuLinks.forEach(link => {
      link.addEventListener('click', event => {
        // Prevent default link behavior
        event.preventDefault();
        
        // Get the page URL from the link's data-page attribute
        const pageUrl = link.getAttribute('data-page');
        
        // Load the page dynamically
        loadPage(pageUrl);
      });
    });
    
    // Function to load a page dynamically
    function loadPage(pageUrl) {
      // Use the Fetch API to load the page
      fetch(pageUrl)
        .then(response => response.text())
        .then(html => {
          // Parse the HTML response
          const parser = new DOMParser();
          const doc = parser.parseFromString(html, 'text/html');
          
          // Get the page-specific CSS and JS files
          const styles = doc.querySelectorAll('link[rel="stylesheet"]');
          const scripts = doc.querySelectorAll('script');
          
          // Remove existing styles and scripts
          const existingStyles = document.querySelectorAll('link[rel="stylesheet"]');
          existingStyles.forEach(style => style.remove());
          const existingScripts = document.querySelectorAll('script');
          existingScripts.forEach(script => script.remove());
          
          // Load page-specific CSS and JS
          styles.forEach(style => {
            const newStyle = document.createElement('link');
            newStyle.rel = 'stylesheet';
            newStyle.href = style.href;
            document.head.appendChild(newStyle);
          });
          
          scripts.forEach(script => {
            const newScript = document.createElement('script');
            newScript.src = script.src;
            document.body.appendChild(newScript);
          });
          
          // Add the HTML content to the container
          const container = document.getElementById('container');
          container.innerHTML = doc.body.innerHTML;
        });
    }
  </script>
</body>
</html>
```



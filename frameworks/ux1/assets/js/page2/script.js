var page2 = {
  myFunction: () => {
    console.log("Welcome to Page 2!");
  },
  
  init: () => {
    document.querySelector("h1").addEventListener("click", page2.myFunction);
  }
};

// Initialize the page
page2.init();

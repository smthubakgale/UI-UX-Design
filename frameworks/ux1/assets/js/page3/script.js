var page3 = {
  myFunction: () => {
    console.log("Welcome to Page 3!");
  },
  
  init: () => {
    document.querySelector("h1").addEventListener("click", page3.myFunction);
  }
};

// Initialize the page
page3.init();

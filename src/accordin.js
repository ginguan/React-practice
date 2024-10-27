<!DOCTYPE html>
<html>
  <head>
    <title>Parcel Sandbox</title>
    <meta charset="UTF-8" />
  </head>

  <body>
    <div id="app">
      <input type="checkbox" id="multiExpandCheckbox" /> Allow multiple
      expansions
      <div class="CrossContainer">
        <div class="accordion">
          <div class="title-section">
            <div class="title">Title 1</div>
            <div class="expanded-icon">+</div>
            <div class="collapsed-icon">-</div>
          </div>
          <div class="description">Content for Accordion 1</div>
        </div>
        <div class="accordion">
          <div class="title-section">
            <div class="title">Title 2</div>
            <div class="expanded-icon">+</div>
            <div class="collapsed-icon">-</div>
          </div>
          <div class="description">Content for Accordion 2</div>
        </div>
        <div class="accordion">
          <div class="title-section">
            <div class="title">Title 3</div>
            <div class="expanded-icon">+</div>
            <div class="collapsed-icon">-</div>
          </div>
          <div class="description">Content for Accordion 3</div>
        </div>
      </div>
    </div>

    <script src="./index.mjs" type="module"></script>
  </body>
</html>
import "./styles.css";

/*
1. First accordin by default expanded
2. Clicking on the title of an expanded item collapses it.
3. Clicking on the title of a collapsed item expands it 
  while collapsing any other expanded item.

4. However, if multiple checkbox is clicked,
allow multiple expanded items at same time.

5. Both expanded and collapsed icons should
at title's rightmost corner
*/

// Get all the accordion containers
const accordions = document.querySelectorAll('.accordion');

// Check if multi-expansion is allowed
const multiExpandCheckbox = document.getElementById('multiExpandCheckbox');

// Expand first accordion by default (Requirement 1)
accordions[0].querySelector('.description').style.display = 'block';
accordions[0].querySelector('.expanded-icon').style.display = 'none'; // Hide expanded icon for the first one
accordions[0].querySelector('.collapsed-icon').style.display = 'inline'; // Show collapsed icon for the first one

// Loop through all accordions and attach click event listeners
accordions.forEach((accordion) => {
  const titleSection = accordion.querySelector('.title-section');
  const description = accordion.querySelector('.description');
  const expandedIcon = accordion.querySelector('.expanded-icon');
  const collapsedIcon = accordion.querySelector('.collapsed-icon');

  titleSection.addEventListener('click', () => {
    // Toggle the clicked accordion (Requirement 2 and 3)
    if (description.style.display === 'none' || description.style.display === '') {
      description.style.display = 'block';
      expandedIcon.style.display = 'none';
      collapsedIcon.style.display = 'inline';
    } else {
      description.style.display = 'none';
      expandedIcon.style.display = 'inline';
      collapsedIcon.style.display = 'none';
    }

    // Handle multi-expand checkbox (Requirement 4)
    if (!multiExpandCheckbox.checked) {
      accordions.forEach((otherAccordion) => {
        if (otherAccordion !== accordion) {
          otherAccordion.querySelector('.description').style.display = 'none';
          otherAccordion.querySelector('.expanded-icon').style.display = 'inline';
          otherAccordion.querySelector('.collapsed-icon').style.display = 'none';
        }
      });
    }
  });

  // Set up icons for accordions (Requirement 5)
  expandedIcon.style.display = (description.style.display === 'none' || description.style.display === '') ? 'inline' : 'none';
  collapsedIcon.style.display = (description.style.display === 'none' || description.style.display === '') ? 'none' : 'inline';
});

.accordion {
    border: 1px solid #ccc;
    margin-bottom: 10px;
  }
  
  .title-section {
    background-color: #f1f1f1;
    cursor: pointer;
    padding: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .description {
    padding: 10px;
    display: none; /* Initially hidden */
  }
  
  .expanded-icon,
  .collapsed-icon {
    display: none;
  }
  
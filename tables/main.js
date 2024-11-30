
  // Delete Row
document.getElementById("delete-row").addEventListener("click", () => {
  const rowIndex = prompt("Enter row number to delete (starting from 1):");
  if (!rowIndex || isNaN(rowIndex)) return alert("Please enter a valid row number.");

  const rowToDelete = tbody.rows[parseInt(rowIndex, 10) - 1];
  if (rowToDelete) {
    tbody.removeChild(rowToDelete);
  } else {
    alert("Row does not exist.");
  }
});

// Delete Column
document.getElementById("delete-column").addEventListener("click", () => {
  const colIndex = prompt("Enter column number to delete (starting from 1):");
  if (!colIndex || isNaN(colIndex)) return alert("Please enter a valid column number.");

  const columnIndex = parseInt(colIndex, 10) - 1;

  // Delete from thead
  if (thead.rows[0].cells[columnIndex]) {
    thead.rows[0].deleteCell(columnIndex);

    // Delete from tbody
    Array.from(tbody.rows).forEach((row) => {
      if (row.cells[columnIndex]) row.deleteCell(columnIndex);
    });
  } else {
    alert("Column does not exist.");
  }
});


  // Resizable Columns
const attachResizeHandlers = () => {
    const ths = table.querySelectorAll("th");
    let activeTh;
    let startX;
    let startWidth;
  
    const resizeMouseDown = (e) => {
      activeTh = e.target.parentElement;
      startX = e.pageX;
      startWidth = activeTh.offsetWidth;
      document.addEventListener("mousemove", resizeMouseMove);
      document.addEventListener("mouseup", resizeMouseUp);
    };
  
    const resizeMouseMove = (e) => {
      const newWidth = startWidth + (e.pageX - startX);
      activeTh.style.width = `${newWidth}px`;
    };
  
    const resizeMouseUp = () => {
      document.removeEventListener("mousemove", resizeMouseMove);
      document.removeEventListener("mouseup", resizeMouseUp);
    };
  
    ths.forEach((th) => {
      const resizeHandle = document.createElement("div");
      resizeHandle.classList.add("resize-handle");
      th.appendChild(resizeHandle);
      resizeHandle.addEventListener("mousedown", resizeMouseDown);
    });
  };
  
  attachResizeHandlers();
  // Get the download button
document.getElementById("download-btn").addEventListener("click", function () {
  // Import jsPDF and autoTable from the library
  const { jsPDF } = window.jspdf;

  // Create a new jsPDF instance
  const doc = new jsPDF();

  // Get the content of the editable heading
  const heading = document.querySelector("h2[contenteditable='true']").innerText;

  // Add the heading text to the PDF
  doc.setFontSize(16);
  doc.text(heading, 10, 10);

  // Add the table to the PDF
  doc.autoTable({
    html: "#custom-table", // Reference to the table
    startY: 20,            // Position below the heading
  });

  // Save the PDF
  doc.save("custom-table.pdf");
});


attachDragDropHandlers();

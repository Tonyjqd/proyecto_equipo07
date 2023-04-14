/* const editButton = document.getElementById("edit-button");
const acceptButton = document.getElementById("accept-button");
const cancelButton = document.getElementById("cancel-button");
const editArea = document.getElementById("edit-area");
const panelTitle = document.querySelector(".panel-title");
const panelContent = document.querySelector(".panel-heading h7");

editButton.addEventListener("click", () => {
  panelTitle.style.display = "none";
  panelContent.style.display = "none";
  editButton.style.display = "none";
  editArea.value = panelContent.textContent.trim();
  editArea.style.display = "block";
  acceptButton.style.display = "inline-block";
  cancelButton.style.display = "inline-block";
});

acceptButton.addEventListener("click", () => {
  panelTitle.style.display = "block";
  panelContent.style.display = "block";
  editButton.style.display = "inline-block";
  editArea.style.display = "none";
  acceptButton.style.display = "none";
  cancelButton.style.display = "none";
  panelContent.textContent = editArea.value;
}); 

cancelButton.addEventListener("click", () => {
  panelTitle.style.display = "block";
  panelContent.style.display = "block";
  editButton.style.display = "inline-block";
  editArea.style.display = "none";
  acceptButton.style.display = "none";
  cancelButton.style.display = "none";
});

const editButton2 = document.getElementById("edit-button-2");
const acceptButton2 = document.getElementById("accept-button-2");
const cancelButton2 = document.getElementById("cancel-button-2");
const editArea2 = document.getElementById("edit-area-2");
const panelTitle2 = document.querySelector(".panel-title");
const panelContent2 = document.querySelector("#panel-content-2");
const panelContent3 = document.querySelector("#panel-content-3");

editButton2.addEventListener("click", () => {
  panelTitle2.style.display = "none";
  panelContent2.style.display = "none";
  panelContent3.style.display = "none";
  editButton2.style.display = "none";
  editArea2.value = panelContent2.textContent.trim() + "\n" + panelContent3.textContent.trim();
  editArea2.style.display = "block";
  acceptButton2.style.display = "inline-block";
  cancelButton2.style.display = "inline-block";
});

acceptButton2.addEventListener("click", () => {
  panelTitle2.style.display = "block";
  panelContent2.style.display = "block";
  panelContent3.style.display = "block";
  editButton2.style.display = "inline-block";
  editArea2.style.display = "none";
  acceptButton2.style.display = "none";
  cancelButton2.style.display = "none";
  const [content2, content3] = editArea2.value.split("\n");
  panelContent2.textContent = content2.trim();
  panelContent3.textContent = content3.trim();
}); 

cancelButton2.addEventListener("click", () => {
  panelTitle2.style.display = "block";
  panelContent2.style.display = "block";
  panelContent3.style.display = "block";
  editButton2.style.display = "inline-block";
  editArea2.style.display = "none";
  acceptButton2.style.display = "none";
  cancelButton2.style.display = "none";
});

const editButton3 = document.getElementById("edit-button-3");
const acceptButton3 = document.getElementById("accept-button-3");
const cancelButton3 = document.getElementById("cancel-button-3");
const editArea3 = document.getElementById("edit-area-3");
const panelTitle4 = document.querySelector(".panel-title");
const panelContent4 = document.querySelector("#panel-content-4");

editButton3.addEventListener("click", () => {
  panelTitle4.style.display = "none";
  panelContent4.style.display = "none";
  editButton3.style.display = "none";
  editArea3.value = panelContent4.textContent.trim();
  editArea3.style.display = "block";
  acceptButton3.style.display = "inline-block";
  cancelButton3.style.display = "inline-block";
});

acceptButton3.addEventListener("click", () => {
  panelTitle4.style.display = "block";
  panelContent4.style.display = "block";
  editButton3.style.display = "inline-block";
  editArea3.style.display = "none";
  acceptButton3.style.display = "none";
  cancelButton3.style.display = "none";
  panelContent4.textContent = editArea3.value.trim();
});

cancelButton3.addEventListener("click", () => {
  panelTitle4.style.display = "block";
  panelContent4.style.display = "block";
  editButton3.style.display = "inline-block";
  editArea3.style.display = "none";
  acceptButton3.style.display = "none";
  cancelButton3.style.display = "none";
});
 */
const editButton4 = document.getElementById("edit-button-4");
const acceptButton4 = document.getElementById("accept-button-4");
const cancelButton4 = document.getElementById("cancel-button-4");
const editArea4 = document.getElementById("edit-area-4");
const panelContent5 = document.getElementById("panel-content-5");

editButton4.addEventListener("click", () => {
  panelContent5.style.display = "none";
  editButton4.style.display = "none";
  editArea4.value = panelContent5.textContent.trim();
  editArea4.style.display = "block";
  acceptButton4.style.display = "inline-block";
  cancelButton4.style.display = "inline-block";
});

acceptButton4.addEventListener("click", () => {
  panelContent5.style.display = "block";
  editButton4.style.display = "inline-block";
  editArea4.style.display = "none";
  acceptButton4.style.display = "none";
  cancelButton4.style.display = "none";
  panelContent5.textContent = editArea4.value;
});

cancelButton4.addEventListener("click", () => {
  panelContent5.style.display = "block";
  editButton4.style.display = "inline-block";
  editArea4.style.display = "none";
  acceptButton4.style.display = "none";
  cancelButton4.style.display = "none";
});

const editButton5 = document.getElementById("edit-button-5");
const acceptButton5 = document.getElementById("accept-button-5");
const cancelButton5 = document.getElementById("cancel-button-5");
const editArea5 = document.getElementById("edit-area-5");
const panelTitle5 = document.querySelector(".panel-title");
const panelContent6 = document.querySelector("#panel-content-6");
const panelContent7 = document.querySelector("#panel-content-7");
const panelContent8 = document.querySelector("#panel-content-8");
const panelContent9 = document.querySelector("#panel-content-9");

editButton5.addEventListener("click", () => {
  panelTitle5.style.display = "none";
  panelContent6.style.display = "none";
  panelContent7.style.display = "none";
  panelContent8.style.display = "none";
  panelContent9.style.display = "none";
  editButton5.style.display = "none";
  editArea5.value = panelContent6.textContent.trim() + "\n" + panelContent7.textContent.trim() + "\n" + panelContent8.textContent.trim() + "\n" + panelContent9.textContent.trim();
  editArea5.style.display = "block";
  acceptButton5.style.display = "inline-block";
  cancelButton5.style.display = "inline-block";
});

acceptButton5.addEventListener("click", () => {
  panelTitle5.style.display = "block";
  panelContent6.style.display = "block";
  panelContent7.style.display = "block";
  panelContent8.style.display = "block";
  panelContent9.style.display = "block";
  editButton5.style.display = "inline-block";
  editArea5.style.display = "none";
  acceptButton5.style.display = "none";
  cancelButton5.style.display = "none";
  const [content6, content7, content8, content9] = editArea5.value.split("\n");
  panelContent6.textContent = content6.trim();
  panelContent7.textContent = content7.trim();
  panelContent8.textContent = content8.trim();
  panelContent9.textContent = content9.trim();
}); 

cancelButton5.addEventListener("click", () => {
  panelTitle5.style.display = "block";
  panelContent6.style.display = "block";
  panelContent7.style.display = "block";
  panelContent8.style.display = "block";
  panelContent9.style.display = "block";
  editButton5.style.display = "inline-block";
  editArea5.style.display = "none";
  acceptButton5.style.display = "none";
  cancelButton5.style.display = "none";
});


const editButton6 = document.getElementById("edit-button-6");
const acceptButton6 = document.getElementById("accept-button-6");
const cancelButton6 = document.getElementById("cancel-button-6");
const editArea6 = document.getElementById("edit-area-6");
const panelTitle10 = document.querySelector(".panel-title");
const panelContent10 = document.querySelector("#panel-content-10");
const panelContent11 = document.querySelector("#panel-content-11");
const panelContent12 = document.querySelector("#panel-content-12");
const panelContent13 = document.querySelector("#panel-content-13");

editButton6.addEventListener("click", () => {
  panelTitle10.style.display = "none";
  panelContent10.style.display = "none";
  panelContent11.style.display = "none";
  panelContent12.style.display = "none";
  panelContent13.style.display = "none";
  editButton6.style.display = "none";
  editArea6.value = `${panelContent10.textContent.trim()} ${panelContent11.textContent.trim()} ${panelContent12.textContent.trim()} ${panelContent13.textContent.trim()}`;
  editArea6.style.display = "block";
  acceptButton6.style.display = "inline-block";
  cancelButton6.style.display = "inline-block";
});

acceptButton6.addEventListener("click", () => {
  panelTitle10.style.display = "block";
  panelContent10.style.display = "block";
  panelContent11.style.display = "block";
  panelContent12.style.display = "block";
  panelContent13.style.display = "block";
  editButton6.style.display = "inline-block";
  editArea6.style.display = "none";
  acceptButton6.style.display = "none";
  cancelButton6.style.display = "none";
  const [content10, content11, content12, content13] = editArea6.value.split(" ");
  panelContent10.textContent = content10.trim();
  panelContent11.textContent = content11.trim();
  panelContent12.textContent = content12.trim();
  panelContent13.textContent = content13.trim();
});

cancelButton6.addEventListener("click", () => {
  panelTitle10.style.display = "block";
  panelContent10.style.display = "block";
  panelContent11.style.display = "block";
  panelContent12.style.display = "block";
  panelContent13.style.display = "block";
  editButton6.style.display = "inline-block";
  editArea6.style.display = "none";
  acceptButton6.style.display = "none";
  cancelButton6.style.display = "none";
});


// Secuencia de edición de un panel
function initializePanelEdit(
  editButtonId,
  acceptButtonId,
  cancelButtonId,
  editAreaId,
  panelTitleSelector,
  panelContentSelector
) {
  const editButton = document.getElementById(editButtonId);
  const acceptButton = document.getElementById(acceptButtonId);
  const cancelButton = document.getElementById(cancelButtonId);
  const editArea = document.getElementById(editAreaId);
  const panelTitle = document.querySelector(panelTitleSelector);
  const panelContent = document.querySelector(panelContentSelector);

  // Mostrar el área de edición
  editButton.addEventListener("click", () => {
    panelTitle.style.display = "none";
    panelContent.style.display = "none";
    editButton.style.display = "none";
    editArea.value = panelContent.textContent.trim();
    editArea.style.display = "block";
    acceptButton.style.display = "inline-block";
    cancelButton.style.display = "inline-block";
  });

  // Aplicar los cambios realizados
  acceptButton.addEventListener("click", () => {
    panelTitle.style.display = "block";
    panelContent.style.display = "block";
    editButton.style.display = "inline-block";
    editArea.style.display = "none";
    acceptButton.style.display = "none";
    cancelButton.style.display = "none";
    panelContent.textContent = editArea.value.trim();
  });

  // Descartar los cambios realizados
  cancelButton.addEventListener("click", () => {
    panelTitle.style.display = "block";
    panelContent.style.display = "block";
    editButton.style.display = "inline-block";
    editArea.style.display = "none";
    acceptButton.style.display = "none";
    cancelButton.style.display = "none";
  });
}

// Inicializar la edición de cada panel
initializePanelEdit(
  "edit-button",
  "accept-button",
  "cancel-button",
  "edit-area",
  ".panel-title",
  ".panel-heading h7"
);

initializePanelEdit(
  "edit-button-2",
  "accept-button-2",
  "cancel-button-2",
  "edit-area-2",
  ".panel-title",
  "#panel-content-2, #panel-content-3"
);

initializePanelEdit(
  "edit-button-3",
  "accept-button-3",
  "cancel-button-3",
  "edit-area-3",
  ".panel-title",
  "#panel-content-4"
);

initializePanelEdit(
  "edit-button-4",
  "accept-button-4",
  "cancel-button-4",
  "edit-area-4",
  "",
  "#panel-content-5"
);

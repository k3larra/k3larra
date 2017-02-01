//Wait till all content is loaded, could be external fonts scripts from other servers etc....
var database = firebase.database();
if (document.readyState != 'loading'){
  onDocumentReady();
} else {
  document.addEventListener('DOMContentLoaded', onDocumentReady);
}

// Page is loaded! Now event can be wired-up
function onDocumentReady() {
  console.log('Document ready.');

}

function remove(){
  console.log("remove");
  /*database.ref("/medea_2").remove();
  database.ref("/medea_3").remove();
  database.ref("/floor_5").remove();*/
}

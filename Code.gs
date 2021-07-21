
// doGet va gérer le chargement de la page, ainsi que toutes les vues html
function doGet(e){

  if(isMaintenance) {
    var tmp = HtmlService.createTemplateFromFile('maintenance');
    return tmp.evaluate()
  }
  console.log("doGet début");
  console.log("e.parameters.v " + e.parameters.v);
  var startTime = new Date().getTime();
  var elapsedTime = 0;
  // adresse du sheet de consolidation pour chercher les informations
  var ss = SpreadsheetApp.openById(SSCONSOLIDATIONID);
  // id de l'événement que l'on vient récupérer dans l'URL : Si on est sur l'ensemble des événements : pas nécessaire
  var affichageAllEvents = false;
  var affichageMsgConfirmationEnvoi = false;
  var paramIdEvent;
  var urlEmailCreator;
  if(e.parameters.idevent != undefined) {
    paramIdEvent = e.parameters.idevent.toString();
    // Email du créateur de l'événement que l'on vient récupérer dans l'URL
    urlEmailCreator = e.parameters.creator;    
  } 
  

  if(e.parameters.v == "listeForms") {
    affichageAllEvents = true;
  }
  if(e.parameters.v == "Submit"){
    affichageMsgConfirmationEnvoi = true;
  }
  


  //Email de la session Google
  var emailUserConnected = Session.getActiveUser().getEmail().toString();
  //Données du sheet de consolidation
  var lignesSheetConsolidation = ss.getDataRange().getValues();
  
  //ON boucle si pas affichage de tous les événements.
  if(affichageAllEvents === true) {
      elapsedTime = new Date().getTime() - startTime;
      console.log("doGet affichageAllEvents fin temps execution (ms)" + elapsedTime);
      return trierDatesCroissante(emailUserConnected,ss,lignesSheetConsolidation,"")
  } else if(affichageMsgConfirmationEnvoi === true) {
      elapsedTime = new Date().getTime() - startTime;
      console.log("doGet affichageMsgConfirmationEnvoi fin temps execution (ms)" + elapsedTime);
      return confirmationEnvoi(emailUserConnected,paramIdEvent);  
  } else {
      //Début de la boucle 
      for (var numLigne=firstLineSheetCons; numLigne<=lignesSheetConsolidation.length ;numLigne++){
          var ligneSheet = lignesSheetConsolidation[numLigne - 1];
          
          if (ligneSheet != undefined) {
              var idevent = ligneSheet[colIdevent - 1];
              if(idevent==paramIdEvent){
                  elapsedTime = new Date().getTime() - startTime;
                  console.log("doGet idEvent fin temps execution (ms)" + elapsedTime);
                  
                  // On affiche si le user est celui qui a créé le RDV ou s'il s'agit d'un admin
                if(getParamSheet(sheetParamFeuilleAdmin).includes(emailUserConnected) || emailUserConnected==urlEmailCreator) {
                  return chargementForm(ligneSheet,numLigne ,paramIdEvent,urlEmailCreator);
                } else {
                   return erreur("Vous n'êtes pas habilité à visualiser ce formulaire"); 
                }
              }
          }
       }
   }
}
  

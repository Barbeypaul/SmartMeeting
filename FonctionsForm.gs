/*
-urlemail: email de l'url
-paramIdEvent: id de l'événement de l'URL
-ligneSheet:Lgne du sheet de consolidation de l'événement consterné
*/
function chargementForm(ligneSheet, numLigneEvent,paramIdEvent,urlemail){

          var startTime = new Date().getTime();
          var elapsedTime = 0;
          
          // importer le sheet de consolidation
          const ss = SpreadsheetApp.openById(SSCONSOLIDATIONID);
          // importer le template du Formulaire
          var templateFormulaire = tmpAfficherForm;
          // Inisialisation du tableau chargementListe, qui va contenir toutes les données du sheet de la ligne de l'événement
          var eventSelected = []
          
          /*-Données du sheet non modifiable par l'organisateur
          * -Stocage des données dans chargementListe
          * -onglet0: Numero de l'onglet du sheet
          * -col: colonne de la donnée
          */
          
          // Contrôle : On affiche pas formulaire dans le passé
          const dateEventSheet = ligneSheet[colDateEvent - 1]; 
          var dateFormatte=new Date(dateEventSheet.split("/").reverse().join("-"));
          var isDateJourOuFutur = isDateSuperieureDateJour(dateFormatte);
          
             
         
             var datePlusDeux = new Date()
             datePlusDeux.setDate(datePlusDeux.getDate() + 2);
             console.log('datePlusDeux'+ Utilities.formatDate(new Date(datePlusDeux), "GMT", "dd/MM/yyyy"))
             console.log('ligneSheet[colDateEvent - 1]'+ligneSheet[colDateEvent - 1])
             console.log('include'+getParamSheet(sheetParamFeuilleAdmin).includes(urlemail))
          if(!isDateJourOuFutur) {
              return erreur("Ce formulaire n'est plus accessible : L'événement est passé"); 
          }
          
          else if( Utilities.formatDate(new Date(datePlusDeux), "GMT", "dd/MM/yyyy") >=  ligneSheet[colDateEvent - 1]   && getParamSheet(sheetParamFeuilleAdmin).includes(Session.getActiveUser().getEmail()) == false ){
             return erreur("Vous ne pouvez plus modifier ce formulaire"); 
          }
        
          else{
          
          
          eventSelected.emailsheet = ligneSheet[colEmail - 1]; 
          eventSelected.salle = ligneSheet[colSalle - 1];
          eventSelected.libelle  = ligneSheet[colLibelle - 1];
          eventSelected.nbDeParticipants  =  ligneSheet[nbDeParticipants - 1]; 
          eventSelected.dateEvent = ligneSheet[colDateEvent - 1]; 
          eventSelected.idCalendar = ligneSheet[idCalendarCol - 1]; 
          eventSelected.dateStart = ligneSheet[colDateStart - 1]; 
          //Données du sheet modifiable par l'utilisateur
          eventSelected.nomOrganisateur = ligneSheet[colOrganisateur - 1]; 
          eventSelected.dateEnd = ligneSheet[colDateEnd - 1]; 
          eventSelected.demandeComplexe = ligneSheet[colDemandeComplexe - 1]; 
          eventSelected.choixEquipements =  ligneSheet[colChoixEquipements - 1]; 
          eventSelected.nbDeRepas =  ligneSheet[colNbDeRepas - 1]; 
          eventSelected.typeDeRepas =  ligneSheet[colTypeDeRepas - 1]; 
          eventSelected.nbDePetitsDej =  ligneSheet[colNbDePetitsDej - 1]; 
          eventSelected.hCocktail = ligneSheet[colHCocktail - 1]; 
          eventSelected.nbCocktails = ligneSheet[colNbCocktails - 1]; 
          eventSelected.instalParticu = ligneSheet[colInstalParticu - 1]; 
          eventSelected.imputation = ligneSheet[colImputation - 1];
          eventSelected.ligne = numLigneEvent;
         
          
          //Envoie du tableau chargementListe au template
          templateFormulaire.equipementsListe = equipementsSalle(eventSelected.idCalendar);
          //Envoie du tableau des types de repas proposés de la function getparamsheet avec le paramètre 3(numéro de l'onglet du sheet)
          templateFormulaire.typesRepasListe = getParamSheet(sheetParamFeuilleTypeRepas);
          //Envoie du tableau des Équipements supplémentaires de la function getparamsheet avec le paramètre 0(numéro de l'onglet du sheet)
          templateFormulaire.equipSuppListe = getParamSheet(sheetParamFeuilleEquiSupp); 
          //Envoie du tableau liste des demandes complexes de la function getparamsheet avec le paramètre 4(numéro de l'onglet du sheet)
          templateFormulaire.demandeComplexeListe = getParamSheet(sheetParamFeuilleDemandeComplexe);
          
          //Execution de la fonction affichage qui va envoyer au template toutes les données a afficher
          afficher(templateFormulaire,paramIdEvent,urlemail,eventSelected);
          
          elapsedTime = new Date().getTime() - startTime;
          console.log("chargementForm temps execution (ms)" + elapsedTime);
         
          console.log(templateFormulaire)
          // Affichage du template du formulaire
          return templateFormulaire.evaluate()
          }
}
/*
-templateFormulaire: nom du template
-paramIdEvent: idevent de l'url
-paramEmail: email de l'url
-eventSelected: tableau avec les données du sheet
Fonction qui va envoyer toutes les données a afficher a la vue Html du formulaire
*/
function afficher(templateFormulaire,paramIdEvent,paramEmail,eventSelected){ 

     templateFormulaire.emailhtml = eventSelected.emailsheet;
     templateFormulaire.sallehtml = eventSelected.salle;
     templateFormulaire.libellehtml = eventSelected.libelle;
     templateFormulaire.nbDeParticipantshtml = eventSelected.nbDeParticipants;
     templateFormulaire.dateEventhtml = eventSelected.dateEvent;
    
     templateFormulaire.dateStarthtml = eventSelected.dateStart;
     templateFormulaire.dateEndthtml = eventSelected.dateEnd;
     templateFormulaire.emailsheethtml = eventSelected.emailsheet;
     templateFormulaire.demandeComplexe = eventSelected.demandeComplexe;
     templateFormulaire.choixEquipementshtml = eventSelected.choixEquipements.split(','); 
     templateFormulaire.nomOrganisateurhtml = eventSelected.nomOrganisateur;
     templateFormulaire.nbDeRepashtml = eventSelected.nbDeRepas;
     templateFormulaire.typeDeRepashtml = eventSelected.typeDeRepas;
     templateFormulaire.nbDePetitsDejhtml = eventSelected.nbDePetitsDej;
     templateFormulaire.hCocktailhtml = Utilities.formatDate(new Date(eventSelected.hCocktail), Session.getScriptTimeZone(), "HH:mm");
     templateFormulaire.nbCocktailshtml = eventSelected.nbCocktails;
     templateFormulaire.instalParticuhtml = eventSelected.instalParticu;
     templateFormulaire.imputationhtml = eventSelected.imputation;
     templateFormulaire.ligneDuSheeti = eventSelected.ligne ;
     templateFormulaire.urlidevent = paramIdEvent;
     templateFormulaire.urlemail = paramEmail;
     templateFormulaire.URL = URL;
  }
 /*
 -la fonction userClicked va récupérer les données du formulaire après la soumission, et les insérer dans le sheet de consolidation
 -EventUserInfo: tableau de données qui a été envoyé au moment de soumettre le formulaire
 */
 function userClicked(eventUserInfo) {
      //importation du sheet de consolidation
       console.log('numLigne' + numLigne)
       var ss = SpreadsheetApp.openById(SSCONSOLIDATIONID);
       const sheetConsolidation = ss.getSheets()[onglet0];
      //récuperation de la ligne de l'evenement du sheet de consolidation
      var numLigne = eventUserInfo.ligneDuSheet;
      //Insertion de toutes les données dans le sheet de consolidation
      sheetConsolidation.getRange(numLigne, colDemandeComplexe).setValue(eventUserInfo.demandeComplexe);     
      sheetConsolidation.getRange(numLigne, colChoixEquipements).setValue(eventUserInfo.choixEquipements.toString());
      sheetConsolidation.getRange(numLigne, colNbDeRepas).setValue(eventUserInfo.nbDeRepas);
      sheetConsolidation.getRange(numLigne, colTypeDeRepas).setValue(eventUserInfo.typeDeRepas);
      sheetConsolidation.getRange(numLigne, colOrganisateur).setValue(eventUserInfo.nomOrganisateur);
      sheetConsolidation.getRange(numLigne, colNbDePetitsDej).setValue(eventUserInfo.nbDedej);
      sheetConsolidation.getRange(numLigne, colHCocktail).setValue(eventUserInfo.hCocktail);
      sheetConsolidation.getRange(numLigne, colNbCocktails).setValue(eventUserInfo.nbCocktails);
      sheetConsolidation.getRange(numLigne, colInstalParticu).setValue(eventUserInfo.installationPart);
      sheetConsolidation.getRange(numLigne, colImputation).setValue(eventUserInfo.imputation);
      sheetConsolidation.getRange(numLigne, coldateModification).setValue(new Date().getTime());
 
}
/*
-Fonction qui va retourner un tab des équipements en fonction de la salle de l'événement
-idCalendarParam: Nom de la salle
*/
function equipementsSalle(idCalendarParam){
   //importation du sheet equipementsSalle
   var ss =SpreadsheetApp.openById(SSPARAMETERFORMID);
   //Valeur des données du sheet
   var lignesSheet = ss.getSheetByName(sheetParamFeuilleSalleEquip).getDataRange().getValues();
    //initialisation de la boucle a la ligne 2
    for (var numLigne = 2; numLigne<=lignesSheet.length;numLigne++){
    // A chaque boucle on vient chercher le nom de la salle du sheet
    var idCalendar = ss.getSheetByName(sheetParamFeuilleSalleEquip).getRange(numLigne, 2).getValue();
     //si le nom de la salle du sheet est égal au nom de la salle de l'événement alors
     
     if(idCalendar === idCalendarParam){
         // On vient chercher ses équipements
         var equipements = ss.getSheetByName(sheetParamFeuilleSalleEquip).getRange(numLigne, 3).getValue();
         // Puis on retourne dans le template la phrase
         return " " + equipements ;
     }
   }
}
/*
Fonction qui va chercher dans le sheet des paramètres, un tableau des paramètres de l'onglet sélectionné
-numOnglet: numero de l'onglet du sheet
*/
function getParamSheet(Onglet){
    //initialisation du tableau que la fonction va retourner
    var tableauParam = [];
    //Adresse du sheet
    var ss = SpreadsheetApp.openById(SSPARAMETERFORMID);
    //Valeur des données du sheet avec comme paramètres le var num Onglet
    var lignesSheet = ss.getSheetByName(Onglet).getDataRange().getValues();
    //Initialisation de la boucle qui va lire chaque ligne du sheet
    for (var numLigne = 2; numLigne<=lignesSheet.length;numLigne++){
        //Récupération de chaque cel de la colonne 1, avec comme paramètres num Onglet
        var ligneSheet = lignesSheet[numLigne - 1];
        if(ligneSheet != undefined) {
            var parms = ligneSheet[0];
            //Insertion du var prams dans le tableau
            tableauParam.push(parms);
        }
        
    }
    // Puis on retourne le tableau
    return tableauParam;
}


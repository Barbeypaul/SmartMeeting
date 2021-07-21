
  
function ExportBaseDeCommande(listeIdEventExport) {
    var startTime = new Date().getTime();
    var elapsedTime = 0;
  
    //Convertion en array et extraction des id
    var Array = objectToArray(listeIdEventExport)
    
    // Sheet de consolidation
    var ssSheetConsolidation = SpreadsheetApp.openById(SSCONSOLIDATIONID);
  
    // Tableau des données du sheet
    var lignesSheetConsolidation =  ssSheetConsolidation.getDataRange().getValues();
    const sheetConsolidation = ssSheetConsolidation.getSheets();
    console.log('ExportBaseDeCommande nb lignes dans le Sheet de consolidation : ' + lignesSheetConsolidation.length);
    
    // On boucle sur la variable lignesSheetConsolidation pour lire ligne par ligne les données
    for (var i = 2; i<=lignesSheetConsolidation.length; i++){
     // Extraction des données dans le sheet
     var ligneSheet = lignesSheetConsolidation[i - 1];
     var idevent = ligneSheet[colIdevent - 1];
     // si idevent du sheet de consolidation est dans le tableau Array alors on continu
     if( Array.includes(idevent)){
       
       var dateEvent = ligneSheet[colDateEvent - 1];
       var salle = ligneSheet[colSalle - 1];
       var libelle = ligneSheet[colLibelle - 1];
       var organisateur = ligneSheet[colOrganisateur - 1];
       var imputation = ligneSheet[colImputation - 1];
       var nbDeRepas = ligneSheet[colNbDeRepas - 1];
       var nbCocktail = ligneSheet[colNbCocktails - 1];
       var nbDej = ligneSheet[colNbDePetitsDej - 1];
       var email = ligneSheet[colEmail - 1];
       var typeDeRepas = ligneSheet[colTypeDeRepas - 1];
       var cocktailCellValue =  "Cocktails"
       var dejCellValue =  "Petits déjeuner"
       var d = new Date();
       var dateExport = [d.getDate(), d.getMonth()+1, d.getFullYear()].join('/')+' '+ [d.getHours(), d.getMinutes(), d.getSeconds()].join(':');
       
       let nbDeRepas1 = 0;
       let nbDeRepas2 = 0;
             
       // si le nombre de repas est différent de 0
       if (nbDeRepas != 0){
          // si le nombre de repas est pair
          if(nbDeRepas%2 == 0){
          // On divise la valeur par deux sur deux lignes
              var qte1 = nbDeRepas/2;
              nbDeRepas1 = qte1;
              nbDeRepas2 = qte1;
              console.log('ExportBaseDeCommande nb repas pair : ' + nbDeRepas1)
    
          } else{    //Si non alors le nombre de repas est impaire
              var qte1 = ((nbDeRepas-1)/2)+1 ;
              var qte2 = (nbDeRepas-1)/2 ;
              nbDeRepas1 = qte1;
              nbDeRepas2 = qte2;
              console.log('ExportBaseDeCommande nb repas impair : ' + nbDeRepas1 + ' ' + nbDeRepas2)
         
           }
         
            // Initialisation des données de repas en object 
            var objectRepas1 = initeventRowSheet(idevent,dateExport,dateEvent,email,salle,libelle,organisateur,imputation,typeDeRepas,nbDeRepas1)
            var objectRepas2 = initeventRowSheet(idevent,dateExport,dateEvent,email,salle,libelle,organisateur,imputation,typeDeRepas,nbDeRepas2)
            
            
            var lignesAjoutees = [];
            lignesAjoutees.push(objectRepas1);
            lignesAjoutees.push(objectRepas2);
         
            //On ajoute la ligne au sheet 
            ajouterLignes(repasBaseDeCommande,idevent,lignesAjoutees,"true",ssSheetConsolidation,i)
       }
       // si le nombre de coktails est différent de 0
       if (nbCocktail != 0){
          var objectCocktail = initeventRowSheet(idevent,dateExport,dateEvent,email,salle,libelle,organisateur,imputation,cocktailCellValue,nbCocktail)
          var lignesAjouteesCocktail = [];
          lignesAjouteesCocktail.push(objectCocktail);
          ajouterLignes (coktailsBaseDeCommande,idevent,lignesAjouteesCocktail,"false",ssSheetConsolidation,i)
        }
       
        // si le nombre de Dej est différent de 0
       if (nbDej != 0){
           var objectDej1 = initeventRowSheet(idevent,dateExport,dateEvent,email,salle,libelle,organisateur,imputation,dejCellValue,nbDej)
           var lignesAjouteesDej = [];
           lignesAjouteesDej.push(objectDej1);
           ajouterLignes (dejBaseDeCommande,idevent,lignesAjouteesDej,"false",ssSheetConsolidation,i)
       }
   
   }
 }
  elapsedTime = new Date().getTime() - startTime;
  console.log("ExportBaseDeCommande fin temps execution (ms)" + elapsedTime);
}

// Function pour extraire dans un tableau la liste des id 
function objectToArray(listeIdEventExport){
   // initialisation du tableau
  var listeIdEventExportarray = []  
  for( var i=0; i < listeIdEventExport.length; i++){
   // A chaque ligne on vient chercher la value qui est l'id 
   var ideventvalue = ((listeIdEventExport[i]).value);
   // Push de ideventvalue dans notre tableau
   listeIdEventExportarray.push(ideventvalue);
   }
  // On retourne le tableau
  return listeIdEventExportarray
}

function initeventRowSheet(idevent,dateExport,dateEvent,email,salle,libelle,organisateur,imputation,typeDeservice,nbDeservice){
    var data = initeventRowSheetObject
       data.idevent = idevent;
       data.DateExport = dateExport;
       data.DateEvent = dateEvent;
       data.email = email;
       data.Salle = salle;
       data.Nom  = libelle ;
       data.Organisateur = organisateur;
       data.imputation  = imputation;
       data.typeDeservice  = typeDeservice;
       data.nbDeservice  = nbDeservice;
      
       return convertObjectToArrayEvent(data)
}

/*
* Initilialisation de l'événement.
*/
function initeventRowSheetObject() {
   return {'idevent' : '','DateExport' : '','DateEvent' :'','email' :'','Salle' :'','Nom' : '', 'Organisateur' : '','Imputation' : '','typeDeRepas' : '','Qte1' : ''};
}


/*
* Conversion des données en tableau d'objets.
*/
function convertObjectToArrayEvent(data) {
 
  var arrayEvent = [];
  
  for (var key in data){
      // TODO Vérifier que la key existe bien
      arrayEvent.push(data[key]);
    }
 
  return arrayEvent;
  
}

/*
* Ajouter les lignes dans le fichier de suivi de commandes et mise à jour du fichier de consolidation.
*/
function ajouterLignes (ongletBaseDeCommande,idevent,lignesAjoutees,type,ssSheetConsolidation,numLigneSheetConsolidation){
  var startTime = new Date().getTime();
  var elapsedTime = 0;
  ssBaseDeCommande = SpreadsheetApp.openById(SSBASEDECOMMANDE);
  var numLigneAjout = getRowBaseCommande(ongletBaseDeCommande, idevent )
  
  console.log('ajouterLignes, numLigneAjout = ' + numLigneAjout + ' de type : ' + type)

  // si true on exporte les deux lignes de repas 
  if ( type == "true") {
    var rangeAjout = "A" + numLigneAjout + ":J" + (numLigneAjout + 1);
  }
  else {
    var rangeAjout = "A" + numLigneAjout + ":J" + numLigneAjout;  
  }
  
  // Mise à jour du fichier de base de commande.
  ssBaseDeCommande.getSheetByName(ongletBaseDeCommande).getRange(rangeAjout).setValues(lignesAjoutees)
  
  // Mise à jour du fichier de consolidation.
  ssSheetConsolidation.getSheets()[0].getRange(numLigneSheetConsolidation, colExport).setValue("true")
  ssSheetConsolidation.getSheets()[0].getRange(numLigneSheetConsolidation, coldateExport).setValue(new Date().getTime())
  
  elapsedTime = new Date().getTime() - startTime;
  console.log("ajouterLignes fin temps execution (ms)" + elapsedTime);
}

 
  
/**
* Récupère la ligne de l'événement ou si l'événement n'est pas présent la 1ère ligne vide su Sheet
*/
function getRowBaseCommande(onglet, idevent) {
   var startTime = new Date().getTime();
   var elapsedTime = 0;
  
   var ssBaseDeCommande = SpreadsheetApp.openById(SSBASEDECOMMANDE).getSheetByName(onglet);
   var lignesSheetBaseCommande = ssBaseDeCommande.getDataRange().getValues();
  
   for ( var numLigne=1; numLigne<= lignesSheetBaseCommande.length;numLigne++ ){
     
     var ligneSheet = lignesSheetBaseCommande[numLigne - 1];
     var idEventBaseDeCommande = ligneSheet[0]; // 1ère colonne

     if ( idEventBaseDeCommande == idevent){
          return numLigne
     } else if(numLigne == lignesSheetBaseCommande.length){
         var avals = ssBaseDeCommande.getRange("B1:B").getValues();
         return avals.filter(String).length + 1
     }
   }
  
   elapsedTime = new Date().getTime() - startTime;
   console.log("getLastRowBaseCommande fin temps execution (ms)" + elapsedTime);
}   
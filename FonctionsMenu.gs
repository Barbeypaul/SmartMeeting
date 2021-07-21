function trierDatesCroissante(emailUserConnected,ss,values,paramIdEvent){
  const isAdmin = getParamSheet(sheetParamFeuilleAdmin).includes(emailUserConnected);
  if(isAdmin){
   
   var listeForms = tableauMenuListeForms(emailUserConnected,ss,values);
   console.log(listeForms)
   var tmp = tmpAfficherMenu;
  tmp.listeFormshtml = listeForms;
   
  //tmp.urlidevent = paramIdEvent;
  tmp.urlemail = emailUserConnected;
  tmp.URL=URL;
  tmp.Admin = 'true'
 
  return tmp.evaluate()
  
  }
  else{
  var listeForms = tableauMenuListeForms(emailUserConnected,ss,values);
  
  var tmp = tmpAfficherMenu;
  tmp.listeFormshtml = listeForms;
  //tmp.urlidevent = paramIdEvent;
  tmp.urlemail = emailUserConnected;
  tmp.URL=URL;
  tmp.Admin = 'false'
 
  return tmp.evaluate()
  
  }
 
}


function tableauMenuListeForms(emailUserConnected,ss,lignesSheet){

    const sheetConsolidation = ss.getSheets()[onglet0];
    
    var startTime = new Date().getTime();
    var elapsedTime = 0; 
      
    var listeForms = [];
    
    const isAdmin = getParamSheet(sheetParamFeuilleAdmin).includes(emailUserConnected);
    
    console.log('tableauMenuListeForms nb lignes : ' + lignesSheet.length);
    
    for (var numLigne = firstLineSheetCons; numLigne<=lignesSheet.length;numLigne++){
        
        var ligneSheet = lignesSheet[numLigne - 1];
        
        if (ligneSheet != undefined) {
        
          // Afficher l'evenement si il est Valid
       
            var emailsheet = ligneSheet[colEmail - 1];
    
            
            var dateEventSheet =  ligneSheet[colDateEvent - 1];
            var dateFormatte = new Date(dateEventSheet.split("/").reverse().join("-"));
            var dd=dateFormatte.getDate() + 1;
            var mm=dateFormatte.getMonth()+1;
            var yy=dateFormatte.getFullYear();
            var dateEvent=Date.parse(yy+"/"+mm+"/"+dd);
            console.log('dateEvent'+dateEvent)
            //--
            var dateAjoutSheeet =  ligneSheet[colAjout - 1];
//            var today = new Date(dateAjoutSheeet.split("/").reverse().join("-"));
//            var ddA= today.getDate() + 1;
//            var mmA= today.getMonth()+1;
//            var yyA= today.getFullYear();
//            var dateAjout=Date.parse(ddA+"/"+mmA+"/"+yyA);
//            console.log('dateAjout'+dateAjout)
            //--
            var isDateJourOuFutur = isDateSuperieureDateJour(dateFormatte);
                        
            if(isDateJourOuFutur && (isAdmin || emailsheet == emailUserConnected)) {
                var statut = ligneSheet[colStatut - 1];
                var salle = ligneSheet[colSalle - 1];
                var libelle  = ligneSheet[colLibelle - 1]; 
                var idevent = ligneSheet[colIdevent - 1];
                var dateStart =  ligneSheet[colDateStart - 1];
                var dateEnd = ligneSheet[colDateEnd - 1];
                var nomOrganisateur = ligneSheet[colOrganisateur - 1]; 
                var flagtab = flag(ligneSheet);
                var caseExport = ligneSheet[colExport - 1];
                var demandeComplexe = ligneSheet[colDemandeComplexe - 1];
                var instalParticuliere = ligneSheet[colInstalParticu - 1];
                var dateModif = ligneSheet[coldateModification - 1];
                var dateExport = ligneSheet[coldateExport - 1];
                if(demandeComplexe == 'Contactez-moi' || instalParticuliere ){
                  var contacter =  'Oui';
                }else{
                  var contacter =  'Non';
                }
                var infoForm = [salle,libelle,dateEventSheet,idevent,emailsheet,dateStart,dateEnd,nomOrganisateur,flagtab,caseExport,dateAjoutSheeet,contacter,statut,dateModif,dateExport];
                console.log(infoForm)
                listeForms.push(infoForm);
          }
          
       }  
 
   }
    
    elapsedTime = new Date().getTime() - startTime;
    console.log('tableauMenuListeForms fin temps execution (ms) : ' + elapsedTime);
    return listeForms;    
   
}



/**
* Indicateurs services réservés
*/
function flag(ligneSheet){
    var nbDeRepas =   ligneSheet[colNbDeRepas - 1];
    var nbDePetitsDej = ligneSheet[colNbDePetitsDej - 1];
    var nbCocktails = ligneSheet[colNbCocktails - 1];
    
    if (nbDeRepas  > 0 || nbDePetitsDej  > 0 || nbCocktails > 0 ){
       var flagtab = 'Services réservés'
       return  flagtab 
    } else  {
        var flagtab = 'Services non réservés'
        return  flagtab
    }
}


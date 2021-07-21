/**
*
* Renvoie true si la date passée en paramètre est une date du jour ou dans le futur (supérieure à la date du jour)
*/
function isDateSuperieureDateJour(dateEvent) {
  var dateJour = new Date();
  dateJour.setHours(0);
  dateJour.setMinutes(0);  
   
  return dateEvent.getTime() >= dateJour.getTime();
}

//fonction qui va retourner le template en cas d'erreur
function erreur(msg){
   
    var tmp = HtmlService.createTemplateFromFile('indexError')
    tmp.msg = msg;
  //Retouner le template
  return tmp.evaluate()
}

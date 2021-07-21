/*
-emailUserConnected: email de la session Google
-paramIdEvent: id de l'événement de l'URL
*/
function confirmationEnvoi(emailUserConnected,paramIdEvent) {
  //Chercher le template AfterSubmit
  var tmp = HtmlService.createTemplateFromFile('AfterSubmit')
  //Importer dans le template, l'urlidevent et l'eamil
  tmp.urlidevent = paramIdEvent;
  tmp.urlemail = emailUserConnected;
  tmp.URL = URL;
  //Retouner le template
  return tmp.evaluate()
}

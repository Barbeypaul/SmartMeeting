//--Spreadsheet--adresses
const SSCONSOLIDATIONID = "";
const SSPARAMETERFORMID = "";
const SSBASEDECOMMANDE = "";
//--TemplatesHtml--
const tmpAfficherForm = HtmlService.createTemplateFromFile('FormTemplate');
const tmpAfficherMenu = HtmlService.createTemplateFromFile('Menu');
//const tmpAfficherAfterSubmit = HtmlService.createTemplateFromFile('AfterSubmit')
//--OngletDuSheetDeConsolidation--
const onglet0 =0;
//--PremiereLigneDuSheet

//--ColDuSheetDeConsolidation--
const premiereBoucleObjectToArrayExport = 2;
const firstLineSheetCons=2;
const colIdevent=1;
const idCalendarCol=2;
const colEmail =3;
const nbDeParticipants = 5;
const colSalle =9;
const colOrganisateur =13;
const colLibelle =10;
const colDateEvent=6;
const colDateStart=7;
const colDateEnd=8;
const colStatut=11;
const colAjout=12;
const colDemandeComplexe=14;
const colChoixEquipements=15;
const colNbDeRepas=16;
const colTypeDeRepas=17;
const colNbDePetitsDej=18;
const colHCocktail=19;
const colNbCocktails=20;
const colInstalParticu=21;
const colImputation=22;
const colExport=24;
const coldateExport = 25;
const coldateModification = 26;

// Constante Parametre Sheet
const sheetParamFeuilleEquiSupp = 'Equipements supp';
const sheetParamFeuilleSalleEquip = 'Salle √©quipements';
const sheetParamFeuilleImputation = 'Imputation';
const sheetParamFeuilleTypeRepas = 'Type de repas';
const sheetParamFeuilleDemandeComplexe = 'Demande complexe';
const sheetParamFeuilleAdmin = 'Administrateurs';

const repasBaseDeCommande = 'Repas';
const dejBaseDeCommande = 'Cocktails';
const coktailsBaseDeCommande = 'PetitsDej'; 

const isMaintenance = false;

const URL = 'https://script.google.com.............';//url/exec ou dev
             

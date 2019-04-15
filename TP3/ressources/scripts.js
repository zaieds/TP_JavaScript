
// constantes
            const TVA = 20;
            const DATEACTUELLE = new Date();
            const ANNEEACTUELLE = DATEACTUELLE.getFullYear();
           
// Application body

// Produit class
class Produit{

constructor(){
      this.prixAchat = undefined;
      this.marge = 5;  
      this.name = undefined;  
      this.imgPath = undefined; 
       
      }

getPrixAchat(){
      return this.prixAchat;
}

setPrixAchat(x){
      this.prixAchat = x;
}

getMarge(){
      return this.marge;
}

setMarge(x){
      this.marge = x;
}

coutAchat(){
      return this.prixAchat;
}

prixVenteHT(){
      let total =  this.coutAchat() * (1+ this.marge /100);
      return  Number.parseFloat(total).toFixed(2) ;
}

prixVenteTTC(){
      let total = this.prixVenteHT() * (1+ TVA /100)
      return Number.parseFloat(total).toFixed(2) ;
}

afficherProduit(){
      console.log(this.name,this.prixAchat,this.coutAchat(),this.prixVenteHT(),this.prixVenteTTC());
}
}


// Pack class
class Pack extends Produit{
      constructor(produit, quantity){
            super();
            this.prixAchat = Number.parseFloat(produit.prixAchat * quantity).toFixed(2) ;
            this.marge = produit.marge;  
            this.name = "pack de " + quantity + " " + produit.name;
            this.quantity = quantity;
            this.imgPath = produit.imgPath

      }
}

// Vin class
class Vin extends Produit{
      constructor(){
      super();
      this.millesime = undefined;
      this.coutGarde = 7;
      }

coutAchat(){
      let total = this.prixAchat * (1 + this.coutGarde/100 )
      for(let i = 1; i< ANNEEACTUELLE - this.millesime; i++){
      total = total * (1 + this.coutGarde/100 )
      }
      
      return Number.parseFloat(total).toFixed(2);
      
}
}

// BouteilleVin class
class BouteilleVin extends Vin{
      constructor(name, millesime, prixAchat, imgPath){
            super();
            this.name = name;
            this.millesime = millesime;
            this.prixAchat = prixAchat;
            this.imgPath = imgPath;
            this.prixUnitaire = this.prixVenteHT();
      }
}

// Caisse class
class Caisse extends Pack{
      constructor(produit){
            super(produit, 6);
            this.name = produit.name;
            this.imgPath = produit.imgPath;
            this.prixUnitaire = produit.prixVenteHT();
            this.quantity = 6;
      }
}

// Palette class
class Palette extends Pack{
      constructor(produit, quantity){
            super(produit, quantity);
            this.name = produit.name;
            this.imgPath = produit.imgPath;
            this.prixUnitaire = produit.prixVenteHT();
            this.quantity = quantity;
      }
}

// Canette class
class Canette extends Produit{
      constructor(name, prixAchat, imgPath){
            super();
            this.name = "canette " +name;
            this.prixAchat = prixAchat;
            this.imgPath = imgPath;
      }
}

const cave = [
    new Caisse(new BouteilleVin("Bordeaux rouge, Pétrus Pomerol",2004,600,"petrus-2004.jpg")),
    new Caisse(new BouteilleVin("Côte Rotie rouge, Jamet",2003,70,"jamet-cote-rotie-cote-brune-2003.jpg")),
   new Palette(new Pack(new Canette("Coca Cola",0.70,"coca-cola.jpg"),6),480),
    new Palette(new Pack(new Canette("Bière Leffe Blonde",1.35,"biere-leffe.jpg"),6),250)
  ];

  cave.show = function(){

    // designer un objet DOM
      const TBODYDOM = document.getElementById("tbody");
    //   parcourir tous les elements du tableau
      cave.forEach(element => { 
        //   creer un element ligne(tr) DOM 
          let ligne = document.createElement("tr");

          let td0 = document.createElement("td");
          let td1 = document.createElement("IMG");
          td1.setAttribute("src", "ressources/"+ element.imgPath);

          let td2 = document.createElement("td");
          let td3 = document.createElement("td");
          let td4 = document.createElement("td");
          
          let info2 = document.createTextNode(element.name);
          let info3 = document.createTextNode(element.prixUnitaire);
          let info4 = document.createTextNode(element.quantity);
// associer les objets DOM entre eux suivant une hierarchie
          td0.appendChild(td1);
          td2.appendChild(info2);
          td3.appendChild(info3);
          td4.appendChild(info4);

          ligne.appendChild(td0);
          ligne.appendChild(td2);
          ligne.appendChild(td3);
          ligne.appendChild(td4);

          TBODYDOM.appendChild(ligne);
 
      });
  }

     
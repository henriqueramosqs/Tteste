
const express = require("express");
const bodyparser = require("body-parser");
const db = require("./public/models/db_de_questões")
const handlebars = require('express-handlebars')
app = express();

const hand = handlebars.create({
  defeaultLayout:"main",
  helpers:{ 
   imagem: function(value){
      if(value !==null){
        return "<img src='images/imagens_de_questões/"+ value +".png' class='imagem_de_questão' alt ='imagem ilustrativa da questão'>"
      }
   }
  }
})

app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());
app.engine("handlebars", hand.engine)
app.set("view engine","handlebars")
app.use(express.static(__dirname + "/public"));

app.get("/estatisticas", function (req, res) {
  res.render("Estatísticas");
})


app.get("/buscador", function (req, res) {
  res.render("Buscador");
});

app.get("/", function (req, res) {
  res.render("LandingPage");
});



app.post("/resultado_de_busca", function (req, res) {
  query_de_sql = "SELECT * FROM questoes  WHERE prova ='" +
     String(req.body.prova) +
     "' AND materia ='" +
     String(req.body.matéria) +
    "' AND conteudo ='" +
     String(req.body.conteúdo) +
     "'"

 db.db.query(query_de_sql, (err, result) => {
  if (err) {
    throw err;
  }
     alternativas=[]
     enunciados=[]
     confi_quest=[]
     array_total=[]     

  for (var i = 0; i < result.length; i++) {
    if(result[i].fase === null){
      new_confi = result[i].prova + " " +result[i].ano
    }else{
      new_confi = result[i].prova + " " +result[i].ano + " - " +
     result[i].fase +"ª fase"
    }
    confi_quest.push(new_confi)
    if(result[i].alternativas ==5){      
     locA = result[i].enunciado.indexOf("A ( )")
     locB = result[i].enunciado.indexOf("B( )")
     locC = result[i].enunciado.indexOf("C( )")
     locD = result[i].enunciado.indexOf("D( )")
     locE = result[i].enunciado.indexOf("E( )")
      if(locA == -1){
        locA = result[i].enunciado.indexOf("A ( )")
      }
      if(locB == -1){
       locB = result[i].enunciado.indexOf("B ( )")
     }
     if(locC == -1){
       locC = result[i].enunciado.indexOf("C ( )")
     }
     if(locD == -1){
       locD = result[i].enunciado.indexOf("D ( )")
     }
     if(locE == -1){
       locE = result[i].enunciado.indexOf("E ( )")
     }
         
     if(locA == -1){
      locA = result[i].enunciado.indexOf("A()")
    }
    if(locB == -1){
     locB = result[i].enunciado.indexOf("B ()")
   }
   if(locC == -1){
     locC = result[i].enunciado.indexOf("C()")
   }
   if(locD == -1){
     locD = result[i].enunciado.indexOf("D()")
   }
   if(locE == -1){
     locE = result[i].enunciado.indexOf("E()")
   }
     alternativas_da_enésima_questão =[]


      A = result[i].enunciado.slice(locA,locB)
      B = result[i].enunciado.slice(locB,locC)      
      C = result[i].enunciado.slice(locC,locD)
      D = result[i].enunciado.slice(locD,locE)
      E = result[i].enunciado.slice(locE)
      enunciados_da_enésima_questão=result[i].enunciado.slice(0,locA)

      alternativas_da_enésima_questão.push(A)      
      alternativas_da_enésima_questão.push(B)
      alternativas_da_enésima_questão.push(C)
      alternativas_da_enésima_questão.push(D)
      alternativas_da_enésima_questão.push(E)

      enunciados.push(enunciados_da_enésima_questão.replace())

     alternativas.push(alternativas_da_enésima_questão)
    }else{
       alternativas_questão_com_uma_alternativa =[]
       alternativas.push(alternativas_questão_com_uma_alternativa)
       enunciados.push(result[i].enunciado)
    }
  }
  
  for (var i = 0; i < result.length; i++) {
        array1 = {
          confi_quest:confi_quest[i],
          enunciado: enunciados[i],
          alternativas: alternativas[i],
          resposta: result[i].resposta,
          image: result[i].imagem
        }

        array_total.push(array1)
  }

   res.render('ResultadoDeBuscas',{
      
    questoes: array_total
}
  )
  
})});

app.get('/contribua',(req,res)=>{
  res.render('Contribua')
}
)



const PORT = process.env.PORT ||3115

app.listen(PORT, function () {
  console.log("rodando legal")});
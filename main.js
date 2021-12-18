
/* ⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️
 * ⚠️
 * ⚠️
 * ⚠️
 * ⚠️  CECI EST UNE CORRECTION QUI A POUR BUT DE VOUS PERMETTRE DE 
 * ⚠️  PROGRESSER. JE NE M'ATTENDS A CE RESULTAT DE VOTRE PART. 
 * ⚠️  
 * ⚠️  ICI LE BUT EST D'ÊTRE CAPABLE DE LIRE ET DE PRENDRE DES NOTES
 * ⚠️  POUR COMPRENDRE UNE BONNE PARTIE DE CE CODE.
 * ⚠️
 * ⚠️  LE RESTE VIENDRA PAR LA SUITE !!!
 * ⚠️
 * ⚠️
 * ⚠️
 * ⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️
 */


import './style.css'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

let app = document.querySelector('#app')

let basket = []
let name = ''
let price = 0


// Retourne le prix total du panier (basket)
function basketPrice(currentBasket) {
  if(currentBasket.length === 0) { return 0 }

  let prices = currentBasket.map(b => parseFloat(b.price))
  return prices.reduce((acc, current) => acc + current)
}

// Affiche la page liste
async function renderList() {
  let { data } = await supabase.from('items').select('*')

  // Réinitialisation du contenu de app
  app.innerHTML = ""

  // Ajout du header (fonction header())
  app.appendChild(header())
  // Ajout du panier (fonction shopping())
  app.appendChild(shopping(basket))
  // Ajout de la liste des produits (fonction list())
  app.appendChild(list(data))

  // Ajout de la classe focus sur le bouton Liste dans le menu 
  document.getElementById('Liste').className = "menu-item focus"
  document.getElementById('Formulaire').className = "menu-item"
}

// Affiche la page formulaire
function renderForm() {
  // Réinitialisation du contenu de app
  app.innerHTML = ""

  // Ajout du header (fonction header())
  app.appendChild(header())
  // Ajout du formulaire (fonction form())
  app.appendChild(form())

  // Ajout de la classe focus sur le bouton Formulaire dans le menu 
  document.getElementById('Liste').className = "menu-item"
  document.getElementById('Formulaire').className = "menu-item focus"
}

/*
* Genere le header de notre application
*
* <header>
*   <ul>
*     <li class="menu-item">Liste</li> [event de changement de page]
*     <li class="menu-item">Formulaire</li> [event de changement de page]
*   <ul>
* </header> 
*/
function header() {
  let header = document.createElement("header")
  let title = document.createElement("h1")
  title.innerText = "Le Noël de Nico"
  title.className = "title"

  let ul = document.createElement("ul")

  /*
   * Ici je boucle sur le tableau contenant "Liste" et "Formulaire" 
   * pour créer mes liens vers les autres pages
   */
  for(let gift of ["Liste", "Formulaire"]) {
    let li = document.createElement("li")
    li.className = "menu-item"
    li.id = gift

    /*
     * Sur chacun de ces éléments, j'ajoute un addEventListener
     * qui permet de au clic qui déclenche la méthode de rendu associée 
     * 
     * [event] Si je clic sur le lien du bouton Liste, alors je déclenche renderList
     * 
     * [event] Si je clic sur le lien du bouton Formulaire, alors je 
     * déclenche renderForm
     */
    li.addEventListener("click", function() {
      /*
       * giftSlice(0,4) me permet de récupérer les 4 premiers caractères
       * (Form ou List) que je concatène 
       * render => renderForm ou renderList
       */
      let postFix = "render" + `${gift.slice(0, 4)}`

      /*
       * eval permet de déclencher la fonction à partir 
       * d'une chaîne de caractère
       * Attention cependant à l'utilisation de cette fonction : 
       * https://www.geeksforgeeks.org/is-javascripts-eval-evil/
       */
      eval(postFix)()
    })

    let a = document.createElement("a")
    a.innerText = gift
    li.appendChild(a)
    ul.appendChild(li)
  }

  header.appendChild(title)
  header.appendChild(ul)

  return header
}

/*
* Genere la partie panier (page liste) avec le nombre de produits
* ainsi que le prix
*/
function shopping(currentBasket) {
  let icon = document.createElement('i')
  icon.className = 'fas fa-shopping-basket'
  let p = document.createElement('p')
  p.className = 'basket'
  let span = document.createElement('span')
  let sum = basketPrice(currentBasket)

  // Gestion du pluriel
  if(currentBasket.length <= 1) {
    span.innerText = ` Il y a ${currentBasket.length} produit dans le panier pour un total de ${sum}€`
  } else {
    span.innerText = ` Il y a ${currentBasket.length} produits dans le panier pour un total de ${sum}€`
  }

  p.appendChild(icon)
  p.appendChild(span)

  return p
}

/*
* Genere la liste de mes cadeaux
*
* <section class="items">
*   <div class="item">
*     <div> [event de suppression de l'item]
*       <i class="fas fa-times-circle" /> 
*     </div>
*     <p>Mon super cadeau</p>
*   </div> 
*   <div class="item">
*     <div> [event de suppression de l'item]
*       <i class="fas fa-times-circle" /> 
*     </div>
*     <p>Un autre cadeau</p>
*   </div> 
* </section>
*/
function list(storedData, currentBasket) {
  let section = document.createElement("section")
  section.className = "items"

  for(let gift of storedData) {
    let divIcon = document.createElement('div')
    let icon = document.createElement('i')
    icon.className = "fas fa-times-circle"

    let div = document.createElement('div')
    div.className = "item"
    
    let p = document.createElement('p')
    p.innerText = gift.name

    let button = document.createElement('button')
    button.innerText = "Ajouter au panier"

    // Supprime l'élément dans la base de donnée (voir doc api supabase) 
    // lors du clic sur la croix rouge
    divIcon.addEventListener('click', async function () {
      let newData = storedData
      let { data, error } = await supabase
        .from('items')
        .delete()
        .match({ id: gift.id })
        
      
      if(!error) {
        // Enlève le produit qui vient être supprimé de la liste 
        newData = storedData.filter(d => d.id != gift.id)
      }

      // Rafraichit la page liste avec la liste de produits màj
      renderList(newData, currentBasket)
    })

    // Ajoute le cadeau au panier au clic sur le bouton
    button.addEventListener('click', function () {
      basket.push(gift)

      // Rafraichit la page liste avec le panier màj
      renderList(storedData, basket)
    })
 
    divIcon.appendChild(icon)
    div.appendChild(divIcon)
    div.appendChild(p)
    div.appendChild(button)
    section.appendChild(div)
  }

  return section
}

function form() {
  let div = document.createElement("div")
  div.className = "form"

  let labelName = document.createElement('label')
  labelName.innerText = "Nom du produit"

  let inputName = document.createElement("input")
  inputName.className = "name"

  let labelPrice = document.createElement('label')
  labelPrice.innerText = "Prix du produit"

  let inputPrice = document.createElement("input")
  inputPrice.className = "price"

  let submit = document.createElement("button")
  submit.innerText = "Ajouter un produit"
  
  // Change la valeur de name (ligne 30) à chaque changement de valeur
  inputName.addEventListener('change', function(event) {
    name = event.target.value
  })
  
  // Change la valeur de price (ligne 31) à chaque changement de valeur
  inputPrice.addEventListener('change', function(event) {
    price = event.target.value
  })

  // Ajoute l'élément dans la base de donnée (voir doc api supabase)
  submit.addEventListener('click', async function() {
    let {data, error} = await supabase.from('items').insert([
      { name: name, price: price },
    ])

    // Réinitialise name et price avant le prochain changement
    name = ""
    price = 0
  })

  div.appendChild(labelName)
  div.appendChild(inputName)
  div.appendChild(labelPrice)
  div.appendChild(inputPrice)
  div.appendChild(submit)

  return div
}


// Premier rendu de page
renderList()

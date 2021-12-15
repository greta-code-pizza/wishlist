import './style.css'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

let app = document.querySelector('#app');

let { data } = await supabase
    .from('items')
    .select('*')


console.log(data)

// C'est noël, pas de chrono et beaucoup d'entraide pour réaliser les différentes étapes ci-dessous

// Step 1 :
//
// Afficher un paragraphe dans app avec Hello world comme contenu à l'aide de innerHTML 

// Step 2 :
//
// Remplacer Hello world par le nombre de produits que vous récupérez depuis data 

// Step 3 :
//
// Ajouter un produit depuis supabase et vérifier que le compte est mis à jour

// Step 4 :
//
// Ajouter dans app le nom de chaque item
// Pour cela vous aurez besoin de :
// - tableau data
// - innerHTML
// - une boucle au choix
//
// Vous pouvez vous aider du code ci-dessous :

// let people = [
//   {firstName: "john", lastName: "doe"}, 
//   {firstName: "janette", lastName: "doe"}
// ]

// people.forEach(function (person) {
//   console.log(person.firstName)
// })


